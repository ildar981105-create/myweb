(function () {
  'use strict';

  // =========================================
  // Dot Grid Canvas — 首屏背景
  // =========================================
  const canvas = document.getElementById('gridCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, cols, rows;
    const GAP = 32;
    const DOT = 1.2;
    let mouse = { x: -9999, y: -9999 };
    const RADIUS = 120;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / GAP) + 1;
      rows = Math.ceil(H / GAP) + 1;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP;
          const y = r * GAP;
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let alpha = 0.08;
          let size = DOT;

          if (dist < RADIUS) {
            const t = 1 - dist / RADIUS;
            alpha = 0.08 + t * 0.35;
            size = DOT + t * 2;
          }

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,139,250,${alpha})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  // =========================================
  // Header scroll
  // =========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // =========================================
  // Mobile menu
  // =========================================
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('overlay');
  const overlayLinks = overlay.querySelectorAll('.overlay__link');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // =========================================
  // Hero entrance animation (staggered)
  // =========================================
  const heroAnims = document.querySelectorAll('.hero .anim-fade, .hero .anim-line');
  setTimeout(() => {
    heroAnims.forEach(el => {
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('show'), delay);
    });
  }, 200);

  // =========================================
  // Scroll reveal (IntersectionObserver)
  // =========================================
  const revealTargets = document.querySelectorAll(
    '.section__head, .work-group__label, .work-item, .journey__item, .about__bio, .about__skills, .about__side, .process__grid, .contact__left, .contact__form'
  );

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealTargets.forEach(el => revealObs.observe(el));

  // =========================================
  // Smooth scroll
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // =========================================
  // Contact form
  // =========================================
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const original = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = '发送中...';
      btn.disabled = true;

      setTimeout(() => {
        btn.querySelector('span').textContent = '已发送 ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          btn.querySelector('span').textContent = original;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 2500);
      }, 1000);
    });
  }

})();
