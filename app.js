// Mobile navigation toggle
const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const mobileMenuClose = document.querySelector('[data-mobile-menu-close]');
const mobileMenuLinks = document.querySelectorAll('[data-mobile-menu] a');

// Toggle mobile menu
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  });
}

// Close mobile menu
if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });
}

// Close mobile menu when clicking links
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
});

// Close mobile menu when clicking outside
if (mobileMenu) {
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Ignore empty hash or just "#"
    if (!href || href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const offset = 80; // Account for fixed header
      
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll reveal animation using IntersectionObserver
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after reveal
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with data-reveal attribute
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach(el => {
    el.classList.add('reveal-element');
    observer.observe(el);
  });
});

// Add scroll listener for header background on scroll
const header = document.querySelector('header');
let lastScroll = 0;

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Handle escape key to close mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
});