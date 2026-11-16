const vehicleData={
 '12 Seater':{img:'assets/images/tempo.jpg',title:'12 Seater Tempo Traveller',lead:'Premium small-group vehicle for friends, family tours, corporate outings and private events.',chips:['AC','Luxury seating','Music system','DJ light*'],specs:[['Capacity','12 passengers'],['Climate','Air-conditioned'],['Interior','Luxury-style seating'],['Entertainment','Music system'],['Lighting','DJ lights*'],['Use','Tours • Corporate • Events']]},
 '14 Seater':{img:'assets/images/tempo-side.jpg',title:'14 Seater Tempo Traveller',lead:'A flexible size for private tours, family travel, office outings and event movement.',chips:['AC options','Comfort seats','Music system'],specs:[['Capacity','14 passengers'],['Climate','AC options'],['Interior','Comfort seating'],['Entertainment','Music system'],['Use','Tours • Corporate • Events'],['Booking','Subject to availability']]},
 '16 Seater':{img:'assets/images/tempo.jpg',title:'16 Seater Tempo Traveller',lead:'More room for larger groups while keeping the private-travel experience together.',chips:['AC options','Luxury seating','Music system'],specs:[['Capacity','16 passengers'],['Climate','AC options'],['Interior','Luxury-style seating'],['Entertainment','Music system'],['Use','Tours • Corporate • Events'],['Booking','Subject to availability']]},
 '18 Seater':{img:'assets/images/tempo-side.jpg',title:'18 Seater Tempo Traveller',lead:'A practical larger-group choice for corporate travel, tours, events and long-distance journeys.',chips:['AC options','Music system','Event ready'],specs:[['Capacity','18 passengers'],['Climate','AC options'],['Interior','Comfort seating'],['Entertainment','Music system'],['Use','Corporate • Tours • Events'],['Booking','Subject to availability']]},
 '21 Seater':{img:'assets/images/tempo.jpg',title:'21 Seater Tempo Traveller',lead:'Large-group travel option for extended tours, corporate teams and organised events.',chips:['AC options','Group comfort','Music system'],specs:[['Capacity','21 passengers'],['Climate','AC options'],['Interior','Group comfort'],['Entertainment','Music system'],['Use','Tours • Corporate • Events'],['Booking','Subject to availability']]},
 '25 Seater':{img:'assets/images/tempo-side.jpg',title:'25 Seater Tempo Traveller',lead:'High-capacity Tempo Traveller option for larger groups, events, tours and corporate movement.',chips:['AC options','Group comfort','Music system'],specs:[['Capacity','25 passengers'],['Climate','AC options'],['Interior','Group comfort'],['Entertainment','Music system'],['Use','Tours • Corporate • Events'],['Booking','Subject to availability']]}
};
const rates=[{vehicle:'12 Seater',nonac:21,ac:22},{vehicle:'14 Seater',nonac:21,ac:22},{vehicle:'16 Seater',nonac:25,ac:26},{vehicle:'18 Seater',nonac:25,ac:26},{vehicle:'21 Seater',nonac:24,ac:28},{vehicle:'25 Seater',nonac:28,ac:30}];let currency='INR';const USD_RATE=.011;function money(v){return currency==='INR'?'₹'+v.toFixed(0)+'/km':'$'+(v*USD_RATE).toFixed(2)+'/km'}function renderRates(){document.getElementById('rateBody').innerHTML=rates.map(r=>`<tr><td><strong>${r.vehicle}</strong></td><td class="price">${money(r.nonac)}</td><td class="price">${money(r.ac)}</td></tr>`).join('');inrBtn.classList.toggle('active',currency==='INR');usdBtn.classList.toggle('active',currency==='USD')}function setCurrency(c){currency=c;renderRates()}
function toggleMenu(){mobileMenu.classList.toggle('open')}function closeMenu(){mobileMenu.classList.remove('open')}function setDestination(v){destinationInput.value=v;document.getElementById('booking').scrollIntoView({behavior:'smooth'});setTimeout(()=>destinationInput.focus({preventScroll:true}),450)}function bookVehicle(v){bookingVehicle.value=v;destinationInput.scrollIntoView({behavior:'smooth',block:'center'});showToast(v+' selected — add your date and details below')}function sendWhatsApp(form){const d=new FormData(form);const msg=`RG Tempo Traveller Booking Request\n\nName: ${d.get('name')||'-'}\nPhone: ${d.get('phone')||'-'}\nTravel Date: ${d.get('date')||'-'}\nTravellers: ${d.get('travellers')||'-'}\nVehicle: ${d.get('vehicle')||'-'}\nTrip Type: ${d.get('tripType')||'-'}\nDestination: ${d.get('destination')||'-'}\nPickup: ${d.get('pickup')||'Chennai'}\nRequirements: ${d.get('message')||'-'}`;window.open('https://wa.me/919003085856?text='+encodeURIComponent(msg),'_blank');return false}
function openVehicle(name){const v=vehicleData[name];if(!v)return;detailImg.src=v.img;detailImg.alt=v.title;detailBadge.textContent=name.toUpperCase();detailTitle.textContent=v.title;detailLead.textContent=v.lead;detailChips.innerHTML=v.chips.map(x=>`<span class="spec">${x}</span>`).join('');detailList.innerHTML=v.specs.map(x=>`<div><b>${x[0]}</b>${x[1]}</div>`).join('');detailBook.dataset.vehicle=name;vehicleModal.classList.add('open');document.body.classList.add('modal-open')}function closeVehicle(e){if(e&&e.target!==vehicleModal)return;vehicleModal.classList.remove('open');document.body.classList.remove('modal-open')}function bookVehicleFromModal(){const v=detailBook.dataset.vehicle;closeVehicle();bookVehicle(v)}function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.dot')];let slideIndex=0,heroTimer;function goSlide(i){slideIndex=i;slides.forEach((s,n)=>s.classList.toggle('active',n===i));dots.forEach((d,n)=>d.classList.toggle('active',n===i));slideCount.textContent=`0${i+1} / 04`;clearInterval(heroTimer);heroTimer=setInterval(()=>goSlide((slideIndex+1)%slides.length),5200)}heroTimer=setInterval(()=>goSlide((slideIndex+1)%slides.length),5200);
function scrollSnap(id,dir){document.getElementById(id).scrollBy({left:dir*(document.getElementById(id).clientWidth*.78),behavior:'smooth'})}
const autoConfigs=[['fleetSnap',3000],['tripSnap',3600],['citySnap',3000],['gallerySnap',3200]];
const autoState={};
function startAuto(id,delay){
 const el=document.getElementById(id); if(!el)return;
 if(autoState[id]?.timer)clearInterval(autoState[id].timer);
 const state=autoState[id]||{paused:false}; state.delay=delay;
 const tick=()=>{if(state.paused)return;const max=el.scrollWidth-el.clientWidth;let next=el.scrollLeft+el.clientWidth*.78;if(max<=5)return;if(next>=max-8)next=0;el.scrollTo({left:next,behavior:'smooth'})};
 state.timer=setInterval(tick,delay); autoState[id]=state;
 el.addEventListener('mouseenter',()=>state.paused=true); el.addEventListener('mouseleave',()=>state.paused=false);
 el.addEventListener('touchstart',()=>state.paused=true,{passive:true}); el.addEventListener('touchend',()=>setTimeout(()=>state.paused=false,1400),{passive:true});
}
autoConfigs.forEach(([id,d])=>startAuto(id,d));
function chatReply(q){const s=q.toLowerCase();if(s.includes('vehicle')||s.includes('seater'))return'We offer Ciaz 5 Seater, Innova 7 Seater, Urbania 12 and 17 Seater, plus 14, 18, 21 and 25 seater Tempo Traveller options. Open any vehicle card to see its details and booking button.';if(s.includes('12'))return'The 12 seater is presented with AC, luxury-style seating, music system and DJ-light availability subject to the exact vehicle configuration. You can book it from the vehicle card.';if(s.includes('corporate'))return'Yes. RG Tempo Traveller is positioned for corporate travel, office outings, events, team movement and private group journeys.';if(s.includes('book'))return'Choose a vehicle, enter your name, phone, date, travellers, destination and pickup in the booking form. Submit it to open a pre-filled WhatsApp message.';if(s.includes('destination')||s.includes('trip'))return'You can start with Madurai, Rameswaram, Thanjavur, Tiruvannamalai, Trichy, Coorg, Chikmagalur, Mysuru, Hampi, Munnar, Alleppey, Wayanad or Thekkady. You can also request a custom South India route.';if(s.includes('price')||s.includes('rate')||s.includes('cost'))return'Rates vary by vehicle, AC configuration, route, date and trip requirements. Use the tariff section for the displayed per-km reference and request a custom quote for the final amount.';return'I can help with vehicles, seating, features, corporate travel, destinations and booking. For a specific quote, use the booking form or WhatsApp.';}
function addChat(text,who){const body=document.getElementById('chatBody');const div=document.createElement('div');div.className='chat-msg '+who;div.textContent=text;body.appendChild(div);body.scrollTop=body.scrollHeight}
function chatQuick(q){addChat(q,'user');setTimeout(()=>addChat(chatReply(q),'bot'),220)}
function sendChat(){const input=document.getElementById('chatInput');const q=input.value.trim();if(!q)return;input.value='';chatQuick(q)}
function toggleChat(){document.getElementById('chatbot').classList.toggle('open');if(document.getElementById('chatbot').classList.contains('open'))setTimeout(()=>document.getElementById('chatInput').focus(),100)}
// V11: make the whole fleet and trip card clickable while preserving inner buttons.
document.querySelectorAll('.clickable-card, .vehicle-card[data-link]').forEach(card=>{
  const go=()=>{const url=card.dataset.link;if(url)window.location.href=url;};
  card.addEventListener('click',e=>{if(e.target.closest('button,a'))return;go();});
  card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button,a')){e.preventDefault();go();}});
});

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));renderRates();

/* =========================================================
   RG TEMPO TRAVELLER V9 — PREMIUM INTERACTIONS
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Add staggered reveal timing to repeated cards.
  document.querySelectorAll(
    '.reveal, .vehicle-card, .trip-card, .city-card, .gallery-card, .feature-card'
  ).forEach((el, i) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    el.dataset.delay = String((i % 5) + 1);
  });

  // Smooth anchor navigation with sticky-header compensation.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({top:y, behavior: reduceMotion ? 'auto' : 'smooth'});
    });
  });

  // Active navigation state while scrolling.
  const navLinks = [...document.querySelectorAll('.links a[href^="#"]')];
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!reduceMotion && 'IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      });
    }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
    sections.forEach(s => navObserver.observe(s));
  }

  // Pause horizontal auto-sliders while the user is actively scrolling.
  document.querySelectorAll('.snap').forEach(el => {
    let timer;
    el.addEventListener('scroll', () => {
      el.dataset.userScrolling = '1';
      clearTimeout(timer);
      timer = setTimeout(() => delete el.dataset.userScrolling, 900);
    }, {passive:true});
  });

  // Mouse-wheel over horizontal desktop sliders -> horizontal motion.
  document.querySelectorAll('.snap').forEach(el => {
    el.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (window.innerWidth < 901) return;
      const canMove = el.scrollWidth > el.clientWidth + 4;
      if (!canMove) return;
      e.preventDefault();
      el.scrollBy({left:e.deltaY * .9, behavior:'auto'});
    }, {passive:false});
  });

  // Small parallax effect for elements explicitly marked data-parallax.
  if (!reduceMotion) {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    if (parallaxItems.length) {
      let ticking = false;
      const update = () => {
        const vh = window.innerHeight;
        parallaxItems.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const progress = (r.top + r.height/2 - vh/2) / vh;
          const amount = Number(el.dataset.parallax) || 10;
          el.style.transform = `translate3d(0,${progress * -amount}px,0)`;
        });
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }, {passive:true});
      update();
    }
  }

  // Button press feedback.
  document.addEventListener('pointerdown', e => {
    const btn = e.target.closest('.btn, button');
    if (!btn) return;
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 180);
  });

  // Keep reveal observer running for dynamically opened sections/cards.
  if ('MutationObserver' in window && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:.12});

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const mutation = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
    });
    mutation.observe(document.body, {childList:true, subtree:true});
  }

  // Keyboard support for slider arrow controls if present.
  document.querySelectorAll('.snap').forEach(slider => {
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      slider.scrollBy({
        left:(e.key === 'ArrowRight' ? 1 : -1) * slider.clientWidth * .75,
        behavior:reduceMotion ? 'auto' : 'smooth'
      });
    });
  });
})();

