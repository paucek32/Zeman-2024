// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when a link is clicked (optional)
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Initialize Swiper
var swiper = new Swiper('.testimonials-carousel', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 5000, // 5000 milliseconds = 5 seconds
        disableOnInteraction: false,
    },
    pagination: {
        el: '.testimonials-carousel .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.testimonials-carousel .swiper-button-next',
        prevEl: '.testimonials-carousel .swiper-button-prev',
    },
});

// Set Current Year in Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();


document.addEventListener('DOMContentLoaded', function() {
    // Initialize Machines Carousel
    var machinesSwiper = new Swiper('.machines-carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.machines-carousel .swiper-button-next',
            prevEl: '.machines-carousel .swiper-button-prev',
        },
        pagination: {
            el: '.machines-carousel .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Add this line
        },
        breakpoints: {
            // Adjusted breakpoints for responsiveness
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
        },
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

    // Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.nav-links .dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const parentLi = this.parentElement;
            parentLi.classList.toggle('active');
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});