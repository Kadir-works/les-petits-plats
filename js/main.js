// js/main.js

import { recipes } from "./recipes.js";
import { displayRecipes } from "./display.js";
import { updateFilterTags, addFilterInputListeners } from "./filters.js";
import { updateRecipeCount } from "./search.js";

/**
 * @typedef {Object} Recipe
 * @property {number} id
 * @property {string} image
 * @property {string} name
 * @property {number} servings
 * @property {Array<Object>} ingredients
 * @property {number} time
 * @property {string} description
 * @property {string} appliance
 * @property {Array<string>} ustensils
 */

/**
 * Objet global pour suivre l'état des filtres sélectionnés.
 * Cet objet est exporté pour être utilisé par d'autres modules.
 * @type {{ingredients: string[], appliances: string[], utensils: string[]}}
 */
export const selectedFilters = {
  ingredients: [],
  appliances: [],
  utensils: [],
};

/**
 * Met à jour l'interface utilisateur en affichant les recettes, les tags de filtre et le compteur.
 * C'est le point central de l'affichage après chaque recherche ou filtrage.
 * @param {Recipe[]} recipesToDisplay - Le tableau de recettes à afficher.
 */
function updateUI(recipesToDisplay) {
  displayRecipes(recipesToDisplay);
  updateFilterTags(recipesToDisplay);
  updateRecipeCount(recipesToDisplay.length);
}

/**
 * Filtre les recettes en fonction des tags sélectionnés.
 * S'exécute lorsque l'utilisateur ajoute ou retire un tag.
 * Cette fonction est exportée pour être appelée depuis le fichier filters.js.
 */
export function filterRecipes() {
  let filteredRecipes = recipes;

  // Filtre par les tags d'ingrédients
  if (selectedFilters.ingredients.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.ingredients.every((ingredientTag) =>
        recipe.ingredients.some(
          (item) =>
            item.ingredient.toLowerCase() === ingredientTag.toLowerCase()
        )
      )
    );
  }

  // Filtre par les tags d'appareils
  if (selectedFilters.appliances.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.appliances.every(
        (applianceTag) =>
          recipe.appliance.toLowerCase() === applianceTag.toLowerCase()
      )
    );
  }

  // Filtre par les tags d'ustensiles
  if (selectedFilters.utensils.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.utensils.every((utensilTag) =>
        recipe.ustensils.some(
          (item) => item.toLowerCase() === utensilTag.toLowerCase()
        )
      )
    );
  }

  updateUI(filteredRecipes);
}

/**
 * Gère la recherche principale dans la barre de recherche.
 * Déclenche une recherche si la requête a 3 caractères ou plus.
 * @param {string} query - Le texte entré par l'utilisateur.
 */
function handleMainSearch(query) {
  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery.length < 3) {
    // Si la requête est trop courte, on se contente de filtrer par tags
    filterRecipes();
    return;
  }

  const recipesWithTagsApplied = applyFiltersToRecipes(
    recipes,
    selectedFilters
  );

  const finalFilteredRecipes = recipesWithTagsApplied.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(normalizedQuery) ||
      recipe.description.toLowerCase().includes(normalizedQuery) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(normalizedQuery)
      )
  );

  updateUI(finalFilteredRecipes);
}

/**
 * Applique les filtres de tags à un tableau de recettes.
 * @param {Recipe[]} sourceRecipes - Le tableau de recettes à filtrer.
 * @param {Object} filters - L'objet contenant les filtres actifs.
 * @returns {Recipe[]} - Le tableau de recettes filtrées par tags.
 */
function applyFiltersToRecipes(sourceRecipes, filters) {
  let recipesToFilter = [...sourceRecipes];

  if (filters.ingredients.length > 0) {
    recipesToFilter = recipesToFilter.filter((recipe) =>
      filters.ingredients.every((ingredientTag) =>
        recipe.ingredients.some(
          (item) =>
            item.ingredient.toLowerCase() === ingredientTag.toLowerCase()
        )
      )
    );
  }

  if (filters.appliances.length > 0) {
    recipesToFilter = recipesToFilter.filter((recipe) =>
      filters.appliances.every(
        (applianceTag) =>
          recipe.appliance.toLowerCase() === applianceTag.toLowerCase()
      )
    );
  }

  if (filters.utensils.length > 0) {
    recipesToFilter = recipesToFilter.filter((recipe) =>
      filters.utensils.every((utensilTag) =>
        recipe.ustensils.some(
          (item) => item.toLowerCase() === utensilTag.toLowerCase()
        )
      )
    );
  }

  return recipesToFilter;
}

// Point d'entrée de l'application
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");

  updateUI(recipes);

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      handleMainSearch(event.target.value);
    });
  }

  // Ajoute les écouteurs d'événements pour les filtres avancés (tags)
  addFilterInputListeners();
});
