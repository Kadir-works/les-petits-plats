// Sélection des éléments HTML
const recipesContainer = document.getElementById("recipes");
const searchInput = document.getElementById("search");

//  fonction pour extraire les tags
function getUniqueTags(recipesList, type) {
  const tags = new Set();
  recipesList.forEach((recipe) => {
    if (type === "ingredients") {
      recipe.ingredients.forEach((ingredient) => {
        tags.add(ingredient.ingredient.toLowerCase());
      });
    } else if (type === "appliances") {
      tags.add(recipe.appliance.toLowerCase());
    } else if (type === "utensils") {
      recipe.ustensils.forEach((utensil) => {
        tags.add(utensil.toLowerCase());
      });
    }
  });
  return Array.from(tags).sort(); // Convertir le Set en Array et trier
}
// fonction pour générer et afficher les filtres
function displayTags(tagsList, elementId) {
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = tagsList
    .map((tag) => `<li><a class="dropdown-item" href="#">${tag}</a></li>`)
    .join("");
}
// Au chargement initial
const allIngredients = getUniqueTags(recipes, "ingredients");
const allAppliances = getUniqueTags(recipes, "appliances");
const allUtensils = getUniqueTags(recipes, "utensils");

displayTags(allIngredients, "ingredients-list");
displayTags(allAppliances, "appliances-list");
displayTags(allUtensils, "utensils-list");
// Fonction pour créer une carte recette HTML
function createRecipeCard(recipe) {
  // Définis la longueur maximale de la description
  const MAX_LENGTH = 150;
  let description = recipe.description;

  // Si la description est plus longue que la limite, la tronquer et ajouter "..."
  if (description.length > MAX_LENGTH) {
    description = description.substring(0, MAX_LENGTH) + "...";
  }
  // Crée les colonnes pour chaque ingrédient
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
          <p class="card-text mb-3">${recipe.description}</p>
          <p class="card-text text-uppercase text-muted fw-bold">Ingrédients</p>
          <div class="row row-cols-2 g-2">
            ${ingredientsColumns}
          </div>
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
