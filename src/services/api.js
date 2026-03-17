import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Sample data to show when API is unreachable.
const FALLBACK_MEALS = [
  {
    idMeal: '99999',
    strMeal: 'Classic Pancakes',
    strCategory: 'Breakfast',
    strArea: 'American',
    strMealThumb:
      'https://images.unsplash.com/photo-1556912999-6f1f8aa02374?auto=format&fit=crop&w=800&q=80',
    strTags: 'Breakfast,Sweet',
    strInstructions:
      'In a bowl, whisk flour, baking powder, salt, and sugar. In another bowl, whisk milk, egg, and melted butter. Combine the wet and dry ingredients until just mixed. Cook on a griddle until golden brown. Serve with syrup.',
    strIngredient1: 'Flour',
    strMeasure1: '1 cup',
    strIngredient2: 'Baking powder',
    strMeasure2: '2 tsp',
    strIngredient3: 'Salt',
    strMeasure3: '1/2 tsp',
    strIngredient4: 'Sugar',
    strMeasure4: '2 tbsp',
    strIngredient5: 'Milk',
    strMeasure5: '1 cup',
    strIngredient6: 'Egg',
    strMeasure6: '1',
    strIngredient7: 'Butter',
    strMeasure7: '2 tbsp',
    strIngredient8: '',
    strMeasure8: '',
    strIngredient9: '',
    strMeasure9: '',
    strIngredient10: '',
    strMeasure10: '',
    strIngredient11: '',
    strMeasure11: '',
    strIngredient12: '',
    strMeasure12: '',
    strIngredient13: '',
    strMeasure13: '',
    strIngredient14: '',
    strMeasure14: '',
    strIngredient15: '',
    strMeasure15: '',
    strIngredient16: '',
    strMeasure16: '',
    strIngredient17: '',
    strMeasure17: '',
    strIngredient18: '',
    strMeasure18: '',
    strIngredient19: '',
    strMeasure19: '',
    strIngredient20: '',
    strMeasure20: '',
    strYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    idMeal: '99998',
    strMeal: 'Spicy Avocado Toast',
    strCategory: 'Snack',
    strArea: 'International',
    strMealThumb:
      'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80',
    strTags: 'Vegan,Quick',
    strInstructions:
      'Toast bread until golden. Mash avocado with lime juice and salt. Spread onto toast and top with chili flakes, pepper, and a drizzle of olive oil.',
    strIngredient1: 'Bread slices',
    strMeasure1: '2',
    strIngredient2: 'Avocado',
    strMeasure2: '1',
    strIngredient3: 'Lime',
    strMeasure3: '1/2',
    strIngredient4: 'Salt',
    strMeasure4: '1/4 tsp',
    strIngredient5: 'Chili flakes',
    strMeasure5: '1/2 tsp',
    strIngredient6: 'Olive oil',
    strMeasure6: '1 tsp',
    strIngredient7: '',
    strMeasure7: '',
    strIngredient8: '',
    strMeasure8: '',
    strIngredient9: '',
    strMeasure9: '',
    strIngredient10: '',
    strMeasure10: '',
    strIngredient11: '',
    strMeasure11: '',
    strIngredient12: '',
    strMeasure12: '',
    strIngredient13: '',
    strMeasure13: '',
    strIngredient14: '',
    strMeasure14: '',
    strIngredient15: '',
    strMeasure15: '',
    strIngredient16: '',
    strMeasure16: '',
    strIngredient17: '',
    strMeasure17: '',
    strIngredient18: '',
    strMeasure18: '',
    strIngredient19: '',
    strMeasure19: '',
    strIngredient20: '',
    strMeasure20: '',
    strYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

function fallbackRecipes(searchTerm) {
  const term = (searchTerm || '').toLowerCase();
  if (!term) return FALLBACK_MEALS;
  return FALLBACK_MEALS.filter((meal) =>
    meal.strMeal.toLowerCase().includes(term) ||
    (meal.strCategory || '').toLowerCase().includes(term) ||
    (meal.strArea || '').toLowerCase().includes(term)
  );
}

// Simple in-memory/session cache to hold recent search results so
// recipe detail pages can load details for items from non-primary APIs.
function saveToCache(meals) {
  try {
    const existing = JSON.parse(sessionStorage.getItem('recipe_cache') || '{}');
    meals.forEach((m) => {
      if (m && m.idMeal) existing[m.idMeal] = m;
    });
    sessionStorage.setItem('recipe_cache', JSON.stringify(existing));
  } catch (e) {
    // ignore
  }
}

function loadFromCache(id) {
  try {
    const existing = JSON.parse(sessionStorage.getItem('recipe_cache') || '{}');
    return existing[id] || null;
  } catch (e) {
    return null;
  }
}

// RecipePuppy search adapter (returns normalized Meal-like objects)
async function searchRecipePuppy(searchTerm) {
  try {
    const url = `http://www.recipepuppy.com/api/?q=${encodeURIComponent(searchTerm)}`;
    const resp = await axios.get(url, { timeout: 7000 });
    const data = resp.data || {};
    const results = data.results || [];

    return results.map((r, idx) => ({
      idMeal: `rp_${encodeURIComponent((r.title || '').trim())}_${idx}`,
      strMeal: (r.title || '').trim(),
      strMealThumb: r.thumbnail || '',
      strCategory: null,
      strArea: null,
      strInstructions: r.href || `See source: ${r.href}`,
      strTags: r.ingredients || '',
      source: 'recipepuppy',
    }));
  } catch (e) {
    return [];
  }
}

export const searchRecipes = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`);
    const meals = response.data.meals;
    if (!meals || meals.length === 0) {
      localStorage.setItem('api_status', 'fallback');
      return fallbackRecipes(searchTerm);
    }
    localStorage.setItem('api_status', 'online');
    return meals;
  } catch (error) {
    console.error('Error searching recipes:', error);
    localStorage.setItem('api_status', 'fallback');
    return fallbackRecipes(searchTerm);
  }
  // Try multiple providers in parallel and merge results. Prefers TheMealDB results first.
  const term = (searchTerm || '').trim();
  if (!term) {
    // when empty, return random or fallback
    try {
      const random = await getRandomRecipes(12);
      saveToCache(random);
      return random;
    } catch (e) {
      return FALLBACK_MEALS;
    }
  }

  const providers = [
    // primary: TheMealDB
    (async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/search.php?s=${encodeURIComponent(term)}`, { timeout: 7000 });
        return response.data.meals || [];
      } catch (e) {
        return [];
      }
    })(),
    // secondary: RecipePuppy
    searchRecipePuppy(term),
  ];

  try {
    const settled = await Promise.allSettled(providers);
    const results = [];
    // collect TheMealDB results first if present
    settled.forEach((s) => {
      if (s.status === 'fulfilled' && Array.isArray(s.value)) {
        s.value.forEach((m) => results.push(m));
      }
    });

    // dedupe by lowercased name
    const seen = new Set();
    const merged = [];
    for (const meal of results) {
      const key = (meal.strMeal || '').toLowerCase();
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(meal);
    }

    if (merged.length === 0) {
      localStorage.setItem('api_status', 'fallback');
      const fb = fallbackRecipes(term);
      saveToCache(fb);
      return fb;
    }

    localStorage.setItem('api_status', 'online');
    saveToCache(merged);
    return merged;
  } catch (e) {
    console.error('Aggregate search error:', e);
    localStorage.setItem('api_status', 'fallback');
    const fb = fallbackRecipes(term);
    saveToCache(fb);
    return fb;
  }
};

export const getRecipeDetails = async (mealId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${encodeURIComponent(mealId)}`);
    const meal = response.data.meals?.[0];
    if (meal) {
      localStorage.setItem('api_status', 'online');
      return meal;
    }

    // Fallback to local meal if ID matches
    localStorage.setItem('api_status', 'fallback');
    return FALLBACK_MEALS.find((m) => m.idMeal === mealId) || null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    localStorage.setItem('api_status', 'fallback');
    return FALLBACK_MEALS.find((m) => m.idMeal === mealId) || null;
  }
  // Try session cache (for items from secondary providers)
  const cached = loadFromCache(mealId);
  if (cached) {
    localStorage.setItem('api_status', 'online');
    return cached;
  }

  // Fallback local meals
  localStorage.setItem('api_status', 'fallback');
  return FALLBACK_MEALS.find((m) => m.idMeal === mealId) || null;
};

export const getRandomRecipes = async (count = 12) => {
  try {
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(axios.get(`${API_BASE_URL}/random.php`));
    }
    const responses = await Promise.all(promises);
    const meals = responses
      .map((res) => res.data.meals?.[0])
      .filter(Boolean);

    const seen = new Set();
    const unique = meals.filter((meal) => {
      if (seen.has(meal.idMeal)) return false;
      seen.add(meal.idMeal);
      return true;
    });

    if (unique.length === 0) {
      localStorage.setItem('api_status', 'fallback');
      return FALLBACK_MEALS;
    }
    localStorage.setItem('api_status', 'online');
    return unique;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    localStorage.setItem('api_status', 'fallback');
    return FALLBACK_MEALS;
  }
};
