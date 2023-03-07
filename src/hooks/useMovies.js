import { useRef, useState, useMemo } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies ({ query, sort }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMovies, setError] = useState(null)
  const previousQuery = useRef(query)

  const getMovies = useMemo(() => {
    return async ({ query }) => {
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
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }
  , [movies, sort])
  return { movies: sortedMovies, isLoading, errorMovies, getMovies }
}
