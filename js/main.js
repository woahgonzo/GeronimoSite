/* ============================================================
   GERONIMO RECORDS — main.js
   geronimorecords.net
   ============================================================ */

/* ── NAV: Scroll background ───────────────────────────────── */
(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ── NAV: Active page link highlight ─────────────────────── */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── NAV: Mobile hamburger toggle ────────────────────────── */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── FADE-IN on scroll ────────────────────────────────────── */
(function () {
  const targets = document.querySelectorAll(
    '.event-row, .archive-card, .merch-card, .person-card, .section-title, .section-label'
  );

  if (!targets.length) return;

  // Add initial state
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within the same parent
        const delay = Array.from(entry.target.parentElement?.children || [])
          .indexOf(entry.target) * 60;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
})();

/* ── GALLERY SLIDESHOW */
(function () {
  const slides = Array.from(document.querySelectorAll('.gallery-slide'));
  const prevBtn = document.querySelector('.gallery-nav-prev');
  const nextBtn = document.querySelector('.gallery-nav-next');
  const dots = Array.from(document.querySelectorAll('.gallery-dot'));
  const modal = document.querySelector('.gallery-modal');
  const modalImg = modal?.querySelector('img');
  const modalCaptionText = modal?.querySelector('.modal-caption-text');
  const modalCaptionOrder = modal?.querySelector('.modal-caption-order');
  const modalClose = modal?.querySelector('.gallery-modal-close');
  const modalPrev = modal?.querySelector('.gallery-modal-prev');
  const modalNext = modal?.querySelector('.gallery-modal-next');
  const gallerySlides = document.querySelector('.gallery-slides');
  if (!slides.length || !prevBtn || !nextBtn || !dots.length || !modal || !modalImg || !modalCaptionText || !modalCaptionOrder || !modalClose || !modalPrev || !modalNext || !gallerySlides) return;

  let currentSlide = 0;
  let startX = 0;
  let isDragging = false;

  const normalizeIndex = (index) => (index + slides.length) % slides.length;

  const setSlide = (index) => {
    currentSlide = normalizeIndex(index);
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  };

  const openModal = (index) => {
    const selected = normalizeIndex(index);
    const slide = slides[selected];
    const img = slide.querySelector('img');
    if (!img) return;
    currentSlide = selected;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalCaptionText.textContent = img.alt || `Photo ${selected + 1}`;
    modalCaptionOrder.textContent = `${selected + 1} / ${slides.length}`;
    setSlide(selected);
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  const showSlide = (index) => {
    setSlide(index);
  };

  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.index) - 1);
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener('click', () => openModal(Number(slide.dataset.index) - 1));
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(Number(slide.dataset.index) - 1);
      }
    });
    const img = slide.querySelector('img');
    if (!img) return;
    img.addEventListener('error', () => {
      slide.classList.add('missing-image');
    });
    img.addEventListener('load', () => {
      slide.classList.remove('missing-image');
    });
  });

  const addSwipe = (element, onSwipeLeft, onSwipeRight) => {
    element.addEventListener('pointerdown', (event) => {
      startX = event.clientX;
      isDragging = true;
      element.setPointerCapture(event.pointerId);
    });

    element.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      const deltaX = event.clientX - startX;
      if (Math.abs(deltaX) > 80) {
        if (deltaX < 0) onSwipeLeft();
        else onSwipeRight();
        isDragging = false;
      }
    });

    element.addEventListener('pointerup', () => {
      isDragging = false;
    });

    element.addEventListener('pointercancel', () => {
      isDragging = false;
    });
  };

  addSwipe(gallerySlides, () => showSlide(currentSlide + 1), () => showSlide(currentSlide - 1));
  addSwipe(modal, () => openModal(currentSlide + 1), () => openModal(currentSlide - 1));

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', () => openModal(currentSlide - 1));
  modalNext.addEventListener('click', () => openModal(currentSlide + 1));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('open')) {
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') openModal(currentSlide - 1);
      if (event.key === 'ArrowRight') openModal(currentSlide + 1);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(currentSlide - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(currentSlide + 1);
    }
  });

  setSlide(0);
})();

/* ── CONTACT FORM: Formspree submission ───────────────────── */
(function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const successMsg = document.querySelector('.form-success');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.reset();
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.textContent = "Message received. We'll be in touch soon.";
        }
        submitBtn.textContent = 'Sent ✓';
      } else {
        submitBtn.textContent = 'Error — try again';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Error — try again';
      submitBtn.disabled = false;
    }

    // Reset button text after a few seconds on success
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 4000);
  });
})();
