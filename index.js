const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.home-nav-btn');

let current = 0;
let isAnimating = false;

/* SECTION NAVIGATION */

function goTo(index) {

  if (index < 0 || index >= sections.length) return;

  if (isAnimating || current === index) return;

  isAnimating = true;

  /* REMOVE CURRENT */

  sections[current].classList.remove('active');

  navButtons.forEach(btn => {
    btn.classList.remove('active-btn');
  });

  /* CHANGE SECTION */

  current = index;

  /* SHOW NEW SECTION */

  sections[current].classList.add('active');

  /* ACTIVE NAV BUTTON */

  const activeBtn =
    document.querySelector(
      `.home-nav-btn[href="#${sections[current].id}"]`
    );

  if (activeBtn) {
    activeBtn.classList.add('active-btn');
  }

  /* RESET SCROLL */

  sections[current].scrollTop = 0;

  setTimeout(() => {
    isAnimating = false;
  }, 600);
}

/* INITIAL SECTION */

sections[0].classList.add('active');

const firstBtn =
  document.querySelector('.home-nav-btn[href="#home"]');

if (firstBtn) {
  firstBtn.classList.add('active-btn');
}

/* NAV BUTTONS */

navButtons.forEach((btn) => {

  btn.addEventListener('click', (e) => {

    e.preventDefault();

    const target =
      btn.getAttribute('href').replace('#', '');

    const index =
      [...sections].findIndex(
        section => section.id === target
      );

    goTo(index);

  });

});

/* BACK BUTTONS */

document.querySelectorAll('.back-btn').forEach(btn => {

  btn.addEventListener('click', () => {
    goTo(0);
  });

});

/* CERTIFICATE MODAL */

const overlay = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');

function openCert(imgId) {

  const img = document.getElementById(imgId);

  if (!img) return;

  modalImg.src = img.src;
  modalImg.alt = img.alt;

  overlay.classList.add('open');
}

function closeModal() {
  overlay.classList.remove('open');
}

/* ESC CLOSE */

document.addEventListener('keydown', (e) => {

  if (e.key === 'Escape') {
    closeModal();
  }

});

/* INTRO ANIMATION */

window.addEventListener('load', () => {

  anime({
    targets: '.home-name',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 900,
    easing: 'easeOutExpo',
  });

  anime({
    targets:
      '.home-img-wrapper',

    opacity: [0, 1],
    translateY: [20, 0],

    delay: 300,

    duration: 700,
    easing: 'easeOutExpo',
  });

});