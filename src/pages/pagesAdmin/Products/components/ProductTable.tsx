import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  description: string;
  image: string;
  varietyOptions: string[];
  isActive: boolean;
  isFavorite: boolean;
}

interface ProductTableProps {
  products: Product[];
  categoryMap: Record<number, string>;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onToggleActive: (producto: Product) => void;
onToggleFavorite: (producto: Product) => void;

}

export default function ProductTable({
  products,
  categoryMap,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleFavorite,
}: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            {['ID', 'Nombre', 'Categoría', 'Precio', 'Descripción', 'Imagen', 'Variedades', 'Estado', 'Favorito', 'Acciones'].map((h) => (
              <th key={h} className="border px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{categoryMap[product.type] || 'Sin categoría'}</td>
              <td className="border px-4 py-2">
  S/.{Number(product.price || 0).toFixed(2)}
</td>

              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">
                {product.image && <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />}
              </td>
              <td className="border px-4 py-2">{product.varietyOptions?.join(', ')}</td>
              <td className="border px-4 py-2 text-center">
                <Button variant="ghost" onClick={() => onToggleActive(product)}>
                  <FontAwesomeIcon
                    icon={product.isActive ? faToggleOn : faToggleOff}
                    className={`text-xl ${product.isActive ? "text-green-500" : "text-gray-400"}`}
                  />
                </Button>
              </td>
              <td className="border px-4 py-2 text-center">
                <Button variant="ghost" onClick={() => onToggleFavorite(product)}>
                  <FontAwesomeIcon
                    icon={product.isFavorite ? faToggleOn : faToggleOff}
                    className={`text-xl ${product.isFavorite ? "text-green-500" : "text-gray-400"}`}
                  />
                </Button>
              </td>

              <td className="border px-4 py-2 space-x-2 text-center">
                <Button variant="default" onClick={() => onEdit(product)} title="Editar">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button variant="default" onClick={() => onDelete(product.id)} title="Eliminar">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
