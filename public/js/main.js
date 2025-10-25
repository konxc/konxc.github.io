// Main JavaScript file for KonXC website
// This file contains essential JavaScript functionality

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    console.log('KonXC website loaded');
    
    // Initialize essential features
    initializeNavigation();
    initializeForms();
    initializeAccessibility();
  });

  // Navigation functionality
  function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
      });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Form functionality
  function initializeForms() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
          // Simple email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            console.log('Newsletter subscription:', email);
            // Here you would typically send to your email service
            showNotification('Terima kasih! Anda telah berhasil subscribe newsletter.', 'success');
            this.reset();
          } else {
            showNotification('Email tidak valid. Silakan coba lagi.', 'error');
          }
        }
      });
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        console.log('Contact form submission:', data);
        // Here you would typically send to your backend
        showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.', 'success');
        this.reset();
      });
    }
  }

  // Accessibility features
  function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      });
    }

    // Keyboard navigation for dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (trigger && menu) {
        trigger.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.classList.toggle('active');
          } else if (e.key === 'Escape') {
            menu.classList.remove('active');
          }
        });
      }
    });
  }

  // Utility functions
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Performance monitoring
  function initializePerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`Page loaded in ${Math.round(loadTime)}ms`);
      
      // Send to analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          event_category: 'performance',
          value: Math.round(loadTime)
        });
      }
    });

    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
      // This would require the web-vitals library
      // getCLS(console.log);
      // getFID(console.log);
      // getFCP(console.log);
      // getLCP(console.log);
      // getTTFB(console.log);
    }
  }

  // Initialize performance monitoring
  initializePerformanceMonitoring();

  // Export functions for global access if needed
  window.KonXC = {
    showNotification: showNotification,
    initializeNavigation: initializeNavigation,
    initializeForms: initializeForms
  };

})();
