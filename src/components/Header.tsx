import { useState } from "react";


const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">CEVICHERÍA</div>

      <nav className={`nav ${open ? "open" : ""}`}>
        <a href="#inicio">Inicio</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#carta">Carta</a>
        <a href="#promociones">Promociones</a>
        <a href="#contacto">Contacto</a>
        <div className="nav-redes">
          <a href="https://facebook.com/" target="_blank" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="https://youtube.com/" target="_blank" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          <a href="https://instagram.com/" target="_blank" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://tiktok.com/" target="_blank" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
        </div>
      </nav>

      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
      </div>
      <a className="btn-acceso" href="/login">Ingresar al Club</a>
    </header>
  );
};

export default Header;
