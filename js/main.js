/*
 * Main JavaScript for Carolina & Franco website
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully');
    
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Update year in footer copyright
    updateCopyright();
    
    // Setup smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Create image placeholders until real images are added
    setupImagePlaceholders();
    
    // Add animations for sections on scroll
    setupScrollAnimations();
    
    // Setup contact buttons with predefined messages
    setupContactButtons();
    
    // Setup mobile menu toggle
    setupMobileMenu();
});

// Setup mobile menu toggle functionality
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.modern-header');
    
    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('menu-open');
            
            // Change icon between menu and x
            const menuIcon = menuToggle.querySelector('[data-lucide="menu"]');
            if (menuIcon) {
                // Create X icon if it doesn't exist
                if (header.classList.contains('menu-open')) {
                    menuIcon.setAttribute('data-lucide', 'x');
                    lucide.createIcons();
                } else {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
        
        // Close mobile menu when a link is clicked
        const navLinks = document.querySelectorAll('.modern-header nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('menu-open');
                const menuIcon = menuToggle.querySelector('[data-lucide]');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }
}

// Update copyright year to current year
function updateCopyright() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Ensure heart icon in footer is initialized
    const heartIcon = document.querySelector('footer [data-lucide="heart"]');
    if (heartIcon) {
        lucide.createIcons({
            icons: {
                heart: heartIcon
            }
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Smooth scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
                
                // Highlight the active navigation item
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update URL hash without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Add active class based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Set placeholder backgrounds for image containers
function setupImagePlaceholders() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach((container, index) => {
        // Check if container doesn't have an image yet
        if (!container.querySelector('img')) {
            const colorClasses = ['bg-blue', 'bg-green', 'bg-purple', 'bg-orange'];
            const colorClass = colorClasses[index % colorClasses.length];
            
            // Add placeholder div with color and text
            const placeholder = document.createElement('div');
            placeholder.classList.add('image-placeholder', colorClass);
            
            const text = document.createElement('p');
            
            // Set specific text based on section
            const parentSection = container.closest('section');
            if (parentSection) {
                const sectionId = parentSection.id;
                
                switch(sectionId) {
                    case 'sobre-nosotros':
                        text.textContent = 'Foto de Carolina & Franco';
                        placeholder.innerHTML = '<i data-lucide="users"></i><p>' + text.textContent + '</p>';
                        break;
                    case 'nuestra-busqueda':
                        text.textContent = 'Nuestro hogar ideal';
                        placeholder.innerHTML = '<i data-lucide="home"></i><p>' + text.textContent + '</p>';
                        break;
                    case 'percy':
                        text.textContent = 'Foto de Percy';
                        placeholder.innerHTML = '<i data-lucide="dog"></i><p>' + text.textContent + '</p>';
                        break;
                    case 'referencias':
                        text.textContent = 'Referencias y documentos';
                        placeholder.innerHTML = '<i data-lucide="file-text"></i><p>' + text.textContent + '</p>';
                        break;
                    default:
                        placeholder.appendChild(text);
                }
            } else {
                placeholder.appendChild(text);
            }
            
            container.appendChild(placeholder);
            
            // Add style for placeholders if not already in stylesheet
            if (!document.getElementById('placeholder-styles')) {
                const style = document.createElement('style');
                style.id = 'placeholder-styles';
                style.textContent = `
                    .image-placeholder {
                        width: 100%;
                        height: 250px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 15px;
                        color: var(--color-text);
                        font-weight: 600;
                        text-align: center;
                        padding: 1rem;
                    }
                    .image-placeholder [data-lucide] {
                        width: 3rem;
                        height: 3rem;
                        margin-bottom: 1rem;
                        opacity: 0.8;
                    }
                    .bg-blue { background-color: var(--color-secondary); }
                    .bg-green { background-color: var(--color-primary); color: white; }
                    .bg-purple { background-color: #d1e8d0; }
                    .bg-orange { background-color: #e0eedf; }
                    
                    /* Add active nav style */
                    nav a.active {
                        background-color: var(--color-primary);
                        color: white;
                    }
                    
                    /* Add small text style for footer */
                    .small-text {
                        font-size: 0.8rem;
                        margin-top: 0.5rem;
                        opacity: 0.8;
                    }
                    
                    /* Animate heart icon */
                    [data-lucide="heart"] {
                        color: #ff6b6b;
                        animation: heartbeat 1.5s infinite;
                    }
                    
                    @keyframes heartbeat {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Initialize Lucide icons in the placeholder
            lucide.createIcons();
        }
    });
}

// Set up animations for sections when they come into view
function setupScrollAnimations() {
    // Add a class for animations if not on mobile (to prevent performance issues)
    if (window.innerWidth > 768) {
        const sections = document.querySelectorAll('section:not(.hero-image)');
        
        // Create observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is in view
        });
        
        // Add animation styles
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            section:not(.hero-image) {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            section.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(animationStyle);
        
        // Observe each section
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Setup contact buttons with predefined messages
function setupContactButtons() {
    // Get WhatsApp button
    const whatsappButton = document.querySelector('.contact-button.whatsapp');
    
    if (whatsappButton) {
        // Add predefined message to WhatsApp button
        const predefinedMessage = "Hola! Vimos tu propiedad y queríamos compartirte nuestro perfil 😊";
        const phoneNumber = whatsappButton.getAttribute('href').replace('https://wa.me/', '');
        
        // Update WhatsApp link with encoded message
        const encodedMessage = encodeURIComponent(predefinedMessage);
        whatsappButton.setAttribute('href', `https://wa.me/${phoneNumber}?text=${encodedMessage}`);
        
        // Add pulse animation to WhatsApp button
        whatsappButton.classList.add('pulse-animation');
        
        // Add animation style if not exists
        if (!document.getElementById('pulse-animation-style')) {
            const pulseStyle = document.createElement('style');
            pulseStyle.id = 'pulse-animation-style';
            pulseStyle.textContent = `
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                    }
                }
            `;
            document.head.appendChild(pulseStyle);
        }
    }
    
    // Track contact button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.contact-button')) {
            const buttonType = e.target.closest('.whatsapp') ? 'WhatsApp' : 'Email';
            console.log(`Contact via ${buttonType} button clicked`);
        }
    });
} 