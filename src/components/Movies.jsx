import '../App.css'
function MovieList ({ movies }) {
  return (
    <section className='movies-container'>
      {movies.map(movie => {
        const { title, poster, year, id } = movie
        return (
          <div key={id} className='movie-card'>
            <img src={poster === 'N/A' ? 'https://picsum.photos/300/400' : poster} alt={`Poster from the film ${title}`} />
            <h4>{title}</h4>
            <p>{year}</p>
          </div>
        )
      })}
    </section>
  )
}
function NoResults () {
  return <p>There are no results </p>
}
export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies ? <MovieList movies={movies} /> : <NoResults />

  )
}
