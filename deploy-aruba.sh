#!/bin/bash

# Deploy Script per Aruba
# Usa FTP per caricare il sito su hosting Aruba

echo "🚀 Avvio deploy su Aruba..."

# Carica configurazione
if [ ! -f .aruba-config ]; then
    echo "❌ Errore: file .aruba-config non trovato!"
    echo "Crea il file .aruba-config con le credenziali FTP Aruba"
    exit 1
fi

source .aruba-config

# Verifica che lftp sia installato
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp non installato. Installa con: brew install lftp"
    exit 1
fi

# Conferma deploy
echo "📡 Host: $FTP_HOST"
echo "👤 User: $FTP_USER"
echo "📁 Remote dir: $FTP_REMOTE_DIR"
echo ""
read -p "Procedere con il deploy? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deploy annullato"
    exit 1
fi

# Deploy via FTP
echo "📤 Caricamento file su Aruba..."

lftp -c "
set ftp:ssl-allow no
set ftp:ssl-force no
open $FTP_HOST
user $FTP_USER $FTP_PASS
lcd $(pwd)
cd $FTP_REMOTE_DIR
mirror --reverse \
       --delete \
       --verbose \
       --exclude .git/ \
       --exclude .gitignore \
       --exclude .DS_Store \
       --exclude node_modules/ \
       --exclude .aruba-config \
       --exclude deploy-aruba.sh \
       --exclude DEVELOPMENT_NOTES.md \
       --exclude README.md \
       . .
bye
"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy completato con successo!"
    echo "🌐 Il sito sarà disponibile su: http://tuodominio.it"
    echo ""
else
    echo ""
    echo "❌ Errore durante il deploy"
    exit 1
fi
