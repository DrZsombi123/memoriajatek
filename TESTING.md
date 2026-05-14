# Tesztelési jegyzőkönyv

Az alkalmazást az `index.html` böngészőben való megnyitásával teszteltem.

| Azonosító | Mit tesztel? | Bemenet / lépések | Elvárt kimenet | Valós kimenet |
| --- | --- | --- | --- | --- |
| TC-01 | Új játék indítása minden nehézségen | Válaszd ki a könnyű, közepes, majd nehéz szintet, és indíts új játékot. | A kártyák száma 12, 16, majd 20; a lépés és idő nullázódik. | Megfelelt. |
| TC-02 | Egyező pár kezelése | Fordíts fel két azonos témájú kártyát. | A két kártya felfordítva marad, a párok száma eggyel nő. | Megfelelt. |
| TC-03 | Hibás pár kezelése | Fordíts fel két különböző témájú kártyát. | A lépésszám eggyel nő, a két kártya rövid idő után visszafordul. | Megfelelt. |
| TC-04 | Rekord mentése | Fejezz be egy játékot, majd frissítsd az oldalt. | A legjobb eredmény továbbra is látható ugyanazon a nehézségen. | Megfelelt. |
| TC-05 | Rekord törlése | Mentett rekord után kattints a `Rekord törlése` gombra. | Az aktuális nehézség rekordja eltűnik, más szint rekordja nem változik. | Megfelelt. |
| TC-06 | Reszponzív nézet | Nézd meg az oldalt mobil és desktop szélességen. | A vezérlők és a kártyarács nem fedik egymást, minden szöveg olvasható. | Megfelelt. |
