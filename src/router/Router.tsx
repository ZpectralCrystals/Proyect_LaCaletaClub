import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Inicio from "../pages/Inicio/Inicio";
import Menu from "../pages/Menu/Menu";
import Blog from "../pages/Blog/Blog";
import Contacto from "../pages/Contacto/Contacto";
import Recomendaciones from "../pages/Recomendaciones/Recomendaciones";
import Carrito from "../pages/Carrito/Carrito";
import IniciarSesion from "@/pages/IniciarSesion/IniciarSesion";
import RegistrarUsuario from "@/pages/RegistrarUsuario/RegistrarUsuario";
// Páginas administrativas
import Category from "../pagesAdmin/Category/Category";
import Discounts from "../pagesAdmin/Discounts/Discounts";
import Products from "../pagesAdmin/Products/Products";
import Profile from "../pagesAdmin/Profile/Profile";
import InicioAdmin from "@/pagesAdmin/Inicio/Inicio";
import UsuariosAdmin from "@/pagesAdmin/Users/User";
import CommentsAdmin from "@/pagesAdmin/Comments/Comments";

// Layout general
import Layout from "@/components/Layout/Layout";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";


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
          <Route path="/carrito" element={<Carrito />} />
          
          
        </Route>

        <Route path="/iniciasesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<RegistrarUsuario />} />

        {/* Admin sin layout (o puedes crear otro layout de admin) */}
        <Route element={<LayoutAdmin />}>
          <Route path="/admin/" element={<InicioAdmin />} />
          <Route path="/admin/categorias" element={<Category />} />
          <Route path="/admin/productos" element={<Products />} />
          <Route path="/admin/promociones" element={<Discounts />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
          <Route path="/admin/comentarios" element={<CommentsAdmin />} />
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;