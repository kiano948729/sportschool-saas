<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccessAttempt extends Model
{
    protected $fillable = [
        'athlete_id',
        'subscription_id',
        'attempted_at',
        'result',
        'reason',
    ];

    protected $casts = [
        'attempted_at' => 'datetime',
    ];

    public function athlete(): BelongsTo
    {
        return $this->belongsTo(Athlete::class);
    }

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }
}