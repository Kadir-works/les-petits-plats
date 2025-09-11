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
 */
export const selectedFilters = {
  ingredients: [],
  appliances: [],
  utensils: [],
};

/**
 * Contient les recettes filtrées par la recherche principale
 */
export let currentSearchResults = [...recipes];

/**
 * Met à jour l'interface utilisateur
 */
function updateUI(recipesToDisplay, query = "") {
  displayRecipes(recipesToDisplay, query);
  updateFilterTags(recipesToDisplay);
  updateRecipeCount(recipesToDisplay.length);
}

/**
 * Filtre les recettes en fonction des tags sélectionnés
 */
export function filterRecipes() {
  let filteredRecipes = [...currentSearchResults]; // filtre sur le résultat de la recherche principale

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

  if (selectedFilters.appliances.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.appliances.every(
        (applianceTag) =>
          recipe.appliance.toLowerCase() === applianceTag.toLowerCase()
      )
    );
  }

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
 * Recherche principale dans la barre de recherche
 */
function handleMainSearch(query) {
  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery.length < 3) {
    currentSearchResults = [...recipes]; // pas de recherche texte
    filterRecipes();
    return;
  }

  const recipesWithTagsApplied = applyFiltersToRecipes(
    recipes,
    selectedFilters
  );

  // const finalFilteredRecipes = recipesWithTagsApplied.filter(
  //   (recipe) =>
  //     recipe.name.toLowerCase().includes(normalizedQuery) ||
  //     recipe.description.toLowerCase().includes(normalizedQuery) ||
  //     recipe.ingredients.some((ingredient) =>
  //       ingredient.ingredient.toLowerCase().includes(normalizedQuery)
  //     )
  // );

  // version boucle for

  const finalFilteredRecipes = [];
  for (let i = 0; i < recipesWithTagsApplied.length; i++) {
    const recipe = recipesWithTagsApplied[i];
    let match = false;

    // Vérifie le nom
    if (recipe.name.toLowerCase().includes(normalizedQuery)) {
      match = true;
    }
    // Vérifie la description
    else if (recipe.description.toLowerCase().includes(normalizedQuery)) {
      match = true;
    }
    // Vérifie les ingrédients
    else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (
          recipe.ingredients[j].ingredient
            .toLowerCase()
            .includes(normalizedQuery)
        ) {
          match = true;
          break;
        }
      }
    }

    if (match) finalFilteredRecipes.push(recipe);
  }

  currentSearchResults = finalFilteredRecipes; // stocke le résultat de la recherche principale
  updateUI(finalFilteredRecipes, normalizedQuery);
}

/**
 * Applique les filtres de tags à un tableau de recettes
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

// Point d'entrée
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");

  updateUI(recipes);

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      handleMainSearch(event.target.value);
    });
  }

  addFilterInputListeners();
});
