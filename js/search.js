let champions;

document.addEventListener("DOMContentLoaded", async () => {
  searchBarBtn.addEventListener("click", handleSearch);
  searchBar.addEventListener("keypress", handleKeyPress);

  // Gère la touche entrée pour la recherche
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  const champions = await getChampions();
  const objects = await getObjects();

  // Normalise la recherche de l'utilisateur (reset si vide)
  function handleSearch() {
    console.log(currentCategory);
    if (currentCategory === "champ") {
      const searchTerm = searchBar.value.trim().toLowerCase();
      if (searchTerm === "") {
        populateChampionList(champions);
      } else {
        searchChampion(searchTerm);
      }
    } else {
      const searchTerm = searchBar.value.trim().toLowerCase();
      if (searchTerm === "") {
        populateObjectsList(objects);
      } else {
        searchObject(searchTerm);
      }
    }
  }

  function searchChampion(searchTerm) {
    try {
      let filteredChamps;
      if (isNaN(searchTerm)) {
        // Filtre par nom
        filteredChamps = champions.filter((champion) => champion.id.toLowerCase().startsWith(searchTerm));
      } else {
        // Filtre par id
        filteredChamps = champions.filter((champion) => champion.key === searchTerm);
      }
      if (filteredChamps.length === 0) {
        throw new Error("No Champion found.");
      }
      populateChampionList(filteredChamps);
    } catch (error) {
      console.error("Error searching for Champion:", error);
      championsList.innerHTML = "";
      const errorRow = document.createElement("p");
      errorRow.className = "title txt-gold";
      errorRow.textContent = "No Champion found.";
      championsList.appendChild(errorRow);
    }
  }

  function searchObject(searchTerm) {
    try {
      let filteredObjects;
      if (isNaN(searchTerm)) {
        // Filtre par nom
        filteredObjects = objects.filter((object) => object.name.toLowerCase().startsWith(searchTerm));
      } else {
        populateObjectsList(objects);
      }
      if (filteredObjects.length === 0) {
        throw new Error("No Object found.");
      }
      populateObjectsList(filteredObjects);
    } catch (error) {
      console.error("Error searching for object:", error);
      objectsList.innerHTML = "";
      const errorRow = document.createElement("p");
      errorRow.className = "title txt-gold m-5";
      errorRow.textContent = "No object found.";
      objectsList.appendChild(errorRow);
    }
  }
});
