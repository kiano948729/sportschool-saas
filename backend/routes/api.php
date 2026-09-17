<?php

use App\Http\Controllers\SubscriptionController;
use App\Models\SubscriptionType;
use Illuminate\Support\Facades\Route;

Route::get(
    '/subscriptions',
    [SubscriptionController::class, 'index']
);

Route::get(
    '/subscriptions/{subscription}',
    [SubscriptionController::class, 'show']
);

Route::post(
    '/subscriptions',
    [SubscriptionController::class, 'store']
);

Route::put(
    '/subscriptions/{subscription}',
    [SubscriptionController::class, 'update']
);

Route::patch(
    '/subscriptions/{subscription}/cancel',
    [SubscriptionController::class, 'cancel']
);

Route::get('/subscription-types', function () {
    return SubscriptionType::all();
});
