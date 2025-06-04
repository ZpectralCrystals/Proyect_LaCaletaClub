export default function Perfil() {
  // Simulación de datos del usuario (puedes usar Redux o API real)
  const user = {
    nombre: "Juan Pérez",
    correo: "juanperez@example.com",
    telefono: "987654321",
    puntos: 240,
    compras: [
      { id: 1, producto: "Combo Familiar", fecha: "2025-05-10", monto: 45.90 },
      { id: 2, producto: "Pizza Grande", fecha: "2025-04-28", monto: 35.00 },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-sky-800 mb-4">Mi Perfil</h1>

      {/* Datos del cliente */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold text-sky-700 mb-2">Datos personales</h2>
        <p><span className="font-medium">Nombre:</span> {user.nombre}</p>
        <p><span className="font-medium">Correo:</span> {user.correo}</p>
        <p><span className="font-medium">Teléfono:</span> {user.telefono}</p>
      </div>

      {/* Puntos */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-1">Mis Puntos</h2>
        <p className="text-2xl font-bold text-blue-800">{user.puntos} pts</p>
        <p className="text-sm text-gray-500">¡Sigue comprando para acumular más!</p>
      </div>

      {/* Compras recientes */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-sky-700 mb-2">Historial de compras</h2>
        {user.compras.length === 0 ? (
          <p className="text-gray-500 text-sm">Aún no has realizado compras.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {user.compras.map((compra) => (
              <li key={compra.id} className="py-2">
                <div className="flex justify-between">
                  <span className="text-sm">{compra.producto}</span>
                  <span className="text-sm text-gray-500">S/ {compra.monto.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">{compra.fecha}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
