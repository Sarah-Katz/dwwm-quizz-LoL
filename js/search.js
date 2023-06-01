document.addEventListener("DOMContentLoaded", async () => {
  champSearchInputBtn.addEventListener("click", handleSearch);
  const champions = await getChampions();

  // Normalise la recherche de l'utilisateur (reset si vide)
  function handleSearch() {
    const searchTerm = champSearchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
      populateChampionList(getChampions());
    } else {
      searchChampion(searchTerm);
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
      errorRow.innerText = "No Champion found.";
      championsList.appendChild(errorRow);
    }
  }
});
