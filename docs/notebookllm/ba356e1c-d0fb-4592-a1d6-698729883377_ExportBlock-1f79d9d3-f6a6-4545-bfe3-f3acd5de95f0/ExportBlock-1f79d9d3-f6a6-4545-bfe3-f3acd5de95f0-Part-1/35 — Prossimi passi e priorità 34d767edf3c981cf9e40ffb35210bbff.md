# 35 — Prossimi passi e priorità

# Prossimi passi e priorità

Questa pagina definisce cosa fare dopo la fase di strategia e documentazione del progetto Autopertutti.

# Stato attuale

Il progetto ha già una base strategica molto ampia:

- architettura sito
- customer journey
- homepage
- catalogo e schede veicolo
- CRM e n8n
- database e modello dati
- AI search
- WhatsApp, email, SMS
- SEO e advertising
- admin panel
- migrazione stock
- dashboard operative

Ora la priorità è trasformare la strategia in piano esecutivo.

# Priorità consigliata

## 1. Consolidare sitemap e MVP

Definire cosa entra nella prima versione e cosa resta per fasi successive.

Output atteso:

- sitemap MVP
- pagine obbligatorie
- funzionalità obbligatorie
- funzionalità rimandate

## 2. Definire database veicoli

Il database veicoli è il cuore del sistema.

Output atteso:

- campi obbligatori
- stati veicolo
- categorie vendita / noleggio
- struttura immagini
- regole pubblicazione

## 3. Disegnare admin panel MVP

L’admin panel deve permettere di sostituire gradualmente il software stock attuale.

Output atteso:

- ruoli e permessi
- gestione veicoli
- gestione media
- stato pubblicazione
- export marketplace assistito

## 4. Definire migrazione dallo stock software

Prima di costruire, bisogna capire quali dati si possono esportare.

Output atteso:

- lista dati esportabili
- rischi migrazione
- piano import
- piano controllo qualità

## 5. Costruire lead flow

Il lead flow deve essere chiaro prima dello sviluppo.

Output atteso:

- form principali
- webhook n8n
- creazione HubSpot
- pipeline e stati
- alert lead non gestiti

## 6. Preparare tracking e analytics

Ogni canale deve essere misurabile dal primo giorno.

Output atteso:

- eventi GA4 / GTM
- UTM naming convention
- tracking WhatsApp
- tracking form
- tracking AI search

# Roadmap operativa suggerita

## Fase A — Specifica funzionale

- sitemap MVP
- database MVP
- admin MVP
- lead flow
- tracking plan

## Fase B — Prototipo UX

- homepage wireframe
- catalogo wireframe
- scheda veicolo wireframe
- admin panel wireframe
- form lead

## Fase C — Setup tecnico

- progetto Next.js
- Supabase
- HubSpot
- n8n
- Vercel
- Cloudflare
- GA4 / GTM

## Fase D — MVP sviluppo

- catalogo veicoli
- schede veicolo
- admin stock base
- form lead
- CRM integration
- WhatsApp tracking

## Fase E — Go-live controllato

- test QA
- import stock
- test form
- test CRM
- test analytics
- test performance
- pubblicazione

# Raccomandazione finale

Il prossimo passo migliore è creare una specifica MVP chiara: cosa deve essere costruito nella prima versione, cosa viene rimandato e quali dati servono prima di iniziare lo sviluppo.

Senza questa fase, il progetto rischia di diventare troppo grande. Con una MVP specification chiara, invece, diventa eseguibile.