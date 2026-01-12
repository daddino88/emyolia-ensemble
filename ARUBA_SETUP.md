# Setup Deploy su Aruba

Guida per configurare il deploy automatizzato del sito su hosting Aruba.

## 📋 Prerequisiti

1. **Hosting Aruba attivo** con FTP/SFTP
2. **Dominio configurato** (es: emyoliaensemble.it)
3. **Credenziali FTP** fornite da Aruba

---

## 🔧 Setup Iniziale

### Step 1: Installa lftp (se non presente)

```bash
brew install lftp
```

### Step 2: Configura credenziali

Modifica il file `.aruba-config` con le tue credenziali:

```bash
FTP_HOST="ftp.tuodominio.it"         # Fornito da Aruba nel pannello
FTP_USER="tuo-username-aruba"        # Username FTP da pannello Aruba
FTP_PASS="tua-password-aruba"        # Password FTP
FTP_REMOTE_DIR="/public_html"        # Di solito /public_html o /htdocs
```

**⚠️ IMPORTANTE:** Il file `.aruba-config` è già nel `.gitignore` e **non verrà mai committato** su Git per sicurezza.

### Step 3: Trova le credenziali Aruba

1. Accedi al **Pannello di Controllo Aruba**: https://admin.aruba.it
2. Vai su **Gestione Hosting** → **Il tuo dominio**
3. Cerca la sezione **"Accesso FTP"** o **"Credenziali"**
4. Troverai:
   - **Host FTP**: es. `ftp.tuodominio.it` o `ftp.aruba.it`
   - **Username**: es. `username@tuodominio.it`
   - **Password**: quella che hai impostato
   - **Porta**: di solito `21` per FTP standard

---

## 🚀 Come Fare il Deploy

### Deploy Manuale

```bash
./deploy-aruba.sh
```

Lo script:
1. ✅ Verifica che lftp sia installato
2. ✅ Carica la configurazione da `.aruba-config`
3. ✅ Chiede conferma prima di procedere
4. ✅ Carica tutti i file via FTP
5. ✅ Rimuove i file vecchi non più presenti localmente (`--delete`)

### Workflow Completo (Locale → GitHub → Aruba)

```bash
# 1. Modifica file localmente e testa
# 2. Commit su Git
git add .
git commit -m "Descrizione modifiche"

# 3. Push su GitHub (opzionale, per backup)
git push origin main

# 4. Deploy su Aruba
./deploy-aruba.sh
```

---

## 📁 Struttura Directory Aruba

Aruba tipicamente usa questa struttura:

```
/
├── public_html/          ← Qui vanno i file del sito (root web)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── foto/
│   └── ...
├── logs/                 ← Log del server
└── private/              ← File privati (non accessibili via web)
```

**NOTA:** Alcuni account Aruba usano `/htdocs` invece di `/public_html`. Verifica nel pannello.

---

## 🌐 Configurare Dominio Personalizzato

### Se hai già un dominio su Aruba:
1. Il DNS è già configurato automaticamente
2. Dopo il primo deploy, il sito sarà su `http://tuodominio.it`

### Se devi acquistare un dominio:
1. Vai su **Aruba.it** → **Domini**
2. Cerca dominio disponibile (es: `emyoliaensemble.it`)
3. Acquista dominio + hosting (o solo dominio se hai già hosting)
4. Associa dominio all'hosting nel pannello

### Dominio esterno (es: comprato altrove):
1. Nel pannello del registrar esterno, configura i **nameserver Aruba**:
   - `ns1.aruba.it`
   - `ns2.aruba.it`
2. Attendi propagazione DNS (24-48 ore)

---

## 🔒 HTTPS/SSL (certificato sicuro)

### Aruba offre SSL gratuito:

1. Pannello Aruba → **Gestione Hosting** → **Certificati SSL**
2. Attiva **Let's Encrypt SSL gratuito**
3. Dopo attivazione (5-10 minuti), il sito sarà su `https://tuodominio.it`

### Redirect HTTP → HTTPS automatico:

Crea file `.htaccess` nella root:

```apache
# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect www to non-www (opzionale)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

---

## 📊 File Esclusi dal Deploy

Lo script **non carica** questi file (inutili su server):

- `.git/` - Storia Git
- `.DS_Store` - File di sistema Mac
- `node_modules/` - Dipendenze Node (se usate)
- `.aruba-config` - Credenziali (mai sul server!)
- `deploy-aruba.sh` - Script di deploy
- `DEVELOPMENT_NOTES.md` - Documentazione tecnica
- `README.md` - Documentazione progetto

Vengono caricati **solo i file necessari** per il sito live.

---

## 🛠️ Troubleshooting

### Errore: "lftp: command not found"
```bash
brew install lftp
```

### Errore: "Login failed"
- Verifica username/password in `.aruba-config`
- Controlla che FTP sia attivo nel pannello Aruba
- Prova a connetterti con FileZilla per testare credenziali

### Errore: "Permission denied"
- Verifica di avere permessi di scrittura su `/public_html`
- Controlla che `FTP_REMOTE_DIR` sia corretto

### Deploy lento
- FTP può essere lento per molte immagini
- Considera compressione immagini prima del deploy
- Usa SFTP/SSH se disponibile (più veloce)

### Il sito non si aggiorna
- Svuota cache browser (`Cmd + Shift + R`)
- Verifica che i file siano stati caricati: accedi via FTP con FileZilla
- Controlla i log di Aruba nel pannello

---

## 🔄 Alternative a FTP

### Opzione 1: FileZilla (GUI)
Se preferisci un'interfaccia grafica:
1. Scarica **FileZilla** (gratuito)
2. Inserisci credenziali FTP
3. Trascina file dalla cartella locale alla cartella remota

### Opzione 2: Git su Aruba (avanzato)
Alcuni piani Aruba Business supportano Git deployment via SSH.
Richiede configurazione avanzata del server.

---

## 💰 Costi Indicativi Aruba (2026)

- **Dominio .it**: ~8-10€/anno
- **Hosting Linux Base**: ~20-30€/anno
- **Hosting Linux Plus**: ~40-60€/anno (più spazio, più performante)
- **SSL Let's Encrypt**: GRATUITO

**Consiglio:** Hosting Linux Plus per siti professionali.

---

## 📞 Supporto Aruba

- **Pannello controllo**: https://admin.aruba.it
- **Guide**: https://guide.aruba.it
- **Supporto**: 0575 0505 (lun-ven 9-18)

---

## ✅ Checklist Setup Completo

- [ ] Hosting Aruba attivo
- [ ] Dominio registrato e configurato
- [ ] Credenziali FTP ottenute dal pannello
- [ ] File `.aruba-config` compilato con credenziali
- [ ] `lftp` installato su Mac
- [ ] Test deploy con `./deploy-aruba.sh`
- [ ] Sito verificato su `http://tuodominio.it`
- [ ] SSL attivato (opzionale ma consigliato)
- [ ] Redirect HTTPS configurato via `.htaccess`

---

**Ultima modifica:** 12 Gennaio 2026
