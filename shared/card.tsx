'use client';

import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import invariant from 'tiny-invariant';
import { Mail, Phone,MessageCircle ,FilePlus , Building2, Contact,MessageSquareMore } from 'lucide-react';

import { isSafari } from '@/shared/is-safari';
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { getCardData, getCardDropTargetData, isCardData, isDraggingACard, TCard } from './data';
import { isShallowEqual } from './is-shallow-equal';

type TCardState =
  | {
    type: 'idle';
  }
  | {
    type: 'is-dragging';
  }
  | {
    type: 'is-dragging-and-left-self';
  }
  | {
    type: 'is-over';
    dragging: DOMRect;
    closestEdge: Edge;
  }
  | {
    type: 'preview';
    container: HTMLElement;
    dragging: DOMRect;
  };

const idle: TCardState = { type: 'idle' };

const innerStyles: { [Key in TCardState['type']]?: string } = {
  idle: 'hover:outline outline-2 outline-neutral-50 cursor-grab',
  'is-dragging': 'opacity-40',
};

const outerStyles: { [Key in TCardState['type']]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
  'is-dragging-and-left-self': 'hidden',
};

export function CardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-slate-900" style={{ height: dragging.height }} />;
}

export function CardDisplay({
  card,
  state,
  outerRef,
  innerRef,
}: {
  card: TCard;
  state: TCardState;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2  ${outerStyles[state.type]}`}
    >
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === 'is-over' && state.closestEdge === 'top' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <div
        className={`rounded bg-[#FFFFFF] shadow shadow-[#0000001A] mb-3 w-[full] p-4 text-slate-300 ${innerStyles[state.type]}`}
        ref={innerRef}
        style={
          state.type === 'preview'
            ? {
              width: state.dragging.width,
              height: state.dragging.height,
              transform: !isSafari() ? 'rotate(4deg)' : undefined,
            }
            : undefined
        }
      >
        <div>
          <div className="card-top border-b border-[#E2E8F0] pb-4">
            <h3 className='text-[#0B8636] font-[600] mb-2'>{card.name}</h3>
            <div className="email flex items-center gap-2 mb-2 font-[400] text-[14px] text-[#334155]">< Mail className='h-[16px] w-[16px]' />{card.email}</div>
            <div className="phone flex items-center gap-2 mb-2 font-[400] text-[14px] text-[#334155]">< Contact className='h-[16px] w-[16px]' />{card.phone}</div>
            <div className="company flex items-center gap-2   font-[400] text-[14px] text-[#334155]"><Building2 className='h-[16px] w-[16px]' />{card.company}</div>
          </div>
          <div className="flex justify-between pt-2.5">
            <div className="text-[#105427] font-[500] flex gap-1 items-center">
              <FilePlus className='text-[#105427] h-[20px] w-[20px]'/>
              
              Add Note

            </div>
            <div className="social-media flex items-center gap-3">
            <MessageSquareMore className='text-black h-[20px] w-[20px]' />
            < Mail className='text-[#105427] h-[20px] w-[20px]'/>
            <MessageCircle className='text-[#105427] h-[20px] w-[20px]' />

            <MessageCircle className='text-[#105427] h-[20px] w-[20px]' />


            </div>
          </div>


        </div>


      </div>
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === 'is-over' && state.closestEdge === 'bottom' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
    </div>
  );
}

export function Card({ card, columnId }: { card: TCard; columnId: string }) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TCardState>(idle);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    invariant(outer && inner);

    return combine(
      draggable({
        element: inner,
        getInitialData: ({ element }) =>
          getCardData({ card, columnId, rect: element.getBoundingClientRect() }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data;
          invariant(isCardData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element: inner, input: location.current.input }),
            render({ container }) {
              // Demonstrating using a react portal to generate a preview
              setState({
                type: 'preview',
                container,
                dragging: inner.getBoundingClientRect(),
              });
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
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ card, columnId });
          return attachClosestEdge(data, { element, input, allowedEdges: ['top', 'bottom'] });
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }

          setState({ type: 'is-over', dragging: source.data.rect, closestEdge });
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }
          // optimization - Don't update react state if we don't need to.
          const proposed: TCardState = { type: 'is-over', dragging: source.data.rect, closestEdge };
          setState((current) => {
            if (isShallowEqual(proposed, current)) {
              return current;
            }
            return proposed;
          });
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            setState({ type: 'is-dragging-and-left-self' });
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, [card, columnId]);
  return (
    <>
      <CardDisplay outerRef={outerRef} innerRef={innerRef} state={state} card={card} />
      {state.type === 'preview'
        ? createPortal(<CardDisplay state={state} card={card} />, state.container)
        : null}
    </>
  );
}
