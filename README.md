# Webfejlesztés memóriajáték

Egyszerű, offline memóriajáték HTML, CSS és JavaScript használatával.
A kártyák webfejlesztési fogalmakat tartalmaznak, például HTML, CSS, JS,
DOM, Git, API, JSON és LocalStorage.

## Indítás

Nyisd meg az `index.html` fájlt egy böngészőben.

## Használat

- Válassz nehézségi szintet.
- Kattints az `Új játék` gombra.
- Fordíts fel két kártyát.
- Ha egyeznek, felfordítva maradnak.
- Ha nem egyeznek, rövid idő után visszafordulnak.
- A cél az összes pár megtalálása minél kevesebb lépésből.

## Fő funkciók

- nehézségi szintek;
- dinamikusan létrehozott kártyák;
- lépésszámláló és időmérő;
- győzelmi ablak;
- LocalStorage rekordmentés;
- rekord törlése;
- reszponzív megjelenés.

## Fejlesztői leírás

- `index.html`: az oldal szerkezete.
- `styles.css`: a megjelenés és reszponzív elrendezés.
- `script.js`: kártyák keverése, játékállapot, eseménykezelés,
  párellenőrzés, időmérés és LocalStorage kezelés.

Az alkalmazás tömböket és objektumokat használ a kártyák és az állapot
tárolására. A DOM-elemeket JavaScript hozza létre és frissíti.
