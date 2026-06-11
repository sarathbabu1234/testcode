// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); menu.classList.remove('open');
}));

// Nav shadow on scroll + back-to-top
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      if (e.target.classList.contains('skill')) {
        const lvl = e.target.dataset.level;
        e.target.querySelector('.bar i').style.width = lvl + '%';
      }
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form validation
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
const setError = (field, on) => field.closest('.field').classList.toggle('error', on);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  let ok = true;
  ['name','email','subject','message'].forEach(k => {
    const el = f[k]; const valid = el.checkValidity();
    setError(el, !valid); if (!valid) ok = false;
  });
  if (!ok) {
    msg.textContent = 'Please fix the highlighted fields.';
    msg.className = 'form-msg err';
    return;
  }
  msg.textContent = 'Sending...'; msg.className = 'form-msg';
  setTimeout(() => {
    msg.textContent = '✅ Thanks! Your message has been sent.';
    msg.className = 'form-msg ok';
    f.reset();
  }, 700);
});

// Particles background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h, particles;
const resize = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
};
const init = () => {
  const count = Math.min(90, Math.floor((w * h) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
    r: Math.random() * 1.6 + .4
  }));
};
const tick = () => {
  ctx.clearRect(0, 0, w, h);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(180,190,255,.6)';
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const d = Math.hypot(dx, dy);
      if (d < 120) {
        ctx.strokeStyle = `rgba(124,92,255,${(1 - d / 120) * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(tick);
};
window.addEventListener('resize', () => { resize(); init(); });
resize(); init(); tick();
