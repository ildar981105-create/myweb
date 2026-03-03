(function () {
  'use strict';

  // =========================================
  // Hero entrance animation (fix: .fl-hero)
  // =========================================
  const heroAnims = document.querySelectorAll('.fl-hero .anim-fade');
  if (heroAnims.length) {
    setTimeout(() => {
      heroAnims.forEach(el => {
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('show'), delay);
      });
    }, 200);
  }

  // =========================================
  // FAQ 手风琴
  // =========================================
  const faqItems = document.querySelectorAll('.fl-faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.fl-faq__q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // =========================================
  // Scroll reveal for freelance elements
  // =========================================
  const flRevealTargets = document.querySelectorAll(
    '.fl-card, .fl-flow, .fl-formats, .fl-portfolio__left, .fl-portfolio__right, .fl-showcase, .fl-process__step, .fl-pricing__card, .fl-why__item, .fl-faq, .fl-contact-tip'
  );

  const flRevealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        flRevealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  flRevealTargets.forEach(el => flRevealObs.observe(el));

})();
