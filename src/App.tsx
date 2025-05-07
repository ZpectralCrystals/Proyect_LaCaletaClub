import Header from "./components/Header";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Carta from "./components/Carta";
import Promociones from "./components/Promociones";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import "./styles.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Nosotros />
        <Carta />
        <Promociones />
        <Contacto />
        <Footer />
      </main>
      
    </>
  );
}
export default App;
