// JavaScript Implementation for Chesley Guo's Portfolio

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PART 1: SMOOTH SCROLL NAVIGATION
    // ============================================

    // Step 1.1: Select Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');

    // Step 1.2: Add Click Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Step 1.3: Highlight Active Nav on Scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });


    // ============================================
    // PART 2: PROJECT FILTERING
    // ============================================

    // Step 2.1: Select Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Step 2.2: Create Filter Function
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Step 2.3: Add Click Listeners to Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });


    // ============================================
    // PART 3: MOBILE MENU TOGGLE
    // ============================================

    // Step 3.1: Select Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Step 3.2: Add Toggle Functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }


    // ============================================
    // PART 4: SKILL ANIMATIONS
    // ============================================

    // Step 4.1: Select Skill Bars
    const skillBars = document.querySelectorAll('.skill-progress');

    // Step 4.2: Animate Skills on Scroll
    function animateSkills() {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;

        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (skillsPosition < screenPosition - 50) {
            skillBars.forEach(bar => {
                const skillLevel = bar.style.getPropertyValue('--skill-level');
                bar.style.width = skillLevel;
            });
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on load


    // ============================================
    // PART 5: FORM VALIDATION
    // ============================================

    // Step 5.1: Select Form Elements
    const contactForm = document.querySelector('#contact-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    if (contactForm) {
        // Step 5.2: Helper Functions
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showError(input, message) {
            clearError(input);
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;

            input.classList.add('error');
            input.classList.remove('success');
            input.parentElement.appendChild(error);
        }

        function clearError(input) {
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
            }
            input.classList.remove('error');
        }

        function showSuccess(input) {
            clearError(input);
            input.classList.add('success');
            input.classList.remove('error');
        }

        // Step 5.3: Real-Time Input Event Listeners
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, 'Name must be at least 2 characters');
            } else {
                showSuccess(nameInput);
            }
        });

        emailInput.addEventListener('input', () => {
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                showSuccess(emailInput);
            }
        });

        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message must be at least 10 characters');
            } else {
                showSuccess(messageInput);
            }
        });

        // Step 5.4: Submit Handling
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            if (nameInput.value.trim().length < 2) {
                showError(nameInput, 'Name must be at least 2 characters');
                isValid = false;
            }

            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message must be at least 10 characters');
                isValid = false;
            }

            if (isValid) {
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Thank you, Chesley will get back to you soon!';

                contactForm.appendChild(successMsg);

                setTimeout(() => {
                    contactForm.reset();
                    successMsg.remove();
                    document.querySelectorAll('.success').forEach(input => {
                        input.classList.remove('success');
                    });
                }, 3000);
            }
        });
    }
});