import './Drawer.css';

const Drawer = ({ visible, favorites, watched, onClose }) => {
  return (
    <div className={`drawer ${visible ? 'open' : ''}`}>
      <button className="drawer-close" onClick={onClose}>×</button>
      <h3>Favorites</h3>
      {favorites.map(movie => <div key={movie.id}>{movie.title}</div>)}
      <h3>Watched</h3>
      {watched.map(movie => <div key={movie.id}>{movie.title}</div>)}
    </div>
  );
};

export default Drawer;