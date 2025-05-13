"use client"
import React from 'react'
import { useState } from 'react'
import TableHeaderControls from './TableHeaderControls'
import { DataTableDemo } from "./DataTableDemo"
import KanbanView from "./KanbanView"
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
    id: string
    leadsName: string
    vendorName: string
    contactPerson: string
    email: string
    mobileNumber: string
    leadSource: string
    leadStage: string
    tags: string
    createdDate: string
  
  }




  export const kanbanData: TBoard = {
    columns: [
      {
        id: "column-1",
        cards: [
          {
            id: "card-1",
            description: "Interested in web development services.",
            name: "Sourav Rawat",
            email: "sourav.rawat@example.com",
            phone: "9876543210",
            company: "Acme Inc",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-2",
            description: "Looking for a custom mobile app.",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "9123456789",
            company: "Tech Solutions",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-3",
            description: "Needs SEO consultation.",
            name: "Arjun Mehta",
            email: "arjun.mehta@example.com",
            phone: "9012345678",
            company: "Digital Hive",
            hasNote: false,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-4",
            description: "Follow-up after product demo.",
            name: "Priya Verma",
            email: "priya.verma@example.com",
            phone: "9988776655",
            company: "TechNova",
            hasNote: true,
            actions: { chat: false, email: false, message: true, whatsapp: false },
          },
          {
            id: "card-5",
            description: "Interested in long-term contract.",
            name: "Ravi Singh",
            email: "ravi.singh@example.com",
            phone: "8888888888",
            company: "CloudCore",
            hasNote: true,
            actions: { chat: true, email: false, message: false, whatsapp: true },
          },
          {
            id: "card-6",
            description: "Asked for case studies.",
            name: "Sunita Kapoor",
            email: "sunita.kapoor@example.com",
            phone: "7777777777",
            company: "DevOrbit",
            hasNote: false,
            actions: { chat: true, email: true, message: false, whatsapp: false },
          },
          {
            id: "card-7",
            description: "Requested free trial access.",
            name: "Ajay Rathore",
            email: "ajay.rathore@example.com",
            phone: "6666666666",
            company: "DataZen",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-8",
            description: "Looking to migrate platforms.",
            name: "Neha Sinha",
            email: "neha.sinha@example.com",
            phone: "9555667788",
            company: "CodeCrush",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-9",
            description: "Needs integration with CRM.",
            name: "Raj Malhotra",
            email: "raj.malhotra@example.com",
            phone: "9321654789",
            company: "BizSync",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: false },
          },
          {
            id: "card-10",
            description: "Wants analytics dashboard.",
            name: "Ankita Shah",
            email: "ankita.shah@example.com",
            phone: "9812312345",
            company: "InsightPro",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
        ],
      },
      {
        id: "column-2",
        cards: [
          {
            id: "card-11",
            description: "Scheduled a demo call next week.",
            name: "Michael Brown",
            email: "michael.brown@example.com",
            phone: "9988776655",
            company: "GreenTech",
            hasNote: false,
            actions: { chat: true, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-12",
            description: "Requested pricing details.",
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "9090909090",
            company: "Innovate Labs",
            hasNote: true,
            actions: { chat: false, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-13",
            description: "Needs API documentation.",
            name: "Karan Bhatt",
            email: "karan.bhatt@example.com",
            phone: "9877654321",
            company: "StackFlow",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-14",
            description: "Asked for bulk pricing.",
            name: "Deepika Joshi",
            email: "deepika.joshi@example.com",
            phone: "9091234567",
            company: "FleetIQ",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-15",
            description: "Needs security audit.",
            name: "Naveen Rao",
            email: "naveen.rao@example.com",
            phone: "9012938475",
            company: "SecureHub",
            hasNote: false,
            actions: { chat: true, email: false, message: false, whatsapp: true },
          },
          {
            id: "card-16",
            description: "Wants feature comparison.",
            name: "Meera Sharma",
            email: "meera.sharma@example.com",
            phone: "9123456700",
            company: "SmartSoft",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: false },
          },
          {
            id: "card-17",
            description: "Requested white-labeling.",
            name: "Rahul Jain",
            email: "rahul.jain@example.com",
            phone: "9087654321",
            company: "WhitePeak",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-18",
            description: "Inquired about compliance.",
            name: "Shreya Patel",
            email: "shreya.patel@example.com",
            phone: "9876512345",
            company: "LawTech",
            hasNote: false,
            actions: { chat: true, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-19",
            description: "Needs onboarding help.",
            name: "Aman Kapoor",
            email: "aman.kapoor@example.com",
            phone: "9988223344",
            company: "StartNova",
            hasNote: true,
            actions: { chat: false, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-20",
            description: "Asking about customer support SLAs.",
            name: "Divya Nair",
            email: "divya.nair@example.com",
            phone: "9123098765",
            company: "HelpSpot",
            hasNote: true,
            actions: { chat: true, email: false, message: true, whatsapp: false },
          },
        ],
      },
      {
        id: "column-3",
        cards: [
          {
            id: "card-21",
            description: "Wants CRM sync with Gmail.",
            name: "Tanya Roy",
            email: "tanya.roy@example.com",
            phone: "9786543210",
            company: "LeadLink",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-22",
            description: "Evaluating multiple vendors.",
            name: "Devansh Tiwari",
            email: "devansh.tiwari@example.com",
            phone: "9087612345",
            company: "VendoMax",
            hasNote: true,
            actions: { chat: true, email: false, message: true, whatsapp: false },
          },
          {
            id: "card-23",
            description: "Preparing for board presentation.",
            name: "Sneha Iyer",
            email: "sneha.iyer@example.com",
            phone: "9870987654",
            company: "PitchPro",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-24",
            description: "Asked about custom UI.",
            name: "Kunal Das",
            email: "kunal.das@example.com",
            phone: "9345671234",
            company: "UXWiz",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-25",
            description: "Looking for demo recording.",
            name: "Anjali Bansal",
            email: "anjali.bansal@example.com",
            phone: "9876098765",
            company: "VidSpark",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-26",
            description: "Needs roadmap details.",
            name: "Kabir Sehgal",
            email: "kabir.sehgal@example.com",
            phone: "9870112233",
            company: "PathWay",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-27",
            description: "Looking to expand usage.",
            name: "Nikita Rao",
            email: "nikita.rao@example.com",
            phone: "9870981234",
            company: "ScaleUp",
            hasNote: false,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-28",
            description: "Inquired about mobile SDK.",
            name: "Manav Chugh",
            email: "manav.chugh@example.com",
            phone: "9765123890",
            company: "AppStack",
            hasNote: true,
            actions: { chat: false, email: false, message: false, whatsapp: true },
          },
          {
            id: "card-29",
            description: "Needs help with account recovery.",
            name: "Ritika Singh",
            email: "ritika.singh@example.com",
            phone: "9321456789",
            company: "SafeLogin",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-30",
            description: "Asking for AI automation support.",
            name: "Siddharth Bose",
            email: "siddharth.bose@example.com",
            phone: "9786512340",
            company: "AutoBotX",
            hasNote: false,
            actions: { chat: true, email: false, message: true, whatsapp: true },
          },
        ],
      },
      {
        id: "column-3",
        cards: [
          {
            id: "card-21",
            description: "Wants CRM sync with Gmail.",
            name: "Tanya Roy",
            email: "tanya.roy@example.com",
            phone: "9786543210",
            company: "LeadLink",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-22",
            description: "Evaluating multiple vendors.",
            name: "Devansh Tiwari",
            email: "devansh.tiwari@example.com",
            phone: "9087612345",
            company: "VendoMax",
            hasNote: true,
            actions: { chat: true, email: false, message: true, whatsapp: false },
          },
          {
            id: "card-23",
            description: "Preparing for board presentation.",
            name: "Sneha Iyer",
            email: "sneha.iyer@example.com",
            phone: "9870987654",
            company: "PitchPro",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-24",
            description: "Asked about custom UI.",
            name: "Kunal Das",
            email: "kunal.das@example.com",
            phone: "9345671234",
            company: "UXWiz",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-25",
            description: "Looking for demo recording.",
            name: "Anjali Bansal",
            email: "anjali.bansal@example.com",
            phone: "9876098765",
            company: "VidSpark",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-26",
            description: "Needs roadmap details.",
            name: "Kabir Sehgal",
            email: "kabir.sehgal@example.com",
            phone: "9870112233",
            company: "PathWay",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-27",
            description: "Looking to expand usage.",
            name: "Nikita Rao",
            email: "nikita.rao@example.com",
            phone: "9870981234",
            company: "ScaleUp",
            hasNote: false,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-28",
            description: "Inquired about mobile SDK.",
            name: "Manav Chugh",
            email: "manav.chugh@example.com",
            phone: "9765123890",
            company: "AppStack",
            hasNote: true,
            actions: { chat: false, email: false, message: false, whatsapp: true },
          },
          {
            id: "card-29",
            description: "Needs help with account recovery.",
            name: "Ritika Singh",
            email: "ritika.singh@example.com",
            phone: "9321456789",
            company: "SafeLogin",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-30",
            description: "Asking for AI automation support.",
            name: "Siddharth Bose",
            email: "siddharth.bose@example.com",
            phone: "9786512340",
            company: "AutoBotX",
            hasNote: false,
            actions: { chat: true, email: false, message: true, whatsapp: true },
          },
        ],
      },
      {
        id: "column-3",
        cards: [
          {
            id: "card-21",
            description: "Wants CRM sync with Gmail.",
            name: "Tanya Roy",
            email: "tanya.roy@example.com",
            phone: "9786543210",
            company: "LeadLink",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-22",
            description: "Evaluating multiple vendors.",
            name: "Devansh Tiwari",
            email: "devansh.tiwari@example.com",
            phone: "9087612345",
            company: "VendoMax",
            hasNote: true,
            actions: { chat: true, email: false, message: true, whatsapp: false },
          },
          {
            id: "card-23",
            description: "Preparing for board presentation.",
            name: "Sneha Iyer",
            email: "sneha.iyer@example.com",
            phone: "9870987654",
            company: "PitchPro",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-24",
            description: "Asked about custom UI.",
            name: "Kunal Das",
            email: "kunal.das@example.com",
            phone: "9345671234",
            company: "UXWiz",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-25",
            description: "Looking for demo recording.",
            name: "Anjali Bansal",
            email: "anjali.bansal@example.com",
            phone: "9876098765",
            company: "VidSpark",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-26",
            description: "Needs roadmap details.",
            name: "Kabir Sehgal",
            email: "kabir.sehgal@example.com",
            phone: "9870112233",
            company: "PathWay",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-27",
            description: "Looking to expand usage.",
            name: "Nikita Rao",
            email: "nikita.rao@example.com",
            phone: "9870981234",
            company: "ScaleUp",
            hasNote: false,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-28",
            description: "Inquired about mobile SDK.",
            name: "Manav Chugh",
            email: "manav.chugh@example.com",
            phone: "9765123890",
            company: "AppStack",
            hasNote: true,
            actions: { chat: false, email: false, message: false, whatsapp: true },
          },
          {
            id: "card-29",
            description: "Needs help with account recovery.",
            name: "Ritika Singh",
            email: "ritika.singh@example.com",
            phone: "9321456789",
            company: "SafeLogin",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-30",
            description: "Asking for AI automation support.",
            name: "Siddharth Bose",
            email: "siddharth.bose@example.com",
            phone: "9786512340",
            company: "AutoBotX",
            hasNote: false,
            actions: { chat: true, email: false, message: true, whatsapp: true },
          },
        ],
      },
      {
        id: "column-3",
        cards: [
          {
            id: "card-21",
            description: "Wants CRM sync with Gmail.",
            name: "Tanya Roy",
            email: "tanya.roy@example.com",
            phone: "9786543210",
            company: "LeadLink",
            hasNote: false,
            actions: { chat: false, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-22",
            description: "Evaluating multiple vendors.",
            name: "Devansh Tiwari",
            email: "devansh.tiwari@example.com",
            phone: "9087612345",
            company: "VendoMax",
            hasNote: true,
            actions: { chat: true, email: false, message: true, whatsapp: false },
          },
          {
            id: "card-23",
            description: "Preparing for board presentation.",
            name: "Sneha Iyer",
            email: "sneha.iyer@example.com",
            phone: "9870987654",
            company: "PitchPro",
            hasNote: true,
            actions: { chat: true, email: true, message: false, whatsapp: true },
          },
          {
            id: "card-24",
            description: "Asked about custom UI.",
            name: "Kunal Das",
            email: "kunal.das@example.com",
            phone: "9345671234",
            company: "UXWiz",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-25",
            description: "Looking for demo recording.",
            name: "Anjali Bansal",
            email: "anjali.bansal@example.com",
            phone: "9876098765",
            company: "VidSpark",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-26",
            description: "Needs roadmap details.",
            name: "Kabir Sehgal",
            email: "kabir.sehgal@example.com",
            phone: "9870112233",
            company: "PathWay",
            hasNote: false,
            actions: { chat: false, email: false, message: true, whatsapp: true },
          },
          {
            id: "card-27",
            description: "Looking to expand usage.",
            name: "Nikita Rao",
            email: "nikita.rao@example.com",
            phone: "9870981234",
            company: "ScaleUp",
            hasNote: false,
            actions: { chat: true, email: true, message: true, whatsapp: false },
          },
          {
            id: "card-28",
            description: "Inquired about mobile SDK.",
            name: "Manav Chugh",
            email: "manav.chugh@example.com",
            phone: "9765123890",
            company: "AppStack",
            hasNote: true,
            actions: { chat: false, email: false, message: false, whatsapp: true },
          },
          {
            id: "card-29",
            description: "Needs help with account recovery.",
            name: "Ritika Singh",
            email: "ritika.singh@example.com",
            phone: "9321456789",
            company: "SafeLogin",
            hasNote: true,
            actions: { chat: true, email: true, message: true, whatsapp: true },
          },
          {
            id: "card-30",
            description: "Asking for AI automation support.",
            name: "Siddharth Bose",
            email: "siddharth.bose@example.com",
            phone: "9786512340",
            company: "AutoBotX",
            hasNote: false,
            actions: { chat: true, email: false, message: true, whatsapp: true },
          },
        ],
      },
      

    ],
  };
  
   
  
  
  
  import {
    ColumnDef,
  } from "@tanstack/react-table"
import { TBoard } from '@/shared/data'
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
      enableHiding: false,
    },
    {
      accessorKey: "leadsName",
      header: "Leads Name",
      cell: ({ row }) => <div>{row.getValue("leadsName")}</div>,
    },
    {
      accessorKey: "vendorName",
      header: "Vendor Name",
      cell: ({ row }) => <div>{row.getValue("vendorName")}</div>,
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
      cell: ({ row }) => <div>{row.getValue("contactPerson")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "mobileNumber",
      header: "Mobile Number",
      cell: ({ row }) => <div>{row.getValue("mobileNumber")}</div>,
    },
    {
      accessorKey: "leadSource",
      header: "Lead Source",
      cell: ({ row }) => <div>{row.getValue("leadSource")}</div>,
    },
    {
      accessorKey: "leadStage",
      header: "Lead Stage",
      cell: ({ row }) => <div >
        <Progress className="mb-2" value={33} />
  
        {row.getValue("leadStage")}</div>,
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => <div className="py-[4px] px-[10px] font-semibold text-xs bg-[#F0FDF4] text-[#16A34A] rounded-full flex justify-center w-[51px] items-center">{row.getValue("tags")}</div>,
    },
    {
      accessorKey: "createdDate",
      header: "Created Date",
      cell: ({ row }) => <div>{row.getValue("createdDate")}</div>,
    },
  
  
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
  
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
                Edit Lead
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Lead
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4 " />
                Delete Lead
              </DropdownMenuItem>
  
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ]

const data: Headings[] = [
  {
    id: "m5gr84i9",
    leadsName: "John Doe (Sample)",
    vendorName: "Acme Corp",
    contactPerson: "Ronald Richards",
    email: "john@acme.com",
    mobileNumber: "09234567890",
    leadSource: "Advertisement",
    leadStage: "Initial stage",
    tags: "Tag 1",
    createdDate: "22 Oct, 2020",

  },
  {
    id: "3u1reuv4",
    leadsName: "Jane Smith",
    vendorName: "TechNova",
    contactPerson: "Lisa Ray",
    email: "Abe45@example.com",
    mobileNumber: "09123456789",
    leadSource: "Referral",
    leadStage: "Contacted",
    tags: "Tag 2",
    createdDate: "10 Jan, 2021",

  },
  {
    id: "derv1ws0",
    leadsName: "Tom Hanks",
    vendorName: "GreenWorld",
    contactPerson: "Michael Chen",
    email: "Monserrat44@example.com",
    mobileNumber: "09876543210",
    leadSource: "Website",
    leadStage: "Qualified",
    tags: "Tag 3",
    createdDate: "15 Mar, 2021",

  },
  {
    id: "5kma53ae",
    leadsName: "Emma Watson",
    vendorName: "SmartLine",
    contactPerson: "Raj Patel",
    email: "Silas22@example.com",
    mobileNumber: "09765432100",
    leadSource: "Social Media",
    leadStage: "Proposal Sent",
    tags: "Tag 4",
    createdDate: "01 May, 2021",

  },
  {
    id: "bhqecj4p",
    leadsName: "Mark Taylor",
    vendorName: "EcoWave",
    contactPerson: "Angela Lee",
    email: "carmella@example.com",
    mobileNumber: "09654321098",
    leadSource: "Event",
    leadStage: "Lost",
    tags: "Tag 5",
    createdDate: "28 Jul, 2021",

  },
  {
    id: "m5gr84i9",
    leadsName: "John Doe (Sample)",
    vendorName: "Acme Corp",
    contactPerson: "Ronald Richards",
    email: "john@acme.com",
    mobileNumber: "09234567890",
    leadSource: "Advertisement",
    leadStage: "Initial stage",
    tags: "Tag 1",
    createdDate: "22 Oct, 2020",

  },
  {
    id: "3u1reuv4",
    leadsName: "Jane Smith",
    vendorName: "TechNova",
    contactPerson: "Lisa Ray",
    email: "Abe45@example.com",
    mobileNumber: "09123456789",
    leadSource: "Referral",
    leadStage: "Contacted",
    tags: "Tag 2",
    createdDate: "10 Jan, 2021",

  },
  {
    id: "derv1ws0",
    leadsName: "Tom Hanks",
    vendorName: "GreenWorld",
    contactPerson: "Michael Chen",
    email: "Monserrat44@example.com",
    mobileNumber: "09876543210",
    leadSource: "Website",
    leadStage: "Qualified",
    tags: "Tag 3",
    createdDate: "15 Mar, 2021",

  },
  {
    id: "5kma53ae",
    leadsName: "Emma Watson",
    vendorName: "SmartLine",
    contactPerson: "Raj Patel",
    email: "Silas22@example.com",
    mobileNumber: "09765432100",
    leadSource: "Social Media",
    leadStage: "Proposal Sent",
    tags: "Tag 4",
    createdDate: "01 May, 2021",

  },
  {
    id: "bhqecj4p",
    leadsName: "Mark Taylor",
    vendorName: "EcoWave",
    contactPerson: "Angela Lee",
    email: "carmella@example.com",
    mobileNumber: "09654321098",
    leadSource: "Event",
    leadStage: "Lost",
    tags: "Tag 5",
    createdDate: "28 Jul, 2021",

  },
  {
    id: "m5gr84i9",
    leadsName: "John Doe (Sample)",
    vendorName: "Acme Corp",
    contactPerson: "Ronald Richards",
    email: "john@acme.com",
    mobileNumber: "09234567890",
    leadSource: "Advertisement",
    leadStage: "Initial stage",
    tags: "Tag 1",
    createdDate: "22 Oct, 2020",

  },
  {
    id: "3u1reuv4",
    leadsName: "Jane Smith",
    vendorName: "TechNova",
    contactPerson: "Lisa Ray",
    email: "Abe45@example.com",
    mobileNumber: "09123456789",
    leadSource: "Referral",
    leadStage: "Contacted",
    tags: "Tag 2",
    createdDate: "10 Jan, 2021",

  },
  {
    id: "derv1ws0",
    leadsName: "Tom Hanks",
    vendorName: "GreenWorld",
    contactPerson: "Michael Chen",
    email: "Monserrat44@example.com",
    mobileNumber: "09876543210",
    leadSource: "Website",
    leadStage: "Qualified",
    tags: "Tag 3",
    createdDate: "15 Mar, 2021",

  },
  {
    id: "5kma53ae",
    leadsName: "Emma Watson",
    vendorName: "SmartLine",
    contactPerson: "Raj Patel",
    email: "Silas22@example.com",
    mobileNumber: "09765432100",
    leadSource: "Social Media",
    leadStage: "Proposal Sent",
    tags: "Tag 4",
    createdDate: "01 May, 2021",

  },
  {
    id: "bhqecj4p",
    leadsName: "Mark Taylor",
    vendorName: "EcoWave",
    contactPerson: "Angela Lee",
    email: "carmella@example.com",
    mobileNumber: "09654321098",
    leadSource: "Event",
    leadStage: "Lost",
    tags: "Tag 5",
    createdDate: "28 Jul, 2021",

  },
  {
    id: "m5gr84i9",
    leadsName: "John Doe (Sample)",
    vendorName: "Acme Corp",
    contactPerson: "Ronald Richards",
    email: "john@acme.com",
    mobileNumber: "09234567890",
    leadSource: "Advertisement",
    leadStage: "Initial stage",
    tags: "Tag 1",
    createdDate: "22 Oct, 2020",

  },

]


const View = () => {
    const tabs = [
        { id: "tab1", component: <DataTableDemo data={data} columns={columns} title="Leads"></DataTableDemo> },
        { id: "tab2", component: <KanbanView data={kanbanData}></KanbanView> },
    ];

    const [activeTab, setActiveTab] = useState("tab1");
    return (
        <> <TableHeaderControls title="Leads" activeTab={activeTab} setActiveTab={setActiveTab}></TableHeaderControls>

        

            <div >
                {tabs.find((tab) => tab.id === activeTab)?.component}
            </div>
        </>

    )
}

export default View



















































