import { useState } from "react";
import MovieListComponent from "./MovieList";
import "./SearchMovies.css";
import { sortMovies } from "./utilities";
import MovieModal from './MovieModal'
import Drawer from './Drawer';

const SearchMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  

  const apiKey = import.meta.env.VITE_BEARER_KEY;

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setStatusMessage('');
  };

  const isFavorite = (movie) => favorites.some(f => f.id === movie.id);
const isWatched = (movie) => watched.some(w => w.id === movie.id);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const toggleWatched = (movie) => {
    setWatched((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const handleMovieClick = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    );
    const fullDetails = await response.json();
    setSelectedMovie(fullDetails);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setStatusMessage("Please enter a search term.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Searching...");

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchTerm
      )}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data?.results?.length) {
          const sorted = sortMovies(data.results, sortOption);
          setSearchResults(sorted);
          setStatusMessage(`Found ${data.results.length} results.`);
        } else {
          setSearchResults([]);
          setStatusMessage("No results found.");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setStatusMessage("Error fetching search results.");
        console.error("Search error:", error);
      });
  };

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSortOption(selected);
    const sorted = sortMovies(searchResults, selected);
    setSearchResults(sorted);
  };

  return (
    <div className="search-container">
      <h1>Search Movies</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch}>🔍</button>
        {searchTerm && <button onClick={handleClear}>Clear</button>}
      </div>

      <div className="sort-dropdown">
        <label>Sort by:</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">-- Select --</option>
          <option value="title">Title (A–Z)</option>
          <option value="release_date">Release Date (Newest)</option>
          <option value="rating">Rating (High → Low)</option>
        </select>
      </div>

      {isLoading && <p>{statusMessage}</p>}
      {!isLoading && <p>{statusMessage}</p>}
      {searchResults.length > 0 && (
        <MovieListComponent
          data={searchResults}
          onMovieClick={handleMovieClick}
          onToggleFavorite={toggleFavorite}
          onToggleWatched={toggleWatched}
          isFavorite={isFavorite}
          isWatched={isWatched}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <button onClick={() => setDrawerOpen(true)}>📂 My List</button>
      <Drawer
        visible={drawerOpen}
        favorites={favorites}
        watched={watched}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default SearchMovies;
