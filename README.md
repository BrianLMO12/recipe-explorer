# RecipeExplorer

A recipe explorer web application built with **React**, **Vite**, and modern web technologies. Discover, search, and save your favorite recipes with an interactive user interface.

## Features

**Core Features**
- Search recipes from TheMealDB API
- Browse recipes in a responsive grid
- View detailed recipe information with ingredients and instructions
- Save favorite recipes locally using localStorage
- View and manage your collection of favorites

**UI/UX Features**
- Scroll animations
- Dark mode and light mode toggle
- Smooth animations powered by Framer Motion
- Professional, polished design with black, orange, and white color
- Skeleton loading
- Responsive design (desktop, tablet, mobile)

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: TheMealDB (https://www.themealdb.com/api.php)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation bar with theme toggle
│   ├── SearchBar.jsx        # Recipe search input with magnetic button
│   ├── RecipeCard.jsx       # Individual recipe card in grid
│   ├── FavoriteButton.jsx   # Heart button for saving favorites
│   ├── MagneticButton.jsx   # Button with cursor-attracting hover
│   ├── ThemeToggle.jsx      # Dark/light mode switcher
│   └── Loader.jsx           # Skeleton loader component
├── pages/
│   ├── Home.jsx             # Main landing page with search and grid
│   ├── RecipeDetails.jsx    # Full recipe view with ingredients
│   └── Favorites.jsx        # Saved favorites management
├── services/
│   └── api.js               # TheMealDB API service
├── styles/
│   ├── global.css           # Global theme variables and resets
│   ├── Navbar.css
│   ├── SearchBar.css
│   ├── RecipeCard.css
│   ├── MagneticButton.css
│   ├── ThemeToggle.css
│   ├── FavoriteButton.css
│   ├── Loader.css
│   ├── Home.css             # Parallax sections
│   ├── RecipeDetails.css
│   └── Favorites.css
├── App.jsx                  # Router setup and global parallax handler
├── main.jsx                 # React entry point
└── index.css                # Empty (styles in global.css)
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to project directory:
```bash
cd path/to/web
```

2. Dependencies are already installed. To verify or install fresh:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser. The app will automatically reload on file changes.

### Production Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Future Enhancements

- User authentication
- Recipe ratings and reviews
- Advanced filtering and sorting
- Recipe nutrition information
- Meal planning features
- Print recipes
- Share recipes via social media

## License

This project is open source. Built as a professional portfolio demonstration.

## Contact

For inquiries or contributions, please reach out through the project repository.

