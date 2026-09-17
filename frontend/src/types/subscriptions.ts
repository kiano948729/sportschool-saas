export interface Athlete {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface SubscriptionType {
  id: number;
  name: string;
  weekly_visit_limit: number | null;
  unlimited: boolean;
}

export type SubscriptionStatus = "active" | "cancelled" | "expired";

export interface Subscription {
  id: number;
  athlete_id: number;
  subscription_type_id: number;
  start_date: string;
  end_date: string | null;
  status: SubscriptionStatus;
  cancellation_date: string | null;
  notice_period: number | null;
  athlete: Athlete;
  subscription_type: SubscriptionType;
}
