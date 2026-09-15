import { useEffect, useState } from 'react'

type Subscription = {
    id: number
    user_id: number
    name: string
    type: string
    status: string
    starts_at: string | null
    access_expires_at: string | null
    cancelled_at: string | null
}

const MySubscriptionPage = () => {
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isCancelling, setIsCancelling] = useState(false)

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await fetch('/api/subscriptions/1')

                if (!response.ok) {
                    throw new Error('Kon abonnement niet ophalen.')
                }

                const result = await response.json()
                setSubscription(result.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Er ging iets mis.')
            } finally {
                setLoading(false)
            }
        }

        fetchSubscription()
    }, [])

    const handleCancel = async () => {
        if (!subscription) {
            return
        }

        const confirmed = window.confirm('Weet je zeker dat je je abonnement wilt annuleren?')
        if (!confirmed) {
            return
        }

        try {
            setIsCancelling(true)
            const response = await fetch(`/api/subscriptions/${subscription.id}/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirm: true }),
            })

            if (!response.ok) {
                const result = await response.json()
                throw new Error(result.message || 'Annuleren is niet gelukt.')
            }

            const result = await response.json()
            setSubscription((current) => current ? { ...current, status: result.data.status ?? 'cancelled' } : current)
            alert(result.message)
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Er ging iets mis bij het annuleren.')
        } finally {
            setIsCancelling(false)
        }
    }

    if (loading) {
        return <p className="mt-10 text-center text-lg font-medium">Abonnement laden...</p>
    }

    if (error || !subscription) {
        return <p className="mt-10 text-center text-lg font-medium text-red-600">{error || 'Geen abonnement gevonden.'}</p>
    }

    const statusLabel = subscription.status === 'cancelled' ? 'Cancelled' : 'Active'

    return (
        <>
            <h1 className="mt-10 mb-8 text-center text-2xl font-bold"> My subscription </h1>

            <div className="mx-auto flex w-[92%] max-w-[900px] items-start justify-between gap-[90px]">
                <div className="flex h-[338px] w-[290px] flex-col justify-between rounded-xl bg-[#d9d9d9] p-[30px_16px]">
                    <div className="h-[20px] w-full bg-white" />

                    <div className="h-[180px] w-full bg-white p-4 text-[11px] text-black">
                        <div className="font-bold uppercase">{subscription.name}</div>
                        <div className="mt-3">Type: {subscription.type}</div>
                        <div className="mt-1">Start: {subscription.starts_at ? new Date(subscription.starts_at).toLocaleDateString('nl-NL') : '—'}</div>
                        <div className="mt-1">Vervalt: {subscription.access_expires_at ? new Date(subscription.access_expires_at).toLocaleDateString('nl-NL') : '—'}</div>
                    </div>

                    <button
                        onClick={handleCancel}
                        disabled={isCancelling || subscription.status === 'cancelled'}
                        className="h-[33px] w-full rounded-lg border-0 bg-white text-[13px] font-bold text-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isCancelling ? 'Annuleren...' : subscription.status === 'cancelled' ? 'Cancelled' : 'Cancel Subscription'}
                    </button>
                </div>

                <div className="flex h-[338px] w-[520px] flex-col overflow-hidden rounded-xl bg-[#eeeeee]">
                    <div className="h-11 shrink-0 bg-[#eeeeee] px-[18px] py-3 text-base font-bold">
                        Subscription: {subscription.name}
                    </div>

                    <div className="flex min-h-11 items-center bg-[#c6c6c6] px-[18px] py-[14px] text-[10px]">
                        Status: {statusLabel}
                    </div>

                    <div className="flex min-h-11 items-center bg-[#e5e5e5] px-[18px] py-[14px] text-[10px]">
                        Times left this week: 1
                    </div>

                    <div className="flex min-h-11 items-center justify-between bg-[#c6c6c6] px-[18px] py-[14px] text-[10px]">
                        <span>Times Requested entries this week: 1</span>
                        <button className="border-0 bg-transparent text-[8px] hover:underline">View all entries</button>
                    </div>

                    <div className="min-h-10 flex-1 bg-[#e5e5e5]" />
                    <div className="min-h-10 flex-1 bg-[#c6c6c6]" />
                    <div className="min-h-10 flex-1 bg-[#e5e5e5]" />
                    <div className="min-h-10 flex-1 bg-[#c6c6c6]" />
                </div>
            </div>
        </>
    )
}

export default MySubscriptionPage