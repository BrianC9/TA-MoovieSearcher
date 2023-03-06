import { useState, useEffect, useRef } from 'react'
export function useQuery () {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  function handleChange (e) {
    setQuery(e.target.value)
  }
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }

    if (query.trim().length < 3) {
      setError('Introduce at least 3 chars')
      return
    }
    setError(null)
  }, [query, error, setError])

  return { query, handleChange, error, setError, isFirstInput }
}