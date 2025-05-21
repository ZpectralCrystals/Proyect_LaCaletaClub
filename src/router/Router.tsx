import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Inicio from "../pages/Inicio/Inicio";
import Menu from "../pages/Menu/Menu";
import Blog from "../pages/Blog/Blog";
import Contacto from "../pages/Contacto/Contacto";
import Recomendaciones from "../pages/Recomendaciones/Recomendaciones";
import Carrito from "../pages/Carrito/Carrito";
import Paginas from "../pages/Paginas/Paginas";

// Páginas administrativas
import Category from "../pagesAdmin/Category/Category";
import Discounts from "../pagesAdmin/Discounts/Discounts";
import Products from "../pagesAdmin/Products/Products";

// Layout general
import Layout from "@/components/Layout/Layout";

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
          <Route path="/paginas" element={<Paginas />} />
        </Route>

        {/* Admin sin layout (o puedes crear otro layout de admin) */}
        <Route path="/admin/categorias" element={<Category />} />
        <Route path="/admin/productos" element={<Products />} />
        <Route path="/admin/promociones" element={<Discounts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;