/**
 * Extrait et retourne une liste unique de tags (ingrédients, ustensiles ou appareils)
 * à partir d'un tableau de recettes.
 * @param {Array} recipesList - Le tableau de recettes à partir duquel extraire les tags.
 * @param {string} type - Le type de tags à extraire ('ingredients', 'appliances', ou 'ustensils').
 * @returns {Array} Un tableau de chaînes de caractères contenant les tags uniques et triés.
 */
export function getUniqueTags(recipesList, type) {
  const tags = new Set();
  recipesList.forEach((recipe) => {
    if (type === "ingredients") {
      recipe.ingredients.forEach((ingredient) => {
        tags.add(ingredient.ingredient.toLowerCase());
      });
    } else if (type === "appliances") {
      tags.add(recipe.appliance.toLowerCase());
    } else if (type === "ustensils") {
      recipe.ustensils.forEach((ustensil) => {
        tags.add(ustensil.toLowerCase());
      });
    }
  });
  return Array.from(tags).sort();
}

/**
 * Génère et affiche les tags dans un élément de liste HTML.
 * @param {Array} tagsList - Le tableau de tags à afficher.
 * @param {string} elementId - L'ID de l'élément UL dans lequel afficher les tags.
 */
export function displayFilterTags(tagsList, elementId) {
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = tagsList
    .map((tag) => `<li><a class="dropdown-item" href="#">${tag}</a></li>`)
    .join("");
}

/**
 * Met à jour et affiche toutes les listes de tags des filtres.
 * @param {Array} recipesList - Le tableau de recettes filtrées pour générer les nouveaux tags.
 */
export function updateFilterTags(recipesList) {
  const allIngredients = getUniqueTags(recipesList, "ingredients");
  const allAppliances = getUniqueTags(recipesList, "appliances");
  const allUtensils = getUniqueTags(recipesList, "ustensils");

  displayFilterTags(allIngredients, "ingredients-list");
  displayFilterTags(allAppliances, "appliances-list");
  displayFilterTags(allUtensils, "utensils-list");
}
