import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function ChartExpense({ transactions }) {
  const expense = transactions.filter((t) => t.amount < 0);

  const data = expense.map((t) => ({
    name: t.text,
    value: Math.abs(t.amount),
  }));

  // Premium Red/Pink Palette
  const COLORS = ["#ef4444", "#f472b6", "#fb7185", "#fca5a5", "#fda4af"];

  if (expense.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center h-[400px]">
        <h3 className="text-xl font-bold text-white mb-4">Expense Distribution</h3>
        <div className="text-slate-500 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <p>No expense data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-2xl h-[400px]">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">Expense Distribution</h3>
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

export default ChartExpense;