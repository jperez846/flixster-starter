import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2 id="modal-title">{movie.title}</h2>
        <div id="modal-content">
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
              alt={`${movie.title} backdrop`}
              className="modal-image"
            />
            <figcaption>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Runtime:</strong>{" "}
                {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres?.map((g) => g.name).join(", ")}
              </p>
              <p>
                <strong>Overview:</strong> {movie.overview}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
