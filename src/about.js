import '../styles/style.css';
import '../styles/about.css';

/* =========================================
   PAGE LOADER - ONLY ON PAGE NAVIGATION
   ========================================= */
const pageLoader = document.getElementById('pageLoader');

// Check if this is a fresh page load (not same-page navigation)
const showLoader = () => {
  // Performance API tells us if this is a fresh navigation
  const navType = performance.getEntriesByType('navigation')[0]?.type;
  
  // Show loader only on:
  // - 'navigate' (clicking a link to new page)
  // - 'reload' (refreshing the page)
  // - 'back_forward' (browser back/forward buttons)
  
  return navType === 'navigate' || navType === 'reload' || navType === 'back_forward';
};

if (pageLoader) {
  if (showLoader()) {
    // Show loader and prevent scroll
    document.body.classList.add('no-scroll');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageLoader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
      }, 1000);
    });
    
    // Fallback: Hide after 5 seconds max
    setTimeout(() => {
      if (!pageLoader.classList.contains('loaded')) {
        pageLoader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
      }
    }, 5000);
    
  } else {
    // Same-page navigation or other - hide loader immediately
    pageLoader.classList.add('loaded');
  }
}

/* =========================================
   ABOUT PAGE JAVASCRIPT
   ========================================= */

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

/* =========================================
   CONTACT MODAL
   ========================================= */
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const contactClose = document.getElementById('contactClose');

if (contactBtn && contactModal) {
  // Open modal
  contactBtn.addEventListener('click', () => {
    contactModal.classList.add('active');
    document.body.classList.add('no-scroll');
  });

  // Close modal - close button
  if (contactClose) {
    contactClose.addEventListener('click', () => {
      contactModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }

  // Close modal - click outside content
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Close modal - Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      contactModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
}