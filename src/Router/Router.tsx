import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Inicio from "../pages/pagesUser/Inicio/Inicio";
import Menu from "../pages/pagesUser/Menu/Menu";
import Blog from "../pages/pagesUser/Blog/Blog";
import Contacto from "../pages/pagesUser/Contacto/Contacto";
import Recomendaciones from "../pages/pagesUser/Recomendaciones/Recomendaciones";
import Carrito from "../pages/pagesUser/Carrito/Carrito";

// Páginas administrativas
import Category from "../pages/pagesAdmin/Category";
import Discounts from "../pages/pagesAdmin/Discounts/Discounts";
import Products from "../pages/pagesAdmin/Products/Products";
import Profile from "../pages/pagesAdmin/Profile/Profile";
import InicioAdmin from "../pages/pagesAdmin/Inicio/Inicio";
import UsuariosAdmin from "../pages/pagesAdmin/Users/User";
import CommentsAdmin from "../pages/pagesAdmin/Comments/Comments";
import RecomendacionesAdmin from "../pages/pagesAdmin/Recomendaciones/Recomendaciones";
import ReportesAdmin from "../pages/pagesAdmin/Reportes/Reportes";

// Layout general
import Layout from "../components/Layout/Layout";
import LayoutAdmin from "../components/LayoutAdmin/LayoutAdmin";

// Rutas protegidas
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Login y registro
import Login from "@/pages/pagesUser/Login/Login";
import Register from "@/pages/pagesUser/Register/Register";
import AuthRoute from "@/components/ProtectedRoute/AuthRoute";

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

          {/* Ruta protegida para usuarios logueados (sin importar el rol) */}
          <Route element={<AuthRoute />}>
            <Route path="/carrito" element={<Carrito />} />
          </Route>
        </Route>

        {/* Rutas de administrador protegidas por roles 3 y 4 */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[2, 3, 4]}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
