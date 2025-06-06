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
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Package,
  User,
  LogOut,
  Menu,
  Tags,
  List,
  User2,
  MessageCircle,
  Blinds,
  Library,
  BellElectric,
  ClipboardPen,
  HardDriveUpload,
  BadgeCheck,
  SquareMenu,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface SidebarContentBodyProps {
  onItemClick?: () => void;
}

function SidebarContentBody({ onItemClick }: SidebarContentBodyProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  // ✅ Evita que el componente se renderice si no hay usuario
  if (!user) return null;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error al cerrar sesión");
      return;
    }

    toast.success("Sesión cerrada correctamente");
    window.location.href = "/";
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
              <Link to="/admin/" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <SquareMenu className="w-4 h-4" />
                <span>Inicio</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link to="/admin/productos" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <Package className="w-4 h-4" />
                <span>Productos</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link to="/admin/categorias" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <List className="w-4 h-4" />
                <span>Categorías</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link to="/admin/promociones" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <Tags className="w-4 h-4" />
                <span>Promociones</span>
              </Link>
            </SidebarMenuButton>

            {[2].includes(user.role) && (
              <SidebarMenuButton asChild>
                <Link to="/admin/usuarios" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <User2 className="w-4 h-4" />
                  <span>Usuarios</span>
                </Link>
              </SidebarMenuButton>
            )}

            <SidebarMenuButton asChild>
              <Link to="/admin/comentarios" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Comentarios</span>
              </Link>
            </SidebarMenuButton>

            {[2].includes(user.role) && (
              <SidebarMenuButton asChild>
                <Link to="/admin/recomendaciones" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <Library className="w-4 h-4" />
                  <span>Recomendaciones</span>
                </Link>
              </SidebarMenuButton>
            )}

            {[2].includes(user.role) && (
              <SidebarMenuButton asChild>
                <Link to="/admin/puntos" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <HardDriveUpload className="w-4 h-4" />
                  <span>Puntos</span>
                </Link>
              </SidebarMenuButton>
            )}

            {[2, 3].includes(user.role) && (
              <SidebarMenuButton asChild>
                <Link to="/admin/cobranza" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Caja</span>
                </Link>
              </SidebarMenuButton>
            )}

            {[2, 4].includes(user.role) && (
              <SidebarMenuButton asChild>
                <Link to="/admin/pedidos" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <ClipboardPen className="w-4 h-4" />
                  <span>Pedidos</span>
                </Link>
              </SidebarMenuButton>
            )}

            {[2, 5].includes(user.role) && (
              <SidebarMenuButton asChild>
                <Link to="/admin/ver-pedido" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                  <BellElectric className="w-4 h-4" />
                  <span>Ver Pedido</span>
                </Link>
              </SidebarMenuButton>
            )}

            <SidebarMenuButton asChild>
              <Link to="/admin/reportes" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <Blinds className="w-4 h-4" />
                <span>Reportes</span>
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
              <Link to="admin/profile" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <User className="w-4 h-4" />
                <span>Mi Perfil</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <Link to="/" onClick={onItemClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors">
                <Eye className="w-4 h-4" />
                <span>Ver Página Web</span>
              </Link>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors">
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

export default AppSidebar;
