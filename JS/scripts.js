document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted! We will get back to you soon.');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Open live chat
    const liveChatButton = document.getElementById('liveChatButton');
    if (liveChatButton) {
        liveChatButton.addEventListener('click', function() {
            openLiveChat();
        });
    }

    // Swiper for testimonials
    var swiperTestimonials = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20, // Add space between slides
    });

    // Swiper for services with continuous smooth scrolling
    var swiperServices = new Swiper('.services-carousel', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1, // This keeps the carousel moving continuously
            disableOnInteraction: false
        },
        speed: 3000, // Adjust the speed for smoother scrolling
        loopAdditionalSlides: 1, // Prevents gaps in the loop
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Placeholder function for live chat
    function openLiveChat() {
        alert('Opening live chat...');
    }
});