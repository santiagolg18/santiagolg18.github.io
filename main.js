
// Smooth scroll + active nav
document.querySelectorAll('nav.topnav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelectorAll('nav.topnav a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
  })
})

// Animated counters (simple)
function animateCounter(id, to, duration=1200){
  const el=document.getElementById(id);
  if(!el) return;
  let start=0;
  const step=Math.ceil(to/(duration/16));
  const t=setInterval(()=>{
    start+=step;
    if(start>=to){el.textContent=to;clearInterval(t)}else el.textContent=start;
  },16)
}
animateCounter('counter-projects', 28);animateCounter('counter-hours', 420);animateCounter('counter-clients', 12);

// Progress bars on view
const progresses=document.querySelectorAll('.progress');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const val=e.target.dataset.value||70;
      const span=e.target.querySelector('span');
      span.style.width=val+'%';
    }
  })
},{threshold:0.3});
progresses.forEach(p=>io.observe(p));

// Projects filter
const filters=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.proj');
filters.forEach(f=>f.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');
  const tag=f.dataset.filter;
  projects.forEach(p=>{
    const tags=p.dataset.tags.split(' ');
    if(tag==='all' || tags.includes(tag)) p.style.display='block';
    else p.style.display='none';
  });
}))

// Project modal
const modal=document.getElementById('modal');const modalContent=document.getElementById('modal-content');
document.getElementById('projects-grid').addEventListener('click',e=>{
  const card=e.target.closest('.proj'); if(!card) return;
  const title=card.dataset.title; const desc=card.dataset.desc; const img=card.dataset.image;
  modalContent.innerHTML=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div><img src="${img}" style="width:100%;border-radius:8px"></div><div><h3 style='margin-top:0'>${title}</h3><p class='muted'>${desc}</p><p style='margin-top:10px;color:var(--muted)'><strong>Tecnologías:</strong> Power BI, Google Sheets, Apps Script</p><div style='margin-top:12px'><a class='btn' href='#contact'>Solicitar propuesta</a></div></div></div>`;
  modal.classList.add('show');
})
document.getElementById('modal-close').addEventListener('click',()=>modal.classList.remove('show'))
modal.addEventListener('click',(e)=>{if(e.target===modal)modal.classList.remove('show')})

// Testimonials slider (simple auto)
const track=document.getElementById('testi-track');let pos=0;
setInterval(()=>{pos-=280; if(Math.abs(pos)>=track.scrollWidth) pos=0; track.style.transform=`translateX(${pos}px)`; track.style.transition='transform 700ms ease'} ,3000)

// Contact form (client-side) - replace endpoint with Formspree or your backend
const form=document.getElementById('contact-form');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data=new FormData(form);
  document.getElementById('form-result').textContent='Enviando mensaje...';
  setTimeout(()=>{document.getElementById('form-result').textContent='Gracias — mensaje enviado. Respondo en menos de 24h.'; form.reset()},900)
})

// Save lead locally (demo) - for offline lead capture
document.getElementById('save-lead').addEventListener('click',()=>{
  const name=form.name.value||'Sin nombre';
  const email=form.email.value||'Sin email';
  const leads=JSON.parse(localStorage.getItem('leads')||'[]');
  leads.push({name,email,company:form.company.value||'',message:form.message.value||'',date:new Date().toISOString()});
  localStorage.setItem('leads',JSON.stringify(leads));
  alert('Contacto guardado localmente');
})

// CV download (demo) -> replace href with actual file path
document.getElementById('download-cv').addEventListener('click', (e)=>{
  e.preventDefault();
  const link=document.createElement('a');
  link.href='assets/cv-santiago-londono.pdf';
  link.download='CV-Santiago-Londono.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
})

// Small accessibility improvement: keyboard close modal
window.addEventListener('keydown', (e)=>{if(e.key==='Escape') modal.classList.remove('show')})
