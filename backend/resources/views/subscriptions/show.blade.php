<!doctype html>
<html lang="nl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Mijn abonnement</title>
</head>
<body style="font-family: sans-serif; margin: 40px; background: #f5f5f5; color: #111827;">
    <div style="max-width: 720px; margin: 0 auto; background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <h1 style="margin-bottom: 20px;">Mijn abonnement</h1>

        @if (session('success'))
            <div style="background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; padding: 12px 16px; border-radius: 10px; margin-bottom: 20px;">
                {{ session('success') }}
            </div>
        @endif

        @if ($errors->any())
            <div style="background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; padding: 12px 16px; border-radius: 10px; margin-bottom: 20px;">
                {{ $errors->first() }}
            </div>
        @endif

        <dl style="display:grid; gap: 12px; margin-bottom: 24px;">
            <div><strong>Abonnement:</strong> {{ $subscription->name }}</div>
            <div><strong>Status:</strong> {{ ucfirst($subscription->status) }}</div>
            <div><strong>Start:</strong> {{ $subscription->starts_at ? $subscription->starts_at->format('d-m-Y') : 'Onbekend' }}</div>
            <div><strong>Toegang vervalt:</strong> {{ $subscription->access_expires_at ? $subscription->access_expires_at->format('d-m-Y') : 'Volgens voorwaarden' }}</div>
        </dl>

        <form method="POST" action="{{ route('subscriptions.cancel', $subscription) }}">
            @csrf
            <label style="display:flex; align-items:center; gap: 10px; margin-bottom: 16px; font-weight: 600;">
                <input type="checkbox" name="confirm" value="1">
                Ik bevestig dat ik mijn abonnement wil annuleren.
            </label>

            <button type="submit" style="background: #111827; color: white; border: none; padding: 12px 18px; border-radius: 10px; cursor: pointer;">
                Abonnement annuleren
            </button>
        </form>
    </div>
</body>
</html>
