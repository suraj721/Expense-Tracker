import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function ChartIncome({ transactions }) {
  const income = transactions.filter((t) => t.amount > 0);

  const data = income.map((t) => ({
    name: t.text,
    value: t.amount,
  }));

  // Premium Green Palette
  const COLORS = ["#22c55e", "#4ade80", "#86efac", "#bbf7d0", "#16a34a"];

  if (income.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center h-[400px]">
        <h3 className="text-xl font-bold text-white mb-4">Income Distribution</h3>
        <div className="text-slate-500 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No income data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-2xl h-[400px]">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Income Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartIncome;