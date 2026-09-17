import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  cancelSubscription,
  getSubscription,
  getSubscriptionTypes,
  updateSubscription,
} from "../api/subscriptions";
import type { Subscription, SubscriptionType } from "../types/subscriptions";
import * as React from "react";

export default function SubscriptionDetailPage() {
  const { id } = useParams();

  const subscriptionId = Number(id);

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subscriptionTypes, setSubscriptionTypes] = useState<
    SubscriptionType[]
  >([]);

  const [subscriptionTypeId, setSubscriptionTypeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const subscriptionData = await getSubscription(subscriptionId);
        const subscriptionTypesData = await getSubscriptionTypes();

        setSubscription(subscriptionData);
        setSubscriptionTypes(subscriptionTypesData);

        setSubscriptionTypeId(String(subscriptionData.subscription_type_id));
        setStartDate(subscriptionData.start_date);
        setEndDate(subscriptionData.end_date ?? "");
        setStatus(subscriptionData.status);

        setNoticePeriod(
          subscriptionData.notice_period !== null
            ? String(subscriptionData.notice_period)
            : "",
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [subscriptionId]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const updatedSubscription = await updateSubscription(subscriptionId, {
        subscription_type_id: Number(subscriptionTypeId),
        start_date: startDate,
        end_date: endDate || null,
        status,
        notice_period: noticePeriod === "" ? null : Number(noticePeriod),
      });

      setSubscription(updatedSubscription);
      setMessage("Subscription updated.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Saving failed.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleCancel() {
    if (subscription === null) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel the subscription?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const today = new Date().toISOString().split("T")[0];

      const cancelledSubscription = await cancelSubscription(subscriptionId, {
        cancellation_date: today,
        end_date: endDate || null,
        notice_period: noticePeriod === "" ? null : Number(noticePeriod),
      });

      setSubscription(cancelledSubscription);
      setStatus(cancelledSubscription.status);

      setMessage("Canceled the subscription.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to cancel the subscription.");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-gray-500">Subscription is loading...</p>
      </main>
    );
  }

  if (subscription === null) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-gray-500">Couldn't find the subscription.</p>
      </main>
    );
  }

  const inputClasses =
    "mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  const labelClasses = "block text-sm font-medium text-gray-700";

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/subscriptions"
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to subscriptions
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Subscription management
        </h1>

        <p className="mt-2 text-gray-500">
          See and manage subscription details.
        </p>
      </div>

      <section className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <p className="font-semibold text-gray-900">
          {subscription.athlete.first_name} {subscription.athlete.last_name}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          {subscription.athlete.email}
        </p>

        <p className="text-sm text-gray-600">
          {subscription.athlete.phone_number}
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="subscriptionType" className={labelClasses}>
            Subscription type
          </label>

          <select
            id="subscriptionType"
            value={subscriptionTypeId}
            onChange={(event) => setSubscriptionTypeId(event.target.value)}
            className={inputClasses}
          >
            {subscriptionTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className={labelClasses}>
              Start date
            </label>

            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="endDate" className={labelClasses}>
              End date
            </label>

            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className={labelClasses}>
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={inputClasses}
          >
            <option value="active">Active</option>
            <option value="cancelled">Canceled</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div>
          <label htmlFor="noticePeriod" className={labelClasses}>
            Notice period (days)
          </label>

          <input
            id="noticePeriod"
            type="number"
            min="0"
            value={noticePeriod}
            onChange={(event) => setNoticePeriod(event.target.value)}
            className={inputClasses}
          />
        </div>

        {message && (
          <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save updates"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={saving || subscription.status === "cancelled"}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel subscription
          </button>
        </div>
      </form>
    </main>
  );
}
