// pages/pagesAdmin/Inicio/Inicio.tsx
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveStream } from '@nivo/stream';
import { ResponsiveBump } from '@nivo/bump';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot';

import { Card, CardContent } from '@/components/ui/card';

const InicioAdmin = () => {
  // Datos de ejemplo
  const barData = [
    { country: 'AD', burgers: 50 },
    { country: 'AE', burgers: 80 },
    { country: 'AF', burgers: 65 },
  ];

  const lineData = [
    {
      id: 'serie 1',
      data: [
        { x: 'Ene', y: 10 },
        { x: 'Feb', y: 50 },
        { x: 'Mar', y: 30 },
      ],
    },
  ];

  const pieData = [
    { id: 'A', value: 30, label: 'A' },
    { id: 'B', value: 70, label: 'B' },
  ];

  const radarData = [
    {
      taste: 'fruity',
      A: 120,
    },
    {
      taste: 'bitter',
      A: 98,
    },
    {
      taste: 'heavy',
      A: 86,
    },
  ];

  const streamData = [
    { A: 12, B: 19, C: 23 },
    { A: 22, B: 13, C: 18 },
    { A: 9, B: 15, C: 27 },
  ];

  const bumpData = [
    {
      id: 'Serie 1',
      data: [
        { x: 2000, y: 3 },
        { x: 2001, y: 2 },
        { x: 2002, y: 1 },
      ],
    },
  ];

  const calendarData = [
    { day: '2025-01-01', value: 10 },
    { day: '2025-01-02', value: 20 },
    { day: '2025-01-03', value: 30 },
  ];

  const swarmData = [
    { group: 'A', id: '1', value: 20 },
    { group: 'A', id: '2', value: 40 },
    { group: 'B', id: '3', value: 35 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 h-screen overflow-hidden">
      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsiveBar
            data={barData}
            keys={['burgers']}
            indexBy="country"
            margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
            padding={0.3}
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsiveLine
            data={lineData}
            margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            axisBottom={{ legend: 'Meses', legendPosition: 'middle', legendOffset: 32 }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsivePie
            data={pieData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsiveRadar
            data={radarData}
            keys={['A']}
            indexBy="taste"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsiveStream
            data={streamData}
            keys={['A', 'B', 'C']}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsiveBump
            data={bumpData}
            margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
            xScale={{ type: 'point' }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-1 h-full">
        <CardContent className="h-full">
          <ResponsiveCalendar
            data={calendarData}
            from="2025-01-01"
            to="2025-01-31"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          />
        </CardContent>
      </Card>

      <Card className="col-span-2 h-full">
        <CardContent className="h-full">
          <ResponsiveSwarmPlot
            data={swarmData}
            groups={['A', 'B']}
            groupBy="group"
            identity="id"
            value="value"
            valueScale={{ type: 'linear', min: 0, max: 50 }}
            size={{ key: 'value', values: [4, 12], sizes: [6, 20] }}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InicioAdmin;
