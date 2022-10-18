const changeModalSession = document.querySelectorAll(".btn__session-change");

const sessionModal = document.querySelector("#session-modal");
const sessionModalChange = document.querySelectorAll(".session__change");
const sessionFormChange = document.querySelectorAll(".session__form-container");

const formSignup = document.querySelector("#form-signup");

const btnFormNext = document.querySelector("#btn-form-next");
const btnFormBack = document.querySelector("#btn-form-back");
const btnsFormPage = [btnFormNext, btnFormBack]

let renderChange = true;
let renderPageSignup = 1;

changeModalSession.forEach(e => {
  e.addEventListener("click", () => {
    sessionModal.classList.remove(`session__modal--${ renderChange ? "rigth": "left" }`);
    sessionModal.classList.add(`session__modal--${ !renderChange ? "rigth": "left" }`);
    sessionModalChange[0].classList.toggle("session__change--show");
    sessionModalChange[1].classList.toggle("session__change--show");
    sessionFormChange[0].classList.toggle("session__form-container--show");
    renderPageSignup == 1 && sessionFormChange[1].classList.toggle("session__form-container--show");
    sessionFormChange[2].classList.toggle("session__form-container--show");
    renderChange = !renderChange;
  })
});
btnFormNext.addEventListener("click", () => {
  sessionFormChange[1].classList.remove("session__form-container--show");
  sessionFormChange[2].classList.add("session__form-container--show");
  renderPageSignup++;
  sessionFormChange[renderPageSignup].style.transform = "translate(-100%)";
});
btnFormBack.addEventListener("click", () => {
  sessionFormChange[1].classList.add("session__form-container--show");
  sessionFormChange[2].classList.remove("session__form-container--show");
  sessionFormChange[renderPageSignup].style.transform = "translate(100%)";
  renderPageSignup--;
  sessionFormChange[renderPageSignup].style.transform = "translate(0)";
});

formSignup.addEventListener("keydown", (e) => {
  if(e.keyCode == 13 && renderPageSignup == 1) {
    btnFormNext.click();
    e.preventDefault();
  } 
});