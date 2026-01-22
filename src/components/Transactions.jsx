import { useState } from "react";

function Transactions({ transactions, deleteTransaction }) {
  const [sortType, setSortType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [importing, setImporting] = useState(false);

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (sortType === "Income") return transaction.amount > 0;
      if (sortType === "Expense") return transaction.amount < 0;
      return true;
    })
    .filter((transaction) =>
      transaction.text.toUpperCase().includes(searchTerm.toUpperCase())
    );

  const handleFileImport = async (file) => {
        setImporting(true);
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                console.log("File read complete");
                let formattedData = [];
                const content = e.target.result;

                if (file.name.endsWith('.json')) {
                    const json = JSON.parse(content);
                    if (!Array.isArray(json)) throw new Error("Invalid JSON format: Expected an array");
                    formattedData = json.map(item => ({
                        text: item.text,
                        amount: Number(item.amount)
                    }));
                } else if (file.name.endsWith('.csv')) {
                    const lines = content.split('\n');
                    const startIndex = lines[0].toLowerCase().includes('text') ? 1 : 0;
                    
                    for (let i = startIndex; i < lines.length; i++) {
                        const line = lines[i].trim();
                        if (!line) continue;
                        
                        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
                        const parts = line.split(','); 
                        
                        let text, amount;
                        
                        if (line.startsWith('"')) {
                            const closingQuoteIndex = line.indexOf('",');
                            if (closingQuoteIndex !== -1) {
                                text = line.substring(1, closingQuoteIndex).replace(/""/g, '"');
                                const rest = line.substring(closingQuoteIndex + 2);
                                amount = rest.split(',')[0];
                            } else {
                                const parts = line.split(',');
                                if(parts.length >= 2) {
                                     amount = parts[parts.length - 2];
                                     const regex = /^"(.*)",(-?\d+(\.\d+)?),"(.*)"$/;
                                     const match = line.match(regex);
                                     if (match) {
                                         text = match[1].replace(/""/g, '"');
                                         amount = match[2];
                                     } else {
                                         text = parts[0];
                                         amount = parts[1];
                                     }
                                }
                            }
                        } else {
                            text = parts[0];
                            amount = parts[1];
                        }

                        if (text && amount && !isNaN(amount)) {
                            formattedData.push({
                                text: text.trim(),
                                amount: Number(amount)
                            });
                        }
                    }
                } else {
                    throw new Error("Unsupported file type");
                }

                if (formattedData.length === 0) {
                    throw new Error("No valid transactions found to import");
                }

                const res = await fetch('http://localhost:5000/api/transactions/import', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formattedData)
                });
                
                const data = await res.json();

                if (res.ok) {
                    alert(`Successfully imported ${data.count} transactions`);
                    window.location.reload(); 
                } else {
                    alert(`Import failed: ${data.error || 'Unknown error'}`);
                }
            } catch (err) {
                console.error(err);
                alert(`Import failed: ${err.message}`);
            } finally {
                setImporting(false);
            }
        };
        reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Transaction History</h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," 
                            + "Text,Amount,Date\n"
                            + transactions.map(t => `"${t.text.replace(/"/g, '""')}",${t.amount},"${new Date(t.createdAt).toLocaleDateString()}"`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "transactions.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export CSV
                </button>
                
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setImporting(true);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setImporting(false);
                    }}
                    onDrop={async (e) => {
                        e.preventDefault();
                        setImporting(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleFileImport(file);
                    }}
                    className={`relative bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm cursor-pointer flex items-center gap-2 ${importing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {importing ? (
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    )}
                    {importing ? 'Drop to Upload' : 'Drag & Drop JSON/CSV'}
                    
                    <input
                        type="file"
                        accept=".json,.csv"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={importing}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleFileImport(file);
                        }}
                    />
                </div>
            </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="w-full sm:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm cursor-pointer"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Income">Income Only</option>
            <option value="Expense">Expense Only</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-xl bg-white/50 dark:bg-slate-800/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction._id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount >= 0 
                            ? "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400" 
                            : "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}>
                          {transaction.amount >= 0 ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-slate-200">{transaction.text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.amount >= 0 
                          ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400" 
                          : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400"
                      }`}>
                        {transaction.amount >= 0 ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${
                      transaction.amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}>
                      {transaction.amount >= 0 ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteTransaction(transaction._id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                        title="Delete Transaction"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;