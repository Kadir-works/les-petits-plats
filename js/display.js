// js/display.js

/**
 * Crée le code HTML d'une carte de recette.
 * @param {object} recipe - L'objet recette.
 * @returns {string} Le HTML de la carte de recette.
 */
function createRecipeCard(recipe) {
  const MAX_DESCRIPTION_LENGTH = 150;
  let description = recipe.description;

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    description = description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
  }

  const ingredientsColumns = recipe.ingredients
    .map((ing) => {
      // Ajoute la quantité et l'unité si elles existent
      const quantity = ing.quantity ? `${ing.quantity}` : "";
      const unit = ing.unit ? `${ing.unit}` : "";
      return `
      <div class="col-6">
        <strong>${ing.ingredient}</strong>
        <span class="d-block text-muted">
          ${quantity} ${unit}
        </span>
      </div>
    `;
    })
    .join("");

  return `
    <div class="col-md-4">
      <div class="card h-100 position-relative">
        <img src="images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
        <div class="position-absolute top-0 end-0 mt-2 me-2 px-2 py-1 rounded-pill bg-warning text-dark fw-bold">
         ${recipe.time} min
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0">${recipe.name}</h5>
          </div>
          <p class="card-text text-uppercase text-muted fw-bold">Recette</p>
          <p class="card-text mb-3">${description}</p>
          <p class="card-text text-uppercase text-muted fw-bold">Ingrédients</p>
          <div class="row row-cols-2 g-2">
            ${ingredientsColumns}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Affiche toutes les cartes de recettes dans le conteneur principal.
 * @param {Array<object>} recipesList - Le tableau de recettes à afficher.
 */
export function displayRecipes(recipesList) {
  const recipesContainer = document.getElementById("recipes");

  if (!recipesContainer) {
    console.error("Le conteneur des recettes n'a pas été trouvé.");
    return;
  }

  // Vide le conteneur avant d'ajouter les nouvelles recettes
  recipesContainer.innerHTML = "";

  if (recipesList.length === 0) {
    recipesContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">Aucune recette ne correspond à votre critère. Vous pouvez chercher "tarte aux pommes", "poisson", etc.</p>
      </div>
    `;
  } else {
    // Crée une chaîne de caractères contenant toutes les cartes de recettes
    const allRecipeCardsHTML = recipesList.map(createRecipeCard).join("");
    // Insère le tout en une seule fois pour une meilleure performance
    recipesContainer.innerHTML = allRecipeCardsHTML;
  }
}
