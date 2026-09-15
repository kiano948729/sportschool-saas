<?php

use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/subscriptions/{subscription}', [SubscriptionController::class, 'showApi'])->name('api.subscriptions.show');
Route::post('/subscriptions/{subscription}/cancel', [SubscriptionController::class, 'cancelApi'])->name('api.subscriptions.cancel');
