
const modal=document.getElementById('catalogModal');
const spreads=[...document.querySelectorAll('.spread')];
const counter=document.getElementById('pageCounter');
const dotsBox=document.getElementById('dots');
let index=0;
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
spreads.forEach((_,i)=>{const d=document.createElement('span');d.className='dot'+(i===0?' active':'');dotsBox.appendChild(d);});
const dots=[...document.querySelectorAll('.dot')];
function show(n){
  const old=index;
  index=(n+spreads.length)%spreads.length;
  spreads.forEach((s,i)=>s.classList.toggle('is-active',i===index));
  dots.forEach((d,i)=>d.classList.toggle('active',i===index));
  counter.textContent=`${fa(index+1)} از ${fa(spreads.length)}`;
}
document.getElementById('openCatalog').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
document.getElementById('closeCatalog').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
document.getElementById('nextBtn').onclick=()=>show(index+1);
document.getElementById('prevBtn').onclick=()=>show(index-1);
document.getElementById('fullscreenBtn').onclick=()=>{if(!document.fullscreenElement)modal.requestFullscreen?.();else document.exitFullscreen?.();};
document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')document.getElementById('closeCatalog').click();if(e.key==='ArrowLeft')show(index+1);if(e.key==='ArrowRight')show(index-1);});
let sx=0;
document.getElementById('book').addEventListener('touchstart',e=>sx=e.changedTouches[0].clientX,{passive:true});
document.getElementById('book').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)show(index+(dx<0?1:-1));},{passive:true});
