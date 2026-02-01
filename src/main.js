import '../styles/style.css';

/* =========================================
   PAGE LOADER - ONLY ON PAGE NAVIGATION
   ========================================= */
const pageLoader = document.getElementById('pageLoader');

const showLoader = () => {
  if (performance && performance.getEntriesByType) {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const navType = navEntries[0].type;
      return navType === 'navigate' || navType === 'reload' || navType === 'back_forward';
    }
  }

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

/* =========================================
   1. SKILL POPUPS & TYPEWRITER
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  
  // --- SKILL POPUPS ---
  const skillNames = document.querySelectorAll('.skill-name');
  skillNames.forEach(skill => {
    skill.addEventListener('click', () => {
      const aboutSkill = skill.querySelector('.about-skill');
      if (aboutSkill) {
        createSkillPopup(aboutSkill.innerHTML);
      }
    });
  });

  function createSkillPopup(content) {
    let tempModal = document.createElement('div');
    tempModal.className = 'modal-overlay';
    tempModal.innerHTML = `
      <div class="modal">
        <span class="close-modal">&times;</span>
        <div class="modal-content">${content}</div>
      </div>
    `;
    document.body.appendChild(tempModal);

    const closeBtn = tempModal.querySelector('.close-modal');
    closeBtn.onclick = () => tempModal.remove();
    tempModal.onclick = (e) => {
      if (e.target === tempModal) tempModal.remove();
    };
  }

  // --- TYPEWRITER WITH FADE TRANSITION ---
  const text1 = document.querySelector(".text1");
  const text2 = document.querySelector(".text2");
  const text3 = document.querySelector(".text3");
  const texts = [text1, text2, text3].filter(el => el !== null);
  
  const typeWriterContainer = document.querySelector('.typewriter');

  if (texts.length > 0) {
    const originalTexts = texts.map(el => el.textContent);
    const speed = 120;

    function typeText(index = 0, charIndex = 0) {
      if (index >= texts.length) {
        setTimeout(() => {
          triggerFinalTransition();
        }, 2000);
        return;
      }

      if (!texts[index]) return;

      texts[index].textContent = originalTexts[index].slice(0, charIndex);
      if (charIndex < originalTexts[index].length) {
        setTimeout(() => typeText(index, charIndex + 1), speed);
      } else {
        setTimeout(() => typeText(index + 1, 0), speed * 2);
      }
    }

    function triggerFinalTransition() {
      if (!typeWriterContainer) return;
      
      typeWriterContainer.style.transition = "opacity 0.5s ease";
      typeWriterContainer.style.opacity = "0";

      setTimeout(() => {
        typeWriterContainer.innerHTML = '<span class="text1">HEHHE ENJOY!!</span>';
        typeWriterContainer.style.opacity = "1";
      }, 300);
    }

    texts.forEach(el => { el.textContent = ""; });
    typeText();
  }
});

/* =========================================
   2. CODE EDITOR CARDS
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const expectedAnswers = [
    `import pandas as pd
data = {
    'Name': ['Alice', 'Bob', 'Cee'],
    'Age': [21, 30, 25]
}

df = pd.DataFrame(data)
print(df)`,
    `import matplotlib.pyplot as plt
import numpy as np

x = [1, 2, 3, 4, 5]
y = [10, 20, 15, 25, 30]

plt.plot(x, y)
plt.show()`,
    `CREATE TABLE Users (id INT, name VARCHAR(50), City VARCHAR(50));

INSERT INTO Users VALUES (1, 'Alice', 'New York'), (2, 'Bob', 'London');

SELECT * FROM Users;`,
    `function checkNumber(num) {
    if (num === 10) {
        console.log("It's ten!");
    } else {
        return "It's not ten.";
    }
}`,
    `import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print(np.mean(a))
print(np.sum(a))`,
    `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model = LinearRegression()
model.fit(X, y)

print(model.predict([[5]]))`
  ];

  document.querySelectorAll(".in-card").forEach((card) => {
    const editBtn = card.querySelector(".edit-btn");
    const runBtn = card.querySelector(".run-btn");
    const codeEditor = card.querySelector(".code-editor");
    const feedback = card.querySelector(".feedback");
    const cardId = parseInt(card.dataset.id);
    let textarea = null;

    if (editBtn && runBtn && codeEditor) {
      // Edit button
      editBtn.addEventListener("click", () => {
        const codeBlock = codeEditor.querySelector("code");
        if (codeBlock && !textarea) {
          textarea = document.createElement("textarea");
          textarea.value = codeBlock.textContent;
          textarea.classList.add("code-input");
          codeEditor.innerHTML = "";
          codeEditor.appendChild(textarea);
          textarea.focus();
        }
      });

      // Run button
      runBtn.addEventListener("click", () => {
        if (textarea) {
          const newCode = textarea.value.trim();

          const newPre = document.createElement("pre");
          const newCodeTag = document.createElement("code");
          newCodeTag.textContent = newCode;
          newPre.appendChild(newCodeTag);
          codeEditor.innerHTML = "";
          codeEditor.appendChild(newPre);
          textarea = null;

          const expected = expectedAnswers[cardId];
          if (!expected) {
            if (feedback) feedback.textContent = "⚠️ No expected answer found.";
            return;
          }

          if (newCode === expected.trim()) {
            if (feedback) feedback.textContent = "✅ Ran Successfully";
            card.classList.add("correct");
            card.classList.remove("incorrect");
          } else {
            if (feedback) feedback.textContent = "❌ Error in Code.";
            card.classList.add("incorrect");
            card.classList.remove("correct");
          }
        }
      });
    }
  });
});

/* =========================================
   3. RESPONSIVE NAVIGATION & HAMBURGER MENU
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navItems = document.querySelector('.nav-items');
  
  if (!navbar) return;

  // Check if hamburger already exists to avoid duplicates
  if (document.querySelector('.hamburger')) return;

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

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'mobile-nav-close';
  closeBtn.setAttribute('aria-label', 'Close navigation menu');
  closeBtn.innerHTML = '&times;';

  // Clone nav items if they exist
  let mobileNavItems;
  if (navItems) {
    mobileNavItems = navItems.cloneNode(true);
    mobileNavItems.className = 'mobile-nav-items';
  } else {
    // Fallback: create mobile nav items from existing links in header
    mobileNavItems = document.createElement('ul');
    mobileNavItems.className = 'mobile-nav-items';
    const links = [
      { text: 'HOME', href: 'index.html' },
      { text: 'SKILLS', href: '#main' },
      { text: 'CERTIFICATES', href: '#certificates' },
      { text: 'PROJECTS', href: '#projects' },
      { text: 'ABOUT', href: 'about.html' },
      { text: 'CONTACT', href: 'about.html#contacts' }
    ];
    
    links.forEach(link => {
      const li = document.createElement('li');
      li.className = 'link-item';
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      mobileNavItems.appendChild(li);
    });
  }

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
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 991 && mobileNav.classList.contains('active')) {
        toggleMenu(true);
      }
    }, 100);
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.card, .skill-category, .slide-frame');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 75;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll down button
  window.scrollDown = function() {
    const mainSection = document.getElementById('main');
    if (mainSection) {
      const headerOffset = 75;
      const elementPosition = mainSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Hide scroll button after scrolling
  const scrollContainer = document.querySelector('.scroll-container');
  if (scrollContainer) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > window.innerHeight * 0.45) {
        scrollContainer.style.opacity = '0';
        scrollContainer.style.pointerEvents = 'none';
      } else {
        scrollContainer.style.opacity = '1';
        scrollContainer.style.pointerEvents = 'auto';
      }
    }, { passive: true });
  }
});

/* =========================================
   4. EXTRA SKILLS TOGGLE (SINGLE HANDLER)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-skills-btn');
  const skillsPanel = document.getElementById('extra-skills-panel');

  if (toggleBtn && skillsPanel) {
    toggleBtn.addEventListener('click', function() {
      // Toggle classes
      this.classList.toggle('active');
      skillsPanel.classList.toggle('open');

      // Update button text
      const isOpen = skillsPanel.classList.contains('open');
      this.innerHTML = isOpen
        ? 'Hide Other Skills <span class="arrow">▲</span>'
        : 'View Other Skills <span class="arrow">▼</span>';
    });
  }
});

/* =========================================
   5. CERTIFICATES MODAL & LIGHTBOX
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const certificatesBtn = document.getElementById('certificates-btn');
  const certificatesModal = document.getElementById('certificatesModal');
  const certificatesClose = document.getElementById('certificatesClose');
  
  // Lightbox Elements
  const lightbox = document.getElementById('certificateLightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxIssuer = document.getElementById('lightboxIssuer');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCurrent = document.getElementById('lightboxCurrent');
  const lightboxTotal = document.getElementById('lightboxTotal');
  
  // Certificate Cards
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  let currentIndex = 0;
  const totalCertificates = certificateCards.length;

  // Exit if elements don't exist
  if (!certificatesBtn || !certificatesModal) return;

  // Update total count
  if (lightboxTotal && totalCertificates > 0) {
    lightboxTotal.textContent = totalCertificates;
  }

  // ==========================================
  // MODAL FUNCTIONS
  // ==========================================
  
  // Open modal
  certificatesBtn.addEventListener('click', () => {
    certificatesModal.classList.add('active');
    document.body.classList.add('no-scroll');
  });

  // Close modal
  const closeModal = () => {
    certificatesModal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  if (certificatesClose) {
    certificatesClose.addEventListener('click', closeModal);
  }

  certificatesModal.addEventListener('click', (e) => {
    if (e.target === certificatesModal) {
      closeModal();
    }
  });

  // ==========================================
  // LIGHTBOX FUNCTIONS
  // ==========================================
  
  // Get certificate data from card
  const getCertificateData = (card) => {
    const img = card.querySelector('.certificate-image img');
    const title = card.querySelector('.certificate-overlay h3');
    const issuer = card.querySelector('.certificate-overlay p:nth-of-type(1)');
    const date = card.querySelector('.certificate-overlay p:nth-of-type(2)');
    
    return {
      imgSrc: img ? img.src : '',
      imgAlt: img ? img.alt : '',
      title: title ? title.textContent : '',
      issuer: issuer ? issuer.textContent : '',
      date: date ? date.textContent : ''
    };
  };

  // Update lightbox content
  const updateLightbox = (index) => {
    const card = certificateCards[index];
    if (!card) return;
    
    const data = getCertificateData(card);
    
    if (lightboxImage) {
      lightboxImage.src = data.imgSrc;
      lightboxImage.alt = data.imgAlt;
    }
    if (lightboxTitle) lightboxTitle.textContent = data.title;
    if (lightboxIssuer) lightboxIssuer.textContent = data.issuer;
    if (lightboxDate) lightboxDate.textContent = data.date;
    if (lightboxCurrent) lightboxCurrent.textContent = index + 1;
    
    // Update navigation buttons
    updateNavButtons();
  };

  // Update navigation button states
  const updateNavButtons = () => {
    if (lightboxPrev) {
      lightboxPrev.disabled = currentIndex === 0;
    }
    if (lightboxNext) {
      lightboxNext.disabled = currentIndex === totalCertificates - 1;
    }
  };

  // Open lightbox
  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox(currentIndex);
    
    if (lightbox) {
      lightbox.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  };

  // Navigate to previous certificate
  const prevCertificate = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightbox(currentIndex);
    }
  };

  // Navigate to next certificate
  const nextCertificate = () => {
    if (currentIndex < totalCertificates - 1) {
      currentIndex++;
      updateLightbox(currentIndex);
    }
  };

  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  
  // Click on certificate card to open lightbox
  certificateCards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Close lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Navigation
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevCertificate();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextCertificate();
    });
  }

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  document.addEventListener('keydown', (e) => {
    // Close modal with Escape
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
      } else if (certificatesModal.classList.contains('active')) {
        closeModal();
      }
    }
    
    // Navigate lightbox with arrow keys
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        prevCertificate();
      } else if (e.key === 'ArrowRight') {
        nextCertificate();
      }
    }
  });

  // ==========================================
  // TOUCH SWIPE SUPPORT FOR MOBILE
  // ==========================================
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next
        nextCertificate();
      } else {
        // Swiped right - previous
        prevCertificate();
      }
    }
  };
});

