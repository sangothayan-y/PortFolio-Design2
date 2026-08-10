(function () {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');
    const modalOrg = document.getElementById('cert-modal-org');
    const modalDownload = document.getElementById('cert-modal-download');
    let lastFocused = null;

    function openModal(trigger) {
        const img = trigger.getAttribute('data-cert-img');
        const title = trigger.getAttribute('data-cert-title') || 'Certificate';
        const org = trigger.getAttribute('data-cert-org') || '';

        modalImg.src = img;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalOrg.textContent = org;
        modalDownload.href = img;
        modalDownload.setAttribute('download', title.replace(/\s+/g, '_') + '.jpg');

        lastFocused = document.activeElement;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modal.querySelector('.cert-modal-close').focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-cert-img]').forEach((el) => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => openModal(el));
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(el);
            }
        });
    });

    modal.querySelectorAll('[data-cert-close]').forEach((el) => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
})();

(function () {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleLabel = toggleBtn?.querySelector('.toggle-label');
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            toggleBtn?.classList.add('active');
            toggleBtn?.setAttribute('aria-pressed', 'true');
            if (toggleLabel) toggleLabel.textContent = 'ON';
            if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Dark mode is on');
        } else {
            root.removeAttribute('data-theme');
            toggleBtn?.classList.remove('active');
            toggleBtn?.setAttribute('aria-pressed', 'false');
            if (toggleLabel) toggleLabel.textContent = 'OFF';
            if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Dark mode is off');
        }
    }

    applyTheme(stored || (prefersDark ? 'dark' : 'light'));

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
        });
    }
})();

(function () {
    const card = document.getElementById('title');
    const container = document.querySelector('#pic');

    if (card && container) {
        const maxRotation = 18;

        function handleMouseMove(e) {
            const rect = container.getBoundingClientRect();
            let mouseX = (e.clientX - rect.left) / rect.width;
            let mouseY = (e.clientY - rect.top) / rect.height;
            mouseX = Math.min(1, Math.max(0, mouseX));
            mouseY = Math.min(1, Math.max(0, mouseY));

            const rotateY = (mouseX - 0.5) * 2 * maxRotation;
            const rotateX = (0.5 - mouseY) * 2 * maxRotation;
            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            const shadowX = (mouseX - 0.5) * 20;
            const shadowY = (0.5 - mouseY) * 15;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 40px -12px rgba(0,0,0,0.5)`;
        }

        function resetCard() {
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            card.style.boxShadow = '0 25px 40px -12px rgba(0,0,0,0.5)';
        }

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', resetCard);

        container.addEventListener('touchmove', (e) => {
            if (e.touches.length) {
                const touch = e.touches[0];
                handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
            }
        }, { passive: true });

        container.addEventListener('touchend', resetCard);
    }
})();

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

(function () {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
            toggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
})();

(function () {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        const scrollPos = window.scrollY + 200;
        let current = '';

        sections.forEach((section) => {
            if (scrollPos >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
})();

(function () {
    const cvLink = document.getElementById('cv-download');
    const cvCheckbox = cvLink?.querySelector('.input');

    if (cvLink && cvCheckbox) {
        cvLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!cvCheckbox.checked) {
                cvCheckbox.checked = true;
            }
            setTimeout(() => {
                const anchor = document.createElement('a');
                anchor.href = 'assets/Sangothayan_CV.pdf';
                anchor.download = 'Sangothayan_CV.pdf';
                anchor.click();
            }, 3800);
        });
    }
})();

(function () {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const name = data.get('name');
            const email = data.get('email');
            const subject = data.get('subject');
            const message = data.get('message');

            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            );
            const mailto = `mailto:ysangothayan@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            window.location.href = mailto;
        });
    }
})();

(function () {
    const revealEls = document.querySelectorAll('.reveal');

    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
})();
