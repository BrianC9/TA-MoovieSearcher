import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useQuery } from './hooks/useQuery'
// https://www.omdbapi.com/?apikey=e2c2f451&t=star+wars

function App () {
  const { movies, getMovies } = useMovies()
  const { query, handleChange, error } = useQuery()
  console.log('Rendering app')
  function handleSubmit (e) {
    e.preventDefault()

    getMovies(query)
    console.log({ query })
  }

  return (
    <div className='app'>
      <header>
        <h1>Moovie searcher</h1>
        <form onSubmit={handleSubmit}>
          <input required value={query} onChange={handleChange} name='query' type='text' placeholder='Batman, Star wars...' />
          <button type='submit' disabled={error}>search</button>
        </form>
      </header>
      <main>
        {error && <p className='error'>{error}</p>}
        <Movies movies={movies} query={query} />
      </main>
    </div>
  )
}

export default App
