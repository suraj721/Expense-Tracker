import Header from "./components/Header";
import Balance from "./components/Balance"
import ExpenseList from "./components/ExpenseList"
import AddTransaction from "./components/AddTransaction"
import ChartIncome from "./components/ChartIncome"; 
import ChartExpense from "./components/ChartExpense";
import Transactions from "./components/Transactions";
import Charts from "./components/Charts";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Intro from "./pages/Intro";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AuthContext from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppContent() {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      if(user) {
        getTransactions();
      }
    }, [user]);

    const getTransactions = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/transactions`);
        const data = await res.json();
        setTransactions(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const addTransaction = async (text, amount) => {
      const newTransaction = {
        text,
        amount
      };

      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/transactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTransaction)
        });

        const data = await res.json();
        setTransactions([...transactions, data.data]);
      } catch (err) {
        console.log(err);
      }
    };

    const deleteTransaction = async (id) => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/transactions/${id}`, {
          method: 'DELETE'
        });

        setTransactions(transactions.filter(transaction => transaction._id !== id));
      } catch (err) {
        console.log(err);
      }
    };


  return (
      <div className="min-h-screen bg-slate-100 dark:bg-dark-900 text-slate-900 dark:text-slate-200 font-sans selection:bg-primary/30 selection:text-primary-100 pb-20 transition-colors duration-300">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
        </div>

        <Header />
        
        <main className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 md:pb-8">
          <Routes>
            <Route path="/intro" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/transactions" element={
              <ProtectedRoute>
                <Transactions transactions={transactions} deleteTransaction={deleteTransaction}/>
              </ProtectedRoute>
            }/>
            <Route path="/charts" element={
              <ProtectedRoute>
                <Charts transactions={transactions} />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Balance & Add Transaction */}
                    <div className="lg:col-span-1 space-y-8">
                      <Balance transactions={transactions}/>
                      <AddTransaction addTransaction={addTransaction}/>
                    </div>
                    
                    {/* Middle Column: Recent Transactions */}
                    <div className="lg:col-span-1">
                      <ExpenseList transactions={transactions} deleteTransaction={deleteTransaction}/>
                    </div>

                    {/* Right Column: Charts Preview */}
                    <div className="lg:col-span-1 space-y-8">
                      <ChartIncome transactions={transactions}/>
                      <ChartExpense transactions={transactions}/>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        {user && <BottomNav />}
      </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;