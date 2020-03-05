
document.querySelector(".btn").addEventListener("click", function() {
  document
    .querySelector(".nav__burger")
    .classList.toggle("nav__burger--opened");
  document
    .querySelector(".nav__opened-list")
    .classList.toggle("nav__opened-active");
});
