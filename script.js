// Enhanced Professional Portfolio Script with Advanced Animations

const projects = [
  {
    id: "p-knowledgehub",
    title: "Knowledge Hub Portal – Automation Framework",
    description: "Built an automation testing framework using Selenium WebDriver, Java, Maven and TestNG. Implemented Page Object Model and automated regression suites with reports.",
    tags: ["automation","selenium","java","testng","powerbi"],
    logo: "https://cdn.simpleicons.org/selenium/ffffff",
    mediaGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    repo: "https://github.com/shitalghadge1683/knowledge-hub-automation",
    live: ""
  },
  {
    id: "p-tutorialsninja",
    title: "TutorialsNinja – Manual Testing",
    description: "End-to-end manual testing: user flows, cross-browser checks and defect reporting in Jira. Wrote >50 test cases and validated critical scenarios.",
    tags: ["manual","jira","cross-browser","testing"],
    logo: "https://cdn.simpleicons.org/jira/ffffff",
    mediaGradient: "linear-gradient(135deg, #fb7185 0%, #f472b6 100%)",
    repo: "https://github.com/shitalghadge1683/tutorialsninja-testing",
    live: ""
  },
  {
    id: "p-internship",
    title: "QA Internship – Blockstars Global",
    description: "Internship contributions: executed manual & automated test cases, integrated tests into CI and improved reporting.",
    tags: ["internship","agile","jira","automation"],
    logo: "https://cdn.simpleicons.org/gitlab/ffffff",
    mediaGradient: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
    repo: "https://github.com/shitalghadge1683",
    live: ""
  }
];

// DOM refs
const grid = document.getElementById('projects-grid');
const template = document.getElementById('project-template');
const filters = document.querySelectorAll('.filter');
const searchInput = document.getElementById('search');
const yearSpan = document.getElementById('year');
const typedEl = document.getElementById('typed');
const particleCanvas = document.getElementById('particle-canvas');

// Set year
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Enhanced typing effect
const typedWords = ['confidence', 'precision', 'quality', 'excellence'];
let tIndex = 0, cIndex = 0, forward = true;

function tickTyped(){
  if (!typedEl) return;
  const word = typedWords[tIndex];
  if (forward) {
    cIndex++;
    typedEl.textContent = word.slice(0, cIndex);
    if (cIndex === word.length) { 
      forward = false; 
      setTimeout(tickTyped, 2000); 
      return; 
    }
  } else {
    cIndex--;
    typedEl.textContent = word.slice(0, cIndex);
    if (cIndex === 0) { 
      forward = true; 
      tIndex = (tIndex+1)%typedWords.length; 
    }
  }
  setTimeout(tickTyped, forward ? 100 : 50);
}
tickTyped();

// Render projects with enhanced animations
function render(list) {
  grid.innerHTML = '';
  list.forEach((p, idx) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector('.project-card');
    const media = node.querySelector('.project-media');
    const logoImg = node.querySelector('.project-logo');
    const initialsEl = node.querySelector('.project-initials');
    const title = node.querySelector('.project-title');
    const desc = node.querySelector('.project-desc');
    const tagsWrap = node.querySelector('.project-tags');
    const repo = node.querySelector('.repo');
    const live = node.querySelector('.live');
    const typeEl = node.querySelector('.project-type');
    const scopeEl = node.querySelector('.project-scope');

    title.textContent = p.title;
    desc.textContent = p.description;
    repo.href = p.repo || '#';
    live.href = p.live || '#';
    repo.setAttribute('aria-label', `Open repo for ${p.title}`);
    live.setAttribute('aria-label', `Open live site for ${p.title}`);

    const primaryTag = (p.tags && p.tags[0]) ? p.tags[0] : 'QA';
    const friendlyTag = primaryTag.replace(/-/g, ' ');
    if (typeEl) typeEl.textContent = friendlyTag.toUpperCase();
    if (scopeEl) scopeEl.textContent = `${friendlyTag.charAt(0).toUpperCase()}${friendlyTag.slice(1)} focus`;

    // Enhanced initials with gradient
    const initials = p.title.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase();
    if (p.logo && logoImg) {
      logoImg.src = p.logo;
      logoImg.hidden = false;
      if (initialsEl) initialsEl.hidden = true;
    } else {
      if (logoImg) logoImg.hidden = true;
      if (initialsEl) {
        initialsEl.hidden = false;
        initialsEl.textContent = initials;
      }
    }
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    media.style.background = p.mediaGradient || gradients[idx % gradients.length];

    // Add tags
    (p.tags || []).forEach(t => {
      const sp = document.createElement('span');
      sp.textContent = t;
      tagsWrap.appendChild(sp);
    });

    // 3D tilt effect on hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      card.style.transform = `perspective(1000px) rotateX(${ -dy * 10 }deg) rotateY(${ dx * 10 }deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // Staggered animation delay
    card.style.transitionDelay = `${idx * 100}ms`;
    grid.appendChild(node);
  });

  observeProjects();
}

// Filters with smooth transitions
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Add ripple effect
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
  
  applyFilters(btn.dataset.filter, searchInput.value.trim());
}));

// Add ripple animation
if (!document.querySelector('#ripple-style')) {
  const style = document.createElement('style');
  style.id = 'ripple-style';
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

searchInput.addEventListener('input', e => {
  const q = e.target.value.trim();
  const active = document.querySelector('.filter.active')?.dataset.filter || 'all';
  applyFilters(active, q);
});

function applyFilters(filter, query) {
  const q = query.toLowerCase();
  const out = projects.filter(p => {
    const matchesFilter = filter === 'all' ? true : (p.tags || []).includes(filter);
    const matchesQuery = q === '' ? true : (p.title + ' ' + p.description + ' ' + (p.tags||[]).join(' ')).toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
  
  // Fade out animation
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
  });
  
  setTimeout(() => render(out), 200);
}

// THEME TOGGLE with smooth transition
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(lightMode) {
  // Add transition class
  root.style.transition = 'all 0.5s ease';
  
  if (lightMode) {
    root.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  } else {
    root.classList.remove('light-mode');
    themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', lightMode ? 'light' : 'dark');
  
  // Remove transition after change
  setTimeout(() => root.style.transition = '', 500);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = !root.classList.contains('light-mode');
    applyTheme(next);
  });
}

// Initialize theme
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'light') { applyTheme(true); return; }
  if (saved === 'dark')  { applyTheme(false); return; }
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight);
})();

// Mobile menu with animation
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn) menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!open));
  mobileMenu.hidden = open;
  
  if (!open) {
    mobileMenu.style.animation = 'slideDown 0.3s ease-out';
  }
});

// Enhanced Intersection Observer for fade-up animations
const ioOpts = {root:null, rootMargin:'0px', threshold:0.1};
const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
    }
  });
}, ioOpts);

// Trigger animations immediately for elements in viewport
setTimeout(() => {
  document.querySelectorAll('.fade-up').forEach(el => {
    fadeObserver.observe(el);
    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in-view');
    }
  });
}, 100);

function observeProjects(){
  const cards = document.querySelectorAll('.project-card');
  const pObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in-view');
      }
    });
  }, ioOpts);
  
  cards.forEach((c, idx) => {
    pObs.observe(c);
    // Staggered reveal for initial load
    setTimeout(() => {
      const rect = c.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        c.classList.add('in-view');
      }
    }, idx * 100);
  });
}

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  const suffix = element.dataset.suffix || '+';
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = `${target}${suffix}`;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Observe stats and trigger animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const number = entry.target.querySelector('.stat-number');
      const target = parseInt(number.dataset.target);
      animateCounter(number, target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
  statsObserver.observe(card);
});

// Testimonials carousel
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevTestimonial = document.querySelector('.testimonial-nav.prev');
const nextTestimonial = document.querySelector('.testimonial-nav.next');
let testimonialIndex = 0;

function showTestimonial(idx){
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === idx);
  });
}

if (testimonialCards.length){
  showTestimonial(0);
}

if (testimonialCards.length > 1){
  prevTestimonial?.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  });
  nextTestimonial?.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  });
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  }, 6000);
}

// Enhanced particle system
(function particlesInit(){
  const canvas = particleCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  
  window.addEventListener('resize', () => { 
    w = canvas.width = innerWidth; 
    h = canvas.height = innerHeight; 
  });
  
  const N = Math.max(30, Math.floor((w * h) / 100000));
  const parts = Array.from({length: N}).map(() => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.8 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -0.05 - Math.random() * 0.2,
    a: 0.1 + Math.random() * 0.2,
    hue: 200 + Math.random() * 80
  }));
  
  function draw(){
    ctx.clearRect(0, 0, w, h);
    
    parts.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around
      if (p.y < -10) { 
        p.y = h + 10; 
        p.x = Math.random() * w; 
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      
      // Pulsing effect
      p.a += Math.sin(Date.now() / 5000 + p.r) * 0.003;
      
      ctx.beginPath();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.a));
      
      // Gradient particles
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
      gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.a})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
      ctx.fillStyle = gradient;
      
      ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Connect nearby particles
      parts.forEach(p2 => {
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150 && dist > 0) {
          ctx.beginPath();
          ctx.globalAlpha = (1 - dist / 150) * 0.1;
          ctx.strokeStyle = `hsl(${p.hue}, 80%, 60%)`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(draw);
  }
  draw();
})();

// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax on hero removed to avoid overlap with sticky header while scrolling

// Keyboard navigation enhancement
let tabbing = false;
window.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    tabbing = true;
    document.body.classList.add('user-is-tabbing');
  }
});
window.addEventListener('mousedown', () => {
  tabbing = false;
  document.body.classList.remove('user-is-tabbing');
});

// Initial render
render(projects);

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});