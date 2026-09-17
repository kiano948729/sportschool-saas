import { USE_MOCK_DATA } from '../config'
import { requestMockAccess } from '../mock/mockAccessService'
import type { AccessResult } from '../types/access'

export async function requestAccess(athleteId: number): Promise<AccessResult> {
  if (USE_MOCK_DATA) {
    return requestMockAccess(athleteId)
  }

  const response = await fetch('/api/access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ athleteId }),
  })

  if (!response.ok) {
    throw new Error('Toegang kon niet worden gecontroleerd.')
  }

  return response.json() as Promise<AccessResult>
}
