/* =========================================================
   I'M A SURFER — APP
   Season switch (surf / snow), EN-ES copy, shop filters,
   product modal, cart drawer and the scroll rider.
   ========================================================= */
(function(){
'use strict';
var IAS = window.IAS;
var A = IAS.A, svg = IAS.svg, P = IAS.P, CATNAME = IAS.CATNAME, SHIP = IAS.SHIP;
var photo = IAS.photo, listing = IAS.listing, SHOP = IAS.SHOP;

/* =========================================================
   STATE
   ========================================================= */
var mood = 'surf', lang = 'en';
var cat = 'all', q = '', sortBy = 'featured';
var cart = [];      /* {id, fin, qty} */
var current = null;

var $ = function(s){ return document.querySelector(s); };
var $$ = function(s){ return Array.prototype.slice.call(document.querySelectorAll(s)); };
function euro(n){ return n + ' €'; }
function L(o){ return o ? (o[lang] || o.en) : ''; }

/* ---------- i18n + season copy ---------- */
function textFor(el){
  var d = el.dataset;
  var key = mood + (lang === 'en' ? 'En' : 'Es');
  if (d[key] != null) return d[key];
  if (d[lang] != null) return d[lang];
  return null;
}
function applyCopy(){
  $$('[data-en],[data-surf-en]').forEach(function(el){
    var t = textFor(el);
    if (t != null) el.innerHTML = t;
  });
  $$('[data-ph-en]').forEach(function(el){
    el.placeholder = lang === 'en' ? el.dataset.phEn : el.dataset.phEs;
  });
  document.documentElement.lang = lang;
  document.title = "I'm a Surfer";
  $('#readLbl').textContent = mood === 'surf'
    ? (lang === 'en' ? 'm ridden' : 'm surfeados')
    : (lang === 'en' ? 'm descended' : 'm de desnivel');
}

/* ---------- season ---------- */
function setMood(m){
  mood = m;
  document.documentElement.setAttribute('data-mood', m);
  $$('[data-mood-btn]').forEach(function(b){
    var on = b.dataset.moodBtn === m;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  $('#sceneSurf').classList.toggle('on', m === 'surf');
  $('#sceneSnow').classList.toggle('on', m === 'snow');
  applyCopy();
  render();
  try { localStorage.setItem('ss-mood', m); } catch(e){}
}
function setLang(l){
  lang = l;
  $$('[data-lang]').forEach(function(b){ b.classList.toggle('on', b.dataset.lang === l); });
  applyCopy();
  render();
  renderCart();
  if (current) openModal(current.id);
  try { localStorage.setItem('ss-lang', l); } catch(e){}
}

/* ---------- grid ---------- */
function visible(){
  var list = P.filter(function(p){
    if (cat !== 'all' && p.cat !== cat) return false;
    if (!q) return true;
    var hay = (L(p.n) + ' ' + L(p.t) + ' ' + L(CATNAME[p.cat])).toLowerCase();
    return hay.indexOf(q.toLowerCase()) > -1;
  });
  if (sortBy === 'low') list.sort(function(a,b){ return a.price - b.price; });
  else if (sortBy === 'high') list.sort(function(a,b){ return b.price - a.price; });
  else if (sortBy === 'name') list.sort(function(a,b){ return L(a.n).localeCompare(L(b.n)); });
  else list.sort(function(a,b){ return (b.best?1:0) - (a.best?1:0) || b.rev - a.rev; });
  return list;
}
/* The photo sits over the line drawing; if Etsy's CDN is blocked or the
   listing photo moves, the drawing underneath is what the visitor sees. */
function media(p, size){
  return svg(p.art) +
    (p.photo ? '<img class="p-photo" loading="lazy" alt="" src="' + photo(p.photo, size) +
               '" onerror="this.remove()">' : '');
}
function render(){
  var list = visible(), g = $('#grid');
  $('#resultCount').textContent = list.length + (lang === 'en' ? ' items' : ' artículos');
  if (!list.length){
    g.innerHTML = '<div class="empty">' +
      (lang === 'en' ? 'Nothing matches that. Try “vertical”, “hooks” or “shelf”.'
                     : 'Nada coincide. Prueba con «vertical», «ganchos» o «estante».') + '</div>';
    return;
  }
  g.innerHTML = list.map(function(p){
    var tags = '';
    if (p.best) tags += '<span class="tag">' + (lang==='en'?'Best seller':'Más vendido') + '</span>';
    if (p.was) tags += '<span class="tag sale">-' + Math.round((1 - p.price/p.was)*100) + '%</span>';
    if (p.low) tags += '<span class="tag low">' + (lang==='en'? p.low+' left' : 'Quedan '+p.low) + '</span>';
    return '<article class="pcard" data-id="' + p.id + '">' +
      '<div class="p-media">' + media(p) + '<div class="p-tags">' + tags + '</div></div>' +
      '<div class="p-info">' +
        '<span class="p-cat">' + L(CATNAME[p.cat]) + '</span>' +
        '<h3>' + L(p.n) + '</h3>' +
        '<p class="p-tag">' + L(p.t) + '</p>' +
        '<p class="p-fit">' + L(p.fit) + '</p>' +
        '<div class="p-foot">' +
          '<div class="p-price"><b>' + euro(p.price) + '</b>' + (p.was ? '<s>' + euro(p.was) + '</s>' : '') + '</div>' +
          '<button class="p-add" data-add="' + p.id + '" aria-label="' + (lang==='en'?'Add ':'Añadir ') + L(p.n) + '">' +
            '<svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' +
          '</button>' +
        '</div>' +
      '</div></article>';
  }).join('');
}

/* ---------- modal ---------- */
function openModal(id){
  var p = P.filter(function(x){ return x.id === id; })[0];
  if (!p) return;
  current = p;
  $('#mMedia').innerHTML = media(p, 'il_1140xN');
  $('#mCat').textContent = L(CATNAME[p.cat]);
  $('#mName').textContent = L(p.n);
  $('#mTag').textContent = L(p.t);
  $('#mNow').textContent = euro(p.price);
  $('#mWas').textContent = p.was ? euro(p.was) : '';
  $('#mDesc').textContent = L(p.d);
  $('#mFit').textContent = L(p.fit);
  $('#mStock').innerHTML = p.low
    ? '<p class="stock low"><i></i>' + (lang==='en' ? 'Only ' + p.low + ' left in this run' : 'Solo quedan ' + p.low + ' de esta serie') + '</p>'
    : '<p class="stock"><i></i>' + (lang==='en' ? 'Made to order · ships from Spain' : 'Hecho por encargo · sale desde España') + '</p>';

  $('#mSpecs').innerHTML = (p.s ? L(p.s) : []).map(function(s){ return '<li>' + s + '</li>'; }).join('');
  $('#modal').classList.add('on');
  $('#scrim').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  $('#modal').classList.remove('on');
  if (!$('#drawer').classList.contains('on')) $('#scrim').classList.remove('on');
  document.body.style.overflow = '';
  current = null;
}

/* ---------- cart ---------- */
function add(id){
  var p = P.filter(function(x){ return x.id === id; })[0];
  if (!p) return;
  var line = cart.filter(function(c){ return c.key === id; })[0];
  if (line) line.qty++;
  else cart.push({ key:id, id:id, qty:1 });
  renderCart();
  toast((lang==='en' ? 'Added — ' : 'Añadido — ') + L(p.n));
}
function renderCart(){
  var count = cart.reduce(function(s,c){ return s + c.qty; }, 0);
  var total = cart.reduce(function(s,c){
    var p = P.filter(function(x){ return x.id === c.id; })[0];
    return s + p.price * c.qty;
  }, 0);
  $('#cartCount').textContent = count;
  $('#drawerCount').textContent = count;
  $('#subtotal').textContent = euro(total);
  $('#checkoutTotal').textContent = euro(total);
  $('#drawerFoot').hidden = count === 0;

  $('#shipMsg').innerHTML = lang==='en'
    ? 'Flat <b>' + euro(SHIP.flat) + '</b> shipping from Spain · exchanges within ' + SHIP.returns + ' days'
    : 'Envío único de <b>' + euro(SHIP.flat) + '</b> desde España · cambios en ' + SHIP.returns + ' días';

  var body = $('#drawerBody');
  if (!cart.length){
    body.innerHTML = '<div class="cart-empty">' +
      (lang==='en' ? 'Your cart is empty. Everything here is handmade to order in Barcelona.'
                   : 'Tu cesta está vacía. Todo lo de aquí se hace a mano por encargo en Barcelona.') + '</div>';
    return;
  }
  body.innerHTML = cart.map(function(c){
    var p = P.filter(function(x){ return x.id === c.id; })[0];
    return '<div class="citem">' +
      '<div class="citem-img">' + media(p, 'il_340x270') + '</div>' +
      '<div class="citem-info"><b>' + L(p.n) + '</b>' +
        '<span>' + L(CATNAME[p.cat]) + '</span>' +
        '<div class="qty">' +
          '<button data-q="-1" data-key="' + c.key + '" aria-label="-">' +
            '<svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg></button>' +
          '<span>' + c.qty + '</span>' +
          '<button data-q="1" data-key="' + c.key + '" aria-label="+">' +
            '<svg class="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="citem-price">' + euro(p.price * c.qty) + '</div>' +
    '</div>';
  }).join('');
}
function bumpQty(key, d){
  var line = cart.filter(function(c){ return c.key === key; })[0];
  if (!line) return;
  line.qty += d;
  if (line.qty <= 0) cart = cart.filter(function(c){ return c.key !== key; });
  renderCart();
}
function openDrawer(){
  $('#drawer').classList.add('on');
  $('#scrim').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeDrawer(){
  $('#drawer').classList.remove('on');
  if (!$('#modal').classList.contains('on')) $('#scrim').classList.remove('on');
  document.body.style.overflow = '';
}

var toastTimer;
function toast(msg){
  $('#toastMsg').textContent = msg;
  $('#toast').classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ $('#toast').classList.remove('on'); }, 2400);
}

/* =========================================================
   EVENTS
   ========================================================= */
document.addEventListener('click', function(e){
  var t = e.target;

  var moodBtn = t.closest('[data-mood-btn]');
  if (moodBtn){ setMood(moodBtn.dataset.moodBtn); return; }

  var langBtn = t.closest('[data-lang]');
  if (langBtn){ setLang(langBtn.dataset.lang); return; }

  var addBtn = t.closest('[data-add]');
  if (addBtn){ e.stopPropagation(); add(addBtn.dataset.add); return; }

  var card = t.closest('.pcard');
  if (card){ openModal(card.dataset.id); return; }

  var chip = t.closest('.chip');
  if (chip){
    cat = chip.dataset.cat;
    $$('.chip').forEach(function(c){ c.classList.toggle('on', c === chip); });
    render();
    return;
  }

  var jump = t.closest('[data-jump],[data-cat]');
  if (jump && (jump.dataset.jump || jump.dataset.cat) && !jump.classList.contains('chip')){
    var target = jump.dataset.jump || jump.dataset.cat;
    cat = target;
    $$('.chip').forEach(function(c){ c.classList.toggle('on', c.dataset.cat === target); });
    render();
    $('#navLinks').classList.remove('on');
    $('#shop').scrollIntoView({ behavior:'smooth', block:'start' });
    return;
  }

  var qb = t.closest('[data-q]');
  if (qb){ bumpQty(qb.dataset.key, parseInt(qb.dataset.q, 10)); return; }

  if (t.closest('#cartBtn')){ openDrawer(); return; }
  if (t.closest('#drawerClose')){ closeDrawer(); return; }
  if (t.closest('#mClose')){ closeModal(); return; }
  if (t.closest('#scrim')){ closeDrawer(); closeModal(); return; }
  if (t.closest('#mAdd')){ if (current){ add(current.id); closeModal(); openDrawer(); } return; }
  if (t.closest('#checkoutBtn')){
    toast(lang==='en' ? 'Demo checkout — the real shop is on Etsy.' : 'Pago de demostración — la tienda real está en Etsy.');
    return;
  }
  if (t.closest('#navToggle')){ $('#navLinks').classList.toggle('on'); return; }
  if (t.closest('#searchClear')){
    q = ''; $('#searchInput').value = ''; $('#searchClear').hidden = true; render(); return;
  }
  if (t.closest('.modal-card')) return;
  if (t.closest('#modal')){ closeModal(); return; }
});

$('#searchInput').addEventListener('input', function(e){
  q = e.target.value.trim();
  $('#searchClear').hidden = !q;
  render();
});
$('#sortSel').addEventListener('change', function(e){ sortBy = e.target.value; render(); });
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape'){ closeModal(); closeDrawer(); }
});

/* ---------- hero flecks ---------- */
(function(){
  var box = $('#flecks'), html = '';
  for (var i = 0; i < 26; i++){
    var size = 2 + Math.random() * 4;
    html += '<span style="left:' + (Math.random()*100).toFixed(1) + '%;top:' +
            (Math.random()*90).toFixed(1) + '%;width:' + size.toFixed(1) + 'px;height:' + size.toFixed(1) +
            'px;animation-duration:' + (7 + Math.random()*9).toFixed(1) + 's;animation-delay:-' +
            (Math.random()*10).toFixed(1) + 's"></span>';
  }
  box.innerHTML = html;
})();

/* ---------- rider rail ---------- */
var rider = $('#rider'), railCap = $('#railCap'), readVal = $('#readVal');
function onScroll(){
  var doc = document.documentElement;
  var max = doc.scrollHeight - window.innerHeight;
  var pr = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  var span = window.innerHeight * 0.56;
  rider.style.transform = 'translateY(' + (pr * span).toFixed(1) + 'px) rotate(' +
                          (mood === 'surf' ? -6 + pr * 10 : 8 - pr * 4).toFixed(1) + 'deg)';
  railCap.style.top = (pr * 100).toFixed(1) + '%';
  var total = mood === 'surf' ? 420 : 1240;
  readVal.textContent = Math.round(pr * total).toLocaleString(lang === 'en' ? 'en-GB' : 'es-ES');
}
window.addEventListener('scroll', onScroll, { passive:true });
window.addEventListener('resize', onScroll);

/* ---------- reveal (only what starts below the fold) ---------- */
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = $$('.rv').filter(function(el){ return el.getBoundingClientRect().top > window.innerHeight; });
  els.forEach(function(el){ el.classList.add('pre'); });
  if (!('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.remove('pre'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.classList.remove('pre'); io.unobserve(en.target); }
    });
  }, { rootMargin:'0px 0px -8% 0px' });
  els.forEach(function(el){ io.observe(el); });
})();

/* ---------- nav active state ---------- */
(function(){
  var sections = ['top','shop','story'];
  window.addEventListener('scroll', function(){
    var y = window.scrollY + 140, active = 'top';
    sections.forEach(function(id){
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= y) active = id;
    });
    var taken = false;
    $$('.nav-links a').forEach(function(a){
      var hit = !taken && a.getAttribute('href') === '#' + active;
      if (hit) taken = true;
      a.classList.toggle('active', hit);
    });
  }, { passive:true });
})();

/* ---------- boot ---------- */
var savedMood = null, savedLang = null;
try { savedMood = localStorage.getItem('ss-mood'); savedLang = localStorage.getItem('ss-lang'); } catch(e){}
lang = savedLang === 'es' ? 'es' : 'en';
$$('[data-lang]').forEach(function(b){ b.classList.toggle('on', b.dataset.lang === lang); });
setMood(savedMood === 'snow' ? 'snow' : 'surf');
renderCart();
onScroll();
})();
