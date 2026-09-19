/* =========================================================
   I'M A SURFER — CATALOG
   Product data and the inline SVG artwork. Edit products here;
   app.js reads them off window.IAS.
   ========================================================= */
(function(){
'use strict';

/* =========================================================
   ART — inline SVG per product, drawn with theme tokens so
   the whole catalogue re-colours when the season changes.
   ========================================================= */
var A = {
  wallSingle:'<path d="M60 120h280" stroke="var(--art-b)" stroke-width="3" opacity=".4"/>'+
    '<path d="M110 120v34h44v-34M246 120v34h44v-34" stroke="var(--art-b)" stroke-width="6" stroke-linecap="round" fill="none"/>'+
    '<path d="M70 176c44-16 216-16 260 0-44 16-216 16-260 0z" stroke="var(--art-a)" stroke-width="5" fill="none" stroke-linejoin="round"/>'+
    '<path d="M200 160v32" stroke="var(--art-a)" stroke-width="2.4" opacity=".5"/>'+
    '<circle cx="120" cy="120" r="5" fill="var(--art-b)"/><circle cx="280" cy="120" r="5" fill="var(--art-b)"/>',
  wallTriple:'<path d="M50 70h300" stroke="var(--art-b)" stroke-width="3" opacity=".35"/>'+
    '<path d="M108 70v28h40v-28M252 70v28h40v-28M108 150v28h40v-28M252 150v28h40v-28M108 230v28h40v-28M252 230v28h40v-28" stroke="var(--art-b)" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<path d="M76 116c40-14 208-14 248 0-40 14-208 14-248 0z" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>'+
    '<rect x="78" y="186" width="244" height="22" rx="11" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>'+
    '<path d="M76 276c40-14 208-14 248 0-40 14-208 14-248 0z" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>',
  wallVertical:'<path d="M96 40v260" stroke="var(--art-b)" stroke-width="3" opacity=".35"/>'+
    '<path d="M96 96h46M96 244h46" stroke="var(--art-b)" stroke-width="6" stroke-linecap="round"/>'+
    '<path d="M186 54c30 52 30 180 0 232-30-52-30-180 0-232z" stroke="var(--art-a)" stroke-width="5" fill="none" stroke-linejoin="round"/>'+
    '<path d="M186 84v172" stroke="var(--art-a)" stroke-width="2.2" opacity=".5"/>'+
    '<rect x="252" y="62" width="52" height="216" rx="26" stroke="var(--art-b)" stroke-width="4.6" fill="none"/>'+
    '<path d="M266 118h24M266 222h24" stroke="var(--art-b)" stroke-width="2.6" opacity=".7"/>',
  wallSix:'<rect x="52" y="44" width="296" height="252" rx="10" stroke="var(--art-b)" stroke-width="3" fill="none" opacity=".35"/>'+
    '<path d="M52 110h296M52 170h296M52 230h296" stroke="var(--art-b)" stroke-width="2" opacity=".28"/>'+
    '<g stroke="var(--art-b)" stroke-width="5" stroke-linecap="round">'+
    '<path d="M92 110v26M148 110v26M92 170v26M148 170v26M92 230v26M148 230v26M252 110v26M308 110v26M252 170v26M308 170v26M252 230v26M308 230v26"/></g>'+
    '<g stroke="var(--art-a)" stroke-width="4" fill="none">'+
    '<path d="M76 90c28-10 88-10 116 0-28 10-88 10-116 0z"/><path d="M236 90c28-10 88-10 116 0-28 10-88 10-116 0z"/>'+
    '<rect x="78" y="140" width="112" height="18" rx="9"/><rect x="238" y="140" width="112" height="18" rx="9"/>'+
    '<path d="M76 210c28-10 88-10 116 0-28 10-88 10-116 0z"/><rect x="238" y="200" width="112" height="18" rx="9"/></g>',
  totem:'<path d="M200 292V78" stroke="var(--art-b)" stroke-width="7" stroke-linecap="round"/>'+
    '<path d="M124 296l76-30 76 30" stroke="var(--art-b)" stroke-width="6" fill="none" stroke-linejoin="round"/>'+
    '<g stroke="var(--art-b)" stroke-width="5" stroke-linecap="round"><path d="M200 120h-52M200 120h52M200 200h-52M200 200h52"/></g>'+
    '<path d="M108 110c18-38 18-38 0 0z" fill="none"/>'+
    '<path d="M122 92c22 34 22 90 0 124-22-34-22-90 0-124z" stroke="var(--art-a)" stroke-width="4.4" fill="none" stroke-linejoin="round"/>'+
    '<rect x="254" y="86" width="42" height="136" rx="21" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>'+
    '<path d="M266 128h18M266 182h18" stroke="var(--art-a)" stroke-width="2.4" opacity=".7"/>',
  bench:'<rect x="70" y="128" width="260" height="26" rx="8" stroke="var(--art-b)" stroke-width="5" fill="none"/>'+
    '<path d="M104 154v124M296 154v124M104 216h192" stroke="var(--art-b)" stroke-width="5" stroke-linecap="round"/>'+
    '<path d="M84 112c40-14 192-14 232 0-40 14-192 14-232 0z" stroke="var(--art-a)" stroke-width="4.6" fill="none"/>'+
    '<circle cx="200" cy="112" r="4" fill="var(--art-a)"/>'+
    '<path d="M150 246h36v26h-36zM222 250h44v18h-44" stroke="var(--art-b)" stroke-width="3.4" fill="none"/>',
  trestle:'<path d="M92 116l-36 150M92 116l36 150M272 116l-36 150M272 116l36 150" stroke="var(--art-b)" stroke-width="5" stroke-linecap="round"/>'+
    '<path d="M64 206h56M244 206h56" stroke="var(--art-b)" stroke-width="3.4"/>'+
    '<rect x="70" y="96" width="44" height="18" rx="9" stroke="var(--art-b)" stroke-width="4" fill="none"/>'+
    '<rect x="250" y="96" width="44" height="18" rx="9" stroke="var(--art-b)" stroke-width="4" fill="none"/>'+
    '<path d="M46 84c50-18 258-18 308 0-50 18-258 18-308 0z" stroke="var(--art-a)" stroke-width="4.6" fill="none" stroke-linejoin="round"/>',
  hoist:'<path d="M60 48h280" stroke="var(--art-b)" stroke-width="4" opacity=".4"/>'+
    '<circle cx="140" cy="72" r="18" stroke="var(--art-b)" stroke-width="4.4" fill="none"/>'+
    '<circle cx="260" cy="72" r="18" stroke="var(--art-b)" stroke-width="4.4" fill="none"/>'+
    '<path d="M140 48v6M260 48v6M122 78v112M158 78v112M242 78v112M278 78v112" stroke="var(--art-b)" stroke-width="2.6"/>'+
    '<path d="M110 196h60M230 196h60" stroke="var(--art-b)" stroke-width="5" stroke-linecap="round"/>'+
    '<path d="M76 224c40-14 208-14 248 0-40 14-208 14-248 0z" stroke="var(--art-a)" stroke-width="4.6" fill="none"/>'+
    '<path d="M330 60v34l-10-10M330 94l10-10" stroke="var(--art-b)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>',
  roof:'<path d="M58 216h284l-26-64a18 18 0 00-16-11H100a18 18 0 00-16 11z" stroke="var(--art-b)" stroke-width="4.6" fill="none" stroke-linejoin="round"/>'+
    '<circle cx="118" cy="232" r="18" stroke="var(--art-b)" stroke-width="4.4" fill="none"/>'+
    '<circle cx="282" cy="232" r="18" stroke="var(--art-b)" stroke-width="4.4" fill="none"/>'+
    '<rect x="104" y="106" width="40" height="22" rx="8" stroke="var(--art-b)" stroke-width="4" fill="none"/>'+
    '<rect x="256" y="106" width="40" height="22" rx="8" stroke="var(--art-b)" stroke-width="4" fill="none"/>'+
    '<path d="M54 96c50-16 242-16 292 0-50 16-242 16-292 0z" stroke="var(--art-a)" stroke-width="4.6" fill="none" stroke-linejoin="round"/>'+
    '<path d="M124 96v34M276 96v34" stroke="var(--art-a)" stroke-width="2.6" opacity=".6"/>',
  vanrail:'<path d="M56 68v212M344 68v212" stroke="var(--art-b)" stroke-width="4" opacity=".35"/>'+
    '<rect x="72" y="104" width="256" height="16" rx="8" stroke="var(--art-b)" stroke-width="4.4" fill="none"/>'+
    '<rect x="72" y="228" width="256" height="16" rx="8" stroke="var(--art-b)" stroke-width="4.4" fill="none"/>'+
    '<g stroke="var(--art-b)" stroke-width="4" stroke-linecap="round"><path d="M120 120v16M280 120v16M120 212v16M280 212v16"/></g>'+
    '<path d="M96 168c34-12 174-12 208 0-34 12-174 12-208 0z" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>'+
    '<rect x="98" y="186" width="204" height="18" rx="9" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>',
  strap:'<path d="M64 128c56-26 112 26 168 0s96-22 104 4" stroke="var(--art-a)" stroke-width="10" fill="none" stroke-linecap="round" opacity=".85"/>'+
    '<rect x="150" y="176" width="100" height="62" rx="12" stroke="var(--art-b)" stroke-width="4.6" fill="none"/>'+
    '<path d="M168 196h64M168 218h64" stroke="var(--art-b)" stroke-width="3.4" stroke-linecap="round"/>'+
    '<path d="M122 208h28M250 208h28" stroke="var(--art-a)" stroke-width="8" stroke-linecap="round" opacity=".7"/>',
  lock:'<rect x="128" y="158" width="144" height="110" rx="18" stroke="var(--art-b)" stroke-width="5" fill="none"/>'+
    '<path d="M160 158v-28a40 40 0 0180 0v28" stroke="var(--art-b)" stroke-width="5" fill="none"/>'+
    '<circle cx="200" cy="206" r="14" stroke="var(--art-a)" stroke-width="4.4" fill="none"/>'+
    '<path d="M200 220v22" stroke="var(--art-a)" stroke-width="4.4" stroke-linecap="round"/>'+
    '<path d="M128 214H86a26 26 0 010-52h22M272 214h42a26 26 0 000-52h-22" stroke="var(--art-a)" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>'
};
function svg(key){
  return '<svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'+(A[key]||'')+'</svg>';
}

/* =========================================================
   CATALOG — shared by both seasons. Fit lines carry the real
   numbers each sport is measured in: surfboards in feet and
   inches, snowboards in centimetres.
   ========================================================= */
var FIN = { oak:{en:'Oak + steel',es:'Roble y acero'}, black:{en:'Matte black',es:'Negro mate'}, raw:{en:'Raw steel',es:'Acero crudo'} };

var P = [
  /* ---- WALL ---- */
  { id:'ala-01', cat:'wall', art:'wallSingle', price:39, was:49, rev:214, best:true, fin:['oak','black'],
    n:'Ala 01', fit:{en:"Surf 5'0\u20139'6 \u00b7 Snow 138\u2013168cm",es:"Surf 5'0\u20139'6 \u00b7 Snow 138\u2013168 cm"},
    t:{en:'One board. Six inches of wall.',es:'Una tabla. Quince cent\u00edmetros de pared.'},
    d:{en:'A single horizontal mount with two cork-lined arms and a span you can set wide for a longboard or narrow for a twin. It takes 18kg, which is four boards more than you will ever hang on it.',
       es:'Un soporte horizontal de una tabla con dos brazos forrados de corcho y una separaci\u00f3n que puedes abrir para una longboard o cerrar para una twin. Aguanta 18 kg, cuatro tablas m\u00e1s de las que le vas a colgar.'},
    s:{en:['3mm powder-coated marine steel','Natural cork lining, 6mm','Adjustable arm span 14\u201326cm','Holds up to 18kg','Anchors for brick, block and plaster included'],
       es:['Acero marino de 3 mm pintado en polvo','Forro de corcho natural de 6 mm','Separaci\u00f3n de brazos regulable 14\u201326 cm','Soporta hasta 18 kg','Tacos para ladrillo, bloque y pladur incluidos']} },

  /* ---- STANDS ---- */
  { id:'totem', cat:'stand', art:'totem', price:129, rev:118, best:true, fin:['oak','black'],
    n:'T\u00f3tem', fit:{en:'4 boards \u00b7 no drilling',es:'4 tablas \u00b7 sin taladrar'},
    t:{en:'For walls you are not allowed to drill.',es:'Para paredes que no puedes taladrar.'},
    d:{en:'A free-standing column with four arms and a weighted cross base that does not tip when you pull the top board out. Rented flats, shop floors, anywhere a drill is a conversation with the landlord.',
       es:'Una columna de pie con cuatro brazos y una base en cruz lastrada que no vuelca cuando sacas la tabla de arriba. Pisos de alquiler, tiendas, y cualquier sitio donde taladrar sea una conversaci\u00f3n con el casero.'},
    s:{en:['Free-standing, no wall fixing','Holds 4 boards, up to 40kg','Weighted cross base, 62cm footprint','Felt feet, will not mark a floor','Assembles in 10 minutes'],
       es:['De pie, sin fijaci\u00f3n a la pared','Sujeta 4 tablas, hasta 40 kg','Base en cruz lastrada, 62 cm de huella','Pies de fieltro, no marca el suelo','Se monta en 10 minutos']} },

  /* ---- TRANSPORT ---- */
  { id:'roof-two', cat:'travel', art:'roof', price:69, was:79, rev:203, fin:['black'],
    n:'Roof Two', fit:{en:'Bars 60\u201385mm \u00b7 2 boards',es:'Barras de 60\u201385 mm \u00b7 2 tablas'},
    t:{en:'Coast in the morning, pass by noon.',es:'Costa por la ma\u00f1ana, puerto al mediod\u00eda.'},
    d:{en:'A pair of 45cm roof pads with non-slip ribbing and two 3.5m straps with padded cam buckles. The buckle pads matter: they are what stops a strap buzzing at 110km/h and chewing a rail.',
       es:'Un par de almohadillas de techo de 45 cm con nervadura antideslizante y dos correas de 3,5 m con hebillas acolchadas. Las almohadillas de hebilla importan: son las que evitan que una correa vibre a 110 km/h y se coma un canto.'},
    s:{en:['Pair of 45cm pads','Fits bars 60\u201385mm wide','Two 3.5m straps, padded cam buckles','Carries 2 boards, up to 25kg','UV-stable webbing'],
       es:['Pareja de almohadillas de 45 cm','Para barras de 60\u201385 mm de ancho','Dos correas de 3,5 m con hebillas acolchadas','Lleva 2 tablas, hasta 25 kg','Cincha estable a los rayos UV']} }
];

var CATNAME = {
  wall:{en:'Wall mounts',es:'Soportes de pared'},
  stand:{en:'Stands & benches',es:'Racks y bancos'},
  travel:{en:'Roof & transport',es:'Techo y transporte'}
};
var SHIP = { freeOver:90, returns:30 };

/* Exposed for app.js. */
window.IAS = { A:A, svg:svg, FIN:FIN, P:P, CATNAME:CATNAME, SHIP:SHIP };
})();
