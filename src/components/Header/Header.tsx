import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { RootState } from '../../store';

import { setUser } from '../../store/authSlice';
import { supabase } from '../../lib/supabaseClient';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Obtener usuario del estado global
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(setUser(null)); // limpiar usuario del estado global
    navigate('/login');      // redirigir al login
  };

  return (
    <header className="bg-[#101828] text-white flex justify-between items-center p-1 shadow-lg px-[160px]">
      <div className="flex gap-2 items-center">
        {/* Aquí podrías poner un logo o algo */}
      </div>
      <div className="flex flex-row items-center gap-4">
        {!user ? (
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-400 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar sesión
            </button>
          </>
        )}
        <div className="border-r border-[#ffffff] mx-3 h-6" />
        <div className="flex flex-row items-center gap-2">
          <p>
            <FontAwesomeIcon icon={faCartShopping} /> (0) items in cart
          </p>
          <p>($0.00)</p>
        </div>
      </div>
    </header>
  );
}
