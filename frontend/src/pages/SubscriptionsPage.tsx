import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubscriptions } from "../api/subscriptions";
import type { Subscription } from "../types/subscriptions";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        setLoading(true);
        setError("");

        const data = await getSubscriptions();

        setSubscriptions(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadSubscriptions();
  }, []);

  function formatDate(date: string | null) {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("en-GB").format(new Date(date));
  }

  function getStatusClasses(status: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "expired":
        return "bg-gray-200 text-gray-600";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "active":
        return "Active";

      case "cancelled":
        return "Cancelled";

      case "expired":
        return "Expired";

      default:
        return status;
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-600">Subscriptions are loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Subscription management
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            See and manage subscriptions.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-5 py-4 text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Sporter
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Subscription
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Start date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    End date
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map((subscription, index) => (
                  <tr
                    key={subscription.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-5 text-base font-medium text-gray-900">
                      {subscription.athlete.first_name}{" "}
                      {subscription.athlete.last_name}
                    </td>

                    <td className="px-6 py-5 text-base text-gray-900">
                      {subscription.subscription_type.name}
                    </td>

                    <td className="px-6 py-5 text-base text-gray-500">
                      {formatDate(subscription.start_date)}
                    </td>

                    <td className="px-6 py-5 text-base text-gray-500">
                      {formatDate(subscription.end_date)}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${getStatusClasses(
                          subscription.status,
                        )}`}
                      >
                        {getStatusLabel(subscription.status)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <Link
                        to={`/subscriptions/${subscription.id}`}
                        className="inline-flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-800"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscriptions.length === 0 && (
            <div className="px-8 py-12 text-center text-gray-500">
              There are no subscriptions yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
