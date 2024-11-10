import { useState, useEffect } from 'react';
import Movies from '../components/Movies';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

const APY_KEY = import.meta.env.VITE_APY_KEY;

function Main() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchMovies = (str, type = 'all') => {
    setLoading(true);
    fetch(`https://omdbapi.com?apikey=${APY_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`https://omdbapi.com?apikey=${APY_KEY}&s=matrix`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className='container content'>
      <Search searchMovies={searchMovies} />
      {loading ? <Preloader /> : <Movies movies={movies} />}
    </main>
  );
}

export default Main;
