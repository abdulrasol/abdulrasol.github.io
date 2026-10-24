(function(){
  var d=document.documentElement;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  var l=get('bq_lang')||((navigator.language||'ar').slice(0,2)==='ar'?'ar':'en');
  var q=new URLSearchParams(location.search).get('lang'); if(q==='en'||q==='ar')l=q;
  var t=get('bq_theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  function apply(){
    d.dataset.l=l;d.lang=l;d.dir=l==='ar'?'rtl':'ltr';d.dataset.theme=t;
    var ti=document.querySelector('title');if(ti&&ti.getAttribute('data-'+l))document.title=ti.getAttribute('data-'+l);
    var lb=document.getElementById('lang-btn'),tb=document.getElementById('theme-btn');
    if(lb)lb.textContent=l==='ar'?'English':'العربية';
    if(tb)tb.textContent=t==='dark'?'☀':'☾';
    document.querySelectorAll('[data-ph-ar]').forEach(function(e){e.placeholder=e.getAttribute('data-ph-'+l)||''});
  }
  apply();
  document.addEventListener('DOMContentLoaded',function(){
    apply();
    var lb=document.getElementById('lang-btn'),tb=document.getElementById('theme-btn');
    if(lb)lb.onclick=function(){l=l==='ar'?'en':'ar';set('bq_lang',l);apply()};
    if(tb)tb.onclick=function(){t=t==='dark'?'light':'dark';set('bq_theme',t);apply()};
    var f=document.getElementById('buy-form');
    if(f)f.addEventListener('submit',function(e){
      e.preventDefault();var s=document.getElementById('buy-status');
      s.textContent=l==='ar'?'جارٍ الإرسال…':'Sending…';
      fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}})
        .then(function(r){return r.json()}).then(function(j){
          if(j.success){f.reset();s.textContent=l==='ar'?'تم استلام طلبك، سنتواصل معك قريباً.':'Request received. We will contact you soon.'}
          else throw 0}).catch(function(){s.textContent=l==='ar'?'تعذّر الإرسال. راسلنا على info@subultech.top':'Could not send. Please email info@subultech.top'});
    });
  });
})();
