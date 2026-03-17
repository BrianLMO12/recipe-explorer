import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getRecipeDetails } from '../services/api';
import FavoriteButton from '../components/FavoriteButton';
import MagneticButton from '../components/MagneticButton';
import '../styles/RecipeDetails.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    setIsLoading(true);
    const data = await getRecipeDetails(id);
    setRecipe(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="recipe-details-page">
        <div className="details-skeleton">
          <div className="skeleton-image-large" />
          <div className="skeleton-content-large" />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details-page">
        <div className="recipe-not-found">
          <h2>Recipe not found</h2>
          <Link to="/">
            <MagneticButton>Back to Recipes</MagneticButton>
          </Link>
        </div>
      </div>
    );
  }

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="recipe-details-page">
      <Link to="/" className="back-button">
        <MagneticButton className="back-btn">
          <ArrowLeft size={20} />
          Back
        </MagneticButton>
      </Link>

      <motion.div
        className="recipe-details-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Image Section with Parallax */}
        <section className="details-hero">
          <div className="details-parallax-bg" data-parallax data-speed="0.15" />
          <motion.div
            className="details-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="details-image"
            />
            <div className="image-overlay">
              <h1>{recipe.strMeal}</h1>
              <div className="recipe-meta">
                <span className="meta-tag">{recipe.strCategory}</span>
                <span className="meta-tag">{recipe.strArea}</span>
                {recipe.strTags && (
                  <span className="meta-tag">{recipe.strTags.split(',')[0]}</span>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="details-content">
          <div className="content-parallax-bg" data-parallax data-speed="0.1" />

          <motion.div
            className="content-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Ingredients */}
            <div className="details-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="ingredient-check">✓</span>
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="details-section">
              <h2>Instructions</h2>
              <p className="instructions-text">{recipe.strInstructions}</p>
            </div>

            {/* Additional Info */}
            <div className="details-info">
              <div className="info-card">
                <span className="info-label">Category</span>
                <span className="info-value">{recipe.strCategory}</span>
              </div>
              <div className="info-card">
                <span className="info-label">Origin</span>
                <span className="info-value">{recipe.strArea}</span>
              </div>
              {recipe.strYoutube && (
                <div className="info-card">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MagneticButton className="video-btn">
                      Watch Video
                    </MagneticButton>
                  </a>
                </div>
              )}
            </div>

            {/* Favorite Button */}
            <div className="details-actions">
              <FavoriteButton mealId={recipe.idMeal} className="large-favorite" />
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
