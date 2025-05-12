"use client"
import Image from "next/image"

import * as React from "react"
import {
  
  Users,
  ChartLine,
  Building2,
  LayoutList,
  ShoppingCart,
  Calendar,
  Settings,
  CircleUser,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
     
    },
    {
      title: "List",
      url: "/list",
      icon: LayoutList,
      items: [
        {
          title: "Leads",
          url: "/list/leads",
          icon: LayoutList,
        },
        {
          title: "Deals",
          url: "/list/deals",
          icon: LayoutList,
        },
        {
          title: "Sales",
          url: "/list/sales",
          icon: LayoutList,
        },
      ],
    },
    {
      title: "Contacts",
      url: "#",
      icon: Users,
      
    },
    {
      title: "Vendors",
      url: "#",
      icon: Building2,
     
    },
    {
      title: "Products & Services",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Meetings",
      url: "#",
      icon: Calendar,
     
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
      
    },
    {
      title: "User Management",
      url: "#",
      icon: CircleUser,
      items: [
        {
          title: "All Users",
          url: "/user-management/all-users",
        },
        {
          title: "Roles & Permissions",
          url: "/user-management/roles-and-permissions",
        },
        
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
   
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      
      <SidebarHeader>
      <Image
      src="/Logo.svg"
      width={102.4}
      height={32}
      alt="Logo"
      
    />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
