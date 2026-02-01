import '../styles/style.css';
import '../styles/about.css';
import '../styles/projects.css';


/* =========================================
   PAGE LOADER - ONLY ON PAGE NAVIGATION
   ========================================= */
const pageLoader = document.getElementById('pageLoader');

const showLoader = () => {
  // Check if performance API is available
  if (performance && performance.getEntriesByType) {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const navType = navEntries[0].type;
      return navType === 'navigate' || navType === 'reload' || navType === 'back_forward';
    }
  }
  // Fallback: show loader on page load
  return true;
};

if (pageLoader) {
  if (showLoader()) {
    document.body.classList.add('no-scroll');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
      }, 1000);
    });
    
    // Fallback timeout
    setTimeout(() => {
      if (!pageLoader.classList.contains('loaded')) {
        pageLoader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
      }
    }, 5000);
    
  } else {
    pageLoader.classList.add('loaded');
  }
}

/* ==========================================
   PROJECTS PAGE SCRIPTS
   Theme: Midnight Glass
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initProjectNavigation();
  initGallery();
  initScrollAnimations();
  initKeyboardNavigation();
});

/* ==========================================
   PAGE LOADER
   ========================================== */
function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  
  if (!loader) return;
  
  const hideLoader = () => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  };
  
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 500);
    });
  }
}

/* ==========================================
   PROJECT NAVIGATION
   ========================================== */
function initProjectNavigation() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectDetails = document.querySelectorAll('.project-detail');
  const backButtons = document.querySelectorAll('.back-to-projects');
  const heroSection = document.querySelector('.projects-hero');
  const gridSection = document.querySelector('.projects-grid-section');
  const detailsSection = document.querySelector('.project-details-section');
  
  // Map project card IDs to detail IDs
  const projectMap = {
    'hotel-booking': 'hotel-booking-details',
    'aea': 'aea-details',
    'excel-automation': 'excel-details',
    'live-streaming': 'streaming-details',
    'fitness-tracker': 'fitness-details',
    'chat-app': 'chat-details'
  };
  
  // Check URL hash on load
  checkHashOnLoad();
  
  // Handle project card clicks
  projectCards.forEach(card => {
    const viewBtn = card.querySelector('.project-view-btn');
    
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.id;
        showProjectDetail(projectId);
      });
    }
    
    // Also allow clicking anywhere on card
    card.addEventListener('click', (e) => {
      if (e.target.closest('.project-view-btn')) return;
      const projectId = card.id;
      showProjectDetail(projectId);
    });
  });
  
  // Handle back button clicks
  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      hideProjectDetails();
    });
  });
  
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    checkHashOnLoad();
  });
  
  function showProjectDetail(projectId) {
    const detailId = projectMap[projectId];
    if (!detailId) return;
    
    const detail = document.getElementById(detailId);
    if (!detail) return;
    
    // Hide grid and hero
    heroSection?.classList.add('hidden');
    gridSection?.classList.add('hidden');
    
    // Hide all details first
    projectDetails.forEach(d => d.classList.remove('active'));
    
    // Show selected detail
    detail.classList.add('active');
    
    // Update URL
    history.pushState({ project: projectId }, '', `#${detailId}`);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function hideProjectDetails() {
    // Hide all details
    projectDetails.forEach(d => d.classList.remove('active'));
    
    // Show grid and hero
    heroSection?.classList.remove('hidden');
    gridSection?.classList.remove('hidden');
    
    // Clear URL hash
    history.pushState({}, '', window.location.pathname);
    
    // Scroll to grid
    gridSection?.scrollIntoView({ behavior: 'smooth' });
  }
  
  function checkHashOnLoad() {
    const hash = window.location.hash.slice(1);
    
    if (hash && hash.includes('-details')) {
      const detail = document.getElementById(hash);
      
      if (detail) {
        heroSection?.classList.add('hidden');
        gridSection?.classList.add('hidden');
        projectDetails.forEach(d => d.classList.remove('active'));
        detail.classList.add('active');
      }
    } else {
      // Show grid
      heroSection?.classList.remove('hidden');
      gridSection?.classList.remove('hidden');
      projectDetails.forEach(d => d.classList.remove('active'));
    }
  }
}

/* ==========================================
   IMAGE GALLERY
   ========================================== */
function initGallery() {
  // Handle thumbnail clicks
  document.querySelectorAll('.gallery-thumbs .thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const gallery = this.closest('.detail-gallery');
      const mainImg = gallery.querySelector('.gallery-main img');
      const thumbs = gallery.querySelectorAll('.thumb');
      
      // Update main image
      mainImg.src = this.src;
      mainImg.alt = this.alt;
      
      // Update active state
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Global function for inline onclick (fallback)
window.changeImage = function(imgId, src) {
  const mainImg = document.getElementById(imgId);
  if (mainImg) {
    mainImg.src = src;
    
    // Update thumbnails
    const gallery = mainImg.closest('.detail-gallery');
    if (gallery) {
      const thumbs = gallery.querySelectorAll('.thumb');
      thumbs.forEach(t => {
        t.classList.toggle('active', t.src === src);
      });
    }
  }
};

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Add animate-in class styles
  const style = document.createElement('style');
  style.textContent = `
    .project-card.animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // ESC to close project detail
    if (e.key === 'Escape') {
      const activeDetail = document.querySelector('.project-detail.active');
      if (activeDetail) {
        const backBtn = activeDetail.querySelector('.back-to-projects');
        if (backBtn) backBtn.click();
      }
    }
    
    // Arrow keys for gallery navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const activeDetail = document.querySelector('.project-detail.active');
      if (!activeDetail) return;
      
      const gallery = activeDetail.querySelector('.detail-gallery');
      if (!gallery) return;
      
      const thumbs = Array.from(gallery.querySelectorAll('.thumb'));
      const activeThumb = gallery.querySelector('.thumb.active');
      const currentIndex = thumbs.indexOf(activeThumb);
      
      let newIndex;
      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : thumbs.length - 1;
      } else {
        newIndex = currentIndex < thumbs.length - 1 ? currentIndex + 1 : 0;
      }
      
      thumbs[newIndex]?.click();
    }
  });
}

/* ==========================================
   LAZY LOADING IMAGES
   ========================================== */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

/* ==========================================
   SMOOTH SCROLL POLYFILL CHECK
   ========================================== */
function checkSmoothScrollSupport() {
  if (!('scrollBehavior' in document.documentElement.style)) {
    // Fallback for browsers without smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

/* ==========================================
   ERROR HANDLING FOR IMAGES
   ========================================== */
document.querySelectorAll('.project-image img, .gallery-main img, .gallery-thumbs img').forEach(img => {
  img.addEventListener('error', function() {
    this.src = 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
        <rect fill="#1a1a1a" width="400" height="250"/>
        <text fill="#444" font-family="system-ui" font-size="14" text-anchor="middle" x="200" y="125">
          Image not found
        </text>
      </svg>
    `);
    this.alt = 'Image not available';
  });
});

/* ==========================================
   PRELOAD IMAGES ON HOVER
   ========================================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const projectId = card.id;
    const detailId = projectId.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '-details';
    const detail = document.getElementById(detailId) || 
                   document.querySelector(`[id$="${projectId}-details"]`) ||
                   document.querySelector(`[id*="${projectId}"]`);
    
    if (detail) {
      const images = detail.querySelectorAll('img');
      images.forEach(img => {
        if (img.dataset.src) {
          const preload = new Image();
          preload.src = img.dataset.src;
        }
      });
    }
  }, { once: true });
});

console.log('Projects page initialized - Midnight Glass Theme');

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // NAVBAR - HAMBURGER MENU (Same as main page)
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const navItems = document.querySelector('.nav-items');
  
  if (navbar && navItems) {
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';

    // Create mobile nav
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');

    // Clone nav items
    const mobileNavItems = navItems.cloneNode(true);
    mobileNavItems.className = 'mobile-nav-items';

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-nav-close';
    closeBtn.setAttribute('aria-label', 'Close navigation menu');
    closeBtn.innerHTML = '&times;';

    // Assemble mobile nav
    mobileNav.appendChild(closeBtn);
    mobileNav.appendChild(mobileNavItems);

    // Append to DOM
    navbar.appendChild(hamburger);
    document.body.appendChild(overlay);
    document.body.appendChild(mobileNav);

    // Toggle menu function
    const toggleMenu = (forceClose = null) => {
      const shouldOpen = forceClose === null 
        ? !mobileNav.classList.contains('active') 
        : !forceClose;

      hamburger.classList.toggle('active', shouldOpen);
      mobileNav.classList.toggle('active', shouldOpen);
      overlay.classList.toggle('active', shouldOpen);
      document.body.classList.toggle('no-scroll', shouldOpen);
      hamburger.setAttribute('aria-expanded', shouldOpen);
    };

    // Event listeners
    hamburger.addEventListener('click', () => toggleMenu());
    closeBtn.addEventListener('click', () => toggleMenu(true));
    overlay.addEventListener('click', () => toggleMenu(true));

    // Close on link click
    mobileNavItems.querySelectorAll('.link-item').forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggleMenu(true);
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && mobileNav.classList.contains('active')) {
        toggleMenu(true);
      }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('[data-aos]');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('aos-init');
      revealObserver.observe(el);
    });
  }

  // ==========================================
  // SKILL BARS ANIMATION
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-fill');
  
  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          skillObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // ==========================================
  // TIMELINE ANIMATION
  // ==========================================
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));
  }

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
