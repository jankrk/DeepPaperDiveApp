import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Registration failed");
      }

      // Po rejestracji od razu logujemy:
      const loginRes = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        throw new Error("Login after registration failed");
      }

      const loginData = await loginRes.json();
      auth.login(loginData.access_token, loginData.user);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Login
          </button>
        </p>
      </div>
    </main>
  );
}
