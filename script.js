const temak = [
  { id: 'html', nev: 'HTML', jel: '<>' },
  { id: 'css', nev: 'CSS', jel: '#{}' },
  { id: 'javascript', nev: 'JS', jel: 'JS' },
  { id: 'dom', nev: 'DOM', jel: 'DOM' },
  { id: 'git', nev: 'Git', jel: 'Git' },
  { id: 'api', nev: 'API', jel: 'API' },
  { id: 'json', nev: 'JSON', jel: '{}' },
  { id: 'storage', nev: 'Storage', jel: 'LS' },
  { id: 'array', nev: 'Array', jel: '[]' },
  { id: 'event', nev: 'Event', jel: 'ON' },
];

const nehezsegek = {
  easy: { parok: 6, oszlopok: 4 },
  medium: { parok: 8, oszlopok: 4 },
  hard: { parok: 10, oszlopok: 5 },
};

const tabla = document.getElementById('game-board');
const nehezsegMezo = document.getElementById('difficulty-select');
const ujJatekGomb = document.getElementById('new-game-button');
const rekordTorlesGomb = document.getElementById('reset-score-button');
const ujKorGomb = document.getElementById('play-again-button');
const lepesElem = document.getElementById('moves-value');
const idoElem = document.getElementById('time-value');
const parElem = document.getElementById('matches-value');
const rekordElem = document.getElementById('best-score-value');
const eredmenyAblak = document.getElementById('result-dialog');
const eredmenySzoveg = document.getElementById('result-summary');

let kartyak = [];
let felforditottKartyak = [];
let lepesek = 0;
let talalatok = 0;
let masodpercek = 0;
let idoId = null;
let visszaforditasId = null;
let zarolva = false;
let elindult = false;

ujJatekGomb.addEventListener('click', ujJatek);
nehezsegMezo.addEventListener('change', ujJatek);
ujKorGomb.addEventListener('click', ujJatek);
rekordTorlesGomb.addEventListener('click', rekordTorles);

ujJatek();

function ujJatek() {
  idoMegallitas();
  visszaforditasMegallitas();
  eredmenyAblak.close();

  lepesek = 0;
  talalatok = 0;
  masodpercek = 0;
  zarolva = false;
  elindult = false;
  felforditottKartyak = [];

  const nehezseg = nehezsegMezo.value;
  const beallitas = nehezsegek[nehezseg];

  kartyak = pakliKeszites(beallitas.parok);
  tabla.style.setProperty('--columns', beallitas.oszlopok);

  kartyaMegjelenites();
  statisztikaFrissites();
}

function pakliKeszites(parokSzama) {
  const valasztottTemak = temak.slice(0, parokSzama);
  const pakli = [];

  valasztottTemak.forEach((tema) => {
    pakli.push(kartyaKeszites(tema, 'a'));
    pakli.push(kartyaKeszites(tema, 'b'));
  });

  return keveres(pakli);
}

function kartyaKeszites(tema, peldany) {
  return {
    id: `${tema.id}-${peldany}`,
    temaId: tema.id,
    nev: tema.nev,
    jel: tema.jel,
    felforditva: false,
    megtalalva: false,
  };
}

function keveres(pakli) {
  const kevertPakli = [...pakli];

  for (let i = kevertPakli.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [kevertPakli[i], kevertPakli[randomIndex]] = [kevertPakli[randomIndex], kevertPakli[i]];
  }

  return kevertPakli;
}

function kartyaMegjelenites() {
  tabla.innerHTML = '';

  kartyak.forEach((kartya) => {
    const gomb = document.createElement('button');
    const lathato = kartya.felforditva || kartya.megtalalva;

    gomb.className = kartyaOsztaly(kartya);
    gomb.type = 'button';
    gomb.disabled = zarolva || kartya.megtalalva;
    gomb.setAttribute('aria-pressed', String(lathato));
    gomb.setAttribute('aria-label', lathato ? `${kartya.nev} kártya` : 'Lefordított kártya');

    const hatlap = document.createElement('span');
    hatlap.className = 'card-face card-back';
    hatlap.textContent = '?';

    const elolap = document.createElement('span');
    elolap.className = 'card-face card-front';

    const jel = document.createElement('span');
    jel.className = 'card-symbol';
    jel.textContent = kartya.jel;

    const nev = document.createElement('span');
    nev.className = 'card-label';
    nev.textContent = kartya.nev;

    elolap.append(jel, nev);
    gomb.append(hatlap, elolap);

    gomb.addEventListener('click', () => kartyaKattintas(kartya));
    tabla.append(gomb);
  });
}

function kartyaOsztaly(kartya) {
  let osztaly = 'memory-card';

  if (kartya.felforditva || kartya.megtalalva) {
    osztaly += ' is-flipped';
  }

  if (kartya.megtalalva) {
    osztaly += ' is-matched';
  }

  return osztaly;
}

function kartyaKattintas(kartya) {
  if (zarolva || kartya.felforditva || kartya.megtalalva) {
    return;
  }

  if (!elindult) {
    idoInditas();
    elindult = true;
  }

  kartya.felforditva = true;
  felforditottKartyak.push(kartya);
  kartyaMegjelenites();

  if (felforditottKartyak.length === 2) {
    parEllenorzes();
  }
}

function parEllenorzes() {
  const elsoKartya = felforditottKartyak[0];
  const masodikKartya = felforditottKartyak[1];

  lepesek++;
  zarolva = true;

  if (elsoKartya.temaId === masodikKartya.temaId) {
    elsoKartya.megtalalva = true;
    masodikKartya.megtalalva = true;
    talalatok++;
    felforditottKartyak = [];
    zarolva = false;
    kartyaMegjelenites();
    statisztikaFrissites();
    jatekVegeEllenorzes();
    return;
  }

  statisztikaFrissites();
  kartyaMegjelenites();

  visszaforditasId = setTimeout(() => {
    elsoKartya.felforditva = false;
    masodikKartya.felforditva = false;
    felforditottKartyak = [];
    zarolva = false;
    kartyaMegjelenites();
  }, 750);
}

function jatekVegeEllenorzes() {
  const nehezseg = nehezsegMezo.value;
  const parokSzama = nehezsegek[nehezseg].parok;

  if (talalatok !== parokSzama) {
    return;
  }

  idoMegallitas();

  const eredmeny = {
    lepesek,
    masodpercek,
  };
  const ujRekord = rekordMentes(nehezseg, eredmeny);

  statisztikaFrissites();
  eredmenySzoveg.textContent = ujRekord
    ? `Új rekord: ${lepesek} lépés, ${idoFormazas(masodpercek)} idő.`
    : `Eredmény: ${lepesek} lépés, ${idoFormazas(masodpercek)} idő.`;
  eredmenyAblak.showModal();
}

function statisztikaFrissites() {
  const nehezseg = nehezsegMezo.value;
  const parokSzama = nehezsegek[nehezseg].parok;
  const rekord = rekordBetoltes()[nehezseg];

  lepesElem.textContent = lepesek;
  idoElem.textContent = idoFormazas(masodpercek);
  parElem.textContent = `${talalatok} / ${parokSzama}`;
  rekordElem.textContent = rekord ? `${rekord.lepesek} lépés · ${idoFormazas(rekord.masodpercek)}` : 'Nincs';
  rekordTorlesGomb.disabled = !rekord;
}

function idoInditas() {
  idoMegallitas();

  idoId = setInterval(() => {
    masodpercek++;
    statisztikaFrissites();
  }, 1000);
}

function idoMegallitas() {
  clearInterval(idoId);
  idoId = null;
}

function visszaforditasMegallitas() {
  clearTimeout(visszaforditasId);
  visszaforditasId = null;
}

function rekordBetoltes() {
  const mentettAdat = localStorage.getItem('memoryGameBestScores');
  const rekordok = mentettAdat ? JSON.parse(mentettAdat) : {};

  Object.values(rekordok).forEach((rekord) => {
    rekord.lepesek = rekord.lepesek ?? rekord.moves;
    rekord.masodpercek = rekord.masodpercek ?? rekord.seconds;
  });

  return rekordok;
}

function rekordMentes(nehezseg, eredmeny) {
  const rekordok = rekordBetoltes();
  const regiRekord = rekordok[nehezseg];

  if (regiRekord && !jobbEredmeny(eredmeny, regiRekord)) {
    return false;
  }

  rekordok[nehezseg] = eredmeny;
  localStorage.setItem('memoryGameBestScores', JSON.stringify(rekordok));
  return true;
}

function rekordTorles() {
  const nehezseg = nehezsegMezo.value;
  const rekordok = rekordBetoltes();

  delete rekordok[nehezseg];
  localStorage.setItem('memoryGameBestScores', JSON.stringify(rekordok));
  statisztikaFrissites();
}

function jobbEredmeny(ujEredmeny, regiEredmeny) {
  if (ujEredmeny.lepesek < regiEredmeny.lepesek) {
    return true;
  }

  if (ujEredmeny.lepesek === regiEredmeny.lepesek) {
    return ujEredmeny.masodpercek < regiEredmeny.masodpercek;
  }

  return false;
}

function idoFormazas(osszMasodperc) {
  const perc = Math.floor(osszMasodperc / 60).toString().padStart(2, '0');
  const masodperc = (osszMasodperc % 60).toString().padStart(2, '0');
  return `${perc}:${masodperc}`;
}
