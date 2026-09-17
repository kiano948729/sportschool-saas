export type SubscriptionType = '1x per week' | '2x per week' | 'Onbeperkt'

export type AccessResult = {
  granted: boolean
  message: string
  visitsThisWeek: number
  weeklyLimit: number | null
  subscriptionType: SubscriptionType | null
}
