// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const primaryNavigation = document.getElementById('primary-navigation');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

// Initialize Swiper for Services Carousel
var swiperServices = new Swiper('.services-carousel', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.services-carousel .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.services-carousel .swiper-button-next',
        prevEl: '.services-carousel .swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Initialize Swiper for Testimonials Carousel
var swiperTestimonials = new Swiper('.testimonials-carousel', {
    slidesPerView: 1,
    loop: true,
    pagination: {
        el: '.testimonials-carousel .swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    },
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Set Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();