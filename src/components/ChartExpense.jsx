import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function ChartExpense({ transactions }) {

  const expense = transactions
  .filter((t) => t.amount<0)

  if (expense.length===0){
    return(
      <div className="w-1/2 p-4">
        <div className="bg-white p-6  shadow-lg rounded-lg max-w-md mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Expense Distribution</h2>
          <p className="text-gray-500">No income transactions available.</p>
        </div>
      </div>
    )
  }

  const data = transactions
  .filter((t) => t.amount<0)
  .map((t) => ({
    name: t.text,
    value: Math.abs(t.amount),
  }));

  const COLORS = ["#FF6384", "#FF9F40", "#FFCD56", "#FF5733", "#C70039"]

  return(
        <div className="w-1/2 p-4">
          <div className="bg-white p-6  shadow-lg rounded-lg max-w-md mx-auto text-center ">
          <h1 className="text-2xl font-semibold mb-4">Expense Distribution</h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
               data={data}
               dataKey="value"
               nameKey="name"
               cx="50%"
               cy="50%"
               outerRadius={100}
               label 
              >
                {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        </div>
  )
}
export default ChartExpense