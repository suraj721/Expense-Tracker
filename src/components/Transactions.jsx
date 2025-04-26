import { useState } from "react";

function Transactions({ transactions, deleteTransaction }) {

  const[sorttype, setsorttype] = useState("All")

  const handleSortChange = (event) => {
    setsorttype(event.target.value);
  };
  
  const [searchtype, setsearchtype] = useState("")

  const handlesearch = (event) => {
  setsearchtype(event.target.value);
}

   
  const sortedtransction = transactions.filter((transaction)=>{
  if (sorttype === "Income") return transaction.amount>0;
  if (sorttype === "Expense") return transaction.amount<0;
  return true
}).filter((transaction) => 
  transaction.text.toUpperCase().includes(searchtype.toUpperCase())
)



  return (
    <div className=" w-screen h-screen p-4 bg-slate-300 p-4shadow-lg rounded">
     <div className="flex gap-10">

    <div className="w-1/3 h-6 flex justify-end mt-5 pr-4">
        <input 
        className="bg-slate-200 hover:shadow-md"
        placeholder="   Search"
        onChange={handlesearch}
        >
        
        </input>
    </div>


     <div className="w-1/3 flex justify-end ">
      <h2 className="text-center text-3xl font-bold pt-4 mr-14 pr-12">History</h2>
      </div>
       
       <div className="w-1/3 flex justify-end">
      <form className="text-right text-md p-5 pr-14" > 
        <label>Sort by </label>
        <select
         className="bg-slate-200 cursor-pointer hover:shadow-md"
         value={sorttype}
         onChange={handleSortChange}
         >
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </form>
      </div>
      </div>

<div className="flex">

      <div className="w-1/6"></div>



  <div className="w-5/6  m-4 bg-slate-300 h-[600px] rounded overflow-scroll">




      <ul className="flex flex-col-reverse">
          {sortedtransction.map((transaction, index) => (
          <li key={index} className="flex justify-between items-center p-4 border-b text-lg">
            <span className="w-1/3">{transaction.text}</span>
            <span className={transaction.amount >= 0 ? "text-green-500 font-bold w-1/3 pl-2" : "text-red-500 font-bold w-1/3 pl-2"}>
              {transaction.amount >= 0 ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}
            </span>
            <button
              onClick={() => deleteTransaction(index)}
              className="w-1/6 bg-red-500 text-white opacity-30 rounded hover:opacity-100"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

 </div>

    </div>
  );
}

export default Transactions;