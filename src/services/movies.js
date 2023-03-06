
export async function searchMovies ({ query }) {
  if (query === '') return null
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`)
    const data = await response.json()

    const movies = data.Search
    const mappedMovies = movies.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
    return mappedMovies
  } catch (error) {
    throw new Error('Error searching movies')
  }
}

// return fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`)
//   .then(res => res.json())
//   .then(data => {
//     return data
//   })
