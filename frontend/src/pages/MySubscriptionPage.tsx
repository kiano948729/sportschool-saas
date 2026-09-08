import './MySubscriptionPageStyle.css'

const MySubscriptionPage = () => {
    return (
        <>
            <h1>My subscription</h1>

            <div className="subscription-page">

                <div className="cancel-subscription-card">
                    <div className="information-user-card">
                    </div>

                    <button className="cancel-button">
                        Cancel Subscription
                    </button>
                </div>

                <div className="subscription-information-card">
                    <div className="subscription-title">
                        Subscription: 2x a week
                    </div>

                    <div className="subscription-row">
                        Status: Active
                    </div>

                    <div className="subscription-row light">
                        Times left this week: 1
                    </div>

                    <div className="subscription-row">
                        <span>
                            Times Requested entries this week: 1
                        </span>

                        <button className="view-entries-button">
                            View all entries
                        </button>
                    </div>

                    <div className="empty-row light"></div>
                    <div className="empty-row"></div>
                    <div className="empty-row light"></div>
                    <div className="empty-row"></div>
                </div>

            </div>
        </>
    )
}

export default MySubscriptionPage