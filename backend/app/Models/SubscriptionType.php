<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriptionType extends Model
{
    protected $fillable = [
        'name',
        'weekly_visit_limit',
        'unlimited',
    ];

    protected $casts = [
        'weekly_visit_limit' => 'integer',
        'unlimited' => 'boolean',
    ];

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }   
}