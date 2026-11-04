/* ===== CONFIGURAÇÕES: edite aqui ===== */
const WHATSAPP = '5586995855923'; // 55 + DDD + número
const MENSAGEM = 'Olá, Carmem! Vi o site da Doçuras da Carmem e gostaria de pedir um orçamento de bolo. 🎂';

// Fotos da galeria: img/bolos/bolo-01.webp, bolo-02.webp... na ordem abaixo.
// O texto serve de descrição da foto e vai na mensagem do WhatsApp.
const BOLOS = [
  'Bolo unicórnio com arco-íris e asas',
  'Bolo jardim encantado com passarinho e borboletas',
  'Bolo infantil colorido de 2 anos com topo personalizado',
  'Bolo safári de 2 andares com bichinhos',
  'Bolo Branca de Neve com flores',
  'Bolo azul de 2 andares com conchas e estrelas-do-mar',
  'Bolo elegante bege com nome em acrílico dourado',
  'Bolo Princesa Sofia lilás com castelo',
  'Bolo Carros vermelho com bandeiras xadrez',
  'Bolo preto com chamas e topo personalizado',
  'Bolo de super-heróis azul, branco e vermelho',
  'Bolo branco com rosas e coração dourado',
  'Bolo Cinderela azul com borboletas',
  'Bolo de doramas com topo personalizado',
  'Bolo campeão do vento com ondas',
  'Bolo infantil colorido de 2 andares',
  'Bolo Barbie rosa com coroa dourada',
  'Bolo príncipe azul e dourado',
  'Bolo azul com babados rosa e personagens no topo',
  'Bolo de 3 andares jardim encantado',
  'Bolo Carros vermelho de 2 andares',
  'Bolo Moana de 2 andares com palmeiras',
  'Bolo Princesa Sofia lilás de 2 andares',
  'Bolo azul com dinossauros',
  'Bolo de 3 andares com cerejeira rosa',
  'Bolo safári colorido de 2 andares',
  'Bolo com balão colorido e turminha'
];
/* ====================================== */

const wa = texto => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
const foto = i => `img/bolos/bolo-${String(i + 1).padStart(2, '0')}.webp`;

// Todos os botões com data-wa abrem o WhatsApp com a mensagem pronta
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = wa(MENSAGEM);
  a.target = '_blank';
  a.rel = 'noopener';
});

// Galeria
const grade = document.getElementById('grade');
grade.innerHTML = BOLOS.map((alt, i) =>
  `<button type="button" data-i="${i}" aria-label="Ampliar: ${alt}">
     <img src="${foto(i)}" alt="${alt}" width="720" height="960" loading="lazy">
   </button>`).join('');
grade.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (b) abrir(+b.dataset.i);
});

// Foto ampliada
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lb-img');
const lbWa = document.getElementById('lb-wa');
let atual = 0, ultimo = null;

function abrir(i) {
  ultimo = document.activeElement;
  mostrar(i);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  lb.querySelector('.lb-x').focus();
}
function mostrar(i) {
  atual = (i + BOLOS.length) % BOLOS.length;
  lbImg.src = foto(atual);
  lbImg.alt = BOLOS[atual];
  lbWa.href = wa(`Olá, Carmem! Vi o "${BOLOS[atual].toLowerCase()}" no seu site e gostaria de um orçamento de um bolo parecido. 🎂`);
}
function fechar() {
  lb.hidden = true;
  document.body.style.overflow = '';
  if (ultimo) ultimo.focus();
}
lb.querySelector('.lb-x').onclick = fechar;
lb.querySelector('.lb-p').onclick = () => mostrar(atual - 1);
lb.querySelector('.lb-n').onclick = () => mostrar(atual + 1);
lb.addEventListener('click', e => { if (e.target === lb) fechar(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') fechar();
  if (e.key === 'ArrowLeft') mostrar(atual - 1);
  if (e.key === 'ArrowRight') mostrar(atual + 1);
});
let x0 = null; // deslizar o dedo no celular
lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
  x0 = null;
});

// Menu do celular
const menu = document.getElementById('menu');
const menuBtn = document.querySelector('.menu-btn');
menuBtn.onclick = () => {
  const aberto = menu.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', aberto);
};
menu.addEventListener('click', e => {
  if (e.target.closest('a')) {
    menu.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', false);
  }
});

document.getElementById('ano').textContent = new Date().getFullYear();
