const MySubscriptionPage = () => {
    return (
        <>
            <h1 className="mt-10 mb-8 text-center text-2xl font-bold"> My subscription </h1>

            <div className="mx-auto flex w-[92%] max-w-[900px] items-start justify-between gap-[90px]">

                {/* Left card */}
                <div className="flex h-[338px] w-[290px] flex-col justify-between rounded-xl bg-[#d9d9d9] p-[30px_16px]">

                    {/* Plaatje */}
                    <div className="h-[20px] w-full bg-white">
                    </div>

                    {/* Informatie van de subscriptions */}
                    <div className="h-[180px] w-full bg-white">
                    </div>

                    {/* Cancel button */}
                    <button className="h-[33px] w-full rounded-lg border-0 bg-white text-[13px] font-bold text-black hover:bg-gray-100">
                        Cancel Subscription
                    </button>
                </div>


                {/* Right card */}
                <div className="flex h-[338px] w-[520px] flex-col overflow-hidden rounded-xl bg-[#eeeeee]">

                    {/* Title */}
                    <div className="h-11 shrink-0 bg-[#eeeeee] px-[18px] py-3 text-base font-bold"> Subscription: 2x a week </div>

                    {/* Status */}
                    <div className="flex min-h-11 items-center bg-[#c6c6c6] px-[18px] py-[14px] text-[10px]"> Status: Active </div>

                    {/* Times left */}
                    <div className="flex min-h-11 items-center bg-[#e5e5e5] px-[18px] py-[14px] text-[10px]"> Times left this week: 1 </div>

                    {/* Requested entries */}
                    <div className="flex min-h-11 items-center justify-between bg-[#c6c6c6] px-[18px] py-[14px] text-[10px]">
                        <span>
                            Times Requested entries this week: 1
                        </span>

                        <button className="border-0 bg-transparent text-[8px] hover:underline">
                            View all entries
                        </button>
                    </div>

                    {/* Empty rows */}
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