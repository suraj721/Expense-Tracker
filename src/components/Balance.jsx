function Balance({ transactions }) {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const income = transactions.filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions.filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.29 0 2.13-.81 2.13-1.88 0-1.09-.86-1.72-2.46-2.09-2.42-.55-3.6-1.96-3.6-3.68 0-1.8 1.35-2.9 3.07-3.26V3.96h2.67v1.98c1.5.33 2.85 1.23 3.06 3.05h-1.96c-.15-.99-1.03-1.67-2.33-1.67-1.23 0-2.04.75-2.04 1.74 0 1.03.96 1.58 2.61 1.95 2.53.57 3.45 1.88 3.45 3.57 0 1.95-1.4 3.09-3.15 3.46z"/>
                </svg>
            </div>
            
            <div className="relative z-10">
                <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Total Balance</h2>
                <p className={`text-4xl font-bold mt-2 ${balance >= 0 ? 'text-slate-900 dark:text-white' : 'text-red-500 dark:text-red-400'}`}>
                    ₹{balance.toFixed(2)}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase">Income</p>
                        </div>
                        <p className="text-green-600 dark:text-green-400 text-xl font-bold">₹{income.toFixed(2)}</p>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase">Expense</p>
                        </div>
                        <p className="text-red-600 dark:text-red-400 text-xl font-bold">₹{Math.abs(expense).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Balance;
