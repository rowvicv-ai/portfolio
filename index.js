// ── Hamburger menu ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
 
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
 
// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
 
// ── Active nav on scroll ─────────────────────────────────
const sections = document.querySelectorAll('.section');
const links    = document.querySelectorAll('.nav-link');
 
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
 
sections.forEach(s => observer.observe(s));
 
// ── Animate tech cards on scroll ────────────────────────
const techCards = document.querySelectorAll('.tech-card');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
 
techCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.35s, background 0.35s, box-shadow 0.35s, color 0.35s';
  cardObserver.observe(card);
});
 
// ── Cert modal ───────────────────────────────────────────
const overlay  = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');
 
function openCert(imgId) {
  const img = document.getElementById(imgId);
  if (!img) return;
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
 
// Close on Escape
document.addEventListener('keydown', e => {
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
 
  // Anime.js: stagger name letters on load
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