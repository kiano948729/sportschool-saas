<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'athlete_id' => $this->athlete_id,
            'subscription_type_id' => $this->subscription_type_id,

            'start_date' => $this->start_date?->format('Y-m-d'),
            'end_date' => $this->end_date?->format('Y-m-d'),

            'status' => $this->status,

            'cancellation_date' => $this->cancellation_date?->format('Y-m-d'),

            'notice_period' => $this->notice_period,

            'athlete' => [
                'id' => $this->athlete->id,
                'first_name' => $this->athlete->first_name,
                'last_name' => $this->athlete->last_name,
                'email' => $this->athlete->email,
                'phone_number' => $this->athlete->phone_number,
            ],

            'subscription_type' => [
                'id' => $this->subscriptionType->id,
                'name' => $this->subscriptionType->name,
                'weekly_visit_limit' => $this->subscriptionType->weekly_visit_limit,
                'unlimited' => $this->subscriptionType->unlimited,
            ],
        ];
    }
}
