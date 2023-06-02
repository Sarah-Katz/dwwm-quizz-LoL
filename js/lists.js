// Cache de la liste des champion
const CHAMPION_CACHE_KEY = "championsCache";
const CHAMPION_CACHE_EXPIRATION_KEY = "championsCacheExpiration";
// Cache de la liste des objets
const OBJECTS_CACHE_KEY = "objectsCache";
const OBJECTS_CACHE_EXPIRATION_KEY = "objectsCacheExpiration";

// Fetch de la liste des champions
async function getChampions() {
  const cachedChampions = localStorage.getItem(CHAMPION_CACHE_KEY);
  const expirationDate = localStorage.getItem(CHAMPION_CACHE_EXPIRATION_KEY);
  if (cachedChampions && expirationDate && Date.now() < parseInt(expirationDate, 10)) {
    return JSON.parse(cachedChampions); // Return les champions en cache si non expirés
  }
  try {
    const response = await fetch(urlChampions);
    const champions = await response.json();
    const championArray = Object.values(champions.data);
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(CHAMPION_CACHE_KEY, JSON.stringify(championArray));
    localStorage.setItem(CHAMPION_CACHE_EXPIRATION_KEY, expirationTime.toString());
    return championArray;
  } catch (error) {
    console.error("Error fetching champions:", error);
    return [];
  }
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
        <div class="card-content p-1">
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
// //////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////
// Fonctions de la liste d'objets
// //////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

// Fetch de la liste des objets
async function getObjects() {
  const cachedObjects = localStorage.getItem(OBJECTS_CACHE_KEY);
  const expirationDate = localStorage.getItem(OBJECTS_CACHE_EXPIRATION_KEY);
  if (cachedObjects && expirationDate && Date.now() < parseInt(expirationDate, 10)) {
    return JSON.parse(cachedObjects); // Return les objects en cache si non expirés
  }
  try {
    const response = await fetch(urlObjects);
    const objects = await response.json();
    const objectsArray = Object.values(objects.data);
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(OBJECTS_CACHE_KEY, JSON.stringify(objectsArray));
    localStorage.setItem(OBJECTS_CACHE_EXPIRATION_KEY, expirationTime.toString());
    return objectsArray;
  } catch (error) {
    console.error("Error fetching objects:", error);
    return [];
  }
}

// Remplissage de la liste des objets
const populateObjectsList = async function (objectsArray) {
  objectsList.innerHTML = "";
  objectsArray.forEach((object) => {
    if (object.gold.base != 0) {
      let div = document.createElement("div");
      div.className = "column is-1";
      div.innerHTML = `
        <div class="card btn-cat">
        <div class="card-image">
        <figure class="image">
        <img src="${objectsImg}${object.image.full}" alt="Image de ${object.name}">
        </figure>
        </div>
        <div class="card-content p-1">
        <div class="media-content">
        <p class="card-title title is-6 has-text-centered txt-gold">${object.name}</p>
        </div>
        </div>
        </div>`;
      div.addEventListener("click", () => showObjectDetail(object));
      objectsList.append(div);
    }
  });
};

// Ouverture de la modal de détail des objets
async function showObjectDetail(object) {
  populateModalObject(object);
  showModal("object");
}

// Remplissage de la modal des objets
function populateModalObject(object) {
  console.log(object);
  modalObjectImg.innerHTML = `
       <figure class="image">
        <img class="objectImg" src="${objectsImg}${object.image.full}" alt="Image de ${object.name}">
       </figure>
       <p class="title m-1 is-5 txt-gold">Buy Price: ${object.gold.base}</p>
       <p class="title m-1 is-6 txt-blue">Sell Price: ${object.gold.sell}</p>
       <p class="title m-1 is-6 txt-blue">Total Price: ${object.gold.total}</p>
       `;

  modalObjectStats.innerHTML = `
       <p class="title is-1 txt-gold">${object.name}</p>
       <p class="subtitle is-5 has-text-white">${object.plaintext}</p>
       <p class="objDesc subtitle is-5 txt-blue">${object.description}</p>
       `;

  objectTo.innerHTML = "";
  if (object.into) {
    let title = document.createElement("p");
    title.className = "title is-5 txt-gold";
    title.textContent = "Can make";
    objectTo.append(title);
    for (let i = 0; i < object.into.length; i++) {
      const id = object.into[i];
      let fig = document.createElement("figure");
      fig.className = "image";
      fig.innerHTML = `<img class="objectIntoImg" src="${objectsImg}${id}.png">`;
      fig.addEventListener("click", () => changeObject(id));
      objectTo.append(fig);
    }
  }

  objectFrom.innerHTML = "";
  if (object.from && object.from[0] + ".png" != object.image.full) {
    let title = document.createElement("p");
    title.className = "title is-5 txt-gold";
    title.textContent = "Made from";
    objectFrom.append(title);
    for (let i = 0; i < object.from.length; i++) {
      const id = object.from[i];
      let fig = document.createElement("figure");
      fig.className = "image";
      fig.innerHTML = `<img class="objectFromImg" src="${objectsImg}${id}.png">`;
      fig.addEventListener("click", () => changeObject(id));
      objectFrom.append(fig);
    }
  }
}

// Function
async function changeObject(id) {
  const objects = await getObjects();
  objects.forEach((object) => {
    if (id + ".png" === object.image.full) {
      populateModalObject(object);
    }
  });
}

// /////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////
// Initialisation de la page
// /////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", async () => {
  // Initialisation de la liste des champion
  const championArray = await getChampions();
  populateChampionList(championArray);
  const objects = await getObjects();
  populateObjectsList(objects);
});
