import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { RootState } from '../../store';

import { setUser } from '../../store/authSlice';
import { supabase } from '../../lib/supabaseClient';
import CartListSide from '../CartListSide/CartListSide';




export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const products = useSelector((state: RootState) => state.cart.products); // asumiendo que tienes carrito en redux

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(setUser(null));
    navigate('/');
  };

  const totalQuantity = products.reduce((acc, prod) => acc + prod.quantity, 0);
  const totalPrice = products.reduce((acc, prod) => acc + Number(prod.price) * prod.quantity, 0);

  return (
    <>
      <header className="bg-[#101828] text-white flex justify-between items-center p-1 shadow-lg px-[160px]">
        <div className="flex gap-2 items-center">
          {/* Logo aquí */}
        </div>
        <div className="flex flex-row items-center gap-4">
          {!user ? (
<<<<<<< HEAD
          <>
            <Link to="/login" className="flex items-center gap-1">
              <FontAwesomeIcon icon={faRightToBracket} /> Inicia Sesión
            </Link>
            <Link to="/register" className="flex items-center gap-1">
              <FontAwesomeIcon icon={faRightToBracket} className="rotate-180" /> Regístrate
            </Link>
          </>
        ) : (
          <>
            <p>
              Hola, {user.first_name} {user.last_name}
            </p>

            {/* Botón para admin */}
            {user.role === 2 && (
              <Link
                to="/admin/"
                className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faUserShield} /> Admin Panel
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-400 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión
            </button>
          </>
        )}
=======
            <>
              <Link to="/login" className="flex items-center gap-1">
                <FontAwesomeIcon icon={faRightToBracket} /> Inicia Sesión
              </Link>
              <Link to="/register" className="flex items-center gap-1">
                <FontAwesomeIcon icon={faRightToBracket} className="rotate-180" /> Regístrate
              </Link>
            </>
          ) : (
            <>
              <p>
                Hola, {user.first_name} {user.last_name}
              </p>

              {[2, 3, 4, 5].includes(user.role) && (
                <Link
                  to="/admin/"
                  className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FontAwesomeIcon icon={faUserShield} />
                  {user.role === 2 && "Admin Panel"}
                  {user.role === 3 && "Cajero Panel"}
                  {user.role === 4 && "Mesero Panel"}
                  {user.role === 5 && "Chef Panel"}
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-400 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión
              </button>
            </>
          )}
>>>>>>> timothy-coder
          <div className="border-r border-[#ffffff] mx-3 h-6" />
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <p>
<<<<<<< HEAD
              <CartListSide isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} /> 
=======
              <CartListSide isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
>>>>>>> timothy-coder
            </p>
            <p>(${totalPrice.toFixed(2)})</p>
          </div>
        </div>
      </header>

      {/* Componente carrito */}
<<<<<<< HEAD
      
=======

>>>>>>> timothy-coder
    </>
  );
}