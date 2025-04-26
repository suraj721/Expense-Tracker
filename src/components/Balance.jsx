function Balance({ transactions }) {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const income = transactions.filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions.filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <div className="text-center bg-gray-700 text-white shadow-md p-2">
            <h2 className="font-bold text-3xl">Balance</h2>
            <p className="font-bold text-2xl">₹{balance.toFixed(2)}</p>
            <div className="flex justify-between mt-4">
                <div className="w-1/3 text-left">
                    <p className="font-bold text-2xl text-green-500 pl-8">Income: ₹{income.toFixed(2)}</p>
                </div>
                <div className="w-1/3 text-right">
                    <p className="font-bold text-2xl text-red-500 pr-8">Expense: ₹{Math.abs(expense).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default Balance;
