import { useState } from "react";

function ExpenseList({ transactions, deleteTransaction }) {
  const [sortType, setSortType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (sortType === "Income") return transaction.amount > 0;
      if (sortType === "Expense") return transaction.amount < 0;
      return true;
    })
    .filter((transaction) =>
      transaction.text.toUpperCase().includes(searchTerm.toUpperCase())
    );

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-secondary rounded-full"></span>
          History
        </h3>
        <div className="flex gap-2">
          <select
            className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg px-3 py-1 focus:outline-none focus:border-primary"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-900 dark:text-slate-300 text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {filteredTransactions.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            No transactions found
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <li
                key={transaction._id}
                className="group flex justify-between items-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${transaction.amount >= 0 ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`}></div>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{transaction.text}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold ${
                      transaction.amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.amount >= 0 ? "+" : "-"}₹{Math.abs(transaction.amount)}
                  </span>
                  <button
                    onClick={() => deleteTransaction(transaction._id)}
                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-400/10"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseList;