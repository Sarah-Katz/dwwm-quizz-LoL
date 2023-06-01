// Modal champions
const modalChamp = document.getElementById("modalChampContainer");
const modalChampImg = document.getElementById("modalChampImg");
const modalChampSpells = document.getElementById("modalChampSpells");
const modalChampStats = document.getElementById("modalChampStats");
const modalChampbackground = document.getElementById("modalBackground");
modalChampbackground.addEventListener("click", closeModal);

/**
 *
 * @param {*} modal **str** The modal you wish to open
 */
function showModal(modal) {
  if (modal === "champ") {
    modalChamp.style.display = "block";
  }
}

function closeModal() {
  modalChamp.style.display = "none";
}
