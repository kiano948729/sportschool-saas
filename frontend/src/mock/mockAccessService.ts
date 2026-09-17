import { mockAccessAttempts, mockAthletes } from './mockDatabase'
import type { AccessResult, SubscriptionType } from '../types/access'

const weeklyLimits: Record<SubscriptionType, number | null> = {
  '1x per week': 1,
  '2x per week': 2,
  Onbeperkt: null,
}

export function requestMockAccess(athleteId: number): AccessResult {
  const athlete = mockAthletes.find((candidate) => candidate.id === athleteId)

  if (!athlete) {
    return createResult(false, 'Sporter niet gevonden.', 0, null, null)
  }

  const weeklyLimit = weeklyLimits[athlete.subscriptionType]
  const granted = athlete.active && (weeklyLimit === null || athlete.visitsThisWeek < weeklyLimit)
  const message = !athlete.active
    ? 'Je abonnement is verlopen.'
    : granted
      ? 'Toegang verleend. Veel plezier met trainen!'
      : `Je hebt je limiet van ${weeklyLimit} bezoek${weeklyLimit === 1 ? '' : 'en'} deze week bereikt.`

  mockAccessAttempts.push({ athleteId, granted, createdAt: new Date().toISOString() })

  if (granted) {
    athlete.visitsThisWeek += 1
  }

  return createResult(granted, message, athlete.visitsThisWeek, weeklyLimit, athlete.subscriptionType)
}

function createResult(
  granted: boolean,
  message: string,
  visitsThisWeek: number,
  weeklyLimit: number | null,
  subscriptionType: SubscriptionType | null,
): AccessResult {
  return { granted, message, visitsThisWeek, weeklyLimit, subscriptionType }
}
