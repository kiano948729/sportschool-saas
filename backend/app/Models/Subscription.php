<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    protected $fillable = [
        'athlete_id',
        'subscription_type_id',
        'start_date',
        'end_date',
        'status',
        'cancellation_date',
        'notice_period',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'cancellation_date' => 'date',
        'notice_period' => 'integer',
    ];

    public function athlete(): BelongsTo
    {
        return $this->belongsTo(Athlete::class);
    }

    public function subscriptionType(): BelongsTo
    {
        return $this->belongsTo(SubscriptionType::class);
    }

    public function accessAttempts(): HasMany
    {
        return $this->hasMany(AccessAttempt::class);
    }
}