import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Páginas públicas
import { Inicio, Blog, Contacto, Recomendaciones, Menu,Register ,Login } from "@/pages/pagesPublic";
import Carrito from "../pages/pagesUser/Carrito/Carrito";

// Páginas administrativas
import { Category, Discounts, Products, Profile, InicioAdmin, UsuariosAdmin, CommentsAdmin, RecomendacionesAdmin, ReportesAdmin } from "@/pages/pagesAdmin";

// Layout general
import Layout from "../components/Layout/Layout";
import LayoutAdmin from "../components/LayoutAdmin/LayoutAdmin";

// Rutas protegidas
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Login y registro
import AuthRoute from "@/components/ProtectedRoute/AuthRoute";
import ImagesCharge from "@/pages/pagesAdmin/ImagesCharge/ImagesCharge";
import CajaAdmin from "@/pages/pagesAdmin/Caja/Caja";
import Pedido from "@/pages/pagesAdmin/Pedido/Pedido";
import PedidoView from "@/pages/pagesAdmin/PedidoView/PedidoView";
import NoAutorizacion from "@/pages/pagesUser/NoAutorizacion/NoAutorizacion";
import Perfil from "@/pages/pagesUser/Perfil/Perfil";



export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Layout general */}
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/unauthorized" element={<NoAutorizacion />} />
          

          {/* Ruta protegida para usuarios logueados (sin importar el rol) */}
          <Route element={<AuthRoute />}>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/profile" element={<Perfil />} />
          </Route>
        </Route>

        {/* Rutas de administrador protegidas por roles 2,3,4,5 */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[2,3,4,5]}>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/" element={<InicioAdmin />} />
          <Route path="/admin/categorias" element={<Category />} />
          <Route path="/admin/productos" element={<Products />} />
          <Route path="/admin/promociones" element={<Discounts />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
          <Route path="/admin/comentarios" element={<CommentsAdmin />} />
          <Route path="/admin/recomendaciones" element={<RecomendacionesAdmin />} />
          <Route path="/admin/reportes" element={<ReportesAdmin />} />
          <Route path="/admin/carga-image" element={<ImagesCharge />} />
          <Route path="/admin/cobranza" element={<CajaAdmin />} />
          <Route path="/admin/pedidos" element={<Pedido />} />
          <Route path="/admin/ver-pedido" element={<PedidoView />} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
