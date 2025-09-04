// js/filters.js

import { selectedFilters, filterRecipes } from "./main.js";

/**
 * Extrait et retourne une liste unique et triée de tags (ingrédients, appareils, ustensiles)
 * à partir d'un tableau de recettes.
 * @param {Array<object>} recipesList - Le tableau de recettes à partir duquel extraire les tags.
 * @param {string} type - Le type de tags à extraire ('ingredients', 'appareils', ou 'ustensiles').
 * @returns {Array<string>} Un tableau de chaînes de caractères contenant les tags uniques et triés.
 */
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
      recipe.ustensils.forEach((ustensil) => {
        tags.add(ustensil.toLowerCase());
      });
    }
  });
  return Array.from(tags).sort();
}

/**
 * Affiche les tags filtrés dans les menus déroulants.
 * @param {Array<string>} tagsList - La liste des tags à afficher.
 * @param {string} elementId - L'ID de l'élément UL (liste) où les tags seront affichés.
 * @param {string} type - Le type de tag ('ingredients', 'appliances', 'utensils').
 */
function displayFilterTags(tagsList, elementId, type) {
  const listElement = document.getElementById(elementId);
  if (!listElement) {
    console.error(`L'élément avec l'ID ${elementId} n'a pas été trouvé.`);
    return;
  }

  listElement.innerHTML = ""; // Vide la liste actuelle

  tagsList.forEach((tag) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#" data-value="${tag}" data-type="${type}">${tag}</a>`;
    listElement.appendChild(li);
  });
}

/**
 * Met à jour les tags des menus déroulants en fonction des recettes affichées.
 * @param {Array<object>} recipesList - Le tableau de recettes affichées.
 */
export function updateFilterTags(recipesList) {
  // Exclut les tags déjà sélectionnés
  const ingredients = getUniqueTags(recipesList, "ingredients").filter(
    (tag) => !selectedFilters.ingredients.includes(tag)
  );
  const appliances = getUniqueTags(recipesList, "appliances").filter(
    (tag) => !selectedFilters.appliances.includes(tag)
  );
  const utensils = getUniqueTags(recipesList, "utensils").filter(
    (tag) => !selectedFilters.utensils.includes(tag)
  );

  // Met à jour les listes déroulantes
  displayFilterTags(ingredients, "ingredients-list", "ingredients");
  displayFilterTags(appliances, "appliances-list", "appliances");
  displayFilterTags(utensils, "utensils-list", "utensils");
}
/**
 * Crée un tag sélectionné dans l'interface et le stocke dans 'selectedFilters'.
 * @param {string} tag - Le texte du tag.
 * @param {string} type - Le type de tag ('ingredients', 'appliances', 'utensils').
 */
function createSelectedTag(tag, type) {
  const selectedTagsContainer = document.getElementById("selected-tags");

  if (!selectedTagsContainer) {
    console.error("Le conteneur de tags sélectionnés n'a pas été trouvé.");
    return;
  }

  if (selectedFilters[type].includes(tag.toLowerCase())) return;

  const tagElement = document.createElement("span");
  tagElement.className = "badge bg-primary p-4 me-2";
  tagElement.textContent = tag;
  tagElement.setAttribute("data-type", type);
  tagElement.setAttribute("data-value", tag);

  const closeButton = document.createElement("button");
  closeButton.className = "btn-close btn-close-white ms-2";
  closeButton.setAttribute("aria-label", "Close");

  selectedFilters[type].push(tag.toLowerCase());

  closeButton.addEventListener("click", () => {
    removeTag(tag, type);
  });

  tagElement.appendChild(closeButton);
  selectedTagsContainer.appendChild(tagElement);

  filterRecipes(); // Met à jour les recettes et les filtres
}

/**
 * Retire un tag sélectionné de l'interface et de 'selectedFilters'.
 * @param {string} tag - Le texte du tag à retirer.
 * @param {string} type - Le type de tag.
 */
function removeTag(tag, type) {
  selectedFilters[type] = selectedFilters[type].filter(
    (item) => item.toLowerCase() !== tag.toLowerCase()
  );

  const tagElement = document.querySelector(
    `[data-value="${tag}"][data-type="${type}"]`
  );

  if (tagElement) {
    tagElement.remove();
  }

  filterRecipes(); // Met à jour les recettes et les filtres
}

/**
 * Ajoute les écouteurs d'événements pour les champs de recherche des filtres
 * et les clics sur les éléments des listes en utilisant la délégation.
 */
export function addFilterInputListeners() {
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");

  dropdownMenus.forEach((menu) => {
    const input = menu.querySelector("input");
    const listElement = menu.querySelector("ul");
    const type = listElement.id.split("-")[0];

    // Gère la recherche dans les champs de filtre des dropdowns
    if (input) {
      input.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const allItems = listElement.querySelectorAll("a");

        allItems.forEach((item) => {
          const parentLi = item.closest("li");
          if (item.textContent.toLowerCase().includes(query)) {
            parentLi.style.display = "block";
          } else {
            parentLi.style.display = "none";
          }
        });
      });
    }

    // Gère la sélection de tags par clic en utilisant la délégation
    listElement.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("dropdown-item")) {
        event.preventDefault();
        const tag = target.getAttribute("data-value");
        createSelectedTag(tag, type);
      }
    });
  });

  // Ajoute l'écouteur pour la suppression des tags
  const selectedTagsContainer = document.getElementById("selected-tags");
  if (selectedTagsContainer) {
    selectedTagsContainer.addEventListener("click", (event) => {
      const closeButton = event.target.closest(".btn-close");
      if (closeButton) {
        const parent = closeButton.closest(".badge");
        if (parent) {
          const tag = parent.getAttribute("data-value");
          const type = parent.getAttribute("data-type");
          removeTag(tag, type);
        }
      }
    });
  }
}
