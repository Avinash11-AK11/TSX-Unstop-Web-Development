document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Portfolio filtering with Isotope
    if (document.querySelector('.portfolio-items')) {
        const portfolioItems = document.querySelector('.portfolio-items');
        const portfolioFilters = document.querySelectorAll('.portfolio-filters li');

        // Initialize Isotope
        const iso = new Isotope(portfolioItems, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        // Filter items on click
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                iso.arrange({
                    filter: filterValue
                });
            });
        });
    }

    // Testimonials slider
    if (document.querySelector('.testimonials-slider')) {
        $('.testimonials-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false
        });
    }

    // Enhanced Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const formStatus = document.createElement('div');
        formStatus.className = 'form-status mt-3';
        contactForm.appendChild(formStatus);

        // Real-time validation
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);

        function validateName() {
            if (nameInput.value.trim().length < 2) {
                nameInput.classList.add('is-invalid');
                return false;
            } else {
                nameInput.classList.remove('is-invalid');
                return true;
            }
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                return false;
            } else {
                emailInput.classList.remove('is-invalid');
                return true;
            }
        }

        function validateMessage() {
            if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('is-invalid');
                return false;
            } else {
                messageInput.classList.remove('is-invalid');
                return true;
            }
        }

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (!isNameValid || !isEmailValid || !isMessageValid) {
                formStatus.textContent = 'Please fill all required fields correctly';
                formStatus.style.color = '#e74c3c';
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            formStatus.textContent = '';
            
            try {
                // Simulate API call (replace with actual fetch/axios call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.style.color = '#2ecc71';
                
                // Reset form
                contactForm.reset();
                contactForm.querySelectorAll('.is-invalid').forEach(el => {
                    el.classList.remove('is-invalid');
                });
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 3000);
                
            } catch (error) {
                // Show error message
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.style.color = '#e74c3c';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                console.error('Form submission error:', error);
            }
        });
    }

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-card, .testimonial-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});