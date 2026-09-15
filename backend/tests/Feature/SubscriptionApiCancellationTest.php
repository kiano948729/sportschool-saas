<?php

namespace Tests\Feature;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubscriptionApiCancellationTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_cancel_a_subscription_via_the_api(): void
    {
        $user = User::factory()->create();
        $subscription = Subscription::factory()->create([
            'user_id' => $user->id,
            'status' => 'active',
        ]);

        $response = $this->postJson("/api/subscriptions/{$subscription->id}/cancel", [
            'confirm' => true,
        ]);

        $response->assertOk()
            ->assertJsonPath('message', 'Je abonnement is succesvol geannuleerd.');

        $this->assertDatabaseHas('subscriptions', [
            'id' => $subscription->id,
            'status' => 'cancelled',
        ]);
    }
}
