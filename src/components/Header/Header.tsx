import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightToBracket, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#101828] text-white flex justify-between items-center p-1 shadow-lg px-[160px]">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faPhone} /> Call: 888-654-3210
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row gap-2">
          <Link to="/iniciasesion">
            <FontAwesomeIcon icon={faRightToBracket} /> Inicia Sesión
          </Link>
          <p></p>
          <Link to="/registro">
            <FontAwesomeIcon icon={faRightToBracket} className="rotate-180" /> Regístrate
          </Link>
        </div>
        <div className="border-r border-[#101828] mx-3 my-[-15px]" />
        <div className="flex flex-row">
          <p>
            <FontAwesomeIcon icon={faCartShopping} /> (0) items in cart
          </p>
          <div className="border-r border-[#ffffff] mx-3" />
          <p>($0.00)</p>
        </div>
      </div>
    </header>
  );
}
