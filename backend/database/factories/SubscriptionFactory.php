<?php

namespace Database\Factories;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    protected $model = Subscription::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => '2× per week',
            'type' => '2x_per_week',
            'status' => 'active',
            'starts_at' => now()->subDays(10),
            'access_expires_at' => now()->addMonth(),
            'cancelled_at' => null,
        ];
    }
}
