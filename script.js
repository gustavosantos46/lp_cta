// CONTAGEM REGRESSIVA
const startingMinutes = 60;
let time = startingMinutes * 60;

const countdownEl = document.querySelector(".countdown p");
const countdownContainer = document.querySelector(".countdown");

countdownContainer.insertAdjacentHTML(
  "afterbegin",
  "<span>ADQUIRA O JOGO NA PRÉ-VENDA! </span>"
);

setInterval(updateCountdown, 1000);

function updateCountdown() {
  time--;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// CARROSSEL
const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
let slides = Array.from(track.children);
const slideCount = slides.length;
const clonesCount = 3;
let currentIndex = clonesCount;
let isMoving = false;


function setupClones() {
  for (let i = 0; i < clonesCount; i++) {
    const clone = slides[slideCount - 1 - i].cloneNode(true);
    track.prepend(clone);
  }

  for (let i = 0; i < clonesCount; i++) {
    const clone = slides[i].cloneNode(true);
    track.appendChild(clone);
  }
  slides = Array.from(track.children);
}

function setInitialPosition() {
  track.style.transition = "none";
  const initialTransform = calculateTransform(currentIndex);
  track.style.transform = `translateX(${initialTransform}px)`;
  updateActiveClass();

  setTimeout(() => {
    track.style.transition = "transform 0.5s ease-in-out";
  }, 50);
}

function calculateTransform(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = 20;
  const offset = (carousel.offsetWidth - slideWidth) / 2;
  return -(index * (slideWidth + gap)) + offset;
}

function moveToSlide(index) {
  if (isMoving) return;
  isMoving = true;

  const newTransform = calculateTransform(index);
  track.style.transform = `translateX(${newTransform}px)`;
  currentIndex = index;
  updateActiveClass();
}

function updateActiveClass() {
  slides.forEach((slide, index) => {
    const realIndex = (currentIndex - clonesCount + slideCount) % slideCount;
    const slideOriginalIndex = (index - clonesCount + slideCount) % slideCount;

    if (slideOriginalIndex === realIndex) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

track.addEventListener("transitionend", () => {
  isMoving = false;

  if (currentIndex >= slideCount + clonesCount) {
    track.style.transition = "none";
    currentIndex = clonesCount;
    const newTransform = calculateTransform(currentIndex);
    track.style.transform = `translateX(${newTransform}px)`;
  }

  if (currentIndex < clonesCount) {
    track.style.transition = "none";
    currentIndex = slideCount + clonesCount - 1;
    const newTransform = calculateTransform(currentIndex);
    track.style.transform = `translateX(${newTransform}px)`;
  }

  setTimeout(() => {
    track.style.transition = "transform 0.5s ease-in-out";
  }, 50);
});

nextButton.addEventListener("click", () => {
  moveToSlide(currentIndex + 1);
});

prevButton.addEventListener("click", () => {
  moveToSlide(currentIndex - 1);
});

window.addEventListener("resize", () => {
  setInitialPosition();
});

setupClones();
setInitialPosition();
