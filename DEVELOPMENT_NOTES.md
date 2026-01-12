# Note di Sviluppo - Emyolia Ensemble Website

## Ultima sessione: 12 Gennaio 2026

### Modifiche Recenti alla Hero Section

#### Obiettivo
Uniformare il comportamento della hero section su tutti i dispositivi (desktop, tablet, mobile) in modo che l'immagine, l'overlay e lo spacing rimangano consistenti durante il ridimensionamento del browser.

---

## Struttura Attuale Hero Section

### HTML Structure
```html
<section id="hero" class="hero-section">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <div class="container text-center">
            <h1 class="hero-title">EMYOLIA ENSEMBLE</h1>
            <h2 class="hero-subtitle">Musica Rinascimentale del XV-XVII secolo</h2>
        </div>
    </div>
</section>
```

### CSS Base (tutte le dimensioni)
```css
.hero-section {
    background-image: url('foto/IMG_0705.jpg');
    background-size: 100% auto;           /* Riempie sempre 100% larghezza */
    background-position: center top;
    background-color: #f5f1e8;            /* Beige */
    margin-bottom: 0;
    padding-bottom: 56.25%;               /* Aspect ratio 16:9 */
}

.hero-overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(to bottom, rgba(30, 58, 95, 0.6), rgba(26, 26, 26, 0.7));
}

.hero-content {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-content .container {
    padding: 2rem !important;             /* Forza padding Bootstrap */
}

.hero-title {
    font-size: 2.5rem;                    /* Impostazioni tablet come base */
}

.hero-subtitle {
    font-size: 1.8rem;
}
```

---

## Breakpoint e Media Queries

### 📱 Mobile (<576px)
**Modifiche specifiche:**
- Font più piccoli per leggibilità mobile
- Overlay si ferma sull'immagine (non copre padding beige)
- Padding beige extra (3rem) sotto l'immagine

```css
@media (max-width: 576px) {
    .hero-section {
        padding-bottom: calc(56.25% + 3rem);  /* Immagine + spazio beige */
    }

    .hero-overlay {
        bottom: 3rem;                         /* Si ferma 3rem prima */
        height: auto;
    }

    .hero-content {
        bottom: 3rem;                         /* Anche contenuto si ferma */
        height: auto;
    }

    .hero-title {
        font-size: 1.8rem;                    /* Ridotto per mobile */
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    #chi-siamo {
        padding-top: 3rem !important;         /* Mantiene spacing consistente */
    }
}
```

### 📱 Tablet (577px - 768px)
Usa le impostazioni base, nessun override necessario.

### 💻 Desktop (>991px)
Usa le impostazioni base, con override minimo per logo navbar.

```css
@media (max-width: 991px) {
    .hero-content .container {
        padding: 2rem !important;             /* Mantiene padding consistente */
    }
}
```

---

## Principi di Design Applicati

### 1. **Immagine a Larghezza Piena**
- `background-size: 100% auto` garantisce che l'immagine riempia sempre la larghezza
- Nessuno spazio bianco ai lati

### 2. **Overlay Preciso**
- Su desktop/tablet: overlay copre tutta la hero
- Su mobile: overlay si ferma sull'immagine, lascia spazio beige sotto

### 3. **Consistenza Dimensioni**
- Le impostazioni del tablet (577-768px) sono usate come base
- Minime variazioni solo per mobile (<576px)

### 4. **Spacing Beige**
- Mobile: 3rem di spazio beige tra hero e chi-siamo
- Desktop/tablet: margin-bottom gestito da sezioni

---

## Colori Principali

```css
--color-primary: #1e3a5f;        /* Navy blue */
--color-secondary: #d4874a;      /* Warm orange/gold */
--color-beige: #f5f1e8;          /* Beige backgrounds */
--color-dark: #1a1a1a;           /* Black */
--color-white: #ffffff;
```

---

## Come Modificare la Hero Section

### Cambiare font-size titoli
Modifica `style.css:152-166` per il base, e `style.css:1067-1072` per mobile.

### Cambiare overlay intensità
Modifica il gradient in `.hero-overlay` (linea ~132):
```css
background: linear-gradient(to bottom, rgba(30, 58, 95, 0.6), rgba(26, 26, 26, 0.7));
/* Primi valori = colore, ultimo valore = opacità (0.0-1.0) */
```

### Cambiare proporzioni immagine
Modifica `padding-bottom` in `.hero-section`:
- 56.25% = 16:9
- 75% = 4:3
- 100% = 1:1 (quadrato)

### Aggiungere spazio tra hero e chi-siamo
Desktop: aggiungi `margin-bottom` a `.hero-section`
Mobile: modifica il `calc(56.25% + 3rem)` aumentando il valore finale

---

## Deploy su GitHub Pages

### Repository
https://github.com/daddino88/emyolia-ensemble

### Sito Live
https://daddino88.github.io/emyolia-ensemble/

### Come fare deploy
```bash
git add .
git commit -m "Descrizione modifiche"
git push origin main
```

GitHub Pages si aggiorna automaticamente in 1-2 minuti.

### Verificare stato deploy
1. Vai su: https://github.com/daddino88/emyolia-ensemble/actions
2. Controlla workflow "pages build and deployment"
3. ✅ = deploy completato | 🟡 = in corso | ❌ = errore

---

## File Principali del Progetto

```
sito_emyolia/
├── index.html              # Pagina principale
├── style.css               # Tutti gli stili (1100+ linee)
├── script.js               # JavaScript (scroll, gallery, form)
├── foto/                   # 32 immagini ensemble/performance
├── album/                  # Copertine album
├── LOGO_EMYOLIA_*.png      # Loghi (arancione/bianco/blu)
└── DEVELOPMENT_NOTES.md    # Questo file
```

---

## Bootstrap e Dipendenze

**Bootstrap 5.3.2** (via CDN)
- Grid system responsive
- `.container` ha padding che viene sovrascritto con `!important`

**Font Awesome 6.5.1**
- Icone social media e UI

**Google Fonts**
- Cormorant Garamond (serif, titoli)
- Lato (sans-serif, body)

---

## Testing Locale

### Avviare server locale
```bash
cd /Users/daddino88/Desktop/sito_emyolia
python3 -m http.server 8000
```

Poi apri: http://localhost:8000

### Hard Refresh Browser
- Mac: `Cmd + Shift + R`
- Windows: `Ctrl + F5`

---

## Commit Recenti

### 4db5cea - Standardize hero section across all viewports (12 Gen 2026)
- Cambio background-size da contain a 100% auto
- Unificato styling hero su tutti i dispositivi
- Fix mobile: overlay preciso, spacing beige
- Rimossi override viewport-specific

### b115039 - Unify hero background-size to contain (12 Gen 2026)
- Primo tentativo uniformazione (poi modificato)

---

## Note Tecniche Importanti

### ⚠️ Padding Bootstrap Override
`.hero-content .container` usa `!important` per forzare padding 2rem su tutti i breakpoint.
Senza `!important`, Bootstrap applica padding diversi per mobile/tablet/desktop.

### ⚠️ Aspect Ratio via Padding
`padding-bottom: 56.25%` crea proporzioni 16:9.
Questo trucco CSS funziona perché padding % si basa sulla larghezza del contenitore.

### ⚠️ Overlay Mobile
Su mobile, overlay e content usano `bottom: 3rem` invece di `height: 100%`.
Questo permette di escludere il padding beige extra dall'overlay.

---

## Prossimi Possibili Miglioramenti

- [ ] Ottimizzazione immagini (WebP, compressione)
- [ ] Lazy loading immagini hero
- [ ] Analytics integration (già setup ma commentato)
- [ ] Form backend per contatti (attualmente usa mailto:)
- [ ] Service worker per offline capability

---

## Contatti

**Sviluppatore:** Claude Code (Anthropic)
**Cliente:** daddino88
**Data ultima modifica:** 12 Gennaio 2026
**Versione:** 1.2.0
