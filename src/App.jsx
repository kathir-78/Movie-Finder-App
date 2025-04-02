import { useEffect, useState } from 'react'
import './App.css'
import  {Search}  from './components/search';
import  {MovieCard}  from './components/movieCard';

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorFetch, setErrorFetch] = useState('');
  const [moveList, setMovieList] = useState([]);



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ import.meta.env.VITE_TMDB_API_KEY
    }
  };

  const fetchMovie = async(query = '') => {
    try {

      const API_URL = query ? `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`:
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

      const fetchedMovie = await fetch(API_URL, options);

      if (!fetchedMovie.ok) throw new Error('No movies found');

      const movieData = await fetchedMovie.json();
      console.log(movieData);

      if(movieData.Response === 'False') { 
        setErrorFetch(movieData.Error || 'Failed to fetch the movie');
        setMovieList([]);
        console.log(movieData.error);
        return
       }

       if (movieData.results && movieData.results.length === 0) {
        setErrorFetch('No movies found');
        setMovieList([]);
      } else {
        setErrorFetch('');
        setMovieList([...movieData.results]);
      }

    } catch (error) {
      setErrorFetch(error.message);
      console.log(error);
    } 
  }
  
  useEffect( ()=> {
    fetchMovie(searchTerm);
  }, [searchTerm])

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="/hero-img.png" alt="background image"/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Love Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies mt-10">
          {errorFetch ? (
            <p className="text-red-500">{errorFetch}</p>
          ) : (
          <ul>
          {moveList.map((movie) => (
            <li className="text-white" key={movie.id}>
              <MovieCard  movie={movie}/>
            </li>
          ))}
          </ul>
          )}
      </section>

      </div>
    </main>
  )
}


export default App
