// Fonction pour créer le code HTML d'une carte de recette
export function createRecipeCard(recipe) {
  const MAX_DESCRIPTION_LENGTH = 150;
  let description = recipe.description;

  // Tronque la description si elle est trop longue
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    description = description.substring(0, MAX_DESCRIPTION_LENGTH) + "...";
  }

  // Crée la liste des ingrédients
  const ingredientsColumns = recipe.ingredients
    .map((ing) => {
      return `
      <div class="col-6">
        <strong>${ing.ingredient}</strong>
        <span class="d-block text-muted">
          ${ing.quantity ? ing.quantity : ""} ${ing.unit ? ing.unit : ""}
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

// Fonction pour afficher toutes les cartes de recettes
export function displayRecipes(recipesList) {
  const recipesContainer = document.getElementById("recipes");

  // Vérifie si le conteneur existe
  if (!recipesContainer) {
    console.error("Le conteneur des recettes n'a pas été trouvé.");
    return;
  }

  recipesContainer.innerHTML = ""; // Vide le conteneur avant d'afficher les nouvelles recettes

  if (recipesList.length === 0) {
    recipesContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-muted">Aucune recette ne contient votre recherche. Vous pouvez essayer « tarte aux pommes », « poisson », etc.</p>
      </div>
    `;
  } else {
    recipesList.forEach((recipe) => {
      recipesContainer.innerHTML += createRecipeCard(recipe);
    });
  }
}
