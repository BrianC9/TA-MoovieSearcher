import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
// https://www.omdbapi.com/?apikey=e2c2f451&t=star+wars
function App () {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  const { movies } = useMovies()
  console.log('Rendering app')
  function handleSubmit (e) {
    e.preventDefault()
    if (query.trim() === '') {
      setError('Input empty')
      return
    }
    console.log({ query })
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
  }, [query])
  function handleChange (e) {
    setQuery(e.target.value)
  }
  return (
    <div className='app'>
      <header>
        <h1>Moovie searcher</h1>
        <form onSubmit={handleSubmit}>
          <input value={query} onChange={handleChange} name='query' type='text' placeholder='Batman, Star wars...' />
          <button type='submit'>search</button>
        </form>
      </header>
      <main>
        {error && <p className='error'>{error}</p>}
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
