"use client"
import * as React from "react"
import "../components/role.css"
import "../components/meeting.css"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {

  ChevronLeft,
  ChevronRight,
   Columns3Cog,
  ChevronsLeft,
  ChevronsRight,
  
  GripVertical,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,

  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableHeaderControls from "./TableHeaderControls"

type Props<TData> = {
  data: TData[]
  columns: ColumnDef<TData>[]
 title:string
}

export function DataTableDemo<TData>({ data, columns,title }: Props<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const table = useReactTable({
    data,
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
  })

  return (
    <div className="w-full ">
{title !== "Leads" && <TableHeaderControls title={title} />}
     

      <div className="flex items-center justify-between mb-4 ">
        <div className="search-bar flex gap-2.5">
          <Input
            placeholder={`Search ${title}`}
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="w-[290px]"
          />
          
        </div>
        <div className="manage-columns-all-filters flex gap-2.5">

          <Dialog>

            <DialogTrigger asChild>
              <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-green-900 rounded">
                <Columns3Cog className="w-5 h-5" />
                Manage Column
              </button>
            </DialogTrigger>

            <DialogContent className="manage-col">
              <DialogHeader>
                <DialogTitle>Choose which columns you want to see.</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 mt-4">
                {/* Left: Column Options */}
                <div className="border rounded p-4 space-y-4 bg-white">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Columns Options <span className="text-xs text-gray-400">(Choose columns to display)</span></p>
                    <input type="text" placeholder="Search columns" className="mt-2 w-full border rounded px-2 py-1 text-sm" />
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-700">Lead Info</h4>
                      <div className="space-y-1 mt-2">
                        <label><input type="checkbox" defaultChecked /> Name</label><br />
                        <label><input type="checkbox" defaultChecked /> Last Name</label><br />
                        <label><input type="checkbox" defaultChecked /> Email</label><br />
                        <label><input type="checkbox" defaultChecked /> Mobile Number</label><br />
                        <label><input type="checkbox" defaultChecked /> Contact Person</label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Address</h4>
                      <div className="space-y-1 mt-2">
                        <label><input type="checkbox" /> Street</label><br />
                        <label><input type="checkbox" /> City</label><br />
                        <label><input type="checkbox" /> District</label><br />
                        <label><input type="checkbox" /> State</label><br />
                        <label><input type="checkbox" /> Country</label>
                        <label><input type="checkbox" /> Zip code</label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Company Name</h4>
                      <div className="space-y-1 mt-2">
                        <label><input type="checkbox" /> Job Title</label><br />
                        <label><input type="checkbox" /> Website</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Selected Options */}
                <div className="border rounded p-4 bg-white space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">Selected Options <span className="text-xs text-green-700">(Drag to reorder)</span></p>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">16</span>
                  </div>

                  <input type="text" placeholder="Search columns" className="w-full border rounded px-2 py-1 text-sm" />
                  <input type="text" placeholder="Lead Name" className="w-full border rounded px-2 py-1 text-md" />

                  <div className="space-y-2">
                    {[
                      "Name", "Last Name", "Contact Person", "Email", "Mobile number", "Amount",
                      "Company Name", "Position", "Billing Contact", "Due Date"
                    ].map(item => (
                      <div key={item} className="flex items-center justify-between border px-3 py-2 rounded hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                          <span className="text-sm">{item}</span>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <DialogFooter className="flex justify-between mt-6">
                <div className="text-sm text-gray-500 space-x-4">
                  <button className="underline">Reset to default</button>
                  <button className="text-gray-400 font-medium underline">Remove All columns</button>
                </div>
                <div className="space-x-2">
                  <button className="px-4 py-2 rounded border border-gray-300">Cancel</button>
                  <button className="px-4 py-2 rounded bg-green-800 text-white">Apply</button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>


      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-[#9CA3AF] text-[14px] font-[500]" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="font-[400] text-[14px] text-[#374151]" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">

          Showing 1-10 of {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2 flex gap-8 items-center">
          <div>
            <span className="font-medium text-sm leading-6">Rows per page</span>
          </div>
          <div className="font-medium text-sm leading-6">
            Page 1 of 10
          </div>
          <div>
            <Button
              className="p-2"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >        <ChevronsLeft />



            </Button>
            <Button
              className="p-2"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >    <ChevronLeft />


            </Button>
            <Button
              className="p-2"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              className="p-2"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
