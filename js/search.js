// Version 1 : recherche avec des méthodes fonctionnelles (filter, some)
export function searchWithFunctionalMethods(query, recipes) {
  const lowerCaseQuery = query.toLowerCase();

  return recipes.filter((recipe) => {
    const { name, description, ingredients } = recipe;

    // On vérifie si la requête est dans le nom, les ingrédients ou la description
    const foundInName = name.toLowerCase().includes(lowerCaseQuery);
    const foundInDescription = description
      .toLowerCase()
      .includes(lowerCaseQuery);
    const foundInIngredients = ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(lowerCaseQuery)
    );

    return foundInName || foundInDescription || foundInIngredients;
  });
}

export function updateRecipeCount(count) {
  const recipeCountElement = document.getElementById("recipe-count");
  if (recipeCountElement) {
    recipeCountElement.textContent = `${count} recettes`;
  } else {
    console.error("L'élément #recipe-count est introuvable dans le DOM.");
  }
}
