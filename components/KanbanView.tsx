// KanbanView.tsx
import React from 'react';
import { ChevronDown, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Board } from '@/shared/board';
import { TBoard, } from '@/shared/data';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

type KanbanViewProps = {
  data: TBoard; // Define the type of data you expect
};

const KanbanView: React.FC<KanbanViewProps> = ({ data }) => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Description', accessorKey: 'description' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Phone', accessorKey: 'phone' },
  ]; // Example columns for the table

  const table = useReactTable({
    data: data.columns.flatMap((column) => column.cards), // Flatten cards for the table
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between flex-wrap mb-4">
        <div className="flex gap-2.5">
          <Input
            placeholder="Search Leads.."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className="w-[290px]"
          />

          {['Sort by', 'Status', 'Tags'].map((label, idx) => (
            <DropdownMenu key={idx}>
              <DropdownMenuTrigger asChild>
                <Button className={`flex items-end rounded-md py-1.5 px-2 text-[#1E293B] ${label !== 'Sort by' ? 'border-dashed' : ''} border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9]`}>
                  {label !== 'Sort by' && <PlusCircle />} {label} <ChevronDown className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem checked={false} disabled>
                  All Leads
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Newest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Oldest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Last Contacted
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Recently Added
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Recently Viewed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Ascending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false} disabled>
                  Descending
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

        </div>

        <div className="flex gap-2.5">
          <input
            className="border hover:bg-[#F1F5F9] border-[#E2E8F0] rounded-md text-[#1E293B] py-2 px-3"
            type="date"
          />
          <Button className="text-[#105427] py-2 px-3 border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9]">
            Custom Filter <ChevronDown className="ml-1" />
          </Button>
          <Button className="text-[#105427] bg-[#F1F5F9] py-2 px-3 hover:bg-amber-50">
            Manage Columns <ChevronDown className="ml-1" />
          </Button>
        </div>
      </div>

      {/* Render the Kanban board */}
      <Board initial={data} />
    </>
  );
};

export default KanbanView;
