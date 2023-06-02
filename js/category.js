btnChamp.addEventListener("click", () => changeCategory("champ"));
btnObject.addEventListener("click", () => changeCategory("object"));

function changeCategory(category) {
  if (category === "champ") {
    championsList.style.display = "flex";
    // championSearch.style.display = "flex";
    objectsList.style.display = "none";
    currentCategory = "champ";
  } else if (category === "object") {
    championsList.style.display = "none";
    // championSearch.style.display = "none";
    objectsList.style.display = "flex";
    currentCategory = "obj";
  }
}
