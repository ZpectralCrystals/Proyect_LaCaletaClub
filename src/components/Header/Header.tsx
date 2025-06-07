import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/lib/supabaseClient";
import { setUser } from "@/store/authSlice";
import type { AppDispatch, RootState } from "@/store";
import { useAuthUser } from "@/hooks/useAuthUser";

import AuthActions from "./AuthActions";
import CartButton from "./CartButton";
import CartListSide from "@/components/CartListSide/CartListSide";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useAuthUser();
  const products = useSelector((state: RootState) => state.cart.products);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // ⚙️ Memoizar total solo si cambian productos
  const totalPrice = useMemo(
    () =>
      products.reduce<number>(
        (acc, prod) => acc + Number(prod.price) * prod.quantity,
        0
      ),
    [products]
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <>
      {/* 🔷 Header superior para escritorio */}
      <header className="bg-[#101828] text-white flex justify-between items-center px-4 md:px-20 py-2 shadow-lg">
        {/* 🐟 Logo (puedes activar si lo deseas) */}
        <div className="flex items-center gap-2">
         
        </div>

        {/* 👤 Acciones de usuario y carrito */}
        <div className="flex items-center gap-4 text-sm">
          <AuthActions user={user} onLogout={handleLogout} />
          <div className="hidden sm:block border-l border-white h-6 mx-3" />
          <CartButton totalPrice={totalPrice} onClick={() => setIsCartOpen(true)} />
        </div>
      </header>

      {/* 🧾 Carrito lateral deslizante */}
      <CartListSide isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </>
  );
}
