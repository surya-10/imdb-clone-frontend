import React, { useState } from 'react';
import axios from 'axios';

const MoviePosterFinder = () => {
  const [movieName, setMovieName] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [error, setError] = useState('');

  const searchMovie = async () => {
    const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${movieName}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f3b13ec35amsh65448b969605a0bp1590b4jsnaed651fb5aac',
		'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
  };

  return (
    <div>
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter movie name"
      />
      <button onClick={searchMovie}>Search</button>
      {error && <p>{error}</p>}
      {posterUrl && <img src={posterUrl} alt="Movie Poster" />}
    </div>
  );
};

export default MoviePosterFinder;
