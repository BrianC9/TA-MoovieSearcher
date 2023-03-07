import { useState, useEffect, useRef } from 'react'
export function useQuery () {
  const [query, setQuery] = useState('')
  const [errorQuery, setError] = useState(null)
  const isFirstInput = useRef(true)

  function updateQuery (value) {
    setQuery(value)
  }
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }
    if (query.trim() === '') {
      setError(null)
      return
    }
    if (query.trim().length < 3) {
      setError('Introduce at least 3 chars')
      return
    }
    setError(null)
  }, [query, errorQuery, setError])

  return { query, updateQuery, errorQuery, setError, isFirstInput }
}
