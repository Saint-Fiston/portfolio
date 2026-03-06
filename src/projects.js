import '../styles/style.css';
import '../styles/projects.css';

/* ==========================================
   PROJECTS PAGE SCRIPTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initCategoryToggle();
  initProjectModal();
  initGallery();
  initKeyboardNavigation();
  initHamburgerMenu();
  initImageErrorHandling();
});

/* ==========================================
   PROJECT DATA
   ========================================== */
const projectsData = {
  // SOFTWARE DEV PROJECTS
  'hotel-booking': {
    number: '01',
    type: 'Frontend',
    title: 'Hotel Booking System',
    description: 'This is a frontend hotel booking system built with HTML, CSS, and JavaScript that simulates a full-stack experience using structured JSON hotel data. The application includes a dynamic search feature, a hotel showcase page, authentication UI design concepts, and interactive modals for viewing hotel details and booking options.',
    images: [
      '/images2/Hotel.png',
      '/images2/Hotel4.png',
      '/images2/Hotel2.png',
      '/images2/Hotel3.png',
      '/images2/Hotel5.png'
    ],
    meta: [
      { label: 'Role', value: 'Frontend Development' },
      { label: 'Duration', value: '3 Months' },
      { label: 'Status', value: 'Semi-Complete', statusClass: 'status-complete' }
    ],
    tech: ['HTML', 'CSS', 'Javascript'],
    features: [
      'Dynamic Property Search',
      'JSON-Based Data Management',
      'Interactive Hotel Modals',
      'Authentication UI Simulation',
      'Responsive Frontend Design'
    ],
    links: {
      live: 'https://hotel-booking-system-smoky-five.vercel.app/',
      github: 'https://github.com/Saint-Fiston/Hotel-Booking-System'
    },
    category: 'software'
  },
  
  'portfolio': {
    number: '02',
    type: 'Software Development',
    title: 'Portfolio',
    description: 'A personal portfolio website featuring modern glassmorphism design. Built with attention to detail, smooth animations, and a focus on user experience. Designed in Figma and developed with vanilla HTML, CSS, and JavaScript.',
    images: [
      '/images2/prof.png',
      '/images2/port1.png',
      '/images2/port2.png',
      '/images2/port3.png',
      '/images2/port4.png'
    ],
    meta: [
      { label: 'Role', value: 'Designer & Developer' },
      { label: 'Duration', value: 'Ongoing' },
      { label: 'Status', value: 'Live', statusClass: 'status-live' }
    ],
    tech: ['Figma', 'HTML5', 'CSS3', 'JavaScript', 'Vite'],
    features: [
      'Glassmorphism design style',
      'Smooth animations and transitions',
      'Fully responsive layout',
      'Dark theme with red accents',
      'Accessible and fun'
    ],
    links: {
      live: 'https://fiston-kilele.vercel.app/',
      github: 'https://github.com/Saint-Fiston/portfolio'
    },
    category: 'software'
  },

  'Yellow n Me': {
    number: '03',
    type: 'Design',
    title: 'Yellow n Me',
    description: '',
    images: [
      '/images2/yellnme1.png',
      '/images2/yellnme2.png',
      '/images2/yellnme3.png',
      '/images2/yellnme.png'
    ],
    meta: [
      { label: 'Role', value: 'UI/UX Design' },
      { label: 'Duration', value: '1 Day' },
      { label: 'Status', value: 'Completed', statusClass: 'status-complete' }
    ],
    tech: ['Figma'],
    features: [
      'Real-time messaging',
      'Group chat functionality',
      'File and image sharing',
      'User presence indicators',
      'Message read receipts'
    ],
    links: {
      live: 'https://www.figma.com/proto/ZYvHYlpy4Posg4xupD6Gwg/YELLOW---ME-LANDING-PAGE?node-id=6-2&p=f&t=6O9tJA78t7a4NeGJ-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
      figma: 'https://www.figma.com/design/ZYvHYlpy4Posg4xupD6Gwg/YELLOW---ME-LANDING-PAGE?node-id=0-1&p=f&t=6O9tJA78t7a4NeGJ-0'
    },
    category: 'software'
  },  

  '-----': {
    number: '04',
    type: 'WebRTC',
    title: 'Live Streaming Feature',
    description: 'A real-time video streaming feature built with WebRTC technology. Enables peer-to-peer video communication with low latency and high quality. Designed for integration into larger applications requiring live video functionality.',
    images: [
      '/images2/webrtc2.png',
      '/images2/webrtc2.png',
      '/images2/webrtc2.png'
    ],
    meta: [
      { label: 'Role', value: 'Full-Stack Developer' },
      { label: 'Duration', value: '2 Months' },
      { label: 'Status', value: 'Completed', statusClass: 'status-complete' }
    ],
    tech: ['WebRTC', 'JavaScript', 'Node.js', 'Socket.io', 'Express.js'],
    features: [
      'Peer-to-peer video streaming',
      'Low latency communication',
      'Screen sharing capability',
      'Chat integration',
      'Recording functionality'
    ],
    links: {
      live: '#',
      github: 'https://github.com/Saint-Fiston'
    },
    category: 'software'
  },

  '------': {
    number: '05',
    type: 'Full-Stack',
    title: 'African Estate Agency',
    description: 'A comprehensive real estate platform for the African market. The platform allows users to browse property listings, schedule viewings, and connect with agents. Features include advanced search filters, property comparisons, and a CRM system for agents.',
    images: [
      '/images2/afri.png',
      '/images2/afri.png',
      '/images2/afri.png'
    ],
    meta: [
      { label: 'Role', value: 'Frontend Developer & IT Support' },
      { label: 'Duration', value: '1 Year' },
      { label: 'Status', value: 'Live', statusClass: 'status-live' }
    ],
    tech: ['React.js', 'Django', 'JavaScript', 'CSS3', 'REST API'],
    features: [
      'Property listing and search functionality',
      'Agent CRM integration',
      'Image optimization and management',
      'Data cleaning and processing',
      'Responsive design for all devices'
    ],
    links: {
      live: '#',
      github: 'https://github.com/Saint-Fiston'
    },
    category: 'software'
  },
  
  'The Palace': {
    number: '06',
    type: 'UI/UX Design',
    title: 'Hotel Booking System Design',
    description: 'A comprehensive fitness tracking application that helps users monitor their workouts, track nutrition, and achieve their health goals. Features interactive charts and personalized recommendations based on user data.',
    images: [
      '/images2/hotel-figma3.png',
      '/images2/hotel-figma1.png',
      '/images2/hotel-figma2.png',
      '/images2/hotel-figma4.png'
    ],
    meta: [
      { label: 'Role', value: 'UI/UX Design' },
      { label: 'Duration', value: '3 Hours' },
      { label: 'Status', value: 'Completed', statusClass: 'status-complete' }
    ],
    tech: ['Figma'],
    features: [
      'Workout logging and tracking',
      'Nutrition diary',
      'Progress charts and analytics',
      'Goal setting and reminders',
      'Social sharing features'
    ],
    links: {
      live: 'https://www.figma.com/proto/YWdKwFxypXNGXCX088h08z/THE-PALaCE?t=zvshqTRVWDaWARs6-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=0-1&starting-point-node-id=28%3A14',
      figma: 'https://www.figma.com/design/YWdKwFxypXNGXCX088h08z/THE-PALaCE?t=zvshqTRVWDaWARs6-0'
    },
    category: 'software'
  },
  
  // DATA PROJECTS
  'excel-automation': {
    number: '01',
    type: 'Automation',
    title: 'Excel Automation',
    description: 'This project is a lightweight data pipeline written in Python that processes structured football match results from a CSV file and generates a styled Excel analytics report. It is called a pipeline because it is not tied to a single dataset. The algorithm can process any CSV file that contains the required column structure (e.g., Season, HomeTeam, AwayTeam, FTHG, FTAG, FTR). As long as the schema is consistent, the pipeline can transform and analyze the data automatically.',
    images: [
      '/images2/excel2.png',
      '/images2/excel5.png',
      '/images2/excel6.png',
      '/images2/excel3.png',
      '/images2/excel4.png'

    ],
    meta: [
      { label: 'Role', value: 'Data Engineer' },
      { label: 'Duration', value: '3 Days' },
      { label: 'Status', value: 'Completed', statusClass: 'status-progress'}
    ],
    tech: ['Python', 'Excel', 'OpenPyXL', 'Kaggle'],
    techType: 'data',
    features: [
      'Designed to work with any CSV dataset that follows the same schema,',
      'Implements custom aggregation using core Python data structures (dictionaries and lists) to compute',
      'Generates a fully formatted Excel workbook using openpyxl',
      'Integrated Data Visualization',
      'Schema Validation'
    ],
    links: {
      github: 'https://github.com/Saint-Fiston/Excel-Automation/tree/main'
    },
    category: 'data'
  },
  
  'Automated Real Estate Valuation Model': {
    number: '02',
    type: 'Data Engineering',
    title: 'Data Cleaning Pipeline',
    description: 'I developed an end-to-end Python web scraping and machine learning pipeline that extracts real estate listing data from Property24 for any specified city location. Using Playwright (Python), the system scrapes over 100+ adjustable pages and collects structured property information such as description, price, number of rooms, bathrooms, parking, size, and other key attributes, exporting the results into a CSV file. The project includes a dedicated debugging module to validate HTML tags, class names, and selectors to ensure scraping accuracy and minimize errors. After data collection, the dataset is cleaned and processed using Pandas, analyzed and visualized with Matplotlib and Seaborn, and then used to train a Scikit-learn regression model to predict property prices based on features like size, location, and room count, demonstrating practical skills in data engineering, analysis, and applied machine learning using real-world data.',
    images: [
      '/images2/prop24.jpeg',
      '/images2/prop241.jpeg.png',
      '/images2/prop242.png'
    ],
    meta: [
      { label: 'Role', value: 'Data Engineer' },
      { label: 'Duration', value: '1 Month' },
      { label: 'Status', value: 'In Progress & In Use', statusClass: 'status-progress' }
    ],
    tech: ['Python', 'NumPy', 'Pandas', 'Playwright', 'Seaborn', 'Matplotlib', 'Scikit-learn'],
    techType: 'data',
    features: [
      'Dynamic Web Scraping Engine',
      'Structured Data Extraction',
      'Data Cleaning & Visualization Pipeline',
      'Robust Debugging Module',
      'Machine Learning Predictability'
    ],
    links: {
      github: 'https://github.com/Saint-Fiston/arevm'
    },
    category: 'data'
  },

  'Amazon data cleaning (real-world data)': {
    number: '03',
    type: 'Data Analysis',
    title: 'Amazon data cleaning (real-world data)',
    description: 'I worked on a large real-world Amazon dataset sourced from Kaggle (42,677 rows) to strengthen my data cleaning and preprocessing skills using Python. The original dataset contained 15 columns, which I expanded to 25 columns by extracting additional structured features from existing fields and engineering new variables for improved usability. Over three days, I performed extensive data cleaning and simplification, handling scientific notation issues, correcting inconsistencies, standardizing formats, and ensuring all variables were converted to their appropriate data types rather than remaining as generic objects. The project focused on transforming raw, messy data into a clean, analysis-ready dataset, reinforcing practical skills in data wrangling, feature engineering, and data integrity validation using Pandas.',
    images: [
      '/images2/amazon1.gif',
      '/images2/amazon2.png',
      '/images2/amazon3.png',
      '/images2/amazon4.png',
    ],
    meta: [
      { label: 'Role', value: 'Data Analyst' },
      { label: 'Duration', value: '3 Days' },
      { label: 'Status', value: 'Completed', statusClass: 'status-complete' }
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Jupyter Notebook'],
    techType: 'data',
    features: [
      'Large-Scale Data Cleaning',
      'Feature Engineering & Expansion',
      'Data Type Optimization',
      'Data Simplification & Standardization',
      'Data Integrity & Validation'
    ],
    links: {
      github: 'https://github.com/Saint-Fiston/amazon-sales2025'
    },
    category: 'data'
  },
  
  
  'Fitness Tracker': {
    number: '04',
    type: 'Visualization',
    title: 'Fitness Tracker (Academic Project)',
    description: 'This project simulates fitness tracker data (steps per day and hours of sleep per night) for different groups of users and applies K-Means clustering to identify patterns. The goal is to explore how clustering can be used to group people based on their activity and sleep behavior.',
    images: [
      '/images2/fitness.avif',
      '/images2/fitness2.png',
      '/images2/fitness3.png',
      '/images2/fitness1.png'
    ],
    meta: [
      { label: 'Role', value: 'Data Analyst' },
      { label: 'Duration', value: '1 Week' },
      { label: 'Status', value: 'Completed', statusClass: 'status-complete' }
    ],
    tech: ['Python', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    techType: 'data',
    features: [
      `Generates synthetic fitness tracker data for three user groups: Active Users – high steps, longer sleep, Moderately Active Users – medium steps, moderate sleep, Least Active Users – low steps, shorter sleep
      `,
      'Visualizes the dataset with scatter plots.',
      'Applies K-Means clustering to classify users into activity clusters.',
      'Provides insights into health patterns using machine learning.'
    ],
    links: {
      live: 'https://colab.research.google.com/github/Saint-Fiston/fitness-tracker/blob/main/fitness_tracker.ipynb',
      github: 'https://github.com/Saint-Fiston/fitness-tracker/tree/main'
    },
    category: 'data'
  }
};

/* ==========================================
   PAGE LOADER
   ========================================== */
function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  
  if (!loader) return;
  
  // Add no-scroll at start
  document.body.classList.add('no-scroll');
  
  const hideLoader = () => {
    loader.classList.add('loaded');
    document.body.classList.remove('no-scroll');
  };
  
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 800);
    });
  }
  
  // Fallback
  setTimeout(hideLoader, 4000);
}

/* ==========================================
   CATEGORY TOGGLE
   ========================================== */
function initCategoryToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const softwareSection = document.getElementById('software-projects');
  const dataSection = document.getElementById('data-projects');
  
  if (!toggleBtns.length || !softwareSection || !dataSection) return;
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Update active button
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle sections with animation
      if (category === 'software') {
        dataSection.classList.add('hidden');
        softwareSection.classList.remove('hidden');
        animateCards(softwareSection);
      } else {
        softwareSection.classList.add('hidden');
        dataSection.classList.remove('hidden');
        animateCards(dataSection);
      }
      
      // Scroll to grid
      setTimeout(() => {
        const activeSection = category === 'software' ? softwareSection : dataSection;
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  });
}

function animateCards(section) {
  const cards = section.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = `cardFadeIn 0.6s ease forwards ${index * 0.1}s`;
  });
}

/* ==========================================
   PROJECT MODAL
   ========================================== */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const backBtn = document.getElementById('backBtn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!modal) return;
  
  // Open modal on card click
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = card.dataset.project;
      if (projectId) openModal(projectId);
    });
    
    const viewBtn = card.querySelector('.project-view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const projectId = card.dataset.project;
        if (projectId) openModal(projectId);
      });
    }
  });
  
  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    // Safely get elements and populate
    const projectNumber = document.getElementById('projectNumber');
    const modalType = document.getElementById('modalType');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const mainImg = document.getElementById('modalMainImg');
    const thumbsContainer = document.getElementById('galleryThumbs');
    const metaContainer = document.getElementById('modalMeta');
    const techContainer = document.getElementById('modalTechList');
    const featuresContainer = document.getElementById('modalFeaturesList');
    const linksContainer = document.getElementById('modalLinks');
    
    if (projectNumber) projectNumber.textContent = project.number;
    if (modalType) modalType.textContent = project.type;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    
    // Main image
    if (mainImg && project.images && project.images.length > 0) {
      mainImg.src = project.images[0];
      mainImg.alt = project.title;
    }
    
    // Thumbnails
    if (thumbsContainer && project.images) {
      thumbsContainer.innerHTML = project.images.map((img, index) => `
        <img src="${img}" alt="${project.title} Screenshot ${index + 1}" 
             class="thumb ${index === 0 ? 'active' : ''}" 
             data-index="${index}">
      `).join('');
      
      if (mainImg) {
        initGalleryThumbs(thumbsContainer, mainImg);
      }
    }
    
    // Meta items
    if (metaContainer && project.meta) {
      metaContainer.innerHTML = project.meta.map(item => `
        <div class="meta-item">
          <span class="meta-label">${item.label}</span>
          <span class="meta-value ${item.statusClass || ''}">${item.value}</span>
        </div>
      `).join('');
    }
    
    // Tech badges
    if (techContainer && project.tech) {
      const techType = project.techType || '';
      techContainer.innerHTML = project.tech.map(t => `
        <span class="tech-badge ${techType}">${t}</span>
      `).join('');
    }
    
    // Features
    if (featuresContainer && project.features) {
      featuresContainer.innerHTML = project.features.map(f => `
        <li>${f}</li>
      `).join('');
    }
    
    // Links
    if (linksContainer && project.links) {
      let linksHTML = '';
      
      if (project.links.live) {
        linksHTML += `
          <a href="${project.links.live}" class="modal-btn primary" target="_blank" rel="noopener noreferrer">
            <span>Live Demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </a>
        `;
      }
      
      if (project.links.figma) {
        linksHTML += `
          <a href="${project.links.figma}" class="modal-btn figma" target="_blank" rel="noopener noreferrer">
            <span>View Figma</span>
            <svg width="16" height="16" viewBox="0 0 38 57" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"/>
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"/>
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"/>
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"/>
            </svg>
          </a>
        `;
      }
      
      if (project.links.github) {
        linksHTML += `
          <a href="${project.links.github}" class="modal-btn secondary" target="_blank" rel="noopener noreferrer">
            <span>View Code</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
          </a>
        `;
      }
      
      linksContainer.innerHTML = linksHTML;
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Update URL
    history.pushState({ project: projectId }, '', `#${projectId}`);
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
      history.pushState({}, '', window.location.pathname);
    }
  }
  
  // Handle browser back button
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    if (hash && projectsData[hash]) {
      openModal(hash);
    } else if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });
  
  // Check URL hash on load
  const hash = window.location.hash.slice(1);
  if (hash && projectsData[hash]) {
    setTimeout(() => openModal(hash), 500);
  }
}

/* ==========================================
   GALLERY THUMBNAILS
   ========================================== */
function initGallery() {
  // Initial setup handled by modal opening
}

function initGalleryThumbs(container, mainImg) {
  if (!container || !mainImg) return;
  
  const thumbs = container.querySelectorAll('.thumb');
  
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      mainImg.src = this.src;
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */
function initKeyboardNavigation() {
  const modal = document.getElementById('projectModal');
  
  document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
      history.pushState({}, '', window.location.pathname);
    }
    
    // Arrow keys for gallery navigation
    if (modal && modal.classList.contains('active')) {
      const thumbs = Array.from(modal.querySelectorAll('.gallery-thumbs .thumb'));
      const activeThumb = modal.querySelector('.gallery-thumbs .thumb.active');
      
      if (!activeThumb || thumbs.length === 0) return;
      
      const currentIndex = thumbs.indexOf(activeThumb);
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        thumbs[currentIndex - 1].click();
      } else if (e.key === 'ArrowRight' && currentIndex < thumbs.length - 1) {
        thumbs[currentIndex + 1].click();
      }
    }
  });
}

/* ==========================================
   HAMBURGER MENU (Required for Projects Page)
   ========================================== */
function initHamburgerMenu() {
  const navbar = document.querySelector('.navbar');
  const navItems = document.querySelector('.nav-items');
  
  if (!navbar) return;
  
  // Check if hamburger already exists
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

  // Clone nav items or create fallback
  let mobileNavItems;
  if (navItems) {
    mobileNavItems = navItems.cloneNode(true);
    mobileNavItems.className = 'mobile-nav-items';
  } else {
    mobileNavItems = document.createElement('ul');
    mobileNavItems.className = 'mobile-nav-items';
    const links = [
      { text: 'HOME', href: 'index.html' },
      { text: 'SKILLS', href: 'index.html#main' },
      { text: 'CERTIFICATES', href: 'index.html#certificates' },
      { text: 'PROJECTS', href: 'projects.html' },
      { text: 'ABOUT', href: 'about.html' },
      { text: 'CONTACT', href: 'about.html#contact' }
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
    hamburger.setAttribute('aria-expanded', String(shouldOpen));
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
}

/* ==========================================
   IMAGE ERROR HANDLING
   (Now inside DOMContentLoaded via function)
   ========================================== */
function initImageErrorHandling() {
  document.querySelectorAll('.project-image img').forEach(img => {
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
}