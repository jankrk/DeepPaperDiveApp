import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("testpass");
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        auth.login(data.access_token, data.user);
      } else {
        throw new Error(data.detail || "Login failed");
      }

      
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register
          </button>
        </p>
      </div>
    </main>
  );
}
