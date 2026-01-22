import { Link } from 'react-router-dom';

const Intro = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col">
            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Master Your Money with <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            ExpenseTracker
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Track expenses, visualize your spending habits, and achieve your financial goals with our intuitive and powerful personal finance tool.
                    </p>
                    
                    <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-slate-200 dark:border-slate-700">
                        <img 
                            src="/expense_tracker_hero.png" 
                            alt="Expense Tracker Dashboard" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    </div>

                    <div className="pt-8">
                        <Link 
                            to="/dashboard" 
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 hover:scale-105"
                        >
                            Get Started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white dark:bg-slate-900 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="text-center space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Track Expenses</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Easily log your daily expenses and income. Categorize transactions to see exactly where your money goes.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Visual Analytics</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Visualize your financial health with beautiful interactive charts and graphs. Spot trends instantly.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Secure & Private</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Your data is encrypted and secure. We prioritize your privacy so you can manage your money with peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
