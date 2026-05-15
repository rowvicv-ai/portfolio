// ── Fade scroll logic ────────────────────────────────────
const sections = Array.from(document.querySelectorAll('.section'));
const homeNavBtns = document.querySelectorAll('.home-nav-btn');
let current = 0;
let isAnimating = false;
let lastNavTime = 0;

function goTo(index) {
  const now = Date.now();
  // Block if animating OR if last nav was less than 1 second ago
  if (index < 0 || index >= sections.length) return;
  if (isAnimating) return;
  if (now - lastNavTime < 1000) return;

  isAnimating = true;
  lastNavTime = now;

  sections[current].classList.remove('active');
  homeNavBtns.forEach(b => b.classList.remove('active-btn'));

  current = index;

  sections[current].classList.add('active');
  const activeBtn = document.querySelector(`.home-nav-btn[href="#${sections[current].id}"]`);
  if (activeBtn) activeBtn.classList.add('active-btn');

  setTimeout(() => { isAnimating = false; }, 1000);
}

goTo(0);

// ── Mouse wheel ──────────────────────────────────────────
let lastWheelTime = 0;
window.addEventListener('wheel', (e) => {
  const now = Date.now();
  if (now - lastWheelTime < 1000) return;
  lastWheelTime = now;
  if (e.deltaY > 0) goTo(current + 1);
  else goTo(current - 1);
}, { passive: true });

// ── Touch swipe ──────────────────────────────────────────
let touchStartY = 0;
let touchStartX = 0;
let touchMoved = false;
let touchLocked = false;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
  touchMoved = false;
  touchLocked = false;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  touchMoved = true;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  if (!touchMoved || touchLocked) return;

  const diffY = touchStartY - e.changedTouches[0].clientY;
  const diffX = Math.abs(touchStartX - e.changedTouches[0].clientX);

  // Must be a strong intentional vertical swipe
  if (Math.abs(diffY) > 100 && diffX < Math.abs(diffY) * 0.4) {
    touchLocked = true;
    if (diffY > 0) goTo(current + 1);
    else goTo(current - 1);
  }
}, { passive: true });

// ── Home nav buttons ─────────────────────────────────────
homeNavBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute('href').replace('#', '');
    const index = sections.findIndex(s => s.id === targetId);
    if (index !== -1) goTo(index);
  });
});

// ── Back button ──────────────────────────────────────────
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => goTo(0));
});

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
    targets: '.home-greeting, .home-title, .home-img-wrapper, .home-nav',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(120, { start: 300 }),
    duration: 700,
    easing: 'easeOutExpo',
  });
});