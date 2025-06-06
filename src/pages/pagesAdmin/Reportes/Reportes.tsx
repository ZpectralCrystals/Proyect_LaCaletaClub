import { Bar, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);
interface Product {
    id: number;
    name: string;
    type: number;
    price: number;
    description: string;
    image: string;
    varietyOptions: string[];
    isActive: boolean;
  }
  
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';


const labels = ['Enero', 'Febrero', 'Marzo'];
  const ventas = [300, 500, 700];
  const devoluciones = [50, 60, 30];
  
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true },
    },
  };


export default function ReportesAdmin() {
    const [, setProducts] = useState<Product[]>([]);
 
    const fetchProducts = async () => {
        const { data, error } = await supabase.from('productostab').select('*');
        if (error) {
          console.error(error);
         
        } else 
        {
            setProducts(data || []);
            console.log(data.length)
        
        }
      };
    
     

     useEffect(() => {
        fetchProducts();
       
      }, []);

    


  const barData = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: ventas,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };
  const stackedBarData = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: ventas,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Devoluciones',
        data: devoluciones,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: ventas,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };

  const radarData = {
    labels: ['Calidad', 'Precio', 'Demanda', 'Satisfacción', 'Distribución'],
    datasets: [
      {
        label: 'Evaluación',
        data: [90, 80, 70, 85, 60],
        backgroundColor: 'rgba(153, 102, 255, 0.4)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const stackedOptions = {
    ...commonOptions,
    plugins: { 
      ...commonOptions.plugins, 
      title: { display: true, text: 'Barra Apilada' },
      legend: { position: 'top' as const } 
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };


  return (
    <div className="w-full h-[100vh] flex flex-col p-4 bg-gray-50 border">
  <h1 className="text-3xl font-bold mb-4 text-center">Dashboard de Reportes</h1>

  {/* Grid que ocupa todo el alto restante */}
  <div className="grid grid-cols-2 gap-6 flex-grow h-full overflow-hidden">
    {/* Cada tarjeta */}
    <div className="bg-white p-4 rounded shadow h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Gráfico de Barras</h2>
      <div className="flex-grow h-0">
        <Bar data={barData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: 'Ventas' } } }} />
      </div>
    </div>

    <div className="bg-white p-4 rounded shadow h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Gráfico de Líneas</h2>
      <div className="flex-grow h-0">
        <Line data={lineData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: 'Tendencia de Ventas' } } }} />
      </div>
    </div>

    <div className="bg-white p-4 rounded shadow h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Gráfico Apilado</h2>
      <div className="flex-grow h-0">
        <Bar data={stackedBarData} options={stackedOptions} />
      </div>
    </div>

    <div className="bg-white p-4 rounded shadow h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Gráfico Radar</h2>
      <div className="flex-grow h-0">
        <Radar data={radarData} options={{ ...commonOptions, plugins: { ...commonOptions.plugins, title: { display: true, text: 'Evaluación General' } } }} />
      </div>
    </div>
  </div>
</div>
  );
}