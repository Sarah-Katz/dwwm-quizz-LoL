// URLs de l'api
const urlChampions = "http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json";
const urlChampion = "http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/";
const championsImgSquare = "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/";
const championsImgLoading = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
const spellImg = "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/spell/";
const passiveImg = "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/passive/";

// Conteneurs des listes
const championsList = document.getElementById("championsList");

// Graphique de stat des champions
const statChartCanvas = document.getElementById("chart");

// Input de recherche des champions
const champSearchInput = document.getElementById("champSearchInput");
const champSearchInputBtn = document.getElementById("champSearchInputBtn");
