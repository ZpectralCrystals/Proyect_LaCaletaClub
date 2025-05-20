import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import Inicio from "../pages/Inicio/Inicio";
import Menu from "../pages/Menu/Menu";
import Blog from "../pages/Blog/Blog";
import Contacto from "../pages/Contacto/Contacto";
import Recomendaciones from "../pages/Recomendaciones/Recomendaciones";
import Carrito from "../pages/Carrito/Carrito";
import Paginas from "../pages/Paginas/Paginas";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

// Páginas administrativas (privadas)
import Category from "../pagesAdmin/Category/Category";
import Discounts from "../pagesAdmin/Discounts/Discounts";
import Products from "../pagesAdmin/Products/Products";

// Layouts
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// Popups
import Popup from "@/components/Popup/Popup";

export function Router() {
    return (
        <BrowserRouter>
            <div className="pt-24 bg-white min-h-screen">
                <Popup/>
                <ScrollToTop />
                <Navbar />
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Inicio />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/recomendaciones" element={<Recomendaciones />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/paginas" element={<Paginas />} />
                    <Route path="/admin/categorias" element={<Category />} />
                    <Route path="/admin/productos" element={<Products />} />
                    <Route path="/admin/promociones" element={<Discounts />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default Router;
