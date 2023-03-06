import { useState } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies () {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMovies, setError] = useState(null)

  async function getMovies (query) {
    try {
      setIsLoading(true)
      const responseMovies = await searchMovies({ query })
      setMovies(responseMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { movies, getMovies, isLoading, errorMovies }
}
