// Modal champions
const modalChamp = document.getElementById("modalChampContainer");
const modalChampImg = document.getElementById("modalChampImg");
const modalChampSpells = document.getElementById("modalChampSpells");
const modalChampStats = document.getElementById("modalChampStats");
const modalChampBackground = document.getElementById("modalChampBackground");
modalChampBackground.addEventListener("click", closeModal);

const modalObject = document.getElementById("modalObjectContainer");
const modalObjectImg = document.getElementById("modalObjectImg");
const modalObjectStats = document.getElementById("modalObjectStats");
const objectTo = document.getElementById("objectTo");
const objectFrom = document.getElementById("objectFrom");
const modalObjectBackground = document.getElementById("modalObjectBackground");
modalObjectBackground.addEventListener("click", closeModal);

/**
 *
 * @param {*} modal **str** The modal you wish to open
 */
function showModal(modal) {
  if (modal === "champ") {
    modalChamp.style.display = "block";
  } else if (modal === "object") {
    modalObject.style.display = "block";
  }
}

function closeModal() {
  modalChamp.style.display = "none";
  modalObject.style.display = "none";
}
