import './App.css'
import withResults from './mocks/with-results.json'

function App () {
  function handleSubmit (e) {
    e.preventDetault()
  }
  return (
    <div className='app'>
      <header>
        <h1>Moovie searcher</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Batman, Star wars...' />
          <button type='submit'>search</button>
        </form>
      </header>
      <main className='moovies-container'>
        {withResults.Response === 'True'
          ? (withResults.Search.map(moovie => {
              const { Title, Poster, Year, imdbID } = moovie
              return (
                <div key={imdbID} className='moovie-card'>
                  <img src={Poster} alt={`Poster from the film ${Title}`} />
                  <h4>{Title}</h4>
                  <p>{Year}</p>
                </div>
              )
            }))
          : <p>No results</p>}
      </main>
    </div>
  )
}

export default App
