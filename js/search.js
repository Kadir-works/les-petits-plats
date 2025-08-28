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

// Version 2 : recherche avec des méthodes fonctionnelles (filter, some)
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
