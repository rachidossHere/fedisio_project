// Main initialization function
document.addEventListener('DOMContentLoaded', function () {
    initAccordion();
    initSlideshow();
    initStickyMenu('navbar');
    initStickyFlag('.section__flag');
    initStickyNavbarWithOffset('main-navbar', 200);
    handleResponsiveMenuBurger(1024);
    initMarquesSlider();
});

// Accordion functionality
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
    firstContent.style.maxHeight = `${firstContent.scrollHeight}px`;
}

function toggleAccordionItem() {
    const accordionItem = this.parentElement;
    const accordionContent = accordionItem.querySelector('.accordion__content');
    
    document.querySelectorAll('.accordion__content').forEach(content => {
        if (content !== accordionContent) {
            content.style.maxHeight = null;
        }
    });

    accordionContent.style.maxHeight = accordionContent.style.maxHeight ? null : `${accordionContent.scrollHeight}px`;
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const buttons = document.querySelectorAll('.buttons span');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            buttons[i].classList.toggle('active', i === index);
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

// Sticky Menu functionality
function initStickyMenu(navbarId) {
    const navbar = document.getElementById(navbarId);
    const sticky = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('sticky', window.scrollY >= sticky);
    });
}

// Sticky Flag functionality
function initStickyFlag(selector) {
    const flag = document.querySelector(selector);
    const stickyOffset = flag.offsetTop;

    window.addEventListener('scroll', () => {
        flag.classList.toggle('sticky', window.scrollY > stickyOffset);
    });
}

// Sticky Navbar with Offset functionality
function initStickyNavbarWithOffset(navbarId, offset) {
    const navbar = document.getElementById(navbarId);
    const stickyOffset = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('sticky', window.scrollY > stickyOffset + offset);
    });
}

// Responsive Menu Burger functionality
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

// Marques Slider functionality
function initMarquesSlider() {
    const marqueContent = document.querySelector('.section__marques__content');
    const marqueItems = document.querySelectorAll('.section__marques__item');
    const itemsToShow = 6;
    let currentIndex = 0;
    const itemWidth = marqueItems[0].offsetWidth;

    function getTotalWidth() {
        return itemWidth * marqueItems.length;
    }

    function showSlide(index) {
        const totalWidth = getTotalWidth();
        const maxIndex = Math.ceil(marqueItems.length / itemsToShow) - 1;
        marqueContent.style.transform = `translateX(-${Math.min(index, maxIndex) * itemWidth * itemsToShow}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % Math.ceil(marqueItems.length / itemsToShow);
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 3000);

    window.addEventListener('resize', () => {
        showSlide(currentIndex);
    });
}
