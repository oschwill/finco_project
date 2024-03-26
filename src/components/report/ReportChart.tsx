'use client';

import Chart from 'chart.js/auto';
import { buildChart } from '@/lib/functionHelper';
import { useEffect, useRef, useState } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

const ReportChart: React.FC<{ userId: number }> = ({ userId }) => {
  const chartRef = useRef<Chart | null>(null);
  const [chartType, setCharType] = useState('bar');

  useEffect(() => {
    buildChart(chartRef, userId, chartType);
  }, [userId, chartType]);

  const handleSetChartType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharType(event.target.value);
  };

  return (
    <article>
      <div className="text-[1.25rem]">
        <label htmlFor="chartType">Char Type:</label>
        <select
          name="chartType"
          id="chartType"
          value={chartType}
          onChange={handleSetChartType}
          className="w-[20%] p-2 bg-[#f7f7f7] rounded-3xl"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="radar">Radar</option>
        </select>
      </div>
      <canvas id="myChart" height="400" width="400"></canvas>
    </article>
  );
};

export default ReportChart;
