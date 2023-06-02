document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("linkListes").addEventListener("click", () => redirect("lists"));
  document.getElementById("linkQuizz").addEventListener("click", () => redirect("quizz"));

  function redirect(page) {
    if (page === "lists") {
      window.location.assign("index.html");
    } else {
      window.location.assign("quizz.html");
    }
  }
});
