import { useState, useEffect, useCallback } from 'react'
import debounce from 'just-debounce-it'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useQuery } from './hooks/useQuery'
// https://www.omdbapi.com/?apikey=e2c2f451&t=star+wars

function App () {
  const [sort, setSort] = useState(false)
  const { query, updateQuery, errorQuery } = useQuery()
  const { movies, getMovies, isLoading, errorMovies } = useMovies({ query, sort })
  function handleSubmit (e) {
    e.preventDefault()

    getMovies({ query })
  }
  useEffect(() => {
    console.log('Getting new getMovies', getMovies)
  }, [getMovies])

  const debouncedGetMovies = useCallback(debounce(newQuery => {
    getMovies({ query: newQuery })
  }, 2000), [])

  function handleChange (e) {
    const newQuery = e.target.value
    updateQuery(newQuery)
    if (newQuery === '') return

    debouncedGetMovies(newQuery)
  }
  return (
    <div className='app'>
      <header>
        <h1>Moovie searcher</h1>
        <form onSubmit={handleSubmit}>
          <input required value={query} onChange={handleChange} name='query' type='text' placeholder='Batman, Star wars...' />
          <div className='sort'>
            <label htmlFor='sort'>Sort</label>
            <input type='checkbox' name='sort' id='sort' value={sort} onChange={() => setSort(!sort)} />
          </div>
          <button type='submit' disabled={errorQuery}>search</button>
        </form>
      </header>
      <main>
        {errorQuery && <p className='error'>{errorQuery}</p>}
        {errorMovies && <p className='error'>{errorMovies}</p>}
        {isLoading && <p>Loading movies...</p>}
        <Movies movies={movies} query={query} />
      </main>
    </div>
  )
}

export default App
