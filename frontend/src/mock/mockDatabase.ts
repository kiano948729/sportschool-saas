import type { SubscriptionType } from '../types/access'

export type MockAthlete = {
  id: number
  name: string
  subscriptionType: SubscriptionType
  active: boolean
  visitsThisWeek: number
}

export const mockAthletes: MockAthlete[] = [
  { id: 1, name: 'Test Sporter 1x', subscriptionType: '1x per week', active: true, visitsThisWeek: 0 },
  { id: 2, name: 'Test Sporter 2x', subscriptionType: '2x per week', active: true, visitsThisWeek: 0 },
  { id: 3, name: 'Test Sporter Onbeperkt', subscriptionType: 'Onbeperkt', active: true, visitsThisWeek: 7 },
  { id: 4, name: 'Test Sporter Verlopen', subscriptionType: '1x per week', active: false, visitsThisWeek: 0 },
]

export type MockAccessAttempt = {
  athleteId: number
  granted: boolean
  createdAt: string
}

export const mockAccessAttempts: MockAccessAttempt[] = []
