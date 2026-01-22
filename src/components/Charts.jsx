import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, AreaChart, Area } from 'recharts';

function Charts({ transactions }) {
  // Process Data for Charts
  const income = transactions.filter(t => t.amount > 0);
  const expense = transactions.filter(t => t.amount < 0);

  const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = Math.abs(expense.reduce((acc, t) => acc + t.amount, 0));

  // 1. Income vs Expense (Pie)
  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense },
  ];

  // 2. Monthly Data (Bar & Area)
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.createdAt);
    const month = date.toLocaleString('default', { month: 'short' });
    
    const existing = acc.find(d => d.name === month);
    if (existing) {
      if (t.amount > 0) existing.income += t.amount;
      else existing.expense += Math.abs(t.amount);
    } else {
      acc.push({
        name: month,
        income: t.amount > 0 ? t.amount : 0,
        expense: t.amount < 0 ? Math.abs(t.amount) : 0
      });
    }
    return acc;
  }, []);

  const COLORS = ['#22c55e', '#ef4444']; // Green, Red

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income vs Expense Pie Chart */}
        <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-xl">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">Income vs Expense</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
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
        </div>

        {/* Monthly Comparison Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-xl">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">Monthly Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <BarTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Area Chart */}
        <div className="glass-panel p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 shadow-xl md:col-span-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">Financial Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Area type="monotone" dataKey="income" name="Income" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
