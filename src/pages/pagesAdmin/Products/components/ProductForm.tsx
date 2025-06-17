import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: number;
  descripcion: string;
}

interface ProductFormProps {
  form: any;
  setForm: (value: any) => void;
  categories: Category[];
  editingProduct: any;
  onSubmit: () => void;
}

export default function ProductForm({
  form,
  setForm,
  categories,
  editingProduct,
  onSubmit,
}: ProductFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-2">
      <Input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <Select
  value={form.type}
  onValueChange={(val: string) =>
    setForm((f: typeof form) => ({ ...f, type: val }))
  }
>

        <SelectTrigger>
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>
              {cat.descripcion}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input name="price" type="number" step="0.01" placeholder="Precio" value={form.price} onChange={handleChange} />
      <Input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
      <Input name="image" placeholder="URL Imagen" value={form.image} onChange={handleChange} />
      <Input name="varietyOptions" placeholder="Variedades (coma separadas)" value={form.varietyOptions} onChange={handleChange} />
      <Button onClick={onSubmit}>{editingProduct ? "Actualizar" : "Agregar"}</Button>
    </div>
  );
}
