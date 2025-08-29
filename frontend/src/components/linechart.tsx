import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface KPI {
  date: string;
  stock: number;
  demand: number;
}

interface LineChartProps {
  data: KPI[];
  className?: string;
}

export const LineChartComponent: React.FC<LineChartProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white my-4 p-4 rounded-lg shadow ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Stock vs Demand Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), { name: value > 1000 ? `${Math.round(value/1000)}k` : value }]}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="stock"
              name="Stock"
              stroke="#9cab37"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="demand"
              name="Demand"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};