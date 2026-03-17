# RecipeExplorer Setup & Development Guide

## Quick Start

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Server runs on `http://localhost:5173/`

## Project Architecture

### Component Hierarchy

```
App
├── Navbar
│   ├── Logo + Links
│   └── ThemeToggle
├── Routes
│   ├── Home - Browse recipes
│   │   ├── SearchBar
│   │   ├── RecipeCard (grid)
│   │   │   └── FavoriteButton
│   │   └── Loader (skeleton)
│   ├── RecipeDetails - Full recipe view
│   │   ├── Back button (MagneticButton)
│   │   └── FavoriteButton
│   └── Favorites - Saved recipes
│       ├── RecipeCard (grid)
│       └── Clear All button (MagneticButton)
```

### Key React Hooks Used

- `useState`: Component state management
- `useEffect`: Side effects (API calls, parallax setup, localStorage)
- `useParams`: Get recipe ID from URL
- `useLocation`: Get current route for active nav links
- `useRef`: Refs for magnetic button effect

## API Integration

### TheMealDB Service (`src/services/api.js`)

```javascript
// Search recipes
searchRecipes(searchTerm) // Returns array of meals

// Get recipe details
getRecipeDetails(mealId) // Returns single meal object

// Get random recipes
getRandomRecipes(count) // Returns array of random meals
```

### API Response Structure
```javascript
{
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strMealThumb: "https://...",
  strCategory: "Chicken",
  strArea: "Japanese",
  strIngredient1: "Chicken",
  strMeasure1: "500g",
  strInstructions: "...",
  strYoutube: "https://..."
}
```

## Parallax Scrolling Implementation

### How It Works

1. Elements have `data-parallax` attribute with `data-speed` value
2. App.jsx listens to scroll events globally
3. Transforms translateY based on scrollY * speed
4. Lower speeds = slower movement = depth effect

### Usage
```jsx
<div data-parallax data-speed="0.1" className="background">
  Background content
</div>
<div data-parallax data-speed="0.3" className="midground">
  Midground content
</div>
<div data-parallax data-speed="0.5" className="foreground">
  Foreground content
</div>
```

### Speed Values
- 0.1: Very slow (far background)
- 0.2-0.3: Medium (mid layers)
- 0.4-0.5: Faster (foreground)

### Sections with Parallax
- Home hero section (0.1, 0.3)
- Search section (0.15)
- Recipes grid (0.2)
- CTA section (0.25, 0.35)
- Recipe details hero (0.15)
- Recipe details content (0.1)
- Favorites hero (0.1, 0.3)
- Favorites content (0.15)

## Magnetic Button Implementation

### How It Works

1. MagneticButton tracks mouse move events
2. Calculates distance from button center to cursor
3. Applies subtle transform translate (20% of distance)
4. Smooth return to origin on mouse leave

### Physics
- **Distance factor**: 0.15 (adjust for more/less movement)
- **Smooth return**: CSS transition 0.3s cubic-bezier
- **No snap**: Only transform properties (GPU optimized)

### Hover States
- Primary: Orange accent with shadow elevation
- Secondary: Transparent with orange border
- Large/Small variants: Different padding

## Dark/Light Mode System

### Implementation

1. Theme stored in localStorage as `'light'` or `'dark'`
2. Applied to document root: `data-theme="light"` | `data-theme="dark"`
3. CSS custom properties switch based on theme
4. System preference detected on first visit
5. ThemeToggle component manages toggling

### CSS Variables (root)

**Light Mode (default)**
```css
--bg-primary: white
--bg-secondary: #f8f8f8
--text-primary: black
--accent: #FF8C42
```

**Dark Mode**
```css
--bg-primary: black
--bg-secondary: #1a1a1a
--text-primary: white
--accent: #FF8C42
```

### All Components Use Variables
All colors in component CSS use CSS custom properties, not hardcoded colors.

## State Management

### localStorage Keys

**Theme**
```javascript
localStorage.getItem('theme') // 'light' | 'dark'
localStorage.setItem('theme', isDark ? 'dark' : 'light')
```

**Favorites**
```javascript
// Stored as JSON array of meal IDs
["52772", "52775", "52776"]
localStorage.getItem('favorites')
localStorage.setItem('favorites', JSON.stringify(ids))
```

### Local State (React)
- Component level only
- No global state manager (Context not needed for this app size)
- Props drilled as needed

## Responsive Breakpoints

```css
/* Desktop */
1024px+ : 4-column grid

/* Tablet */
768px - 1023px : 2-column grid

/* Mobile */
< 768px : 1-column grid

/* Extra small */
< 480px : Further optimizations
```

### Mobile Optimizations
- Reduced font sizes
- Reduced padding/margins
- Hidden elements (logo text in navbar)
- Adjusted parallax speeds for smaller screens
- Touch-friendly button sizes

## Animations

### Framer Motion Usage

**RecipeCard**
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{ y: -8 }}
```

**Loader Skeleton**
```jsx
animate={{ opacity: [0.5, 1, 0.5] }}
transition={{ duration: 1.5, repeat: Infinity }}
```

### CSS Animations
- Scrollbar shimmer effect
- Parallax transforms (via scroll)
- Button hover transforms (via CSS transitions)
- Color transitions between light/dark mode

### Timing Functions
- `ease`: Default transitions
- `cubic-bezier(0.23, 1, 0.320, 1)`: Smooth magnetic button return
- `linear`: Shimmer animation

## Performance Considerations

### Optimizations Applied
1. **Scroll Event**: Passive listener (`{ passive: true }`)
2. **Transform Only**: Parallax uses GPU-accelerated transforms
3. **Will-change**: CSS hints for browser optimization
4. **Lazy Images**: Native lazy loading on recipe images
5. **Skeleton Loaders**: Prevents CLS (Cumulative Layout Shift)
6. **Memoized**: Framer Motion optimizes animations

### Further Optimizations Could Include
- Image lazy loading libraries (react-lazyload)
- Code splitting for routes
- Image optimization (next/image equivalent)
- State management optimization for large favorites lists

## Debugging Tips

### Console Logging
```javascript
// Check theme
console.log(document.documentElement.getAttribute('data-theme'))

// Check favorites
console.log(JSON.parse(localStorage.getItem('favorites') || '[]'))

// Test API
console.log(await getRecipeDetails('52772'))
```

### DevTools
- Use React DevTools to inspect component state
- Use CSS DevTools to change theme attribute and see styles change
- Use Network tab to monitor API calls to TheMealDB

### Common Issues

**Styles not loading**
- Check if global.css is imported in App.jsx
- Verify component-specific CSS is imported in component

**Theme not persisting**
- Check localStorage is enabled in browser
- Verify ThemeToggle component is rendered in Navbar

**Parallax not working**
- Check data-parallax and data-speed attributes exist
- Verify scroll listener in App.jsx is attached
- Test with `window.scrollY` in console

**Magnetic buttons not responding**
- Ensure MagneticButton uses useRef and event listeners
- Check mouse events are firing (add console.logs)
- Test on desktop (may not work well on mobile touch)

## Environment Variables

Currently, no .env file is needed. All API calls use TheMealDB's free public API.

If using in production:
- Consider CORS proxy if needed
- Add error handling for slow networks
- Implement request caching

## Build & Deployment

### Build Process
```bash
npm run build
# Creates dist/ folder with optimized build

npm run preview
# Serves dist/ locally to preview build
```

### Deploy to Hosting
- Copy contents of `dist/` folder to hosting
- Requires server support for SPA routing (404 → index.html)
- Or use: Vercel, Netlify (automatic SPA support)

### Build Output
- Minified JS and CSS
- Optimized images
- Source maps in development

## File Size & Optimization

After build:
- JS bundle: ~150-200KB (with dependencies)
- CSS bundle: ~20-30KB
- Parallax library: None (vanilla JS)
- Icon library: Tree-shaken by Vite

## Future Enhancement Opportunities

1. **Search Filters**: Category, cuisine, difficulty
2. **Recipe Ratings**: Star ratings with localStorage
3. **Meal Plans**: Weekly meal planning
4. **Print Recipe**: Print-optimized layout
5. **Share Recipes**: Social sharing buttons
6. **User Accounts**: Auth with database
7. **Recipe Video**: Embed YouTube videos
8. **Nutrition Info**: Show macro/micro nutrients

## Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Android Chrome 80+

## Code Style & Best Practices

### Component Structure
```jsx
// Imports
import { useState, useEffect } from 'react'
import Component from './Component'
import '../styles/Component.css'

// Component
export default function MyComponent() {
  // State
  const [state, setState] = useState(initial)

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    }
  }, [dependency])

  // Handlers
  const handleClick = () => {}

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### CSS Organization
1. Selectors (.component-name)
2. Base styles
3. States (:hover, .active)
4. Animations
5. Responsive media queries

### Naming Conventions
- Components: PascalCase (MyComponent.jsx)
- Files: match component name
- CSS classes: kebab-case (.my-component)
- Variables: camelCase (myVariable)
- Constants: UPPER_SNAKE_CASE

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### CSS Not Compiling
- Check for syntax errors in CSS
- Ensure CSS file is imported in component or App.jsx
- Clear browser cache (Ctrl+Shift+Delete)

### API Not Responding
- Check internet connection
- Visit https://www.themealdb.com/api.php directly
- Check browser console for CORS errors
- TheMealDB might be down (check status page)

---

For more information, see README.md for feature documentation.
