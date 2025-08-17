// Sélection des éléments HTML
const recipesContainer = document.getElementById("recipes");
const searchInput = document.getElementById("search");

// Fonction pour créer une carte recette HTML
function createRecipeCard(recipe) {
  return `
    <div class="col-md-4">
      <div class="card h-100">
        <img src="images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
        <div class="card-body">
          <h5 class="card-title">${recipe.name}</h5>
          <p class="card-text">${recipe.description}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">⏱ ${recipe.time} min</small>
        </div>
      </div>
    </div>
  `;
}

// Fonction pour afficher les recettes
function displayRecipes(recipesList) {
  if (recipesList.length === 0) {
    recipesContainer.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Aucune recette ne contient ‘${searchInput.value}’. 
        Vous pouvez chercher “tarte aux pommes”, “poisson”, etc.</p>
      </div>
    `;
  } else {
    recipesContainer.innerHTML = recipesList.map(createRecipeCard).join("");
  }
}

// Fonction de recherche principale (boucles natives)
function searchRecipesV1(searchTerm) {
  const results = [];
  const lowerTerm = searchTerm.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Vérification dans le titre
    if (recipe.name.toLowerCase().includes(lowerTerm)) {
      results.push(recipe);
      continue; // On passe à la recette suivante
    }

    // Vérification dans la description
    if (recipe.description.toLowerCase().includes(lowerTerm)) {
      results.push(recipe);
      continue;
    }

    // Vérification dans les ingrédients
    let foundInIngredient = false;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (recipe.ingredients[j].ingredient.toLowerCase().includes(lowerTerm)) {
        foundInIngredient = true;
        break;
      }
    }
    if (foundInIngredient) {
      results.push(recipe);
    }
  }

  return results;
}

// Événement de recherche
searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim();

  if (term.length >= 3) {
    const filteredRecipes = searchRecipesV1(term);
    displayRecipes(filteredRecipes);
  } else {
    displayRecipes(recipes); // Afficher toutes les recettes si moins de 3 caractères
  }
});

// Affichage initial
displayRecipes(recipes);
