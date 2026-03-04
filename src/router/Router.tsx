import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🌐 Páginas públicas
import {  Inicio,  Blog,  Contacto,  Recomendaciones,  Menu,  Register,  Login,} from "@/pages/pagesPublic";
import Carrito from "@/pages/pagesUser/Carrito/Carrito";

// 🔒 Páginas protegidas y layouts
import AuthRoute from "@/components/ProtectedRoute/AuthRoute";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Layout from "@/components/Layout/Layout";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";

// 👤 Usuario logueado
import Perfil from "@/pages/pagesUser/Perfil/Perfil";
import NoAutorizacion from "@/pages/pagesUser/NoAutorizacion/NoAutorizacion";

// ⚙️ Páginas administrativas

import {
  Category,
  Discounts,
  Products,
  Profile,
  UsuariosAdmin,
  CommentsAdmin,
  RecomendacionesAdmin,
  ReportesAdmin,
} from "@/pages/pagesAdmin";
import DashboardAdmin from "@/components/DashboardAdmin/DashboardAdmin";

/**
 * 🚦 Sistema de rutas principal
 * - Usa React Router DOM
 * - Define rutas públicas, protegidas y administrativas
 */
export function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 Rutas públicas dentro del layout general */}
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<NoAutorizacion />} />

          {/* 🔐 Rutas protegidas para usuarios logueados */}
          <Route element={<AuthRoute />}>
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/profile" element={<Perfil />} />
          </Route>
        </Route>

        {/* 🔐 Rutas protegidas para roles administrativos: [2, 3, 4, 5] */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[2, 3, 4, 5]}>
              <LayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/categorias" element={<Category />} />
          <Route path="/admin/productos" element={<Products />} />
          <Route path="/admin/promociones" element={<Discounts />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
          <Route path="/admin/comentarios" element={<CommentsAdmin />} />
          <Route path="/admin/recomendaciones" element={<RecomendacionesAdmin />} />
          <Route path="/admin/reportes" element={<ReportesAdmin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
