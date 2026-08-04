
const items = window.CATALOG_ITEMS || [];
const viewer = document.getElementById('viewer');
const stage = document.getElementById('stage');
const counter = document.getElementById('counter');
const slider = document.getElementById('slider');
let current = 0;
const fa = n => String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);

function build(){
  stage.innerHTML = '';
  items.forEach((item,i)=>{
    const sheet = document.createElement('figure');
    sheet.className = 'sheet' + (i===current?' active':'');
    sheet.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
    stage.appendChild(sheet);
  });
  slider.max = items.length;
  update();
}
function update(){
  [...stage.children].forEach((el,i)=>el.classList.toggle('active',i===current));
  slider.value = current+1;
  counter.textContent = `${fa(current+1)} از ${fa(items.length)} - ${items[current]?.title || ''}`;
}
function show(n){current=(n+items.length)%items.length;update()}
document.querySelectorAll('[data-open]').forEach(btn=>btn.onclick=()=>{viewer.classList.add('open');viewer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';build()});
document.getElementById('close').onclick=()=>{viewer.classList.remove('open');viewer.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.getElementById('next').onclick=()=>show(current+1);
document.getElementById('prev').onclick=()=>show(current-1);
document.getElementById('fullscreen').onclick=()=>{if(!document.fullscreenElement)viewer.requestFullscreen?.();else document.exitFullscreen?.()};
slider.oninput=()=>{current=Number(slider.value)-1;update()};
document.addEventListener('keydown',e=>{if(!viewer.classList.contains('open'))return;if(e.key==='Escape')document.getElementById('close').click();if(e.key==='ArrowLeft')show(current+1);if(e.key==='ArrowRight')show(current-1)});
let x=0;stage.addEventListener('touchstart',e=>x=e.changedTouches[0].clientX,{passive:true});stage.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)>45)show(current+(dx<0?1:-1))},{passive:true});
