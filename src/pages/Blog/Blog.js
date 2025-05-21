"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Blog = function () {
    var _a = (0, react_1.useState)([]), blogs = _a[0], setBlogs = _a[1];
    (0, react_1.useEffect)(function () {
        // Datos simulados
        var data = [
            {
                id: 1,
                titulo: "Los secretos del ceviche perfecto",
                descripcion: "Aprende a preparar un ceviche tradicional con tips de los chefs de CevicheClub.",
                fecha: "15 mayo 2025",
                autor: "Chef Luis",
                imagen: "/blog-recent.jpg",
            },
            {
                id: 2,
                titulo: "¿Por qué el ají limo es tan importante?",
                descripcion: "Descubre el ingrediente estrella que marca la diferencia en un buen ceviche.",
                fecha: "10 mayo 2025",
                autor: "Chef Ana",
                imagen: "/blog-recent2.jpg",
            },
        ];
        setBlogs(data);
    }, []);
    return (<main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-12 text-center">Blog Cevichero</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {blogs.map(function (post) { return (<div key={post.id} className="flex flex-col md:flex-row bg-blue-50 rounded-xl shadow overflow-hidden">
              {/* Imagen */}
              <div className="md:w-1/2">
                <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover"/>
              </div>

              {/* Contenido */}
              <div className="p-5 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-sky-700">{post.titulo}</h2>
                  <p className="text-gray-700 text-sm mt-2">{post.descripcion}</p>
                </div>
                <ul className="text-xs text-blue-600 mt-4">
                  <li>📅 {post.fecha}</li>
                  <li>👨‍🍳 {post.autor}</li>
                </ul>
              </div>
            </div>); })}
        </div>
      </section>
    </main>);
};
exports.default = Blog;
