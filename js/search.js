// Version 1 : recherche avec une boucle 'for'
export function searchWithForLoop(query, recipes) {
  const filteredRecipes = [];
  const lowerCaseQuery = query.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // On vérifie si la requête est dans le nom, les ingrédients ou la description
    const foundInName = recipe.name.toLowerCase().includes(lowerCaseQuery);
    const foundInDescription = recipe.description
      .toLowerCase()
      .includes(lowerCaseQuery);
    const foundInIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(lowerCaseQuery)
    );

    if (foundInName || foundInDescription || foundInIngredients) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}
