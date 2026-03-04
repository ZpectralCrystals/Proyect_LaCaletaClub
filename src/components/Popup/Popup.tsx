import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
// Componente de diálogo de Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// ✅ Interfaz estricta para los datos que llegan desde Supabase
interface Descuento {
  id: number;
  id_producto?: number;
  id_category?: number;
  id_dia: number | null;
  descuento: number;
  type: number;
  imagen?: string;
  name: string;
  isActive: boolean;
}
// ✅ Mapeo de número de día (1-7) a nombre del día
const diasMap: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};
// ✅ Convierte `getDay()` de JS (donde 0 = domingo) a nuestro esquema (donde 7 = domingo)
function getTodayId(): number {
  const day = new Date().getDay();
  return day === 0 ? 7 : day;
}
// 🎯 Componente principal
export default function DescuentosDelDia() {
  // Estado para guardar descuentos, loading y visibilidad del popup
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // 🧠 Obtener descuentos al cargar
  useEffect(() => {
    const fetchDescuentos = async () => {
      setLoading(true);
      const todayId = getTodayId(); // Día actual (1-7)
      // Consulta: trae descuentos activos del día actual o que no tienen día asignado
      const { data, error } = await supabase
        .from("descuentos")
        .select("*")
        .eq("isActive", true)
        .or(`id_dia.eq.${todayId},id_dia.is.null`);
      if (error) {
        console.error("Error al obtener descuentos:", error.message);
      } else {
        setDescuentos(data || []);
        // Si hay descuentos activos, mostramos el popup automáticamente
        if (data && data.length > 0) {
          setIsOpen(true);
          // Cierra el modal automáticamente después de 5 segundos
          setTimeout(() => setIsOpen(false), 5000);
        }
      }
      setLoading(false);
    };
    fetchDescuentos();
  }, []);
  // ✅ Filtra solo descuentos activos (por si hay alguno desactivado en Supabase)
  const descuentosActivos = descuentos.filter(d => d.isActive);
  const todayName = diasMap[getTodayId()]; // Día en string
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-h-[80vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()} // 🔐 Previene cerrar al hacer clic fuera
      >
        <DialogHeader>
          <DialogTitle>🔥 Descuentos de hoy ({todayName}) 🔥</DialogTitle>
        </DialogHeader>
        {/* 🧾 Cargando / Sin resultados / Lista de descuentos */}
        {loading ? (
          <p>Cargando descuentos...</p>
        ) : descuentosActivos.length === 0 ? (
          <p>No hay descuentos activos para hoy.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {descuentosActivos.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg bg-background"
              >
                <div className="flex justify-between items-start">
                  {/* 📋 Nombre y descuento */}
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-primary font-bold text-xl">
                      -{item.descuento}%
                    </p>
                  </div>

                  {/* 🖼️ Imagen solo si es por producto y tiene imagen */}
                  {item.type === 2 && item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
                {/* ⏳ Si es válido todos los días */}
                {item.id_dia === null && (
                  <p className="text-xs text-muted-foreground mt-2">
                    ⏳ Disponible todos los días
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
