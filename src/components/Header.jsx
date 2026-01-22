import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive(to)
          ? "bg-primary/20 text-primary font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)]"
          : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5"
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-400">
                ExpenseTracker
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/transactions">Transactions</NavLink>
                <NavLink to="/charts">Analytics</NavLink>
                <Link to="/profile" className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                    {user.photo && user.photo !== 'no-photo.jpg' ? (
                      <img src={`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/${user.photo}`} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </Link>
              </div>
              
              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             {user && (
               <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
             )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
          {user ? (
            <>
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/transactions">Transactions</NavLink>
              <NavLink to="/charts">Analytics</NavLink>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                    {user.photo && user.photo !== 'no-photo.jpg' ? (
                      <img src={`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/${user.photo}`} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {user.name}
                  </span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
             <NavLink to="/login">Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
