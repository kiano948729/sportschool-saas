import type { Subscription, SubscriptionType } from "../types/subscriptions";

const API_URL = "http://localhost:8000/api";

interface ApiResponse<T> {
  data: T;
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const response = await fetch(`${API_URL}/subscriptions`);

  if (!response.ok) {
    throw new Error("Couldn't fetch subscriptions");
  }

  const result: ApiResponse<Subscription[]> = await response.json();

  return result.data;
}

export async function getSubscription(id: number): Promise<Subscription> {
  const response = await fetch(`${API_URL}/subscriptions/${id}`);

  if (!response.ok) {
    throw new Error("Couldn't fetch subscription.");
  }

  const result: ApiResponse<Subscription> = await response.json();

  return result.data;
}

export async function getSubscriptionTypes(): Promise<SubscriptionType[]> {
  const response = await fetch(`${API_URL}/subscription-types`);

  if (!response.ok) {
    throw new Error("Couldn't fetch subscription types");
  }

  return response.json();
}

export async function updateSubscription(
  id: number,
  data: {
    subscription_type_id: number;
    start_date: string;
    end_date: string | null;
    status: string;
    notice_period: number | null;
  },
): Promise<Subscription> {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message ?? "Couldn't update subscription.");
  }

  const result: ApiResponse<Subscription> = await response.json();

  return result.data;
}

export async function cancelSubscription(
  id: number,
  data: {
    cancellation_date: string;
    end_date: string | null;
    notice_period: number | null;
  },
): Promise<Subscription> {
  const response = await fetch(`${API_URL}/subscriptions/${id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message ?? "Couldn't cancel subscription.");
  }

  const result: ApiResponse<Subscription> = await response.json();

  return result.data;
}
