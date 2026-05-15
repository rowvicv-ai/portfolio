const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.home-nav-btn');

let current = 0;
let isAnimating = false;

function goTo(index) {

  if (index < 0 || index >= sections.length) return;

  if (isAnimating || current === index) return;

  isAnimating = true;

  sections[current].classList.remove('active');

  navButtons.forEach(btn => {
    btn.classList.remove('active-btn');
  });

  current = index;

  sections[current].classList.add('active');

  const activeBtn =
    document.querySelector(
      `.home-nav-btn[href="#${sections[current].id}"]`
    );

  if (activeBtn) {
    activeBtn.classList.add('active-btn');
  }

  sections[current].scrollTop = 0;

  setTimeout(() => {
    isAnimating = false;
  }, 650);
}

/* INITIAL */

sections[0].classList.add('active');

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

/* MODAL */

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
      '.home-greeting, .home-title, .home-img-wrapper, .home-nav',

    opacity: [0, 1],
    translateY: [20, 0],

    delay:
      anime.stagger(120, { start: 300 }),

    duration: 700,
    easing: 'easeOutExpo',
  });

});