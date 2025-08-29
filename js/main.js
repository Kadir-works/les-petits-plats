// js/main.js
import { recipes } from "./recipes.js";
import { displayRecipes } from "./display.js";
import { updateFilterTags, addFilterInputListeners, addTagSelectionListeners } from "./filters.js";
import { updateRecipeCount } from "./search.js";

// Objet global pour suivre les filtres sélectionnés
export const selectedFilters = {
  ingredients: [],
  appliances: [],
  utensils: [],
};

// Fonction pour filtrer les recettes en fonction des filtres sélectionnés
export function filterRecipes() {
  let filteredRecipes = recipes;

  // Filtre par ingrédients
  if (selectedFilters.ingredients.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.ingredients.every((ingredient) =>
        recipe.ingredients.some(
          (item) => item.ingredient.toLowerCase() === ingredient.toLowerCase()
        )
      )
    );
  }

  // Filtre par appareils
  if (selectedFilters.appliances.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.appliances.includes(recipe.appliance.toLowerCase())
    );
  }

  // Filtre par ustensiles
  if (selectedFilters.utensils.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedFilters.utensils.every((utensil) =>
        recipe.ustensils.some(
          (item) => item.toLowerCase() === utensil.toLowerCase()
        )
      )
    );
  }

  // Met à jour l'affichage des recettes
  displayRecipes(filteredRecipes);
  updateFilterTags(filteredRecipes);
  updateRecipeCount(filteredRecipes.length);
}

// Fonction utilitaire pour mettre à jour l'interface
function updateUI(recipes) {
  displayRecipes(recipes);
  updateFilterTags(recipes);
  updateRecipeCount(recipes.length);
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");

  if (!searchInput) {
    console.error("L'élément #search est introuvable dans le DOM.");
    return;
  }

  // Affiche toutes les recettes et leurs tags au chargement de la page
  updateUI(recipes);

  // Gère la recherche en temps réel
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim();

    if (query.length >= 3) {
      const filteredRecipes = recipes.filter((recipe) => {
        const lowerCaseQuery = query.toLowerCase();
        const foundInName = recipe.name.toLowerCase().includes(lowerCaseQuery);
        const foundInDescription = recipe.description
          .toLowerCase()
          .includes(lowerCaseQuery);
        const foundInIngredients = recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(lowerCaseQuery)
        );

        return foundInName || foundInDescription || foundInIngredients;
      });

      displayRecipes(filteredRecipes);
      updateFilterTags(filteredRecipes);
      updateRecipeCount(filteredRecipes.length);
    } else {
      filterRecipes(); // Relance le filtrage des recettes en fonction des filtres
    }
  });

  // Ajoute les comportements pour les filtres
  addFilterInputListeners();
  addTagSelectionListeners();
});
