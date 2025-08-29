import { selectedFilters, filterRecipes } from "./main.js";

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

export function addFilterInputListeners() {
  // Ciblez les listes et trouvez leurs inputs associés
  const ingredientList = document.getElementById("ingredients-list");
  const applianceList = document.getElementById("appliances-list");
  const utensilList = document.getElementById("utensils-list");

  // Ajoutez un écouteur d'événement à l'input associé à chaque liste
  if (ingredientList) {
    const ingredientInput = ingredientList.parentElement.querySelector("input");
    if (ingredientInput) {
      ingredientInput.addEventListener("input", () => {
        filterTagList("ingredients-list", ingredientInput.value);
      });
    }
  }

  if (applianceList) {
    const applianceInput = applianceList.parentElement.querySelector("input");
    if (applianceInput) {
      applianceInput.addEventListener("input", () => {
        filterTagList("appliances-list", applianceInput.value);
      });
    }
  }

  if (utensilList) {
    const utensilInput = utensilList.parentElement.querySelector("input");
    if (utensilInput) {
      utensilInput.addEventListener("input", () => {
        filterTagList("utensils-list", utensilInput.value);
      });
    }
  }
}

function filterTagList(listId, query) {
  const list = document.getElementById(listId);
  const items = list.querySelectorAll("li");

  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

export function addTagSelectionListeners() {
  const lists = ["ingredients-list", "appliances-list", "utensils-list"];

  lists.forEach((listId) => {
    const list = document.getElementById(listId);

    list.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        const tag = event.target.textContent;
        const type = listId.split("-")[0]; // Extrait le type (ingredients, appliances, utensils)
        addTag(tag, type);
        event.target.parentElement.remove(); // Supprime l'élément de la liste
      }
    });
  });
}

function addTag(tag, type) {
  const selectedTagsContainer = document.getElementById("selected-tags");

  const tagElement = document.createElement("span");
  tagElement.className = "badge bg-primary p-2 me-2";
  tagElement.textContent = tag;

  const closeButton = document.createElement("button");
  closeButton.className = "btn-close btn-close-white ms-2";
  closeButton.setAttribute("aria-label", "Close");
  closeButton.addEventListener("click", () => {
    tagElement.remove();
    removeFilter(tag, type); // Supprime le filtre
  });

  tagElement.appendChild(closeButton);
  selectedTagsContainer.appendChild(tagElement);

  // Ajoute le filtre sélectionné
  selectedFilters[type].push(tag);
  filterRecipes(); // Relance le filtrage des recettes
}

function removeFilter(tag, type) {
  selectedFilters[type] = selectedFilters[type].filter((item) => item !== tag);
  filterRecipes(); // Relance le filtrage des recettes
}
