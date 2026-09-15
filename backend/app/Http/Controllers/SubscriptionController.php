<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SubscriptionController extends Controller
{
    public function index(): JsonResponse
    {
        $subscriptions = Subscription::query()->latest()->get();

        return response()->json([
            'data' => $subscriptions->map(fn (Subscription $subscription) => [
                'id' => $subscription->id,
                'user_id' => $subscription->user_id,
                'name' => $subscription->name,
                'type' => $subscription->type,
                'status' => $subscription->status,
                'starts_at' => $subscription->starts_at?->toIso8601String(),
                'access_expires_at' => $subscription->access_expires_at?->toIso8601String(),
                'cancelled_at' => $subscription->cancelled_at?->toIso8601String(),
            ])->all(),
        ]);
    }

    public function show(Subscription $subscription): JsonResponse
    {
        if (auth()->check() && $subscription->user_id !== auth()->id()) {
            abort(403);
        }

        return response()->json([
            'data' => [
                'id' => $subscription->id,
                'user_id' => $subscription->user_id,
                'name' => $subscription->name,
                'type' => $subscription->type,
                'status' => $subscription->status,
                'starts_at' => $subscription->starts_at?->toIso8601String(),
                'access_expires_at' => $subscription->access_expires_at?->toIso8601String(),
                'cancelled_at' => $subscription->cancelled_at?->toIso8601String(),
            ],
        ]);
    }

    public function showApi(Subscription $subscription): JsonResponse
    {
        return $this->show($subscription);
    }

    public function cancel(Request $request, Subscription $subscription): RedirectResponse
    {
        if (! $request->boolean('confirm')) {
            return back()->withErrors([
                'confirm' => 'Bevestig de annulering om door te gaan.',
            ]);
        }

        $subscription->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'access_expires_at' => $subscription->access_expires_at ?? now()->addMonth(),
        ]);

        return redirect()->route('subscriptions.show', $subscription)
            ->with('success', 'Je abonnement is succesvol geannuleerd.');
    }

    public function cancelApi(Request $request, Subscription $subscription): JsonResponse
    {
        if (! $request->boolean('confirm')) {
            return response()->json([
                'message' => 'Bevestig de annulering om door te gaan.',
            ], 422);
        }

        $subscription->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'access_expires_at' => $subscription->access_expires_at ?? now()->addMonth(),
        ]);

        return response()->json([
            'message' => 'Je abonnement is succesvol geannuleerd.',
            'data' => [
                'id' => $subscription->id,
                'status' => $subscription->status,
                'cancelled_at' => $subscription->cancelled_at?->toIso8601String(),
            ],
        ]);
    }
}
