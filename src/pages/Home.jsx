import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ChefHat, Flame, UtensilsCrossed } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { searchRecipes, getRandomRecipes } from '../services/api';
import ctaImage from '../assets/undraw_chef_yoa7.svg';
import '../styles/Home.css';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  const loadRandomRecipes = async () => {
    setIsLoading(true);
    const data = await getRandomRecipes(12);
    setRecipes(data);
    setIsLoading(false);
  };

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setHasSearched(true);
    const data = await searchRecipes(searchTerm);
    setRecipes(data);
    setIsLoading(false);
  };

  return (
    <div className="home-page">
      {/* Parallax */}
      <section className="hero-section">
        <div className="hero-parallax-bg" data-parallax data-speed="0.1" />
        <div className="hero-parallax-accent" data-parallax data-speed="0.3" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Discover Recipes</h1>
          <p className="hero-subtitle">
            Explore thousands of delicious recipes from around the world
          </p>
        </motion.div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-parallax-bg" data-parallax data-speed="0.15" />
        <motion.div
          className="search-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>
      </section>

      {/* Recipes Grid Section */}
      <section className="recipes-section" id="recipes">
        <div className="recipes-parallax-bg" data-parallax data-speed="0.2" />

        {/* Floating Icons */}
        <div className="floating-icon floating-icon-1" data-parallax data-speed="0.15">
          <ChefHat size={48} />
        </div>
        <div className="floating-icon floating-icon-2" data-parallax data-speed="0.25">
          <Flame size={40} />
        </div>
        <div className="floating-icon floating-icon-3" data-parallax data-speed="0.18">
          <UtensilsCrossed size={44} />
        </div>

        <motion.div
          className="recipes-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="recipes-header-top">
            <h2>
              {hasSearched ? 'Search Results' : 'Popular Recipes'}
            </h2>
            {!hasSearched && recipes.length > 0 && (
              <button
                className="refresh-button"
                onClick={loadRandomRecipes}
                disabled={isLoading}
                aria-label="Refresh recipes"
              >
                <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
                <span>New Recipes</span>
              </button>
            )}
          </div>
          {!hasSearched && recipes.length > 0 && (
            <p className="recipes-subtext">
              Trending recipes from around the world
            </p>
          )}
        </motion.div>

        {isLoading ? (
          <Loader count={12} />
        ) : recipes.length > 0 ? (
          <div className="recipes-grid">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="empty-state-icon">∅</div>
            <h3>No recipes found</h3>
            <p>Try searching for a different recipe or explore popular ones</p>
          </motion.div>
        )}
      </section>

      {/* CTA Section with Parallax */}
      <section className="cta-section">
        <div className="cta-parallax-bg" data-parallax data-speed="0.25" />
        <div className="cta-parallax-accent" data-parallax data-speed="0.35" />

        <div className="cta-container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Start Your Culinary Journey</h2>
            <p>
              Explore diverse recipes, save your favorites, and discover new
              cooking inspirations every day
            </p>
          </motion.div>

          <motion.div
            className="cta-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img src={ctaImage} alt="Woman with blender" className="cta-image" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
