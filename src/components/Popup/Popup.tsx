"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const diasMap: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

function getTodayId(): number {
  const day = new Date().getDay();
  return day === 0 ? 7 : day;
}

export default function DescuentosDelDia() {
  const [descuentos, setDescuentos] = useState<Descuento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDescuentos = async () => {
      setLoading(true);
      const todayId = getTodayId();

      const { data, error } = await supabase
        .from("descuentostab")
        .select("*")
        .eq("isActive", true)
        .or(`id_dia.eq.${todayId},id_dia.is.null`);

      if (error) {
        console.error("Error al obtener descuentos:", error.message);
      } else {
        setDescuentos(data || []);
        // Mostrar automáticamente si hay descuentos
        if (data && data.length > 0) {
          setIsOpen(true);
          // Ocultar después de 5 segundos
          setTimeout(() => setIsOpen(false), 5000);
        }
      }

      setLoading(false);
    };

    fetchDescuentos();
  }, []);

  const descuentosActivos = descuentos.filter(d => d.isActive);
  const todayName = diasMap[getTodayId()];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>🔥 Descuentos de hoy ({todayName}) 🔥</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <p>Cargando descuentos...</p>
        ) : descuentosActivos.length === 0 ? (
          <p>No hay descuentos activos para hoy.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {descuentosActivos.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg bg-background">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-primary font-bold text-xl">-{item.descuento}%</p>
                  </div>
                  {item.type === 2 && item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
                
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