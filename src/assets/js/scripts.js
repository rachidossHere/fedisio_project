document.addEventListener('DOMContentLoaded', function () {
    // Accordion functionality
    initAccordion();

    // Slideshow functionality
    initSlideshow();

    // Sticky menu
    initStickyMenu('navbar');

    // Sticky section flag
    initStickyFlag('.section__flag');

    // Sticky navbar with offset
    initStickyNavbarWithOffset('main-navbar', 200);

    // Responsive menu burger creation
    handleResponsiveMenuBurger(1024);
});

// Initialize Accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion__number');

    if (accordionHeaders.length > 0) {
        openFirstAccordionItem(accordionHeaders);
    }

    accordionHeaders.forEach(header => {
        header.addEventListener('click', toggleAccordionItem);
    });
}

function openFirstAccordionItem(headers) {
    const firstHeader = headers[0];
    const firstContent = firstHeader.parentElement.querySelector('.accordion__content');
    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
}

function toggleAccordionItem() {
    const accordionItem = this.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion__content');

    document.querySelectorAll('.accordion__content').forEach(content => {
        if (content !== accordionContent) {
            content.style.maxHeight = null;
        }
    });

    if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null;
    } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
    }
}

// Initialize Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const buttons = document.querySelectorAll('.buttons span');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            buttons[i].classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                buttons[i].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 3000);

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    showSlide(currentIndex);
}

// Initialize Sticky Menu
function initStickyMenu(navbarId) {
    const navbar = document.getElementById(navbarId);
    const sticky = navbar.offsetTop;

    window.onscroll = function () {
        if (window.scrollY >= sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };
}

// Initialize Sticky Flag
function initStickyFlag(selector) {
    const flag = document.querySelector(selector);
    const stickyOffset = flag.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyOffset) {
            flag.classList.add('sticky');
        } else {
            flag.classList.remove('sticky');
        }
    });
}

// Initialize Sticky Navbar with Offset
function initStickyNavbarWithOffset(navbarId, offset) {
    const navbar = document.getElementById(navbarId);
    const stickyOffset = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyOffset + offset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
}

// Handle Responsive Menu Burger
function handleResponsiveMenuBurger(breakpoint) {
    function appendDivIfNeeded() {
        const header = document.querySelector('.header__leftSide');
        const existingDiv = document.querySelector('.header__leftSide .menu-burger');
        const navbar = document.getElementById('navbar');
        const body = document.querySelector('body');

        if (window.innerWidth <= breakpoint && !existingDiv) {
            const newDiv = createMenuBurger();
            header.appendChild(newDiv);
            newDiv.addEventListener('click', () => toggleMenu(newDiv, navbar, body));
        } else if (window.innerWidth > breakpoint && existingDiv) {
            existingDiv.remove();
        }
    }

    function createMenuBurger() {
        const newDiv = document.createElement('div');
        newDiv.className = 'menu-burger';

        for (let i = 1; i <= 3; i++) {
            const span = document.createElement('span');
            newDiv.appendChild(span);
        }

        return newDiv;
    }

    function toggleMenu(menu, navbar, body) {
        menu.classList.toggle('active');
        navbar.classList.toggle('active');
        body.classList.toggle('active');
    }

    appendDivIfNeeded();
    window.addEventListener('resize', appendDivIfNeeded);
}
