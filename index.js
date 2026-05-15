const navButtons = document.querySelectorAll('.home-nav-btn');

navButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = btn.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }

    navButtons.forEach(b => b.classList.remove('active-btn'));
    btn.classList.add('active-btn');
  });
});

// BACK BUTTONS

document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelector('#home').scrollIntoView({
      behavior: 'smooth'
    });

    navButtons.forEach(b => b.classList.remove('active-btn'));

    const homeBtn = document.querySelector('[href="#home"]');

    if (homeBtn) {
      homeBtn.classList.add('active-btn');
    }
  });
});

// CERT MODAL

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

// ANIMATIONS

window.addEventListener('load', () => {

  anime({
    targets: '.home-name',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 900,
    easing: 'easeOutExpo',
  });

  anime({
    targets: '.home-greeting, .home-title, .home-img-wrapper, .home-nav',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(120, { start: 300 }),
    duration: 700,
    easing: 'easeOutExpo',
  });

});