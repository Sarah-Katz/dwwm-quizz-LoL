// URLs de l'api
const urlChampions = "http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json";
const urlChampion = "http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion/";
const championsImgSquare = "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/";
const championsImgLoading = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";
const spellImg = "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/spell/";
const passiveImg = "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/passive/";
const urlObjects = "http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/item.json";
const objectsImg = "http://ddragon.leagueoflegends.com/cdn/13.11.1/img/item/";

// Boutons de choix
const btnChamp = document.getElementById("btnChamp");
const btnObject = document.getElementById("btnObject");

// Conteneurs des listes
const championsList = document.getElementById("championsList");
const objectsList = document.getElementById("objectsList");

// Graphique de stat des champions
const statChartCanvas = document.getElementById("chart");

// Input de recherche
const searchBar = document.getElementById("searchBar");
const searchBarBtn = document.getElementById("searchBarBtn");

// Indicateur de catégorie
let currentCategory = "champ";

// Variables du quizz
const quizzStartBtn = document.getElementById("quizzStartBtn");
const quizz = document.getElementById("quizz");
const quizzImg = document.getElementById("quizzImg");
const quizzRight = document.getElementById("quizzRight");
const quizzInput = document.getElementById("quizzInput");
const quizzInputBtn = document.getElementById("quizzInputBtn");
const quizzHint = document.getElementById("quizzHint");
const quizzRules = document.getElementById("quizzRules");
