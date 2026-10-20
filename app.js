(function(){
const M=window.MODULES,$=s=>document.querySelector(s),nav=$('#nav'),main=$('#main'),sl=$('#slider');
let cur=0;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
nav.innerHTML=M.map((m,i)=>`<a href="#m${i+1}"><i>${i+1}</i>${m.t}</a>`).join('');
sl.max=M.length;
function show(i,push){
  cur=Math.max(0,Math.min(M.length-1,i));const m=M[cur];
  main.innerHTML=`<div class="eyebrow">Module ${cur+1} of ${M.length}</div><h1>${m.t}</h1><p class="sub">${m.s}</p>
  <section class="card an"><h2>Real-life analogy</h2>${m.an.map(p=>`<p>${p}</p>`).join('')}</section>
  <section class="card wy"><h2>What is this and why do we need it?</h2>${m.why.map(p=>`<p>${p}</p>`).join('')}</section>
  <section class="card pt"><h2>Core concepts</h2><ul>${m.pts.map(p=>`<li>${p}</li>`).join('')}</ul></section>
  ${m.code.map(c=>`<div class="code"><button>Copy</button><pre><code>${esc(c)}</code></pre></div>`).join('')}
  <section class="card tp"><h2>Pitfalls &amp; interview points</h2><ul>${m.tips.map(p=>`<li>${p}</li>`).join('')}</ul></section>
  <div class="pager"><button id="pv" ${cur?'':'disabled'}>&larr; Previous</button><button id="nx" ${cur<M.length-1?'':'disabled'}>Next &rarr;</button></div>`;
  main.querySelectorAll('.code button').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(b.nextSibling.textContent);b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1200)});
  $('#pv').onclick=()=>go(cur-1);$('#nx').onclick=()=>go(cur+1);
  nav.querySelectorAll('a').forEach((a,k)=>a.classList.toggle('on',k===cur));
  sl.value=cur+1;$('#railNum').textContent=cur+1;$('#count').textContent=(cur+1)+' / '+M.length;
  close();window.scrollTo(0,0);
  if(push!==false)history.replaceState(null,'','#m'+(cur+1));
}
const go=i=>show(i);
const open=()=>{nav.classList.add('open');$('#scrim').classList.add('show')};
function close(){nav.classList.remove('open');$('#scrim').classList.remove('show')}
$('#menuBtn').onclick=()=>nav.classList.contains('open')?close():open();
$('#scrim').onclick=close;
sl.oninput=()=>{$('#railNum').textContent=sl.value;show(+sl.value-1)};
nav.onclick=e=>{const a=e.target.closest('a');if(a){e.preventDefault();show(+a.getAttribute('href').slice(2)-1)}};
document.onkeydown=e=>{if(e.target.tagName==='INPUT')return;if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)};
show((parseInt(location.hash.slice(2))||1)-1,false);
})();
