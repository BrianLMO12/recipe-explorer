import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import MagneticButton from '../components/MagneticButton';
import { getRecipeDetails } from '../services/api';
import '../styles/Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadFavorites = async () => {
    setIsLoading(true);
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favoriteIds.length === 0) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    const favoriteRecipes = [];
    for (const id of favoriteIds) {
      const recipe = await getRecipeDetails(id);
      if (recipe) {
        favoriteRecipes.push(recipe);
      }
    }

    setFavorites(favoriteRecipes);
    setIsLoading(false);
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      localStorage.setItem('favorites', '[]');
      setFavorites([]);
    }
  };

  return (
    <div className="favorites-page">
      {/* Hero Section */}
      <section className="favorites-hero">
        <div className="favorites-parallax-bg" data-parallax data-speed="0.1" />
        <div className="favorites-parallax-accent" data-parallax data-speed="0.3" />

        <motion.div
          className="favorites-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="favorites-title">Your Favorite Recipes</h1>
          <p className="favorites-subtitle">
            {favorites.length === 0
              ? 'Save recipes to build your collection'
              : `You have ${favorites.length} favorite recipe${favorites.length !== 1 ? 's' : ''
              }`}
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="favorites-content">
        <div className="favorites-parallax-bg-content" data-parallax data-speed="0.15" />

        {isLoading ? (
          <motion.div
            className="loading-state"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading your favorites...
          </motion.div>
        ) : favorites.length === 0 ? (
          <motion.div
            className="empty-favorites"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-icon">♡</div>
            <h2>No Favorites Yet</h2>
            <p>
              Click the heart icon on any recipe to add it to your favorites
              collection
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="favorites-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="favorites-header">
              <h2>Your Collections ({favorites.length})</h2>
              <MagneticButton
                onClick={clearAllFavorites}
                className="clear-favorites-btn"
              >
                Clear All
              </MagneticButton>
            </div>

            <div className="favorites-grid">
              {favorites.map((recipe, index) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
