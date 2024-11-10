"use client";
import {
  CircleDollarSign,
  Home,
  Inbox,
  Settings,
  User,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Sell",
    url: "/dashboard/sell",
    icon: CircleDollarSign,
  },
  {
    title: "Buy",
    url: "/dashboard/buy",
    icon: Wallet,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "dashboard/settings",
    icon: Settings,
  },
];

const AppSidebar = ({ user }) => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Card className="flex gap-2 p-2">
          {/* <User className="h-12 w-12 p-2 border rounded-full" /> */}
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="user-info">
            <h3 className="font-bold">{user?.username}</h3>
            <p className="text-xs text-gray-800">{user?.role}</p>
          </div>
        </Card>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;