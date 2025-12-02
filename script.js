// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-content')) {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Show success message
                const formMessage = document.getElementById('formMessage');
                formMessage.style.display = 'block';
                formMessage.style.background = '#d4edda';
                formMessage.style.color = '#155724';
                formMessage.style.border = '1px solid #c3e6cb';
                formMessage.innerHTML = `
                    <strong>✓ Mensagem enviada com sucesso!</strong><br>
                    Entraremos em contato em até 24 horas.
                `;

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');

                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);

                // Log form data (for development)
                console.log('Form submitted:', data);
            }, 1500);
        });

        // Phone mask
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                    e.target.value = value;
                }
            });
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animate elements on scroll
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

    // Observe service cards, testimonial cards, and feature cards
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .feature-card, .content-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Add responsive styles for contact form
    function adjustContactLayout() {
        const contactGrid = document.querySelector('.content-section [style*="grid-template-columns: 1fr 1fr"]');
        if (contactGrid && window.innerWidth <= 768) {
            contactGrid.style.gridTemplateColumns = '1fr';
        } else if (contactGrid) {
            contactGrid.style.gridTemplateColumns = '1fr 1fr';
        }
    }

    adjustContactLayout();
    window.addEventListener('resize', adjustContactLayout);

    // Logo fallback
    const logoImages = document.querySelectorAll('.logo-img, .footer-logo img');
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            // If logo image fails to load, show text instead
            const logoDiv = img.closest('.logo, .footer-logo');
            if (logoDiv) {
                logoDiv.innerHTML = '<span style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">GECON</span>';
            }
        });
    });

    // Add active state to current page navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Console welcome message
    console.log('%cGECON Empresarial', 'font-size: 20px; font-weight: bold; color: #0066cc;');
    console.log('%cTransformando desafios em resultados concretos', 'font-size: 14px; color: #666;');
});

// Add CSS for responsive grid on mobile
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .content-section [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
        }
    }
`;
document.head.appendChild(style);
