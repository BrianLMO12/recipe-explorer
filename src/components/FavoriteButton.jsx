import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import MagneticButton from './MagneticButton';
import '../styles/FavoriteButton.css';

export default function FavoriteButton({ mealId, className = '' }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.includes(mealId));
  }, [mealId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(mealId)) {
      const updated = favorites.filter(id => id !== mealId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorited(false);
    } else {
      favorites.push(mealId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  return (
    <MagneticButton
      onClick={toggleFavorite}
      className={`favorite-button ${isFavorited ? 'favorited' : ''} ${className}`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
    </MagneticButton>
  );
}
