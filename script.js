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

let kartyak = [];

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