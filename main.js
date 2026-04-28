document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navRight = document.querySelector('.nav-right');

    if (mobileMenu && navRight) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing when clicking the toggle
            navRight.classList.toggle('active');
            const isOpen = navRight.classList.contains('active');
            mobileMenu.innerHTML = isOpen ? '<span>&#10006;</span>' : '<span>&#9776;</span>';
            document.body.style.overflow = isOpen ? 'hidden' : 'initial';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navRight.classList.contains('active') && !navRight.contains(e.target) && !mobileMenu.contains(e.target)) {
                navRight.classList.remove('active');
                mobileMenu.innerHTML = '<span>&#9776;</span>';
                document.body.style.overflow = 'initial';
            }
        });

        // Prevent clicks inside the menu from closing it
        navRight.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navRight.classList.contains('active')) {
                    navRight.classList.remove('active');
                    mobileMenu.innerHTML = '<span>&#9776;</span>';
                    document.body.style.overflow = 'initial';
                }
            }
        });
    });

    // Intersection Observer for Reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Initial setup for reveal elements
    const revealElements = document.querySelectorAll('.reveal, .glass, .speaker-card, .event-item');
    revealElements.forEach(el => {
        el.classList.add('reveal'); // Ensure class is present
        observer.observe(el);
    });

    // Event filtering on Programme page
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventItems = document.querySelectorAll('.event-item');

    if (filterBtns.length > 0 && eventItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterText = btn.textContent.trim().toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                eventItems.forEach(item => {
                    const tagEl = item.querySelector('.event-tag');
                    if (!tagEl) { item.style.display = ''; return; }

                    const tagText = tagEl.textContent.trim().toLowerCase()
                        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    const show = filterText === 'tout' || tagText.includes(filterText) ||
                        (filterText === 'panels' && tagText.includes('panel')) ||
                        (filterText === 'formations' && tagText.includes('formation')) ||
                        (filterText === 'hackathon' && tagText.includes('hackathon')) ||
                        (filterText === 'presentation de projets' && tagText.includes('presentation')) ||
                        (filterText === 'conferences' && (tagText.includes('conference') || tagText.includes('ceremonie')));

                    item.style.display = show ? '' : 'none';
                });
            });
        });
    }

    // Prototype Flow Helper
    console.log("FINEO Prototype Loaded: Accueil -> Programme -> Inscription");

    // Mobile Bottom Nav Active State Helper
    const currentPath = window.location.pathname;
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    
    bottomNavItems.forEach(item => {
        const href = item.getAttribute('href');
        // Handle index.html or root /
        if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
            bottomNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        }
    });

    // Scroll to Top Logic
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

