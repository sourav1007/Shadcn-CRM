"use client"
import React from 'react'
import { useState } from 'react'
import TableHeaderControls from './TableHeaderControls'
import { DataTableDemo } from "./DataTableDemo"
import CalenderView from '../components/CalenderView' 

import { ArrowUpDown, Pencil, Copy, Trash,  MoreHorizontal, } from "lucide-react"

import { Progress } from "@/components/ui/progress"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export type Headings = {
  meetingTitle: string
  from: string
  to: string
  contactName: string
  meetingOwner: string
  status: "Upcoming" | "Overdue" | "Completed"
  createdDate: string
}


     
 import {
  ColumnDef
} from "@tanstack/react-table"


export const columns: ColumnDef<Headings>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "meetingTitle",
    header: "Meeting Title",
    cell: ({ row }) => <div>{row.getValue("meetingTitle")}</div>
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => <div>{row.getValue("from")}</div>
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => <div>{row.getValue("to")}</div>
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
    cell: ({ row }) => <div>{row.getValue("contactName")}</div>
  },
  {
    accessorKey: "meetingOwner",
    header: "Meeting Owner",
    cell: ({ row }) => <div>{row.getValue("meetingOwner")}</div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      const statusColor =
        status === "Upcoming"
          ? "bg-yellow-100 text-yellow-800"
          : status === "Overdue"
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800"

      return (
        <div className={`py-[4px] px-[10px] text-xs font-semibold rounded-full w-fit ${statusColor}`}>
          {status}
        </div>
      )
    }
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ row }) => <div>{row.getValue("createdDate")}</div>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Meeting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Meeting
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              Delete Meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export const data: Headings[] = [
  {
    meetingTitle: "Nutrition Follow-up Call",
    from: "15 Apr 2024, 11:00 AM",
    to: "15 Apr 2024, 11:30 AM",
    contactName: "Rahul Sharma",
    meetingOwner: "Riya Verma",
    status: "Completed",
    createdDate: "10 Apr 2024"
  },
  {
    meetingTitle: "Initial Health Assessment",
    from: "18 Apr 2024, 10:00 AM",
    to: "18 Apr 2024, 10:45 AM",
    contactName: "Sneha Patel",
    meetingOwner: "Amit Joshi",
    status: "Upcoming",
    createdDate: "12 Apr 2024"
  },
  {
    meetingTitle: "Diet Plan Review",
    from: "20 Apr 2024, 3:00 PM",
    to: "20 Apr 2024, 3:30 PM",
    contactName: "Ankit Mehra",
    meetingOwner: "Riya Verma",
    status: "Overdue",
    createdDate: "15 Apr 2024"
  },
  {
    meetingTitle: "Fitness Consultation",
    from: "22 Apr 2024, 2:00 PM",
    to: "22 Apr 2024, 2:45 PM",
    contactName: "Pooja Nair",
    meetingOwner: "Amit Joshi",
    status: "Upcoming",
    createdDate: "17 Apr 2024"
  }
]



const MeetingsView = () => {
    const tabs = [
        { id: "tab1", component: <DataTableDemo data={data} columns={columns} title="Meetings"></DataTableDemo> },
        { id: "tab2", component: <CalenderView></CalenderView> },
    ];

    const [activeTab, setActiveTab] = useState("tab1");
    return (
        <> <TableHeaderControls title="Meetings" activeTab={activeTab} setActiveTab={setActiveTab}></TableHeaderControls>

        

            <div >
                {tabs.find((tab) => tab.id === activeTab)?.component}
            </div>
        </>

    )
}

export default MeetingsView



















































