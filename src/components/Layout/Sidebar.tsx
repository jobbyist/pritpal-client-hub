import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  FileText,
  Calendar,
  CreditCard,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo.png";

const AppSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Cases", url: "/cases", icon: FileText },
    { title: "Documents", url: "/documents", icon: FileText },
    { title: "Calendar", url: "/calendar", icon: Calendar },
    { title: "Messages", url: "/messages", icon: MessageSquare },
    { title: "Billing", url: "/billing", icon: CreditCard },
  ];

  const accountItems = [
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Help", url: "/help", icon: HelpCircle },
  ];

  const isActive = (path: string) => currentPath === path;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${
        isCollapsed ? "w-14" : "w-60"
      } border-r border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300`}
    >
      {!isCollapsed && (
        <div className="p-4 border-b border-border/50">
          <img 
            src={logo} 
            alt="Law Offices of Pritpal Singh" 
            className="h-8 w-auto"
          />
        </div>
      )}

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-2">
          <SidebarMenuButton asChild>
            <button 
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
              onClick={() => console.log("Logout")}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;