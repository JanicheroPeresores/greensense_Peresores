// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Newsletter
document.querySelector('.newsletter').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('email').value;
  if(email) alert(`Thanks! We'll send updates to ${email}`);
});

// Slider
const slides = document.querySelectorAll('.feature-slide');
const container = document.querySelector('.features-slide-container');
const prev = document.querySelector('.slider-btn.prev');
const next = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentIndex = 0;

function updateSlider(){
  container.style.transform = `translateX(-${currentIndex*100}%)`;
  dots.forEach((d,i)=>d.classList.toggle('active', i===currentIndex));
}
prev.addEventListener('click', ()=>{ currentIndex=(currentIndex-1+slides.length)%slides.length; updateSlider(); resetAutoScroll(); });
next.addEventListener('click', ()=>{ currentIndex=(currentIndex+1)%slides.length; updateSlider(); resetAutoScroll(); });
dots.forEach((dot,i)=>dot.addEventListener('click', ()=>{ currentIndex=i; updateSlider(); resetAutoScroll(); }));

let autoScroll = setInterval(()=>{ currentIndex=(currentIndex+1)%slides.length; updateSlider(); },5000);
container.addEventListener('mouseenter', ()=>clearInterval(autoScroll));
container.addEventListener('mouseleave', ()=>{ autoScroll=setInterval(()=>{ currentIndex=(currentIndex+1)%slides.length; updateSlider(); },5000); });
function resetAutoScroll(){ clearInterval(autoScroll); autoScroll=setInterval(()=>{ currentIndex=(currentIndex+1)%slides.length; updateSlider(); },5000); }
