import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    //controleer lokaal alvast of de wachtwoorden overeenkomen
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api("/sanctum/csrf-cookie");

      await api("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-85 rounded-xl bg-gray-300 px-8 py-8 shadow-sm">
        <h1 className="mb-10 text-center text-3xl font-bold">Register</h1>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            disabled={loading}
            className="mb-5 w-full rounded-lg border-0 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={loading}
            className="mb-5 w-full rounded-lg border-0 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
            disabled={loading}
            className="mb-5 w-full rounded-lg border-0 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
            disabled={loading}
            className="mb-5 w-full rounded-lg border-0 bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 text-sm font-bold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-2 text-xs">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
