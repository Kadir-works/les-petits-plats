// -----------------
// Jeu de données de base (3 recettes exemple)
// -----------------
const recipes = [
  {
    id: 1,
    name: "Limonade de Coco",
    description: "Mettre les glaçons à votre goût...",
    ingredients: [{ ingredient: "Lait de coco" }, { ingredient: "Sucre" }],
  },
  {
    id: 2,
    name: "Poisson Cru à la tahitienne",
    description: "Découper le thon en dés...",
    ingredients: [{ ingredient: "Thon Rouge" }, { ingredient: "Concombre" }],
  },
  {
    id: 3,
    name: "Poulet coco réunionnais",
    description: "Découper le poulet en morceaux...",
    ingredients: [{ ingredient: "Poulet" }, { ingredient: "Oignon" }],
  },
];

// -----------------
// Création d'un gros tableau (1500 recettes)
// -----------------
// On duplique 500 fois le tableau de 3 recettes → 1500 recettes
const bigRecipes = Array(500).fill(recipes).flat();

const query = "coco".toLowerCase();

// -----------------
// Fonctions de recherche
// -----------------
function searchFilter(recipes, query) {
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(query)
      )
  );
}

function searchForLoop(recipes, query) {
  const results = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let match = false;

    if (recipe.name.toLowerCase().includes(query)) {
      match = true;
    } else if (recipe.description.toLowerCase().includes(query)) {
      match = true;
    } else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].ingredient.toLowerCase().includes(query)) {
          match = true;
          break; // optimisation : on sort dès qu'on trouve
        }
      }
    }
    if (match) results.push(recipe);
  }
  return results;
}

// -----------------
// Fonction benchmark
// -----------------
function benchmark(label, fn) {
  const t0 = performance.now();
  for (let i = 0; i < 5000; i++) {
    // répète plusieurs fois pour mesurer
    fn(bigRecipes, query);
  }
  const t1 = performance.now();
  console.log(`${label}: ${(t1 - t0).toFixed(2)} ms`);
}

// -----------------
// Lancement du test
// -----------------
console.log("=== Benchmark recherche sur 1500 recettes ===");
benchmark("Version filter()", searchFilter);
benchmark("Version for()", searchForLoop);
