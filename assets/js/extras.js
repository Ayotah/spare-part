(()=>{const bar=document.createElement("div");bar.className="scroll-progress";document.body.prepend(bar);
addEventListener("scroll",()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});
document.querySelectorAll("[data-count]").forEach(el=>{const t=+el.dataset.count,io=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;io.disconnect();let s=null;const f=n=>{s=s||n;const p=Math.min((n-s)/1600,1);el.textContent=Math.floor(t*p).toLocaleString("fr-FR")+(el.dataset.suffix||"");if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});io.observe(el)});
document.querySelectorAll(".marquee-track").forEach(t=>t.innerHTML+=t.innerHTML);
const g=document.querySelector("[data-gallery]");if(g&&window.AUTO_PARTS_PRODUCTS){const h=window.AUTO_PARTS_PRODUCTS.map(p=>`<a class="gal-card" href="sproduct.html?id=${p.id}"><img src="${p.images[0]}" alt="${p.name.fr}" loading="lazy"><span>${p.name.fr}</span></a>`).join("");g.innerHTML=h+h;}
document.querySelectorAll(".faq details").forEach(d=>d.addEventListener("toggle",()=>{if(d.open)document.querySelectorAll(".faq details").forEach(o=>o!==d&&(o.open=false))}));})();
