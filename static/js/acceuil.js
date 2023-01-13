const firstDiv = document.querySelector(".typewriter h1");
const secondDiv = document.querySelector(".typewriter h2");

firstDiv.addEventListener("animationend", function() {
  secondDiv.classList.remove("hidden");
  secondDiv.classList.add("visible");
});