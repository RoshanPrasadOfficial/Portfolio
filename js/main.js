// Interactive dot background canvas
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'dot-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    const SPACING = 28;
    const DOT_R = 1;
    const INFLUENCE = 90;
    const PUSH = 5;

    let mouse = { x: -999, y: -999 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    function getDotColor() {
        return document.body.classList.contains('dark-mode')
            ? 'rgba(100,160,200,0.25)'
            : 'rgba(100,130,220,0.3)';
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getDotColor();
        const cols = Math.ceil(canvas.width / SPACING) + 1;
        const rows = Math.ceil(canvas.height / SPACING) + 1;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const bx = i * SPACING;
                const by = j * SPACING;
                const dx = bx - mouse.x;
                const dy = by - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let dotX = bx, dotY = by;
                if (dist < INFLUENCE && dist > 0) {
                    const force = (INFLUENCE - dist) / INFLUENCE;
                    const angle = Math.atan2(dy, dx);
                    dotX += Math.cos(angle) * force * PUSH;
                    dotY += Math.sin(angle) * force * PUSH;
                }
                ctx.beginPath();
                ctx.arc(dotX, dotY, DOT_R, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
})();

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Initialize theme based on user preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');

        // Save theme preference
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', `${progress}%`);
    });

    // Mobile Menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Intersection Observer for Animations
    const sections = document.querySelectorAll('.section');
    const journeyItems = document.querySelectorAll('.journey-item');

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
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    journeyItems.forEach(item => {
        observer.observe(item);
    });

    // Scroll-to-top button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Paper plane fly-in animation — plays once per page load
    const footerPlane = document.querySelector('.footer-plane');
    const footerMain = document.querySelector('.footer-main');
    if (footerPlane && footerMain) {
        const planeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footerPlane.classList.add('plane-landed');
                    planeObserver.disconnect(); // stop observing after first trigger
                }
            });
        }, { threshold: 0.3 });

        planeObserver.observe(footerMain);
    }
});