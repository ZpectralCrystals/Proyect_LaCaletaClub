import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import type { Categoria } from '@/hooks/useCategorias';
import { DeleteDialog } from './DeleteDialog';
import { IconRenderer } from './IconRenderer';

interface Props {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
  onToggle: (categoria: Categoria) => void;
}

export function CategoriaTable({ categorias, onEdit, onDelete, onToggle }: Props) {
  return (
    <table className="min-w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Descripción</th>
          <th className="border px-4 py-2">Ícono</th>
          <th className="border px-4 py-2">Estado</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((cat) => (
          <tr key={cat.id}>
            <td className="border px-4 py-2">{cat.id}</td>
            <td className="border px-4 py-2">{cat.descripcion}</td>
            <td className="border px-4 py-2 text-center">
              <IconRenderer name={cat.icon} />
            </td>
            <td className="border px-4 py-2">
              <Button variant="ghost" size="sm" onClick={() => onToggle(cat)}>
                <FontAwesomeIcon icon={cat.isActive ? faToggleOn : faToggleOff} />
              </Button>
            </td>
            <td className="border px-4 py-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(cat)} className="mr-2">
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <DeleteDialog onDelete={() => onDelete(cat.id)} trigger={
                <Button variant="ghost" size="sm">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              } />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
