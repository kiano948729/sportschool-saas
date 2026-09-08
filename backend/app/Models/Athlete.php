<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Athlete extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
    ];
    protected $hidden = [
        'password',
    ];
    public function subscriptions(): HasOne
    {
        return $this->hasOne(Subscription::class);
    }

    public function accessAttempts(): HasMany
    {
        return $this->hasMany(AccessAttempt::class);
    }
}