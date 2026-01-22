import { useState } from "react";

function AddTransaction({ addTransaction }){

    const[text, setText] = useState("")
    const[amount, setAmount] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        addTransaction(text, parseFloat(amount))
        setText("");
        setAmount("");
    }

    return(
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Add Transaction
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-slate-700 dark:text-slate-400 text-sm font-medium mb-2">Description</label>
                    <input 
                        list="transactionName"
                        type="text" 
                        maxLength={25}
                        value={text} 
                        className="input-field" 
                        placeholder="Enter description..."
                        onChange={(e) => setText(e.target.value)} 
                        required 
                    />
                    <datalist id="transactionName">
                        <option value="Salary"/>
                        <option value="Groceries"/>
                        <option value="Electricity Bill"/>
                        <option value="Internet Bill"/>
                        <option value="Fuel"/>
                        <option value="Dining Out"/>
                        <option value="Miscellaneous" />
                    </datalist>
                </div>
                <div>
                    <label className="block text-slate-700 dark:text-slate-400 text-sm font-medium mb-2">Amount (₹)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                        <input 
                            type="number"
                            value={amount} 
                            className="input-field pl-8" 
                            placeholder="0.00"
                            onChange={(e) => setAmount(e.target.value)} 
                            required
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Negative for expense, positive for income</p>
                </div>
                <button type="submit" className="w-full btn-primary mt-4">
                    Add Transaction
                </button>
            </form>
        </div>
    )
}
export default AddTransaction;
