"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Users,
  ChevronDown,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { Client } from "../../../types/business";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../ui/avatar";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Search, label: "Analysis", path: "/dashboard/analysis" },
  { icon: Sparkles, label: "Planning", path: "/dashboard/planning" },
  { icon: FileText, label: "Content", path: "/dashboard/content" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

interface AppSidebarProps {
  clients: Client[];
  currentClient: Client | null;
  onClientChange: (client: Client) => void;
  isAgency?: boolean;
}

const AppSidebar = ({ clients, currentClient, onClientChange, isAgency = true }: AppSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">ContentAI</h1>
              <p className="text-xs text-muted-foreground">Content Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Client Switcher (Agency only) */}
      {isAgency && currentClient && !isCollapsed && (
        <div className="p-4 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    {currentClient.companyName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground truncate">{currentClient.companyName}</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {clients.map((client) => (
                <DropdownMenuItem
                  key={client.id}
                  onClick={() => onClientChange(client)}
                  className={cn(
                    "flex items-center gap-3 cursor-pointer",
                    client.id === currentClient.id && "bg-primary/10"
                  )}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                      {client.companyName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{client.companyName}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => router.push("/onboarding")}
                className="flex items-center gap-3 cursor-pointer text-primary"
              >
                <Users className="w-4 h-4" />
                <span>Add New Client</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || 
            (item.path === "/dashboard" && pathname === "/dashboard");
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
