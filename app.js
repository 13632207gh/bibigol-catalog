
const pages = Array.from({length:10}, (_,i)=>`assets/pages/page-${String(i+1).padStart(2,'0')}.jpg`);
const viewer = document.getElementById('viewer');
const stage = document.getElementById('bookStage');
const counter = document.getElementById('pageCounter');
const range = document.getElementById('pageRange');
let currentSpread = 0;
const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

function fa(n){return String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);}
function buildBook(){
  stage.innerHTML='';
  if(isMobile()){
    pages.forEach((src,i)=>{
      const d=document.createElement('div');
      d.className='spread single'+(i===currentSpread?' active':'');
      d.innerHTML=`<img src="${src}" alt="صفحه ${i+1}">`;
      stage.appendChild(d);
    });
    range.max=pages.length;
  }else{
    for(let i=0;i<pages.length;i+=2){
      const d=document.createElement('div');
      d.className='spread'+(i/2===currentSpread?' active':'');
      d.innerHTML=`<img src="${pages[i]}" alt="صفحه ${i+1}">${pages[i+1]?`<img src="${pages[i+1]}" alt="صفحه ${i+2}">`:''}`;
      stage.appendChild(d);
    }
    range.max=Math.ceil(pages.length/2);
  }
  updateUI();
}
function maxSpread(){return isMobile()?pages.length:Math.ceil(pages.length/2)}
function show(n){
  currentSpread=(n+maxSpread())%maxSpread();
  [...stage.children].forEach((el,i)=>el.classList.toggle('active',i===currentSpread));
  updateUI();
}
function updateUI(){
  range.value=currentSpread+1;
  if(isMobile()) counter.textContent=`${fa(currentSpread+1)} از ${fa(pages.length)}`;
  else {
    const first=currentSpread*2+1, second=Math.min(first+1,pages.length);
    counter.textContent=first===second?`${fa(first)} از ${fa(pages.length)}`:`${fa(first)}–${fa(second)} از ${fa(pages.length)}`;
  }
}
document.querySelectorAll('[data-open-catalog]').forEach(b=>b.addEventListener('click',()=>{
  viewer.classList.add('open'); viewer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; buildBook();
}));
document.getElementById('closeViewer').onclick=()=>{viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.getElementById('nextBtn').onclick=()=>show(currentSpread+1);
document.getElementById('prevBtn').onclick=()=>show(currentSpread-1);
document.getElementById('fullscreenBtn').onclick=()=>{if(!document.fullscreenElement)viewer.requestFullscreen?.();else document.exitFullscreen?.()};
range.addEventListener('input',()=>show(Number(range.value)-1));
window.addEventListener('resize',()=>{if(viewer.classList.contains('open')){currentSpread=0;buildBook()}});
document.addEventListener('keydown',e=>{
  if(!viewer.classList.contains('open')) return;
  if(e.key==='Escape') document.getElementById('closeViewer').click();
  if(e.key==='ArrowLeft') show(currentSpread+1);
  if(e.key==='ArrowRight') show(currentSpread-1);
});
let startX=0;
stage.addEventListener('touchstart',e=>startX=e.changedTouches[0].clientX,{passive:true});
stage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)show(currentSpread+(dx<0?1:-1))},{passive:true});
