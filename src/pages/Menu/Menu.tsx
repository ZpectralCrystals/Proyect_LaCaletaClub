import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

interface Producto {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string; 
}

interface Categoria {
  id: string;
  descripcion: string;
}

const Menu = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: categoriasData } = await supabase.from("categoriatab").select("*");
      const { data: productosData } = await supabase.from("productostab").select("*");

      if (categoriasData && productosData) {
        setCategorias(categoriasData);
        setProductos(productosData);
        setCategoriaActiva(categoriasData[0]?.id); 
      }
    };

    fetchData();
  }, []);

  const productosFiltrados = productos.filter((p) => p.type === categoriaActiva);

  return (
    <main className="bg-white min-h-screen py-16 px-6">
      <section className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-sky-800 mb-4">Nuestro Menú</h1>
        <p className="text-gray-600 mb-10">Elige una categoría para explorar nuestros platos</p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-5 py-2 rounded-full border font-semibold transition-all ${
                categoriaActiva === cat.id
                  ? "bg-sky-700 text-white"
                  : "bg-white border-sky-300 text-sky-700 hover:bg-sky-100"
              }`}
            >
              {cat.descripcion}
            </button>
          ))}
        </div>

        {/* Animación de contenido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={categoriaActiva}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 text-left"
          >
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-blue-50 p-6 rounded-xl shadow-md border-l-4 border-sky-700"
              >
                <h2 className="text-xl font-bold text-sky-800">{producto.name}</h2>
                <p className="text-gray-700 mt-2">{producto.description}</p>
                <p className="text-sky-600 font-semibold mt-4 text-lg">S/ {producto.price}</p>
                {producto.image && (
                  <img src={producto.image} alt={producto.name} className="mt-4 rounded-md" />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Menu;

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faHotdog,
//   faBurger,
//   faUtensils,
//   faCheese,
//   faWineGlassEmpty,
//   faIceCream,
//   faBookmark,
//   faCertificate,
// } from '@fortawesome/free-solid-svg-icons';

// const Menu: React.FC = () => {
//   return (
//     <main className="bg-sky-50 pt-24">

//       {/* Íconos de categorías */}
//       <div className="flex py-12 justify-center">
//         <ul className="flex flex-wrap justify-center gap-8">
//           {[
//             { icon: faHotdog, label: 'Desayuno' },
//             { icon: faBurger, label: 'Almuerzo' },
//             { icon: faUtensils, label: 'Cena' },
//             { icon: faCheese, label: 'Postres' },
//             { icon: faWineGlassEmpty, label: 'Bebidas' },
//             { icon: faIceCream, label: 'Helados' },
//           ].map((item, index) => (
//             <li key={index} className="text-center relative group">
//               <div className="text-xl text-sky-600 group-hover:text-sky-800 relative z-10">
//                 <FontAwesomeIcon icon={item.icon} />
//               </div>
//               <div className="text-base font-medium text-sky-900 group-hover:text-sky-800 border-b border-sky-200 py-2 relative z-10">
//                 {item.label}
//               </div>
//               <div className="absolute left-0 right-0 bottom-[-30px] text-sky-400 group-hover:text-sky-800 group-hover:translate-y-[20px] transition-transform duration-300 ease-in-out z-0">
//                 <FontAwesomeIcon icon={faBookmark} style={{ width: '100%', height: '60px' }} />
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Lista de platos (ejemplo estático) */}
//       <div className="flex flex-col mx-auto py-12 w-[90%] max-w-6xl">
//         <h2 className="text-2xl font-bold text-sky-800 border-b border-sky-300 pb-2 mb-6">
//           Almuerzo
//         </h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           {[1, 2, 3, 4].map((item) => (
//             <div key={item} className="flex gap-4 group">
//               <div className="relative w-32 h-32">
//                 <span className="absolute top-4 left-0 z-0 w-full h-full rotate-6 bg-sky-100 rounded-lg shadow-inner"></span>
//                 <img
//                   src="/menu.jpg"
//                   alt="Plato"
//                   className="relative z-10 w-full h-full object-cover rounded-lg border border-sky-200 p-1"
//                 />
//               </div>
//               <div className="flex-1">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-sky-800 font-semibold text-lg group-hover:text-sky-900">
//                     Ceviche Mixto Especial
//                   </h3>
//                   <div className="relative">
//                     <FontAwesomeIcon
//                       icon={faCertificate}
//                       className="text-sky-600 group-hover:text-sky-800"
//                       style={{ width: '50px', height: '50px' }}
//                     />
//                     <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
//                       34.00
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 text-sm">
//                   Mariscos frescos, ají limo y crema especial La Caleta.
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Menu;
