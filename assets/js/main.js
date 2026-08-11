document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initNavigation();
    initReveal();
    initCounters();
    initServiceCycle();
    initImageStacks();
    initJobModals();
    initImageModals();
    initQuoteForm();
    setCurrentYear();
});

function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const setState = () => {
        header.classList.toggle('scrolled', window.scrollY > 12);
    };

    setState();
    window.addEventListener('scroll', setState, { passive: true });
}

function initNavigation() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    const closeNav = () => {
        nav.classList.remove('active');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        document.body.classList.toggle('nav-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeNav();
    });
}

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px' });

    items.forEach(item => observer.observe(item));
}

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setFinal = counter => {
        counter.textContent = Number(counter.dataset.count).toLocaleString() + (counter.dataset.suffix || '');
    };

    if (prefersReduced || !('IntersectionObserver' in window)) {
        counters.forEach(setFinal);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCount(counter) {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}

function initServiceCycle() {
    const cards = [...document.querySelectorAll('[data-cycle-card]')];
    if (cards.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let index = 0;
    cards[0].classList.add('active');
    window.setInterval(() => {
        cards[index].classList.remove('active');
        index = (index + 1) % cards.length;
        cards[index].classList.add('active');
    }, 2800);
}

function initImageStacks() {
    const stacks = [...document.querySelectorAll('[data-image-stack]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    stacks.forEach(stack => {
        const images = [...stack.querySelectorAll('img')];
        if (!images.length) return;

        let index = Math.max(0, images.findIndex(image => image.classList.contains('active')));
        images[index].classList.add('active');

        if (images.length < 2 || reducedMotion) return;

        window.setInterval(() => {
            const current = images[index];
            index = (index + 1) % images.length;
            const next = images[index];

            current.classList.add('leaving');
            current.classList.remove('active');
            next.classList.remove('leaving');
            next.classList.add('active');

            window.setTimeout(() => current.classList.remove('leaving'), 1700);
        }, 8500);
    });
}

function initJobModals() {
    const cards = [...document.querySelectorAll('[data-job-card]')];
    const modals = [...document.querySelectorAll('[data-job-modal]')];
    if (!cards.length || !modals.length) return;

    let activeTrigger = null;

    const openModal = id => {
        const modal = document.querySelector('[data-job-modal="' + id + '"]');
        if (!modal) return;

        activeTrigger = document.querySelector('[data-job-card="' + id + '"]');
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const panel = modal.querySelector('.job-modal-content');
        if (panel) panel.focus({ preventScroll: true });
    };

    const closeModal = modal => {
        if (!modal) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!modals.some(item => item.classList.contains('active'))) {
            document.body.classList.remove('modal-open');
        }

        if (activeTrigger) activeTrigger.focus({ preventScroll: true });
        activeTrigger = null;
    };

    cards.forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.jobCard));
    });

    modals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal(modal);
        });

        modal.querySelectorAll('[data-job-close]').forEach(button => {
            button.addEventListener('click', () => closeModal(modal));
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const activeModal = modals.find(modal => modal.classList.contains('active'));
        if (activeModal) closeModal(activeModal);
    });
}

function initImageModals() {
    const triggers = [...document.querySelectorAll('[data-image-modal-open]')];
    const modals = [...document.querySelectorAll('[data-image-modal]')];
    if (!triggers.length || !modals.length) return;

    let activeTrigger = null;

    const openModal = id => {
        const modal = document.querySelector('[data-image-modal="' + id + '"]');
        if (!modal) return;

        activeTrigger = document.querySelector('[data-image-modal-open="' + id + '"]');
        const modalImage = modal.querySelector('[data-image-modal-image]');
        if (modalImage && activeTrigger?.dataset.imageModalSrc) {
            modalImage.src = activeTrigger.dataset.imageModalSrc;
            modalImage.alt = activeTrigger.dataset.imageModalAlt || modalImage.alt;
        }

        modal.hidden = false;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const panel = modal.querySelector('.image-modal-content');
        if (panel) panel.focus({ preventScroll: true });
    };

    const closeModal = modal => {
        if (!modal) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modal.hidden = true;
        if (!modals.some(item => item.classList.contains('active'))) {
            document.body.classList.remove('modal-open');
        }

        if (activeTrigger) activeTrigger.focus({ preventScroll: true });
        activeTrigger = null;
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => openModal(trigger.dataset.imageModalOpen));
    });

    modals.forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal(modal);
        });

        modal.querySelectorAll('[data-image-modal-close]').forEach(button => {
            button.addEventListener('click', () => closeModal(modal));
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const activeModal = modals.find(modal => modal.classList.contains('active'));
        if (activeModal) closeModal(activeModal);
    });
}

function initQuoteForm() {
    const form = document.querySelector('.quote-form');
    if (!form) return;

    form.addEventListener('submit', event => {
        clearErrors(form);

        const invalidFields = [...form.querySelectorAll('[required]')].filter(field => !field.value.trim());
        invalidFields.forEach(field => showError(field, 'This field is required.'));

        const email = form.querySelector('input[type="email"]');
        if (email && email.value.trim() && !isEmail(email.value.trim())) {
            showError(email, 'Enter a valid email address.');
        }

        const phone = form.querySelector('input[type="tel"]');
        if (phone && phone.value.trim() && !isPhone(phone.value.trim())) {
            showError(phone, 'Enter a valid phone number.');
        }

        const fileInput = form.querySelector('input[type="file"]');
        if (fileInput && fileInput.files.length && !filesAreValid(fileInput.files)) {
            showError(fileInput, 'Each file must be 25MB or smaller.');
        }

        if (form.querySelector('.error:not(:empty)')) {
            event.preventDefault();
            const firstError = form.querySelector('.error:not(:empty)');
            const field = firstError.closest('label')?.querySelector('input, textarea');
            if (field) field.focus();
        }
    });
}

function clearErrors(form) {
    form.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
}

function showError(field, message) {
    const error = field.closest('label')?.querySelector('.error');
    if (error) error.textContent = message;
}

function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
    return /^[\d\s+\-()]+$/.test(value);
}

function filesAreValid(files) {
    const maxSize = 25 * 1024 * 1024;
    return [...files].every(file => file.size <= maxSize);
}

function setCurrentYear() {
    document.querySelectorAll('[data-year]').forEach(year => {
        year.textContent = new Date().getFullYear();
    });
}
