"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = Router;
var react_router_dom_1 = require("react-router-dom");
// Páginas públicas
var Inicio_1 = require("../pages/Inicio/Inicio");
var Menu_1 = require("../pages/Menu/Menu");
var Blog_1 = require("../pages/Blog/Blog");
var Contacto_1 = require("../pages/Contacto/Contacto");
var Recomendaciones_1 = require("../pages/Recomendaciones/Recomendaciones");
var Carrito_1 = require("../pages/Carrito/Carrito");
var Paginas_1 = require("../pages/Paginas/Paginas");
// Páginas administrativas (privadas)
var Category_1 = require("../pagesAdmin/Category/Category");
var Discounts_1 = require("../pagesAdmin/Discounts/Discounts");
var Products_1 = require("../pagesAdmin/Products/Products");
// Layouts
var Navbar_1 = require("../components/Navbar/Navbar");
var Footer_1 = require("../components/Footer/Footer");
function Router() {
    return (<react_router_dom_1.BrowserRouter>
            <div className="pt-24 bg-white min-h-screen">
                <Navbar_1.default />

                <react_router_dom_1.Routes>
                    {/* Rutas públicas */}
                    <react_router_dom_1.Route path="/" element={<Inicio_1.default />}/>
                    <react_router_dom_1.Route path="/menu" element={<Menu_1.default />}/>
                    <react_router_dom_1.Route path="/blog" element={<Blog_1.default />}/>
                    <react_router_dom_1.Route path="/contacto" element={<Contacto_1.default />}/>
                    <react_router_dom_1.Route path="/recomendaciones" element={<Recomendaciones_1.default />}/>
                    <react_router_dom_1.Route path="/carrito" element={<Carrito_1.default />}/>
                    <react_router_dom_1.Route path="/paginas" element={<Paginas_1.default />}/>
                    <react_router_dom_1.Route path="/admin/categorias" element={<Category_1.default />}/>
                    <react_router_dom_1.Route path="/admin/productos" element={<Products_1.default />}/>
                    <react_router_dom_1.Route path="/admin/promociones" element={<Discounts_1.default />}/>
                </react_router_dom_1.Routes>

                <Footer_1.default />
            </div>
        </react_router_dom_1.BrowserRouter>);
}
;
exports.default = Router;
