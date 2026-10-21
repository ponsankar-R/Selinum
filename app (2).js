(function(){
const M=window.MODULES,$=s=>document.querySelector(s),nav=$('#nav'),main=$('#main'),sl=$('#slider');
let cur=0;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const list=a=>`<ul>${a.map(p=>`<li>${p}</li>`).join('')}</ul>`;
const block=(c,name)=>`<div class="code">${name?`<p class="fname">${name}</p>`:''}<button>Copy</button><pre>${c.split('\n').map((l,i)=>`<span class="l" data-n="${i+1}">${esc(l)||' '}</span>`).join('')}</pre></div>`;
nav.innerHTML=M.map((m,i)=>`<a href="#m${i+1}"><i>${i+1}</i>${m.t}</a>`).join('');
sl.max=M.length;
function show(i,push){
  cur=Math.max(0,Math.min(M.length-1,i));const m=M[cur];
  main.innerHTML=`<div class="eyebrow">Module ${cur+1} of ${M.length}</div><h1>${m.t}</h1><p class="sub">${m.s}</p>
  <div class="chips"><span>${m.est}</span><span>${m.lvl}</span><span>${m.path}</span></div>
  <section class="card ob"><h2>What you will learn</h2>${list(m.obj)}</section>
  <section class="card an"><h2>Real-life analogy</h2>${m.an.map(p=>`<p>${p}</p>`).join('')}</section>
  <section class="card wy"><h2>What is this and why do we need it?</h2>${m.why.map(p=>`<p>${p}</p>`).join('')}</section>
  <h2 class="h3">Theory</h2><section class="card">${m.theory.map(p=>`<p>${p}</p>`).join('')}</section>
  <section class="card pt"><h2>Key points at a glance</h2>${list(m.pts)}</section>
  ${m.extra?`<h2 class="h3">${m.extra.n}</h2>${block(m.extra.c)}`:''}
  <h2 class="h3">Complete working example</h2>${block(m.code,m.file)}
  <h2 class="h3">Line-by-line walkthrough</h2><p class="sub">Tap a step to highlight its lines in the code.</p>
  <div class="steps">${m.steps.map((s,k)=>`<div class="step" data-k="${k}"><b>${s.title}<em>lines ${s.lines}</em></b><p>${s.desc}</p></div>`).join('')}</div>
  <h2 class="h3">Quick snippets</h2>${m.snip.map(c=>block(c)).join('')}
  <section class="card bd"><h2>Best practices</h2>${list(m.best)}</section>
  <section class="card bm"><h2>Common mistakes &amp; interview points</h2>${list(m.bad)}</section>
  <h2 class="h3">Console output</h2><div class="term"><pre>${esc(m.sim.join('\n'))}</pre></div>
  <div class="pager"><button id="pv" ${cur?'':'disabled'}>&larr; Previous</button><button id="nx" ${cur<M.length-1?'':'disabled'}>Next &rarr;</button></div>`;
  main.querySelectorAll('.code button').forEach(b=>b.onclick=()=>{const t=[...b.parentNode.querySelectorAll('.l')].map(x=>x.textContent.replace(/^ $/,'')).join('\n');navigator.clipboard&&navigator.clipboard.writeText(t);b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1200)});
  const full=main.querySelectorAll('.code')[m.extra?1:0],ls=full.querySelectorAll('.l');
  main.querySelectorAll('.step').forEach(el=>el.onclick=()=>{
    const [a,b]=m.steps[el.dataset.k].lines.split('-').map(Number),e=b||a,was=el.classList.contains('on');
    main.querySelectorAll('.step').forEach(x=>x.classList.remove('on'));ls.forEach(x=>x.classList.remove('hl'));
    if(was)return;el.classList.add('on');
    ls.forEach((x,n)=>x.classList.toggle('hl',n+1>=a&&n+1<=e));
    ls[a-1]&&ls[a-1].scrollIntoView({block:'center',behavior:'smooth'});});
  $('#pv').onclick=()=>show(cur-1);$('#nx').onclick=()=>show(cur+1);
  nav.querySelectorAll('a').forEach((a,k)=>a.classList.toggle('on',k===cur));
  sl.value=cur+1;$('#railNum').textContent=cur+1;$('#count').textContent=(cur+1)+' / '+M.length;
  close();window.scrollTo(0,0);
  if(push!==false)history.replaceState(null,'','#m'+(cur+1));
}
const open=()=>{nav.classList.add('open');$('#scrim').classList.add('show')};
function close(){nav.classList.remove('open');$('#scrim').classList.remove('show')}
$('#menuBtn').onclick=()=>nav.classList.contains('open')?close():open();
$('#scrim').onclick=close;
sl.oninput=()=>{$('#railNum').textContent=sl.value;show(+sl.value-1)};
nav.onclick=e=>{const a=e.target.closest('a');if(a){e.preventDefault();show(+a.getAttribute('href').slice(2)-1)}};
document.onkeydown=e=>{if(e.target.tagName==='INPUT')return;if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)};
show((parseInt(location.hash.slice(2))||1)-1,false);
})();
