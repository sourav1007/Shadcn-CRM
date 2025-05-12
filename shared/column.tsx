'use client';

import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Copy, Ellipsis, Plus } from 'lucide-react';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import '../shared/columns.css'

import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { Card, CardShadow } from './card';
import { EllipsisVertical } from 'lucide-react';

import {
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  TCardData,
  TColumn,
} from './data';
import { blockBoardPanningAttr } from './data-attributes';
import { isSafari } from './is-safari';
import { isShallowEqual } from './is-shallow-equal';
import { SettingsContext } from './settings-context';

type TColumnState =
  | {
    type: 'is-card-over';
    isOverChildCard: boolean;
    dragging: DOMRect;
  }
  | {
    type: 'is-column-over';
  }
  | {
    type: 'idle';
  }
  | {
    type: 'is-dragging';
  };

const stateStyles: { [Key in TColumnState['type']]: string } = {
  idle: 'cursor-grab',
  'is-card-over': 'outline outline-2 outline-neutral-50',
  'is-dragging': 'opacity-40',
  'is-column-over': 'bg-slate-900',
};

const idle = { type: 'idle' } satisfies TColumnState;

/**
 * A memoized component for rendering out the card.
 *
 * Created so that state changes to the column don't require all cards to be rendered
 */
const CardList = memo(function CardList({ column }: { column: TColumn }) {
  return column.cards.map((card) => <Card key={card.id} card={card} columnId={column.id} />);
});

export function Column({ column }: { column: TColumn }) {
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const { settings } = useContext(SettingsContext);
  const [state, setState] = useState<TColumnState>(idle);

  useEffect(() => {
    const outer = outerFullHeightRef.current;
    const scrollable = scrollableRef.current;
    const header = headerRef.current;
    const inner = innerRef.current;
    invariant(outer);
    invariant(scrollable);
    invariant(header);
    invariant(inner);

    const data = getColumnData({ column });

    function setIsCardOver({ data, location }: { data: TCardData; location: DragLocationHistory }) {
      const innerMost = location.current.dropTargets[0];
      const isOverChildCard = Boolean(innerMost && isCardDropTargetData(innerMost.data));

      const proposed: TColumnState = {
        type: 'is-card-over',
        dragging: data.rect,
        isOverChildCard,
      };
      // optimization - don't update state if we don't need to.
      setState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current;
        }
        return proposed;
      });
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => data,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data;
          invariant(isColumnData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element: header, input: location.current.input }),
            render({ container }) {
              // Simple drag preview generation: just cloning the current element.
              // Not using react for this.
              const rect = inner.getBoundingClientRect();
              const preview = inner.cloneNode(true);
              invariant(preview instanceof HTMLElement);
              preview.style.width = `${rect.width}px`;
              preview.style.height = `${rect.height}px`;

              // rotation of native drag previews does not work in safari
              if (!isSafari()) {
                preview.style.transform = 'rotate(4deg)';
              }

              container.appendChild(preview);
            },
          });
        },
        onDragStart() {
          setState({ type: 'is-dragging' });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element: outer,
        getData: () => data,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source });
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
            return;
          }
          if (isColumnData(source.data) && source.data.column.id !== column.id) {
            setState({ type: 'is-column-over' });
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
            return;
          }
        },
        onDragLeave({ source }) {
          if (isColumnData(source.data) && source.data.column.id === column.id) {
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false;
          }

          return isDraggingACard({ source });
        },
        getConfiguration: () => ({ maxScrollSpeed: settings.columnScrollSpeed }),
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        getConfiguration: () => ({ maxScrollSpeed: settings.columnScrollSpeed }),
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false;
          }

          if (!settings.isOverflowScrollingEnabled) {
            return false;
          }

          return isDraggingACard({ source });
        },
        getOverflow() {
          return {
            forTopEdge: {
              top: 1000,
            },
            forBottomEdge: {
              bottom: 1000,
            },
          };
        },
      }),
    );
  }, [column, settings]);

  return (
    <div className="flex w-[300px] py-3  px-2 mr-8 h-screen bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] flex-shrink-0 select-none flex-col" ref={outerFullHeightRef}>
      <div
        className={`flex max-h-full  flex-col rounded-lg  text-neutral-50 ${stateStyles[state.type]}`}
        ref={innerRef}
        {...{ [blockBoardPanningAttr]: true }}
      >
        <div
          className={`flex max-h-full flex-col ${state.type === 'is-column-over' ? 'invisible' : ''}`}
        >
          <div className="flex flex-row shadow shadow-[#0000001A] items-center py-3 px-4 mb-5 border-t-4  border-[#FDBA74] rounded-md justify-between bg-[#FFFFFF] " ref={headerRef}>
            <div className=" gap-3  flex items-center font-[600] text-[14px] text-[#1E293B]   leading-5">{`Initial`} <div className="rounded-[100px] px-[5px] bg-[#F1F5F9] text-[12px] font-[500] leading-[18px]">5</div></div>
            <button
              type="button"
              className="rounded p-2 hover:bg-slate-500 active:bg-white text-black"
              aria-label="More actions"
            >
              <EllipsisVertical  size={16} />
            </button>
          </div>
          <div
            className=" scrollable flex flex-col overflow-y-auto [overflow-anchor:none]  "
            ref={scrollableRef}
          >
            <CardList column={column} />
            {state.type === 'is-card-over' && !state.isOverChildCard ? (
              <div className="flex-shrink-0 px-3 py-1">
                <CardShadow dragging={state.dragging} />
              </div>
            ) : null}
          </div>
          <div className="flex flex-row gap-2 p-3">
            <button
              type="button"
              className="flex flex-grow flex-row gap-1 rounded p-2 bg-slate-700 active:bg-amber-500"
            >
              <Plus size={16} />
              <div className="leading-4">Add a card</div>
            </button>
            <button
              type="button"
              className="rounded p-2 bg-slate-700 active:bg-amber-400"
              aria-label="Create card from template"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
