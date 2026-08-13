// ---------- 1. Certificate Popup Modal ----------
(function () {
    const certModal = document.getElementById('cert-modal');
    if (!certModal) return;

    const certImg = document.getElementById('cert-modal-img');
    const certPdf = document.getElementById('cert-modal-pdf');
    const certTitle = document.getElementById('cert-modal-title');
    const certOrg = document.getElementById('cert-modal-org');
    const certDownload = document.getElementById('cert-modal-download');
    const certOpenPdf = document.getElementById('cert-modal-open-pdf');
    let lastFocused = null;

    function openCertModal(trigger) {
        const img = trigger.getAttribute('data-cert-img');
        const pdfSrc = trigger.getAttribute('data-cert-pdf') || '';
        const title = trigger.getAttribute('data-cert-title') || 'Certificate';
        const org = trigger.getAttribute('data-cert-org') || '';

        const isPdf = !!pdfSrc;

        if (certTitle) certTitle.textContent = title;
        if (certOrg) certOrg.textContent = org;

        if (isPdf) {
            // Show PDF iframe, hide img
            if (certImg) certImg.style.display = 'none';
            if (certPdf) {
                certPdf.src = pdfSrc;
                certPdf.style.display = 'block';
            }
            // Download button → downloads the PDF
            if (certDownload) {
                certDownload.href = pdfSrc;
                certDownload.setAttribute('download', title.replace(/\s+/g, '_') + '.pdf');
            }
            // Show "Open Full PDF" button
            if (certOpenPdf) {
                certOpenPdf.href = pdfSrc;
                certOpenPdf.style.display = 'inline-flex';
            }
        } else {
            // Show image, hide PDF iframe
            if (certPdf) { certPdf.style.display = 'none'; certPdf.src = ''; }
            if (certImg) {
                certImg.src = img;
                certImg.alt = title;
                certImg.style.display = 'block';
            }
            // Download button → downloads the image
            if (certDownload) {
                certDownload.href = img;
                let downloadExt = 'jpg';
                try {
                    const parts = img.split('?')[0].split('.');
                    if (parts.length > 1) downloadExt = parts.pop();
                } catch (e) {}
                certDownload.setAttribute('download', title.replace(/\s+/g, '_') + '.' + downloadExt);
            }
            // Hide "Open Full PDF" button
            if (certOpenPdf) certOpenPdf.style.display = 'none';
        }

        lastFocused = document.activeElement;
        certModal.classList.add('is-open');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        
        const closeBtn = certModal.querySelector('.cert-modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeCertModal() {
        certModal.classList.remove('is-open');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        // Clear PDF src to stop it loading in background
        if (certPdf) certPdf.src = '';
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-cert-img]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            openCertModal(el);
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCertModal(el);
            }
        });
    });

    certModal.querySelectorAll('[data-cert-close]').forEach((el) => {
        el.addEventListener('click', closeCertModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('is-open')) {
            closeCertModal();
        }
    });
})();


// ---------- 2. Project Detail Modal ----------
(function () {
    const projectModal = document.getElementById('project-modal');
    if (!projectModal) return;

    const modalImg = document.getElementById('project-modal-img');
    const modalTitle = document.getElementById('project-modal-title');
    const modalTags = document.getElementById('project-modal-tags');
    const modalProblem = document.getElementById('project-modal-problem');
    const modalSolution = document.getElementById('project-modal-solution');
    const modalGithub = document.getElementById('project-modal-github');
    let lastFocused = null;

    function openProjectModal(card) {
        const title = card.getAttribute('data-project-title') || 'Project Details';
        const img = card.getAttribute('data-project-img') || '';
        const tags = (card.getAttribute('data-project-tags') || '').split(',');
        const problem = card.getAttribute('data-project-problem') || '';
        const solution = card.getAttribute('data-project-solution') || '';
        const github = card.getAttribute('data-project-github') || '';

        if (modalImg) {
            modalImg.src = img;
            modalImg.alt = title;
        }
        if (modalTitle) modalTitle.textContent = title;
        
        if (modalTags) {
            modalTags.innerHTML = tags.map(t => `<span>${t.trim()}</span>`).join('');
        }
        
        if (modalProblem) modalProblem.textContent = problem;
        if (modalSolution) modalSolution.textContent = solution;
        
        if (modalGithub) {
            if (github) {
                modalGithub.href = github;
                modalGithub.style.display = 'inline-flex';
            } else {
                modalGithub.style.display = 'none';
            }
        }

        lastFocused = document.activeElement;
        projectModal.classList.add('is-open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const closeBtn = projectModal.querySelector('.project-modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeProjectModal() {
        projectModal.classList.remove('is-open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('click', () => openProjectModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(card);
            }
        });
    });

    projectModal.querySelectorAll('[data-project-close]').forEach((el) => {
        el.addEventListener('click', closeProjectModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('is-open')) {
            closeProjectModal();
        }
    });
})();

// ---------- 3. About Me Read More / Read Less Toggle ----------
(function () {
    const btn = document.getElementById('about-read-more-btn');
    const extendedContent = document.getElementById('about-extended');

    if (btn && extendedContent) {
        btn.addEventListener('click', () => {
            const isExpanded = extendedContent.classList.toggle('is-expanded');
            if (isExpanded) {
                btn.innerHTML = 'Read Less <i class="fa-solid fa-chevron-up"></i>';
                btn.setAttribute('aria-expanded', 'true');
            } else {
                btn.innerHTML = 'Read More <i class="fa-solid fa-chevron-down"></i>';
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }
})();

// ---------- 4. Minimalist Theme Toggle ----------
(function () {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleLabel = toggleBtn?.querySelector('.toggle-label');
    const toggleIcon = toggleBtn?.querySelector('.theme-icon');
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            if (toggleLabel) toggleLabel.textContent = 'Dark';
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-moon theme-icon';
            if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            root.removeAttribute('data-theme');
            if (toggleLabel) toggleLabel.textContent = 'Light';
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-sun theme-icon';
            if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
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

// ---------- 5. Profile Card 3D Tilt ----------
(function () {
    const card = document.getElementById('title');
    const container = document.querySelector('#pic');

    if (card && container) {
        const maxRotation = 14;

        function handleMouseMove(e) {
            const rect = container.getBoundingClientRect();
            let mouseX = (e.clientX - rect.left) / rect.width;
            let mouseY = (e.clientY - rect.top) / rect.height;
            mouseX = Math.min(1, Math.max(0, mouseX));
            mouseY = Math.min(1, Math.max(0, mouseY));

            const rotateY = (mouseX - 0.5) * 2 * maxRotation;
            const rotateX = (0.5 - mouseY) * 2 * maxRotation;
            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        function resetCard() {
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        }

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', resetCard);
    }
})();

// ---------- 6. Navigation Scroll, Active Highlight & Back to Top ----------
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    if (backToTopBtn) {
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('is-visible');
        } else {
            backToTopBtn.classList.remove('is-visible');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

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

// Active Nav Link Highlighting
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

// ---------- 7. Contact Form Submit with Thank You Pop-up Modal ----------
(function () {
    const form = document.getElementById('contact-form');
    const contactModal = document.getElementById('contact-modal');

    function openContactModal() {
        if (!contactModal) return;
        contactModal.classList.add('is-open');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeContactModal() {
        if (!contactModal) return;
        contactModal.classList.remove('is-open');
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const name = data.get('name');
            const email = data.get('email');
            const subject = data.get('subject');
            const message = data.get('message');

            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );
            const mailto = `mailto:ysangothayan@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Open mail client and show kind Thank You modal
            window.location.href = mailto;
            openContactModal();
            form.reset();
        });
    }

    if (contactModal) {
        contactModal.querySelectorAll('[data-contact-close]').forEach((el) => {
            el.addEventListener('click', closeContactModal);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('is-open')) {
                closeContactModal();
            }
        });
    }
})();

// ---------- 8. IntersectionObserver Scroll Reveal ----------
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
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
})();
