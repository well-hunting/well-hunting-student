/* =============================================
   WELL HUNTING FOR STUDENTS - JAVASCRIPT
   ============================================= */

// ---- Network Canvas Animation ----
(function() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let nodes = [];
  let animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createNodes(count) {
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 4 + 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(226, 0, 62, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226, 0, 62, 0.25)`;
      ctx.fill();
    });

    animFrame = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createNodes(60);
    draw();
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    resize();
    createNodes(60);
    draw();
  });

  init();
})();

// ---- Header scroll effect ----
(function() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
})();

// ---- Mobile Menu Toggle ----
(function() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', false);
    });
  });
})();

// ---- FAQ Accordion ----
(function() {
  const questions = document.querySelectorAll('.faq__question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      // Close all
      questions.forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        const a = q.nextElementSibling;
        if (a) a.classList.remove('open');
      });

      // Open clicked (if was closed)
      if (!isExpanded) {
        question.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.add('open');
      }
    });
  });
})();

// ---- Scroll Animations (Intersection Observer) ----
(function() {
  // Add animation classes to elements
  const animateTargets = [
    { selector: '.section-label', cls: 'fade-in' },
    { selector: '.section-title', cls: 'fade-in' },
    { selector: '.about__desc', cls: 'fade-in' },
    { selector: '.about__flow', cls: 'fade-in' },
    { selector: '.about__approach', cls: 'fade-in' },
    { selector: '.about__cta', cls: 'fade-in' },
    { selector: '.benefits__card', cls: 'fade-in' },
    { selector: '.reason__item--odd .reason__text', cls: 'fade-in-left' },
    { selector: '.reason__item--odd .reason__image', cls: 'fade-in-right' },
    { selector: '.reason__item--even .reason__text', cls: 'fade-in-right' },
    { selector: '.reason__item--even .reason__image', cls: 'fade-in-left' },
    { selector: '.flow__step', cls: 'fade-in' },
    { selector: '.voice__card', cls: 'fade-in' },
    { selector: '.faq__item', cls: 'fade-in' },
    { selector: '.realization__content', cls: 'fade-in' },
  ];

  animateTargets.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(cls);
      el.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
})();

// ---- Smooth scroll for anchor links ----
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
