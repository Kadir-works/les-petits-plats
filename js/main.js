// js/main.js
import { recipes } from "./recipes.js";
import { displayRecipes } from "./display.js";
import { searchWithFunctionalMethods } from "./search.js";
import { updateFilterTags } from "./filters.js"; // Le nouvel import !

const searchInput = document.getElementById("search");

// Affiche toutes les recettes et leurs tags au chargement de la page
displayRecipes(recipes);
updateFilterTags(recipes);

// Gère la recherche en temps réel
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  let filteredRecipes = recipes;

  if (query.length >= 3) {
    filteredRecipes = searchWithFunctionalMethods(query, recipes);
  }

  displayRecipes(filteredRecipes);
  updateFilterTags(filteredRecipes);
});
