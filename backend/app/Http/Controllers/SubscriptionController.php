<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancelSubscriptionRequest;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Http\Resources\SubscriptionResource;
use App\Models\Athlete;
use App\Models\Subscription;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SubscriptionController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $subscriptions = Subscription::with([
            'athlete',
            'subscriptionType',
        ])
            ->orderByDesc('start_date')
            ->get();

        return SubscriptionResource::collection($subscriptions);
    }

    public function show(Subscription $subscription): SubscriptionResource
    {
        $subscription->load([
            'athlete',
            'subscriptionType',
        ]);

        return new SubscriptionResource($subscription);
    }

    public function store(StoreSubscriptionRequest $request): SubscriptionResource
    {
        $data = $request->validated();

        $athlete = Athlete::findOrFail(
            $data['athlete_id']
        );

        if ($athlete->hasActiveSubscription()) {
            abort(
                422,
                'This sporter already has an active subscription.'
            );
        }

        $subscription = Subscription::create($data);

        $subscription->load([
            'athlete',
            'subscriptionType',
        ]);

        return new SubscriptionResource($subscription);
    }

    public function update(UpdateSubscriptionRequest $request, Subscription $subscription): SubscriptionResource
    {
        $subscription->update(
            $request->validated()
        );

        $subscription->load([
            'athlete',
            'subscriptionType',
        ]);

        return new SubscriptionResource($subscription);
    }

    public function cancel(CancelSubscriptionRequest $request, Subscription $subscription): SubscriptionResource
    {
        $data = $request->validated();

        $subscription->update([
            'cancellation_date' => $data['cancellation_date'],
            'end_date' => $data['end_date'] ?? null,
            'notice_period' => $data['notice_period'] ?? null,
            'status' => 'cancelled',
        ]);

        $subscription->load([
            'athlete',
            'subscriptionType',
        ]);

        return new SubscriptionResource($subscription);
    }
}
