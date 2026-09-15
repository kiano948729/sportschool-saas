import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api("/sanctum/csrf-cookie");

      //login uitvoeren
      await api("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-85 rounded-xl bg-gray-300 px-8 py-8 shadow-sm">
        <h1 className="mb-10 text-center text-3xl font-bold">Log In</h1>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={loading}
            className="mb-5 w-full rounded-lg border-0 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            disabled={loading}
            className="mb-2 w-full rounded-lg border-0 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <Link
            to="/forgot-password"
            className="mb-8 block text-xs text-black hover:underline"
          >
            Forgot password?
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 text-sm font-bold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-2 text-xs">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
