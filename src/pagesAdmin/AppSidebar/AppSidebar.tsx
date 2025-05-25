import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarProvider,
} from "../../components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Package, User, LogOut, Menu, Tags, List } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface SidebarContentBodyProps {
  onItemClick?: () => void;
}

function SidebarContentBody({ onItemClick }: SidebarContentBodyProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    toast.success("Sesión cerrada correctamente");
    navigate("/login");
    onItemClick?.();
  };

  return (
    <>
      <SidebarHeader className="px-4 py-6 text-lg font-bold text-center">
        Panel Admin
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs px-3 mb-2">
            Administración
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenuButton asChild>
              <Link
                to="/admin/productos"
                onClick={onItemClick}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <Package className="w-4 h-4" />
                <span>Productos</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link
                to="/admin/categorias"
                onClick={onItemClick}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <List className="w-4 h-4" />
                <span>Categorías</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link
                to="/admin/promociones"
                onClick={onItemClick}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <Tags className="w-4 h-4" />
                <span>Descuentos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs px-3 mb-2 mt-4">
            Cuenta
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenuButton asChild>
              <Link
                to="/profile"
                onClick={onItemClick}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Mi Perfil</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xs text-muted-foreground text-center p-4">
        © {new Date().getFullYear()} La Caleta Club
      </SidebarFooter>
    </>
  );
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider>
      {/* Mobile sidebar trigger */}
      <div className="flex lg:hidden border p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContentBody onItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar className="border-r shadow-sm min-h-screen w-64">
          <SidebarContentBody />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}