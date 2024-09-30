document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Optional: Close menu when a nav link is clicked
        const navLinksItems = document.querySelectorAll('.nav-links li a');

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    } else {
        console.error('Menu toggle button or navigation links not found in the DOM.');
    }

    // Initialize Swiper for Testimonials Carousel
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

    // Initialize Swiper for Machines Carousel
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
            pauseOnMouseEnter: true,
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

    // Set Current Year in Footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Job Tile Click Event to Open Pop-up
    const jobTiles = document.querySelectorAll('.job-tile');
    jobTiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            // Get the job ID from the tile
            const jobId = tile.getAttribute('data-job-id');

            // Find the corresponding pop-up
            const popup = document.querySelector(`.job-popup[data-job-id="${jobId}"]`);
            if (popup) {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                console.error('Pop-up not found for job ID:', jobId);
            }
        });
    });

    // Close Pop-up Event on Close Button
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            const popup = btn.closest('.job-popup');
            if (popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable background scrolling
            } else {
                console.error('Pop-up not found when attempting to close.');
            }
        });
    });

    // Close Pop-up When Clicking Outside the Content
    const jobPopups = document.querySelectorAll('.job-popup');
    jobPopups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Prevent Clicks Inside Pop-up Content from Closing the Pop-up
    const popupContents = document.querySelectorAll('.popup-content');
    popupContents.forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent clicks inside the content from closing the pop-up
        });
    });

    // Filtering Functionality
    const employmentFilter = document.getElementById('employment-type-filter');
    const jobTypeFilter = document.getElementById('job-type-filter');

    function filterJobs() {
        const employmentType = employmentFilter.value;
        const jobType = jobTypeFilter.value;

        jobTiles.forEach(tile => {
            const tileEmploymentType = tile.getAttribute('data-employment-type');
            const tileJobType = tile.getAttribute('data-job-type');

            let employmentMatch = (employmentType === 'all') || (employmentType === tileEmploymentType);
            let jobTypeMatch = (jobType === 'all') || (jobType === tileJobType);

            if (employmentMatch && jobTypeMatch) {
                tile.style.display = 'block';
            } else {
                tile.style.display = 'none';
            }
        });
    }

    if (employmentFilter && jobTypeFilter) {
        employmentFilter.addEventListener('change', filterJobs);
        jobTypeFilter.addEventListener('change', filterJobs);
    } else {
        console.error('Employment type or job type filter not found in the DOM.');
    }
});