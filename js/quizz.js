document.addEventListener("DOMContentLoaded", () => {
  quizzStartBtn.addEventListener("click", startQuizz);
  let champions = [];
  let timer;
  let remainingTime = 180;
  let score = 0;
  let attempts = 7;
  let currentChampion;

  async function getChampionsData() {
    champions = await getChampions();
  }

  // Fonction de sélection d'un champion random
  function getRandomChampion() {
    const randomIndex = Math.floor(Math.random() * champions.length);
    return champions[randomIndex];
  }

  // Fonction d'affichage du champion à trouver
  function displayChampion(champion) {
    quizzImg.src = `${championsImgLoading}${champion.id}_0.jpg`;
    quizzRight.src = `${championsImgLoading}${champion.id}_0.jpg`;
  }

  // Fonction de gestion de la réponse utilisateur
  function handleGuess() {
    const guess = quizzInput.value.trim().toLowerCase();
    if (guess === currentChampion.name.toLowerCase()) {
      // Correct
      score++;
      currentChampion = getRandomChampion();
      quizzHint.innerText = "correct !";
      quizzHint.style.color = "green";
      displayChampion(currentChampion);
    } else {
      // Incorrect
      attempts--;
      quizzHint.innerText = "Incorrect!";
      quizzHint.style.color = "red";
    }

    if (attempts <= 0 || remainingTime <= 0) {
      endQuizz();
    } else {
      quizzContainer.innerText = ` Score: ${score} | Time left: ${remainingTime} seconds | Attempts left: ${attempts}`;
      quizzInput.value = "";
    }
  }

  // Fonction du Timer
  function updateTimer() {
    remainingTime--;
    if (remainingTime <= 0) {
      endQuizz();
    } else {
      // mise à jour
      quizzContainer.innerText = `Score: ${score} | Time left: ${remainingTime} seconds | Attempts left: ${attempts}`;
      timer = setTimeout(updateTimer, 1000);
    }
  }

  // Fonction de démarrage du quizz
  function startQuizz() {
    clearTimeout(timer);
    remainingTime = 180;
    score = 0;
    attempts = 7;
    quizzRules.style.display = "none";
    quizzStartBtn.style.display = "none";
    quizzContainer.innerText = "";
    quizzInput.style.display = "block";
    quizzInputBtn.style.display = "block";

    updateTimer();
    currentChampion = getRandomChampion();
    displayChampion(currentChampion);

    quizzInputBtn.addEventListener("click", handleGuess);
    quizzInput.addEventListener("keypress", handleQuizzKey);
  }

  // Fonction de fin de quizz
  function endQuizz() {
    quizzHint.innerHTML = "";
    clearTimeout(timer);
    quizzContainer.innerText = `Quizz ended. Your final score is ${score}.`;
    quizzStartBtn.style.display = "inline";
    quizzInput.style.display = "none";
    quizzInputBtn.style.display = "none";
  }

  function handleQuizzKey(e) {
    if (e.key === "Enter") {
      handleGuess();
    }
  }

  // Initialise la liste des champions
  getChampionsData();
});
