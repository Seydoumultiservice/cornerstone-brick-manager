
import { Briefcase, ClipboardList, LayoutDashboard, Package, Settings, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items pour la navigation principale
const mainMenuItems = [
  {
    title: "Tableau de bord",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Commandes",
    url: "/commandes",
    icon: ClipboardList,
  },
  {
    title: "Production",
    url: "/production",
    icon: Package,
  },
  {
    title: "Comptabilité",
    url: "/comptabilite",
    icon: Briefcase,
  },
];

// Menu items pour les paramètres
const settingsMenuItems = [
  {
    title: "Utilisateurs",
    url: "/utilisateurs",
    icon: Users,
  },
  {
    title: "Paramètres",
    url: "/parametres",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            CB
          </div>
          <div className="font-semibold text-lg flex flex-col">
            <span>Cornerstone</span>
            <span className="-mt-1 text-sm text-slate">Briques</span>
          </div>
        </div>
        <SidebarTrigger className="absolute right-2 top-4 md:hidden" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-medium text-sm">AS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin Système</span>
            <span className="text-xs text-muted-foreground">admin@cornerstonebriques.tg</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
