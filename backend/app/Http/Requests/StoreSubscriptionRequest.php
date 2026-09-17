<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubscriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'athlete_id' => [
                'required',
                'integer',
                'exists:athletes,id',
            ],
            'subscription_type_id' => [
                'required',
                'integer',
                'exists:subscription_types,id',
            ],
            'start_date' => [
                'required',
                'date',
            ],
            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],
            'status' => [
                'required',
                Rule::in([
                    'active',
                    'cancelled',
                    'expired',
                ]),
            ],
            'cancellation_date' => [
                'nullable',
                'date',
            ],
            'notice_period' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ];
    }
}
