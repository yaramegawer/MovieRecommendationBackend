const express = require('express');
const axios = require('axios');
const { urlencoded } = require('body-parser');
require('dotenv').config(); // Load environment variables

// TMDb API URL and Key
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';

const getRecommendation = async (req, res) => {
const movieTitle = req.query.title;

  if (!movieTitle) {
    return res.status(400).json({ error: 'Please provide a movie title' });
  }
  try {
    // Step 1: Search for the movie by title to get its ID
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&include_adult=false&language=en-US&page=1`;
    const searchResponse = await axios.get(searchUrl);

    if (searchResponse.data.results.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movieId = searchResponse.data.results[0].id;

    // Step 2: Get recommendations based on the movie ID
    const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    const recommendationsResponse = await axios.get(recommendationsUrl);

    const recommendations = recommendationsResponse.data.results.map(movie => ({
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    }));

    res.json({ movie: searchResponse.data.results[0].title, recommendations });
  } catch (error) {
    console.error('Error fetching movie data:', error);
    // If the error is due to a 403 Forbidden, provide a specific message
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ error: 'Access forbidden. Check your API key or permissions.' });
    }
    res.status(500).json({ error: 'An error occurred while fetching movie data' });
  }
};

module.exports = { getRecommendation };
