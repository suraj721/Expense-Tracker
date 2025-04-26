import { useState } from "react";

function AddTransaction({ addTransaction }){

    const[text, setText] = useState("")
    const[amount, setAmount] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();
        addTransaction(text, parseFloat(amount))
        console.log("Transaction added:", text, amount);
        setText("");
        setAmount("");
    }

    return(
        <div className="w-1/2 m-4  bg-slate-300 p-4 shadow-lg rounded max-h-[500px]">
            <h1 className=" text-center text-2xl font-semibold p-4">Add Transaction</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-2 ">
                <label className="block text-lg font-medium pb-4">Transaction Name*</label>
                <input 
                list="transactionName"
                type="text" 
                maxlength={25}
                value={text} 
                className="w-full h-10" 
                onChange={(e) => setText(e.target.value)} 
                required />
                    <datalist id="transactionName">
                        <option value="Salary"/>
                        <option value="Groceries"/>
                        <option value="Electricity Bill"/>
                        <option value="Internet Bill"/>
                        <option value="Fuel"/>
                        <option value="Dining Out"/>
                        <option value="miscellaneous" />
                    </datalist>
                </div>
                <div className="mb-2">
                <label className="block text-lg font-medium pb-4">Amount ₹*</label>
                <input type="number"
                value={amount} 
                className="w-full h-10" 
                onChange={(e) => setAmount(e.target.value)} 
                required>
                </input>
                </div>
                <button type="submit" 
                className="w-full bg-blue-500 p-2 my-5 rounded hover:shadow-lg">Add</button>
            </form>
        </div>
    )
}
export default AddTransaction;
