# RecipeExplorer - Quick Reference Guide

## File Locations and Navigation

```
src/
├── App.jsx                          # Main app with router setup
├── main.jsx                         # React entry point
│
├── components/
│   ├── Navbar.jsx                  # Sticky navbar with theme toggle
│   ├── SearchBar.jsx               # Search input component
│   ├── RecipeCard.jsx              # Recipe grid card
│   ├── MagneticButton.jsx          # Button with magnetic hover
│   ├── ThemeToggle.jsx             # Light/dark mode switcher
│   ├── FavoriteButton.jsx          # Heart button for favorites
│   └── Loader.jsx                  # Skeleton loader comp
│
├── pages/
│   ├── Home.jsx                    # Landing + grid browse
│   ├── RecipeDetails.jsx           # Full recipe details view
│   └── Favorites.jsx               # Saved recipes collection
│
├── services/
│   └── api.js                      # TheMealDB API calls
│
└── styles/
    ├── global.css                  # Theme vars & base styles
    ├── Home.css                    # Home page parallax sections
    ├── RecipeDetails.css           # Recipe page styles
    ├── Favorites.css               # Favorites page styles
    ├── Navbar.css                  # Navigation bar
    ├── SearchBar.css               # Search bar styles
    ├── RecipeCard.css              # Recipe card grid
    ├── MagneticButton.css          # Magnetic button effect
    ├── ThemeToggle.css             # Theme toggle button
    ├── FavoriteButton.css          # Favorite heart button
    └── Loader.css                  # Skeleton loader animation
```

## Quick Commands

```bash
# Development
npm run dev                  # Start dev server (http://localhost:5173)
npm run build              # Create production build
npm run preview            # Preview production build locally
npm run lint               # Run ESLint

# Dependencies
npm install                # Install all packages
npm update                 # Update packages
npm list                   # Show installed packages
```

## Component Props Reference

### Navbar
```jsx
<Navbar />
// - Auto-includes theme toggle
// - Active link detection
// - Responsive navigation
```

### SearchBar
```jsx
<SearchBar 
  onSearch={(term) => {}} // Callback with search term
  isLoading={false}        // Show loading state
/>
```

### RecipeCard
```jsx
<RecipeCard 
  recipe={mealObject}      // Meal object from API
  index={0}                // For stagger animation
/>
```

### MagneticButton
```jsx
<MagneticButton
  onClick={handleClick}    // Click handler
  className="primary"      // Optional class
  disabled={false}         // Disable state
>
  Button Text
</MagneticButton>
```

### FavoriteButton
```jsx
<FavoriteButton 
  mealId="52772"           // Meal ID to save
  className=""             // Optional class
/>
// Toggles localStorage favorites array
```

### ThemeToggle
```jsx
<ThemeToggle />
// - Toggles data-theme attribute on root
// - Saves to localStorage
// - Shows Sun/Moon icons
```

### Loader
```jsx
<Loader count={12} />
// Shows 12 skeleton cards (or custom count)
// Shimmer animation during loading
```

## API Reference

### searchRecipes(searchTerm)
```javascript
import { searchRecipes } from '@/services/api'

const meals = await searchRecipes('pasta')
// Returns: Array of meal objects or []
// Meal object includes: idMeal, strMeal, strMealThumb, etc.
```

### getRecipeDetails(mealId)
```javascript
import { getRecipeDetails } from '@/services/api'

const meal = await getRecipeDetails('52772')
// Returns: Single meal object with full details
// Includes ingredients (1-20 pairs) and instructions
```

### getRandomRecipes(count)
```javascript
import { getRandomRecipes } from '@/services/api'

const meals = await getRandomRecipes(12)
// Returns: Array of random meals (deduped)
// Used for Home page initial load
```

## CSS Theme Variables

```css
/* Light Mode (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f8f8;
  --bg-tertiary: #f0f0f0;
  --text-primary: #000000;
  --text-secondary: #333333;
  --text-tertiary: #666666;
  --accent: #FF8C42;
  --border-color: #e0e0e0;
}

/* Dark Mode */
[data-theme="dark"] {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-tertiary: #b0b0b0;
  --accent: #FF8C42;
  --border-color: #333333;
}
```

## localStorage Keys

```javascript
// Theme preference
localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme')

// Favorite recipes (array of IDs)
localStorage.setItem('favorites', JSON.stringify(['52772', '52775']))
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
```

## Routing Map

```
/                    → Home page (search + grid)
/recipe/:id          → Recipe details page
/favorites           → Saved recipes page
/404 or invalid      → Falls through to Home
```

## Parallax Speeds Reference

```
Speed: 0.0  → No movement (fixed)
Speed: 0.1  → Very slow (far background)
Speed: 0.2  → Slow (mid background)
Speed: 0.3  → Medium (mid layer)
Speed: 0.4  → Faster (foreground)
Speed: 0.5+ → Very fast (extreme foreground)
```

## Responsive Grid Breakpoints

```css
Desktop   (≥1024px)  : 4 columns
Tablet    (768-1023) : 2 columns
Mobile    (<768px)   : 1 column
```

## Common Development Tasks

### Adding a New Page
1. Create `src/pages/NewPage.jsx`
2. Import in `App.jsx`
3. Add Route in Router
4. Create `src/styles/NewPage.css`
5. Import CSS in component

### Adding a New Component
1. Create `src/components/NewComponent.jsx`
2. Create `src/styles/NewComponent.css`
3. Import CSS at top of component
4. Use in pages/components

### Changing Theme Colors
1. Edit color variables in `src/styles/global.css`
2. Update both :root (light) and [data-theme="dark"]
3. Use `var(--color-name)` in all CSS files

### Debugging API Calls
```javascript
// In component
useEffect(() => {
  const test = async () => {
    const data = await getRecipeDetails('52772')
    console.log('Recipe:', data)
  }
  test()
}, [])
```

### Performance Profiling
```javascript
// In console (DevTools)
performance.mark('searchStart')
// ... do something
performance.mark('searchEnd')
performance.measure('search', 'searchStart', 'searchEnd')
performance.getEntriesByName('search')[0].duration
```

## Keyboard Shortcuts (Dev)

In browser DevTools:
- `Ctrl/Cmd + Shift + C`: Inspector
- `F5`: Reload page
- `Ctrl/Cmd + Shift + Delete`: Clear cache
- `Ctrl/Cmd + K`: Focus search in DevTools

## Build Checklist

Before deploying:
- [ ] Test all pages and routes
- [ ] Test dark/light mode toggle
- [ ] Test favorites save/load
- [ ] Test on mobile (DevTools)
- [ ] Test API calls work
- [ ] Check for console errors
- [ ] Lighthouse audit score
- [ ] Test on real device
- [ ] Run `npm run build` - no errors
- [ ] Test with `npm run preview`

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Styles not applying | Clear browser cache, restart dev server |
| API not responding | Check internet, verify TheMealDB is up |
| Theme not persisting | Check localStorage enabled, reload page |
| Parallax not smooth | Check scroll events, verify data attributes |
| Layout shifts on load | Verify Loader skeleton sizes match cards |
| Mobile looks broken | Check responsive breakpoints, test zoom levels |
| Hot reload not working | Restart dev server, check file saves |
| Build fails | Check console errors, verify all imports |

## Git Workflow (if using Git)

```bash
git add .
git commit -m "feat: add feature name"
git push origin main

# Common messages
feat:    New feature
fix:     Bug fix
style:   CSS/styling
refactor: Code refactoring
docs:    Documentation
```

## Performance Tips

- Keep parallax speeds between 0.1 and 0.5
- Limit Framer Motion animations to essential elements
- Use `will-change` only for actively animated elements
- Avoid layout thrashing in scroll handlers
- Cache API responses when possible
- Lazy load images for favorites page

## Resources

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Framer Motion**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev
- **Vite**: https://vite.dev
- **TheMealDB API**: https://www.themealdb.com/api.php
- **CSS MDN**: https://developer.mozilla.org/en-US/docs/Web/CSS

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Node Version Required**: 16+
