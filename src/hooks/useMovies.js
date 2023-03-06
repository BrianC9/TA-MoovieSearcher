import { useState } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies () {
  const [movies, setMovies] = useState([])

  async function getMovies (query) {
    try {
      await searchMovies({ query }).then(movies => setMovies(movies))
    } catch (error) {

    }
  }
  return { movies, getMovies }
}
