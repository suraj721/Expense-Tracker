import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.success) {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="glass-panel p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h2>
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>
        </form>
        <p className="text-slate-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
