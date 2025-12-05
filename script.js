// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter form submission
document.querySelector('.newsletter').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for signing up! We\'ll send you updates soon.');
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Feature slider with infinite looping, swipe, auto-scroll, dots
const slideContainer = document.querySelector('.features-slide-container');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.slider-dots .dot');

let slideWidth = slideContainer.querySelector('.feature-slide').offsetWidth + 16;
let isScrolling = false;
let autoScroll;

// Update active dot
function updateDots() {
    const index = Math.round(slideContainer.scrollLeft / slideWidth) % dots.length;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

// Scroll functions
function scrollPrev() { slideContainer.scrollBy({ left: -slideWidth, behavior: 'smooth' }); }
function scrollNext() { slideContainer.scrollBy({ left: slideWidth, behavior: 'smooth' }); }

prevBtn.addEventListener('click', () => { scrollPrev(); resetAutoScroll(); });
nextBtn.addEventListener('click', () => { scrollNext(); resetAutoScroll(); });

// Infinite loop + dots
slideContainer.addEventListener('scroll', () => {
    if (isScrolling) return;
    isScrolling = true;
    requestAnimationFrame(() => {
        if (slideContainer.scrollLeft >= slideContainer.scrollWidth - slideContainer.clientWidth - 1) {
            slideContainer.scrollLeft = 0;
        }
        updateDots();
        isScrolling = false;
    });
});

// Dots click
dots.forEach((dot, i) => {
