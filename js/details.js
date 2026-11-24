const OWNER_WHATSAPP='919003085856';
function toggleDetailMenu(){document.getElementById('detailMenu')?.classList.toggle('open')}
function backToFleet(event){
  const sameSiteReferrer=(()=>{try{return document.referrer && new URL(document.referrer).origin===window.location.origin}catch{return false}})();
  if(sameSiteReferrer && window.history.length>1){event?.preventDefault();window.history.back();return false}
  return true;
}
function moveTrack(btn,dir){const track=btn.closest('.media-slider')?.querySelector('.media-track');if(track)track.scrollBy({left:dir*track.clientWidth*.82,behavior:'smooth'})}
function sendCallback(form){const d=new FormData(form);const msg=`RG Tempo Traveller — Callback Request\n\nPage: ${d.get('context')||'-'}\nName: ${d.get('name')||'-'}\nCustomer Phone / WhatsApp: ${d.get('phone')||'-'}\nPreferred Date: ${d.get('date')||'-'}\nTravellers: ${d.get('travellers')||'-'}\nPickup & Destination: ${d.get('route')||'-'}\n\nPlease call the customer back regarding availability and booking.`;window.open('https://wa.me/'+OWNER_WHATSAPP+'?text='+encodeURIComponent(msg),'_blank');return false}
function galleryMetrics(slider){
 const track=slider.querySelector('.preview-gallery-track');
 const cards=track?[...track.querySelectorAll('.preview-gallery-card')]:[];
 if(!track||!cards.length)return null;
 const gap=parseFloat(getComputedStyle(track).gap)||0;
 const index=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-track.scrollLeft)?i:best,0);
 return{track,cards,gap,index,max:Math.max(0,track.scrollWidth-track.clientWidth)};
}
function classifyGalleryImage(img){
 const card=img.closest('.preview-gallery-card');if(!card)return;
 const w=img.naturalWidth,h=img.naturalHeight;if(!w||!h)return;
 card.classList.remove('is-portrait','is-landscape','is-square');
 const ratio=w/h;
 card.classList.add(ratio<0.82?'is-portrait':ratio>1.18?'is-landscape':'is-square');
}
function scrollGalleryTo(slider,index){
 const m=galleryMetrics(slider);if(!m)return;
 const safe=Math.max(0,Math.min(m.cards.length-1,index));
 m.track.scrollTo({left:m.cards[safe].offsetLeft,behavior:'smooth'});
}
function updateGalleryDots(slider){/* Pagination indicators intentionally hidden. */}
function goPreviewGallery(button,index){const slider=button.closest('[data-gallery-slider]');if(slider)scrollGalleryTo(slider,index)}
function movePreviewGallery(button,dir){
 const slider=button.closest('[data-gallery-slider]');const m=slider&&galleryMetrics(slider);if(!m)return;
 let next=m.index+dir;if(next>=m.cards.length)next=0;if(next<0)next=m.cards.length-1;
 scrollGalleryTo(slider,next);
}
function startPreviewGallery(slider){
 const m=galleryMetrics(slider);if(!m)return;
 const track=m.track;let pauseUntil=0;let timer=null;
 const pause=()=>{pauseUntil=Date.now()+5500};
 track.querySelectorAll('img').forEach(img=>{
   if(img.complete)classifyGalleryImage(img);
   else {img.addEventListener('load',()=>classifyGalleryImage(img),{once:true});img.addEventListener('error',()=>{img.closest('.preview-gallery-card')?.classList.add('is-landscape')},{once:true})}
 });
 track.addEventListener('scroll',()=>{}, {passive:true});
 slider.addEventListener('mouseenter',pause);slider.addEventListener('focusin',pause);
 slider.addEventListener('touchstart',pause,{passive:true});slider.addEventListener('pointerdown',pause,{passive:true});
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!reduced&&m.cards.length>1){
   timer=window.setInterval(()=>{
     if(Date.now()<pauseUntil)return;
     const current=galleryMetrics(slider);if(!current)return;
     const next=current.index>=current.cards.length-1?0:current.index+1;
     current.track.scrollTo({left:current.cards[next].offsetLeft,behavior:'smooth'});
   },3800);
 }
 updateGalleryDots(slider);
}
document.querySelectorAll('[data-gallery-slider]').forEach(startPreviewGallery);
function startGallery(el){const track=el.querySelector('.media-track');if(!track||track.scrollWidth<=track.clientWidth+5)return;let paused=false;let timer=setInterval(()=>{if(paused)return;let next=track.scrollLeft+track.clientWidth*.82;const max=track.scrollWidth-track.clientWidth;if(next>=max-8)next=0;track.scrollTo({left:next,behavior:'smooth'})},Number(el.dataset.autoplay||4200));el.addEventListener('mouseenter',()=>paused=true);el.addEventListener('mouseleave',()=>paused=false);el.addEventListener('touchstart',()=>paused=true,{passive:true});el.addEventListener('touchend',()=>setTimeout(()=>paused=false,1400),{passive:true});}
document.querySelectorAll('.media-slider').forEach(startGallery);
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});document.querySelectorAll('.section,.day-card,.spec-box,.info-panel,.callback-grid').forEach(e=>{e.style.opacity='0';e.style.transform='translateY(24px)';e.style.transition='opacity .75s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)';revealObserver.observe(e)});document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('.in').forEach(e=>{e.style.opacity='1';e.style.transform='none'}));
new MutationObserver(()=>document.querySelectorAll('.in').forEach(e=>{e.style.opacity='1';e.style.transform='none'})).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
