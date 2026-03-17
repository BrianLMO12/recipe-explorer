import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FavoriteButton from './FavoriteButton';
import MagneticButton from './MagneticButton';
import '../styles/RecipeCard.css';

export default function RecipeCard({ recipe, index }) {
  return (
    <motion.div
      className="recipe-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <div className="recipe-card-image-wrapper">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-card-image"
        />
        <div className="recipe-card-overlay">
          <Link to={`/recipe/${recipe.idMeal}`}>
            <MagneticButton className="view-details-btn">
              View Details
            </MagneticButton>
          </Link>
        </div>
      </div>

      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.strMeal}</h3>
        <p className="recipe-card-category">{recipe.strCategory}</p>

        <div className="recipe-card-footer">
          <span className="recipe-card-origin">{recipe.strArea}</span>
          <FavoriteButton mealId={recipe.idMeal} />
        </div>
      </div>
    </motion.div>
  );
}
