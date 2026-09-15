<?php

namespace Tests\Feature;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriptionCancellationTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_cancel_their_subscription_after_confirmation(): void
    {
        $user = User::factory()->create();
        $subscription = Subscription::factory()->create([
            'user_id' => $user->id,
            'status' => 'active',
        ]);

        $response = $this->actingAs($user)->from(route('subscriptions.show', $subscription))->post(route('subscriptions.cancel', $subscription), [
            'confirm' => '1',
        ]);

        $response->assertRedirect(route('subscriptions.show', $subscription));
        $response->assertSessionHas('success', 'Je abonnement is succesvol geannuleerd.');

        $this->assertDatabaseHas('subscriptions', [
            'id' => $subscription->id,
            'status' => 'cancelled',
        ]);
    }
}
