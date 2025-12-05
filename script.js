// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
});

// Newsletter submission
document.querySelector('.newsletter').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    if(email) alert(`Thanks! We will send updates to ${email}`);
});

// Intersection Observer for fade-in
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity='1';
            entry.target.style.transform='translateY(0)';
        }
    });
},{threshold:0.1});
document.querySelectorAll('.section').forEach(sec=>observer.observe(sec));

// Slider PPT
const slides = document.querySelectorAll('.feature-slide');
const container = document.querySelector('.features-slide-container');
const prev = document.querySelector('.slider-btn.prev');
const next = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentIndex = 0;
let autoScroll;

// Update slide and dots
function updateSlider(){
    container.style.transform = `translateX(-${currentIndex*100}%)`;
    dots.forEach((d,i)=>d.classList.toggle('active', i===currentIndex));
}

// Prev/Next
prev.addEventListener('click', ()=>{ currentIndex = (currentIndex-1+slides.length)%slides.length; updateSlider(); resetAutoScroll(); });
next.addEventListener('click', ()=>{ currentIndex = (currentIndex+1)%slides.length; updateSlider(); resetAutoScroll(); });

// Dots click
dots.forEach((dot,i)=>dot.addEventListener('click',()=>{ currentIndex=i; updateSlider(); resetAutoScroll(); }));

// Auto-scroll
function startAutoScroll(){ autoScroll=setInterval(()=>{ currentIndex=(currentIndex+1)%slides.length; updateSlider(); },5000);}
function stopAutoScroll(){ clearInterval(autoScroll);}
function resetAutoScroll(){ stopAutoScroll(); startAutoScroll(); }

startAutoScroll();

// Touch swipe
let startX=0;
container.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; stopAutoScroll(); });
container.addEventListener('touchend', e=>{
    const diff=startX-e.changedTouches[0].clientX;
    if(Math.abs(diff)>50){
        currentIndex=(diff>0)?(currentIndex+1)%slides.length:(currentIndex-1+slides.length)%slides.length;
        updateSlider();
    }
    startAutoScroll();
});
