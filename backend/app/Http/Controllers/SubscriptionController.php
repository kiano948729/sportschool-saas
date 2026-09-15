<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SubscriptionController extends Controller
{
    public function index(): View
    {
        $subscriptions = Subscription::query()->latest()->get();

        return view('subscriptions.index', compact('subscriptions'));
    }

    public function show(Subscription $subscription): View
    {
        if (auth()->check() && $subscription->user_id !== auth()->id()) {
            abort(403);
        }

        return view('subscriptions.show', compact('subscription'));
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
}
