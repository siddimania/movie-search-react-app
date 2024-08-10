import { useState, useEffect } from "react";

import "./css_files/App.css";
import "./css_files/MovieCard.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=21b055ff";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [inputSearchText, setInputSearchText] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleSearchTextChange = (event) => {
    setInputSearchText(event.target.value);
  };

  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>Movie Turtle</h1>

      <div className="search">
        <input
          type="text"
          value={inputSearchText}
          placeholder="Search for any Movie"
          onChange={handleSearchTextChange}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(inputSearchText)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, i) => (
            <MovieCard movie={movie} key={i} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No movies found</h1>
        </div>
      )}
    </div>
  );
};

export default App;
