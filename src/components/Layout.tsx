
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <footer className="p-4 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Cornerstone Briques - Tous droits réservés
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
