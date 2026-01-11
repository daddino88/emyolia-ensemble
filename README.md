# Emyolia Ensemble - Landing Page

Landing page professionale per l'Emyolia Ensemble, gruppo specializzato in musica rinascimentale del XV-XVII secolo.

## 📋 Struttura del Progetto

```
sito_emyolia/
├── index.html                      # Pagina principale
├── style.css                       # Stili personalizzati
├── script.js                       # JavaScript per interazioni
├── foto/                           # Cartella con tutte le fotografie
├── LOGO_EMYOLIA_BLU.png           # Logo per navbar
├── LOGO_EMYOLIA_BIANCO.png        # Logo per footer
├── LOGO_EMYOLIA_ARANCIONE.png     # Logo alternativo
└── README.md                       # Questo file
```

## 🎨 Caratteristiche

### Design
- ✅ Design responsive (mobile-first)
- ✅ Palette colori elegante (blu navy, oro/arancione)
- ✅ Tipografia raffinata (Cormorant Garamond + Lato)
- ✅ Animazioni fluide e scroll effects
- ✅ Galleria fotografica con lightbox

### Sezioni
1. **Hero Section** - Immagine di sfondo con titolo e CTA
2. **Chi Siamo** - Storia e missione dell'ensemble
3. **I Musicisti** - 4 card con foto e ruoli
4. **Il Nostro Disco** - "Al Alba d'un Dia" con Spotify embed
5. **Curriculum** - Timeline con esperienze dal 2019 al 2024
6. **Galleria** - Griglia fotografica con modal
7. **Contatti** - Form funzionale + informazioni dirette
8. **Footer** - Link, social media e credits

### Funzionalità
- ✅ Navbar con scroll effect
- ✅ Smooth scroll navigation
- ✅ Spotify player integrato
- ✅ Form di contatto con mailto
- ✅ Galleria interattiva
- ✅ Scroll reveal animations
- ✅ Parallax effect su hero
- ✅ Social media links (Instagram, Facebook, Spotify)

## 🚀 Come Pubblicare Online

### Opzione 1: GitHub Pages (Gratuito)

1. **Crea un repository su GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Emyolia Ensemble landing page"
   git branch -M main
   git remote add origin https://github.com/TUO_USERNAME/emyolia-ensemble.git
   git push -u origin main
   ```

2. **Attiva GitHub Pages**
   - Vai su Settings > Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Salva
   - Il sito sarà disponibile su: `https://TUO_USERNAME.github.io/emyolia-ensemble/`

### Opzione 2: Netlify (Gratuito)

1. **Vai su [netlify.com](https://www.netlify.com/)**
2. **Trascina la cartella del progetto** nell'area "Drop your site folder here"
3. **Il sito è online!** Netlify ti fornirà un URL tipo `https://emyolia-ensemble.netlify.app`
4. **Opzionale**: Connetti un dominio personalizzato

### Opzione 3: Vercel (Gratuito)

1. **Vai su [vercel.com](https://vercel.com/)**
2. **Importa il progetto** dal tuo GitHub o carica i file
3. **Deploy automatico** - URL fornito da Vercel

### Opzione 4: Hosting Tradizionale

1. **Acquista hosting + dominio** (es. Aruba, SiteGround, HostGator)
2. **Carica i file via FTP**
3. **Punta il dominio** alla directory dei file

## 🔧 Personalizzazioni Future

### Aggiungere immagini copertina disco
Se hai le immagini `1Risorsa_1sfv2.jpg` e `1Risorsa_2sfv2.jpg`:
- Sostituisci il placeholder nella sezione disco con `<img src="1Risorsa_1sfv2.jpg">`

### Google Analytics
Nel file `index.html`, aggiungi nel `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Form con backend
Per un form che invia email automaticamente, considera:
- **Formspree** (https://formspree.io/)
- **EmailJS** (https://www.emailjs.com/)
- **Netlify Forms** (se usi Netlify)

Esempio Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 📱 Browser Support

- ✅ Chrome (ultime 2 versioni)
- ✅ Firefox (ultime 2 versioni)
- ✅ Safari (ultime 2 versioni)
- ✅ Edge (ultime 2 versioni)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 SEO

Il sito include:
- Meta description ottimizzata
- Keywords rilevanti
- Title SEO-friendly
- Open Graph tags ready
- Schema markup ready

Per migliorare il SEO:
1. **Aggiungi Open Graph tags** per social sharing
2. **Crea sitemap.xml**
3. **Registra su Google Search Console**
4. **Ottimizza le immagini** (compressione, alt text)

## 📧 Contatti

- **Email**: emyoliaensemble@gmail.com
- **Telefono**: +39 393 836 2994
- **Instagram**: [@emyolia_ensemble](https://www.instagram.com/emyolia_ensemble/)
- **Facebook**: [Emyolia Ensemble](https://www.facebook.com/EmyoliaEnsemble/)
- **Spotify**: [Al Alba d'un Dia](https://open.spotify.com/intl-it/album/30M7jwOHgDXSPzXWMD0Yo5)

## 📄 Licenza

© 2026 Emyolia Ensemble. Tutti i diritti riservati.

---

**Creato con** ❤️ **per portare la musica rinascimentale nel mondo digitale**
