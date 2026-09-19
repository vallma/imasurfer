/* =========================================================
   I'M A SURFER — CATALOG
   The real Coffiesurf range (etsy.com/shop/Coffiesurf).
   Photos are served from Etsy's CDN; if one fails to load the
   line drawing underneath it shows instead. Edit products here;
   app.js reads them off window.IAS.
   ========================================================= */
(function(){
'use strict';

/* =========================================================
   ART — inline SVG fallback per product, drawn with theme
   tokens so it re-colours when the season changes.
   ========================================================= */
var A = {
  vertical:'<path d="M96 40v260" stroke="var(--art-b)" stroke-width="3" opacity=".35"/>'+
    '<path d="M96 96h46M96 244h46" stroke="var(--art-b)" stroke-width="6" stroke-linecap="round"/>'+
    '<path d="M186 54c30 52 30 180 0 232-30-52-30-180 0-232z" stroke="var(--art-a)" stroke-width="5" fill="none" stroke-linejoin="round"/>'+
    '<path d="M186 84v172" stroke="var(--art-a)" stroke-width="2.2" opacity=".5"/>'+
    '<rect x="252" y="62" width="52" height="216" rx="26" stroke="var(--art-b)" stroke-width="4.6" fill="none"/>'+
    '<path d="M266 118h24M266 222h24" stroke="var(--art-b)" stroke-width="2.6" opacity=".7"/>',
  hooks:'<path d="M60 120h280" stroke="var(--art-b)" stroke-width="3" opacity=".4"/>'+
    '<path d="M110 120v34h44v-34M246 120v34h44v-34" stroke="var(--art-b)" stroke-width="6" stroke-linecap="round" fill="none"/>'+
    '<path d="M70 176c44-16 216-16 260 0-44 16-216 16-260 0z" stroke="var(--art-a)" stroke-width="5" fill="none" stroke-linejoin="round"/>'+
    '<path d="M200 160v32" stroke="var(--art-a)" stroke-width="2.4" opacity=".5"/>'+
    '<circle cx="120" cy="120" r="5" fill="var(--art-b)"/><circle cx="280" cy="120" r="5" fill="var(--art-b)"/>',
  display:'<path d="M50 70h300" stroke="var(--art-b)" stroke-width="3" opacity=".35"/>'+
    '<path d="M108 70v28h40v-28M252 70v28h40v-28M108 180v28h40v-28M252 180v28h40v-28" stroke="var(--art-b)" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<path d="M76 116c40-14 208-14 248 0-40 14-208 14-248 0z" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>'+
    '<rect x="78" y="216" width="244" height="22" rx="11" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>',
  shelf:'<rect x="70" y="150" width="260" height="24" rx="8" stroke="var(--art-b)" stroke-width="5" fill="none"/>'+
    '<path d="M104 174v18M296 174v18" stroke="var(--art-b)" stroke-width="4.4" stroke-linecap="round"/>'+
    '<rect x="96" y="192" width="208" height="70" rx="10" stroke="var(--art-a)" stroke-width="4" fill="none" stroke-dasharray="7 7"/>'+
    '<path d="M150 150v-22M200 150v-30M250 150v-22" stroke="var(--art-b)" stroke-width="3.4" stroke-linecap="round" opacity=".7"/>'+
    '<circle cx="150" cy="124" r="6" stroke="var(--art-a)" stroke-width="3" fill="none"/>'+
    '<circle cx="250" cy="124" r="6" stroke="var(--art-a)" stroke-width="3" fill="none"/>'
};
function svg(key){
  return '<svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+(A[key]||'')+'</svg>';
}

/* Etsy CDN photos. `photo` is the path after i.etsystatic.com/ ;
   the size segment is swapped for the one the page asks for. */
var PHOTO_BASE = 'https://i.etsystatic.com/';
function photo(path, size){
  return PHOTO_BASE + path.replace('il_340x270', size || 'il_794xN');
}
var SHOP = 'https://www.etsy.com/es/shop/Coffiesurf';
function listing(id){ return 'https://www.etsy.com/es/listing/' + id + '/'; }

/* =========================================================
   CATALOG — the seven live Coffiesurf listings.
   `etsy` is the listing id, `photo` its first photo.
   ========================================================= */
var COMMON_SPECS = {
  en:['Birch plywood, natural finish','Handmade in Barcelona','Wall mounted','Ships from Spain, 4€','Exchanges accepted within 7 days'],
  es:['Madera contrachapada, acabado natural','Hecho a mano en Barcelona','Montaje en pared','Envío 4 € desde España','Cambios aceptados en 7 días']
};

var P = [
  /* ---- VERTICAL ---- */
  { id:'vertical-natural', cat:'vertical', art:'vertical', price:39, rev:5, best:true,
    etsy:'4484059794', photo:'65092907/r/il/f142b3/7931927335/il_340x270.7931927335_5kqu.jpg',
    n:{ en:'Vertical Wall Rack', es:'Soporte vertical de pared' },
    fit:{ en:'Surf · snow · wake · kite', es:'Surf · snow · wake · kite' },
    t:{ en:'Your board upright, on show.', es:'La tabla de pie, a la vista.' },
    d:{ en:'The one most of the shop\'s reviews are about. A handmade vertical wall rack in plywood with a natural finish, for keeping a board standing against the wall instead of leaning on a skirting board.',
        es:'El que se lleva casi todas las reseñas de la tienda. Un soporte vertical de pared hecho a mano en contrachapado con acabado natural, para tener la tabla de pie contra la pared en vez de apoyada en un rodapié.' },
    s:COMMON_SPECS },

  { id:'vertical-longboard', cat:'vertical', art:'vertical', price:38, rev:0,
    etsy:'4559908889', photo:'65092907/r/il/cb10eb/8411958128/il_340x270.8411958128_6v05.jpg',
    n:{ en:'Longboard Vertical', es:'Vertical para longboard' },
    fit:{ en:'Longboards and bigger volumes', es:'Longboards y volúmenes grandes' },
    t:{ en:'Made for the long ones.', es:'Pensado para las largas.' },
    d:{ en:'A vertical wall mount sized for longboards, so a 9-foot board stands in a hallway without taking the room over. Plywood, natural finish, made by hand.',
        es:'Un soporte vertical de pared pensado para longboards, para que una tabla de nueve pies se aguante en un pasillo sin comerse la habitación. Contrachapado, acabado natural, hecho a mano.' },
    s:COMMON_SPECS },

  { id:'vertical-minimal', cat:'vertical', art:'vertical', price:38, rev:0,
    etsy:'4543408643', photo:'65092907/r/il/4f1fb3/8293388196/il_340x270.8293388196_24qm.jpg',
    n:{ en:'Minimal Vertical Shelf', es:'Estante vertical minimalista' },
    fit:{ en:'Living rooms and hallways', es:'Salones y pasillos' },
    t:{ en:'Furniture first, rack second.', es:'Antes mueble que soporte.' },
    d:{ en:'A minimal vertical shelf for the board you would rather look at than hide. Handmade plywood with a warm natural finish, at home in a living room, a surf apartment or a shop floor.',
        es:'Un estante vertical minimalista para la tabla que prefieres mirar antes que esconder. Contrachapado hecho a mano con acabado natural cálido, a gusto en un salón, un piso de surf o una tienda.' },
    s:COMMON_SPECS },

  { id:'vertical-warm', cat:'vertical', art:'vertical', price:38, rev:0,
    etsy:'4563709654', photo:'65092907/r/il/2f3d8c/8293387386/il_340x270.8293387386_i56c.jpg',
    n:{ en:'Vertical Rack, Natural', es:'Soporte vertical natural' },
    fit:{ en:'Surf rooms and studios', es:'Salas de surf y estudios' },
    t:{ en:'Same idea, warmer grain.', es:'La misma idea, veta más cálida.' },
    d:{ en:'A second take on the vertical mount, handmade in plywood with a natural finish. Same clean line, different piece of wood — each one comes out of the workshop slightly its own.',
        es:'Una segunda versión del soporte vertical, hecha a mano en contrachapado con acabado natural. La misma línea limpia, otra pieza de madera: cada una sale del taller ligeramente distinta.' },
    s:COMMON_SPECS },

  /* ---- HOOKS & DISPLAY ---- */
  { id:'hooks-pair', cat:'hooks', art:'hooks', price:28, rev:0, best:true,
    etsy:'4526223705', photo:'65092907/r/il/dab94c/8166694818/il_340x270.8166694818_ecxx.jpg',
    n:{ en:'Curved Hooks, Pair', es:'Ganchos curvos, pareja' },
    fit:{ en:'Surf · wakeboard · foil · kite · snow', es:'Surf · wakeboard · foil · kite · snow' },
    t:{ en:'Two hooks. One horizontal board.', es:'Dos ganchos. Una tabla en horizontal.' },
    d:{ en:'Each set is two wooden wall hooks that hold a board horizontally. Order several sets to stack boards one above the other. The simple curved-hook design suits beach houses, surf flats, garages, studios and shops — anywhere the board should look good while it waits.',
        es:'Cada juego son dos ganchos de madera de pared que sujetan una tabla en horizontal. Pide varios juegos para exhibir varias tablas una encima de otra. Su sencillo diseño de gancho curvo encaja en casas de playa, pisos de surf, garajes, estudios y tiendas: donde quieras que la tabla luzca bien mientras espera.' },
    s:{ en:['Set of two wall hooks','Birch plywood, natural finish','Stackable: order several sets','Handmade in Barcelona','Ships from Spain, 4€','Exchanges accepted within 7 days'],
        es:['Juego de dos ganchos de pared','Contrachapado, acabado natural','Apilable: pide varios juegos','Hecho a mano en Barcelona','Envío 4 € desde España','Cambios aceptados en 7 días'] } },

  { id:'display-shelf', cat:'hooks', art:'display', price:28, rev:0,
    etsy:'4559919230', photo:'65092907/r/il/84b7c6/8439971282/il_340x270.8439971282_qqmm.jpg',
    n:{ en:'Board Display Shelf', es:'Estante expositor' },
    fit:{ en:'Surf · snowboard · wakeboard · kitesurf', es:'Surf · snowboard · wakeboard · kitesurf' },
    t:{ en:'For the board that earned the wall.', es:'Para la tabla que se ha ganado la pared.' },
    d:{ en:'A handmade display shelf for surf, snowboard, wakeboard and kitesurf boards, built to show a board rather than just store it. Plywood with a natural finish.',
        es:'Un estante expositor hecho a mano para tablas de surf, snowboard, wakeboard y kitesurf, pensado para enseñar la tabla más que para guardarla. Contrachapado con acabado natural.' },
    s:COMMON_SPECS },

  /* ---- ENTRYWAY ---- */
  { id:'entry-shelf', cat:'home', art:'shelf', price:20, rev:0,
    etsy:'4543397593', photo:'65092907/r/il/68f1f7/8293308930/il_340x270.8293308930_r16x.jpg',
    n:{ en:'Entryway Shelf', es:'Estante de recibidor' },
    fit:{ en:'Birch plywood + cork', es:'Contrachapado de abedul + corcho' },
    t:{ en:'Keys, wax, sunglasses.', es:'Llaves, parafina, gafas.' },
    d:{ en:'A floating entryway shelf and key holder in birch plywood with a cork surface. The same workshop and the same finish as the racks, for the two metres of wall you pass every time you leave.',
        es:'Un estante flotante de recibidor con llavero, en contrachapado de abedul y superficie de corcho. El mismo taller y el mismo acabado que los soportes, para los dos metros de pared por los que pasas cada vez que sales.' },
    s:{ en:['Birch plywood with cork surface','Floating shelf + key holder','Handmade in Barcelona','Ships from Spain, 4€','Exchanges accepted within 7 days'],
        es:['Contrachapado de abedul con superficie de corcho','Estante flotante y llavero','Hecho a mano en Barcelona','Envío 4 € desde España','Cambios aceptados en 7 días'] } }
];

var CATNAME = {
  vertical:{ en:'Vertical racks', es:'Soportes verticales' },
  hooks:{ en:'Hooks & display', es:'Ganchos y expositores' },
  home:{ en:'Entryway', es:'Recibidor' }
};

/* Real Etsy figures, kept in one place so the page cannot drift
   from the shop. Update when the shop does. */
var SHIP = { flat:4, returns:7, sales:116, rating:'5,0', reviews:6, shop:SHOP };

window.IAS = { A:A, svg:svg, P:P, CATNAME:CATNAME, SHIP:SHIP, photo:photo, listing:listing, SHOP:SHOP };
})();
