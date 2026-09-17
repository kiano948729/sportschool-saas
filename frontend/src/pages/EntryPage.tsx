import { useState } from 'react'
import { requestAccess } from '../api/access'
import { mockAthletes } from '../mock/mockDatabase'
import type { AccessResult } from '../types/access'

type EntryPageProps = {
  onResult?: (result: AccessResult) => void
}

export function EntryPage({ onResult }: EntryPageProps) {
  const [athleteId, setAthleteId] = useState(mockAthletes[0].id)
  const [result, setResult] = useState<AccessResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  async function handleRequestAccess() {
    setIsChecking(true)

    try {
      const accessResult = await requestAccess(athleteId)
      setResult(accessResult)
      onResult?.(accessResult)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <main className="entry-page">
      <section className="entry-panel" aria-labelledby="entry-title">
        <h1 id="entry-title">Entry</h1>

        <div className="access-card">
          <div className="qr-placeholder" aria-label="QR-code placeholder">
            <span>QR</span>
          </div>
          <button
            className="request-button"
            type="button"
            onClick={handleRequestAccess}
            disabled={isChecking}
          >
            {isChecking ? 'Controleren...' : 'Request entry'}
          </button>
        </div>

        <div className="demo-controls">
          <label htmlFor="demo-athlete">Demo sporter</label>
          <select
            id="demo-athlete"
            value={athleteId}
            onChange={(event) => {
              setAthleteId(Number(event.target.value))
              setResult(null)
            }}
          >
            {mockAthletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name}
              </option>
            ))}
          </select>
        </div>

        {result && (
          <p className={`access-message ${result.granted ? 'is-granted' : 'is-denied'}`} role="status">
            {result.message}
          </p>
        )}
      </section>
    </main>
  )
}
