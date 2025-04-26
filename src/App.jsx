import Header from "./components/Header";
import Balance from "./components/Balance"
import ExpenseList from "./components/ExpenseList"
import AddTransaction from "./components/AddTransaction"
import ChartIncome from "./components/ChartIncome"; 
import ChartExpense from "./components/ChartExpense";
import Transactions from "./components/Transactions";
import Charts from "./components/Charts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
function App() {
  
    const [transactions, setTransactions] = useState([]);
  
    const addTransaction = (text, amount) => {
      const newTransaction = {
        id: transactions.length + 1,
        text,
        amount
      };
      setTransactions([...transactions, newTransaction]);
    };

    const deleteTransaction = (index) => {
      setTransactions(transactions.filter((_, i) => i !==index)
    )};


  return (
    <Router>
    <div className=" bg-gray-200">
      
      <Header />
      <Routes>
        <Route path="/transactions" element={<Transactions transactions={transactions} deleteTransaction={deleteTransaction}/>}/>
        <Route path="/charts" element={<Charts />} />

      <Route path="/" element={<>
      <Balance transactions={transactions}/>
      <div className="flex justify-between w-screen">
      <AddTransaction addTransaction={addTransaction}/>
      <ExpenseList transactions={transactions} deleteTransaction={deleteTransaction}/>
      </div>
      <div className=" flex justify-between ">
      <ChartIncome transactions={transactions}/>
      <ChartExpense transactions={transactions}/>
      </div>
      </>} />
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;