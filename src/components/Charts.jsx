import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend as BarLegend } from 'recharts';
import { LineChart, Line, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip, Legend as LineLegend } from 'recharts';
import { AreaChart, Area, XAxis as AreaXAxis, YAxis as AreaYAxis, Tooltip as AreaTooltip, CartesianGrid as AreaCartesianGrid, Legend as AreaLegend } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend as RadarLegend } from 'recharts';

// Sample Data
const pieData = [
  { name: 'Income', value: 4000 },
  { name: 'Expense', value: 3000 },
];

const barData = [
  { name: 'January', income: 4000, expense: 2400 },
  { name: 'February', income: 3000, expense: 1398 },
  { name: 'March', income: 2000, expense: 9800 },
  { name: 'April', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
];

const lineData = [
  { name: 'January', income: 4000 },
  { name: 'February', income: 3000 },
  { name: 'March', income: 5000 },
  { name: 'April', income: 2000 },
  { name: 'May', income: 3500 },
];

const areaData = [
  { name: 'January', expense: 4000 },
  { name: 'February', expense: 2000 },
  { name: 'March', expense: 3000 },
  { name: 'April', expense: 2500 },
  { name: 'May', expense: 3500 },
];

const radarData = [
  { subject: 'Food', A: 120, fullMark: 150 },
  { subject: 'Transport', A: 98, fullMark: 150 },
  { subject: 'Entertainment', A: 86, fullMark: 150 },
  { subject: 'Shopping', A: 99, fullMark: 150 },
  { subject: 'Others', A: 85, fullMark: 150 },
];

function Charts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#ff6347'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Income vs Expense Histogram</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="income" fill="#82ca9d" />
            <Bar dataKey="expense" fill="#ff6347" />
            <BarTooltip />
            <BarLegend />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Income Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <LineTooltip />
            <LineLegend />
            <LineXAxis dataKey="name" />
            <LineYAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Expense Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <Area type="monotone" dataKey="expense" stroke="#8884d8" fill="#8884d8" />
            <AreaCartesianGrid />
            <AreaXAxis dataKey="name" />
            <AreaYAxis />
            <AreaTooltip />
            <AreaLegend />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-2">Category Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="Expenses" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <RadarLegend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
