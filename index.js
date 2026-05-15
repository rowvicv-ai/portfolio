// ── Fade scroll logic ────────────────────────────────────
const sections = Array.from(document.querySelectorAll('.section'));
const links = document.querySelectorAll('.nav-link');
let current = 0;
let isAnimating = false;

function goTo(index) {
  if (index < 0 || index >= sections.length || isAnimating) return;
  isAnimating = true;

  sections[current].classList.remove('active');
  links.forEach(l => l.classList.remove('active'));

  current = index;

  sections[current].classList.add('active');
  const activeLink = document.querySelector(`.nav-link[href="#${sections[current].id}"]`);
  if (activeLink) activeLink.classList.add('active');

  setTimeout(() => { isAnimating = false; }, 900);
}

goTo(0);

// ── Mouse wheel ──────────────────────────────────────────
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) goTo(current + 1);
  else goTo(current - 1);
}, { passive: true });

// ── Touch swipe ──────────────────────────────────────────
let touchStartY = 0;
window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; });
window.addEventListener('touchend', (e) => {
  const diff = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(diff) > 40) {
    if (diff > 0) goTo(current + 1);
    else goTo(current - 1);
  }
});

// ── Nav links ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const index = sections.findIndex(s => s.id === targetId);
    if (index !== -1) goTo(index);
    navLinksEl.classList.remove('open');
  });
});

// ── Hamburger ────────────────────────────────────────────
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));

// ── Cert modal ───────────────────────────────────────────
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
  if (e.key === 'Escape') closeModal();
});

// ── SweetAlert2 welcome toast ────────────────────────────
window.addEventListener('load', () => {
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: 'Welcome to my portfolio!',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#1a1a2e',
    color: '#f0ede8',
    iconColor: '#e8c97a',
  });

  anime({
    targets: '.home-name',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 900,
    easing: 'easeOutExpo',
  });

  anime({
    targets: '.home-greeting, .home-title, .btn-primary',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(120, { start: 300 }),
    duration: 700,
    easing: 'easeOutExpo',
  });
});