import { useState, useEffect } from 'react'
import { getRequests } from '../api/requests.api'

export function useRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getRequests()
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { requests, setRequests, loading, error }
}
