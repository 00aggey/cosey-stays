// Lightbox
document.addEventListener('click', function(e){
  const target = e.target;
  if(target.matches('.gallery-grid img')){
    openLightbox(target.src, target.alt||'');
  }
});

function openLightbox(src, alt){
  let lb = document.querySelector('.lightbox');
  if(!lb){
    lb = document.createElement('div'); lb.className='lightbox';
    lb.innerHTML = `
      <button class="lb-close" aria-label="Close">✕</button>
      <div>
        <img/>
        <div class="caption"></div>
        <div class="lb-controls">
          <button class="lb-btn prev">◀</button>
          <button class="lb-btn next">▶</button>
        </div>
      </div>`;
    lb.querySelector('.lb-close').addEventListener('click', ()=> lb.classList.remove('visible'));
    lb.querySelector('.prev').addEventListener('click', (ev)=>{ ev.stopPropagation(); navigateLightbox(-1); });
    lb.querySelector('.next').addEventListener('click', (ev)=>{ ev.stopPropagation(); navigateLightbox(1); });
    lb.addEventListener('click', (ev)=>{ if(ev.target === lb) lb.classList.remove('visible'); });
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.querySelector('.caption').textContent = alt;
  lb.classList.add('visible');
  currentLightboxIndex = Array.from(document.querySelectorAll('.gallery-grid img')).findIndex(i=>i.src.endsWith(src.split('/').pop()));
}

// Lightbox navigation state
let currentLightboxIndex = -1;
function navigateLightbox(direction){
  const imgs = Array.from(document.querySelectorAll('.gallery-grid img'));
  if(imgs.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + direction + imgs.length) % imgs.length;
  const src = imgs[currentLightboxIndex].src;
  const alt = imgs[currentLightboxIndex].alt || '';
  const lb = document.querySelector('.lightbox');
  if(lb){ lb.querySelector('img').src = src; lb.querySelector('.caption').textContent = alt; }
}

// keyboard support for lightbox
document.addEventListener('keydown', (e)=>{
  const lb = document.querySelector('.lightbox');
  if(!lb || !lb.classList.contains('visible')) return;
  if(e.key === 'Escape') lb.classList.remove('visible');
  if(e.key === 'ArrowLeft') navigateLightbox(-1);
  if(e.key === 'ArrowRight') navigateLightbox(1);
});

// Service worker registration
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
  });
}
