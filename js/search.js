// js/search.js

/**
 * Met à jour le compteur affichant le nombre de recettes trouvées.
 * @param {number} count - Le nombre de recettes à afficher.
 */
export function updateRecipeCount(count) {
  const recipeCountElement = document.getElementById("recipe-count");
  if (recipeCountElement) {
    recipeCountElement.textContent = `${count} recettes`;
  } else {
    console.error("L'élément #recipe-count est introuvable dans le DOM.");
  }
}
