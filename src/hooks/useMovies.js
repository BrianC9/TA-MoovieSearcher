import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies ({ query }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMovies, setError] = useState(null)
  const previousQuery = useRef(query)
  async function getMovies (query) {
    if (previousQuery.current === query) return
    try {
      previousQuery.current = query
      setIsLoading(true)
      const responseMovies = await searchMovies({ query })
      setMovies(responseMovies)
    } catch (error) {
      setError(error.message)
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }
  return { movies, getMovies, isLoading, errorMovies }
}
