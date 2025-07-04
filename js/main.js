// Main JavaScript for StaffMode Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeNavigation();
    initializeAnimations();
    initializeDownloadHandlers();
    initializeTooltips();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation effects
function initializeAnimations() {
    // Fade in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card, .hero-section, .page-header').forEach(el => {
        observer.observe(el);
    });
}

// Download button handlers
function initializeDownloadHandlers() {
    const downloadButtons = document.querySelectorAll('[onclick*="handleDownload"]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filename = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            handleDownload(filename);
        });
    });
}

// Handle download functionality
function handleDownload(filename) {
    const button = event.target.closest('button') || event.target.closest('a');
    
    // Add loading state
    button.classList.add('loading');
    button.disabled = true;
    
    // Simulate download process
    setTimeout(() => {
        // Create download notification
        showNotification('Download started!', 'success');
        
        // In a real implementation, you would initiate the actual download here
        // For now, we'll just show a message
        setTimeout(() => {
            showNotification(`${filename} download complete!`, 'info');
            button.classList.remove('loading');
            button.disabled = false;
        }, 2000);
    }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${getIconForType(type)} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get icon for notification type
function getIconForType(type) {
    const icons = {
        'success': 'check-circle',
        'info': 'info-circle',
        'warning': 'exclamation-triangle',
        'danger': 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth navbar transition
    navbar.style.transition = 'transform 0.3s ease-in-out';
}

// Form validation (if needed)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        showNotification('Failed to copy to clipboard', 'danger');
    });
}

// Theme toggle (if needed)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            } else {
                searchResults.innerHTML = '';
            }
        });
    }
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to a logging service
});

// Accessibility improvements
function initializeAccessibility() {
    // Add focus indicators
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Skip to main content
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
            }
        });
    }
}

// Initialize all accessibility features
initializeAccessibility();
trackPerformance();

// Utility functions
const utils = {
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    isElementInViewport: function(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for use in other scripts
window.StaffModeWebsite = {
    utils,
    showNotification,
    copyToClipboard,
    handleDownload,
    toggleTheme
};
  
