import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popup from "./components/Popup/Popup";
import Navbar from "./components/Navbar/Navbar";
import Inicio from './pages/Inicio/Inicio.js';
import Menu from './pages/Menu/Menu';
import Paginas from './pages/Paginas/Paginas';
import Blog from './pages/Blog/Blog';
import Recomendaciones from './pages/Recomendaciones/Recomendaciones';
import Contacto from './pages/Contacto/Contacto';
import Carrito from './pages/Carrito/Carrito';
import Footer from './components/Footer/Footer';


const App: React.FC = () => {
  return (
    <div className="App">
      
      <Popup />
      
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/paginas" element={<Paginas />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
    
    <Footer />
    </div>
  );
};

export default App;
