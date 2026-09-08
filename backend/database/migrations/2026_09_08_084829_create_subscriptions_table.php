<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('athlete_id')
                ->constrained('athletes')
                ->cascadeOnDelete();

            $table->foreignId('subscription_type_id')
                ->constrained('subscription_types')
                ->restrictOnDelete();

            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('status');
            $table->date('cancellation_date')->nullable();
            $table->unsignedInteger('notice_period')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
