export const sortMovies = (movies, sortKey) => {
    const sorted = [...movies];
    switch (sortKey) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'release_date':
        return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'rating':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return sorted;
    }
  };

export const roundToNearestTenth = (number) => {
    return Math.round(number * 10) / 10;
  }