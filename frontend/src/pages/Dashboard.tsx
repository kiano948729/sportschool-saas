import { useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../services/auth";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-bold transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
