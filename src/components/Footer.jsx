import { Heart, Utensils } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <Utensils size={24} className="footer-icon" />
            <h3>RecipeExplorer</h3>
          </div>
          <p className="footer-description">
            Discover delicious recipes from around the world. Explore, save, and cook your favorites.
          </p>
        </div>

        <div className="footer-section">
          <h4>Fun Fact</h4>
          <p className="footer-random-text">
            Did you know? The world's spiciest pepper, the Carolina Reaper, can reach up to 2.2 million Scoville Heat Units. That's 400 times hotter than a jalapeño!
          </p>
        </div>

        <div className="footer-section">
          <h4>Today's Quote</h4>
          <p className="footer-random-text">
            "One cannot think well, love well, sleep well, if one has not dined well." — Virginia Woolf
          </p>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p>
          <span>
            Made with <Heart size={16} className="heart-icon" /> by Recipe Explorer
          </span>
        </p>
        <p className="footer-copyright">
          © {currentYear} All rights reserved. Data powered by TheMealDB & RecipePuppy
        </p>
      </div>
    </footer>
  );
}
