"use client"

import React, { useState } from "react"
import { DataTableDemo } from "../../../components/DataTableDemo"
import {
  Pencil,
  Trash,
  MoreHorizontal,
  Copy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

import { ColumnDef } from "@tanstack/react-table"

export type Headings = {
  username: string
  createdDate: string
}

const initialData: Headings[] = [
  {
    username: "john_doe",
    createdDate: "2024-12-01"
  },
  {
    username: "jane_smith",
    
    createdDate: "2025-01-15",
  },
  {
    username: "rahul_verma",
    
    createdDate: "2025-03-10",
  },
  {
    username: "anita_kumar",
    
    createdDate: "2025-04-05",
  },
  {
    username: "mike_ross",
    
    createdDate: "2025-02-20",
  },
]

const Page = () => {
  const [data, setData] = useState<Headings[]>(initialData)
  const [userToDelete, setUserToDelete] = useState<Headings | null>(null)

  const handleDelete = () => {
    if (userToDelete) {
      setData(prev => prev.filter(user => user.username !== userToDelete.username))
      setUserToDelete(null)
    }
  }

  const columns: ColumnDef<Headings>[] = [
    {
      accessorKey: "username",
      header: "User Name",
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
   
    {
      accessorKey: "createdDate",
      header: "Created Date",
      cell: ({ row }) => <div>{row.getValue("createdDate")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
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
              Edit Role
            </DropdownMenuItem>
              <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Role
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserToDelete(row.original)}>
              <Trash className="mr-2 h-4 w-4" />
              Remove Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div>
      <DataTableDemo data={data} columns={columns} title="Role" />

      <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove User</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to permanently remove this user? This will revoke their CRM
            access and unlink their meetings and records. Data created by the user (like leads or
            emails) will remain.
          </DialogDescription>
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-green-800 rounded"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleDelete}
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Remove User
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Page
