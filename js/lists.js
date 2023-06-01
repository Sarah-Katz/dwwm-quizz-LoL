// Fetch de la liste des champions
async function getChampions() {
  let response = await fetch(urlChampions);
  let champions = await response.json();
  return Object.values(champions.data);
}

// Remplissage de la liste des champions
const populateChampionList = async function (championArray) {
  championsList.innerHTML = "";
  championArray.forEach((champion) => {
    let div = document.createElement("div");
    div.className = "column is-1";
    div.innerHTML = `
        <div class="card btn-cat">
        <div class="card-image">
        <figure class="image">
        <img src="${championsImgSquare}${champion.id}.png" alt="Image de ${champion.id}">
        </figure>
        </div>
        <div class="card-content">
        <div class="media-content">
                <p class="card-title title is-6 has-text-centered txt-gold">${champion.id}</p>
            </div>
        </div>
        </div>`;
    div.addEventListener("click", () => showChampDetail(champion));
    championsList.append(div);
  });
};

// Ouverture de la modal de détail des champions
async function showChampDetail(champion) {
  let response = await fetch(`${urlChampion}${champion.id}.json`);
  let detail = await response.json();
  populateModalChamp(champion, detail);
  showModal("champ");
}

/**
 * Remplissage de la modal des champions
 * @param {*} champion Le champion à utiliser pour la modal
 * @param {*} detail le détail du champion à utiliser
 */
function populateModalChamp(champion, detail) {
  let data = Object.values(detail.data);
  let champ = data[0];
  modalChampImg.innerHTML = `
       <figure class="image">
       <img class="champImg" src="${championsImgLoading}${champion.id}_0.jpg">
       </figure>`;
  modalChampSpells.innerHTML = `
       <p id="titleChamp" class="title txt-gold">${champ.id}</p>
       <p class="subtitle txt-gold">Spells</p>
       <div class="card m-0">
       <div class="card-content p-0 mb-2">
       <div class="media is-flex is-align-items-center">
       <div class="media-left">
        <figure class="image m-0 is-64x64">
        <img src="${passiveImg}${champ.passive.image.full}">
        </figure>
        </div>
        <div class="media-content">
        <p class="title m-0 is-4 txt-blue">Passive - ${champ.passive.name}</p>
        </div>
        </div>
        </div>
        </div>
        <div class="card m-0">
        <div class="card-content p-0 mb-2">
        <div class="media is-flex is-align-items-center">
        <div class="media-left">
        <figure class="image m-0 is-64x64">
        <img src="${spellImg}${champ.spells[0].id}.png">
        </figure>
        </div>
        <div class="media-content">
        <p class="title m-0 is-4 txt-blue">Q - ${champ.spells[0].name}</p>
        </div>
        </div>
        </div>
        </div>
        <div class="card m-0">
        <div class="card-content p-0 mb-2">
        <div class="media is-flex is-align-items-center">
        <div class="media-left">
        <figure class="image m-0 is-64x64">
        <img src="${spellImg}${champ.spells[1].id}.png">
        </figure>
        </div>
        <div class="media-content">
        <p class="title m-0 is-4 txt-blue">W - ${champ.spells[1].name}</p>
        </div>
        </div>
        </div>
        </div>
        <div class="card m-0">
        <div class="card-content p-0 mb-2">
        <div class="media is-flex is-align-items-center">
        <div class="media-left">
        <figure class="image m-0 is-64x64">
        <img src="${spellImg}${champ.spells[2].id}.png">
        </figure>
        </div>
        <div class="media-content">
        <p class="title m-0 is-4 txt-blue">E - ${champ.spells[2].name}</p>
        </div>
        </div>
        </div>
        </div>
        <div class="card m-0">
        <div class="card-content p-0 mb-2">
        <div class="media is-flex is-align-items-center">
        <div class="media-left">
        <figure class="image m-0 is-64x64">
        <img src="${spellImg}${champ.spells[3].id}.png">
        </figure>
        </div>
        <div class="media-content">
        <p class="title m-0 is-4 txt-blue">R - ${champ.spells[3].name}</p>
        </div>
        </div>
        </div>
        </div>`;
  makeChart(champ.info);
}

// Fonction de création du graphique des stats des champions
function makeChart(stats) {
  const statLabels = ["attack", "defense", "magic", "difficulty"];
  const statValues = Object.values(stats);
  if (statChartCanvas.chart) {
    statChartCanvas.chart.destroy();
  }
  const statChart = new Chart(statChartCanvas, {
    type: "polarArea",
    data: {
      labels: statLabels,
      datasets: [
        {
          data: statValues,
          backgroundColor: ["rgba(128, 0, 0)", "rgba(0, 64, 0)", "rgba(0, 0, 64)", "rgba(128, 84, 0)"],
          borderColor: "rgba(83, 60, 22, 1)",
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        r: {
          ticks: {
            display: false,
          },
        },
      },
    },
  });
  statChartCanvas.chart = statChart;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Initialisation de la liste des champions
  const championArray = await getChampions();
  populateChampionList(championArray);
});
