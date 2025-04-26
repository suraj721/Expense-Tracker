import { useState } from "react";
import { Link } from "react-router-dom";;

function Header() {

  const [isclick, setisclick] = useState(false)

    return (

      <nav className="bg-blue-500 p-4 shadow-md ">

    <div className="flex justify-between items-center">

      <h2 className="text-2xl font-bold text-white">Expense Tracker</h2>

      <button 
      className="text-white text-3xl md:hidden mr-4"
      onClick={()=>setisclick(!isclick)}
      >
        ≡
      </button>
       
       <ul className="hidden md:flex justify-between gap-5 text-white text-md pt-3">
        <li className=" hover:underline cursor-pointer"><Link to="/">Home</Link></li>
        <li className=" hover:underline cursor-pointer"><Link to="/Transactions">Transactions</Link></li>
        <li className=" hover:underline cursor-pointer"><Link to="/Charts">Charts</Link></li>
       <li> <button className="text-black  hover:underline cursor-pointer">☾</button></li>
       </ul>
      </div>
  
      {isclick &&(
        <ul className="flex flex-col justify-between gap-5 text-white text-md pt-3">
        <li className=" hover:underline cursor-pointer" onClick={()=>setisclick(false)}>Home</li>
        <li className=" hover:underline cursor-pointer"onClick={()=>setisclick(false)}>Transactions</li>
        <li className=" hover:underline cursor-pointer"onClick={()=>setisclick(false)}>Profile</li>
        <li><button className="text-black  cursor-pointer"onClick={()=>setisclick(false)}>☾</button></li>
       </ul>
      )}


      </nav>
    );
  }
  
  export default Header;
