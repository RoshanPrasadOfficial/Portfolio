document.addEventListener('DOMContentLoaded', function () {

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            icon.className = 'fas fa-moon';
        } else {
            body.classList.remove('dark-mode');
            icon.className = 'fas fa-sun';
        }
    }

    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme !== 'light');

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        setTheme(!isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // ===== MOBILE NAV TOGGLE =====
    const navToggler = document.getElementById('nav-toggler');
    const navCollapse = document.getElementById('navbarNav');

    navToggler.addEventListener('click', () => {
        navCollapse.classList.toggle('show');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navCollapse.classList.remove('show');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const animatedEls = document.querySelectorAll('.section, .journey-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));

    // ===== NAVBAR SCROLL SHADOW =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.borderBottomColor = 'var(--border-accent)';
        } else {
            navbar.style.borderBottomColor = 'var(--border)';
        }
    }, { passive: true });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const btn = contactForm.querySelector('.btn-submit');
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#22c55e';

        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
        }, 3000);
    });

});
