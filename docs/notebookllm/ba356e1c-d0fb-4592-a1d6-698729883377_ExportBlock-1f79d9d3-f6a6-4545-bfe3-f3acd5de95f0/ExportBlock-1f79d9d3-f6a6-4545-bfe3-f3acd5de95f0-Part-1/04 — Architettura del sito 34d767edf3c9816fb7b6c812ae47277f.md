# 04 — Architettura del sito

# Architettura del sito

Questa pagina definisce l’architettura del sito Autopertutti prendendo ispirazione dai modelli migliori del mercato automotive premium: noleggio di fascia alta, vendita veicoli, servizi e piattaforme con forte orientamento alla conversione.

# Riferimenti strategici

L’obiettivo non è copiare altri siti, ma prendere le logiche migliori:

- chiarezza immediata dell’offerta
- ricerca rapida del veicolo
- percorsi separati per vendita, noleggio e servizi
- forte presenza di contatti rapidi
- schede veicolo molto curate
- fiducia, premium feeling e velocità
- esperienza mobile eccellente

Mercati da osservare:

- Stati Uniti: luxury car rental, exotic car rental, dealership premium
- Europa: noleggio auto premium, concessionari multi-brand, servizi automotive
- Italia: noleggio locale, autosaloni, officine e servizi post-vendita
- Europa Est / СНГ: marketplace auto, cataloghi molto orientati alla disponibilità e al contatto rapido

# Principio di architettura

Autopertutti deve essere strutturato come una piattaforma automotive completa, non come un semplice sito vetrina.

La navigazione deve permettere all’utente di entrare da tre porte principali:

1. Veicoli in vendita
2. Veicoli a noleggio
3. Servizi per il veicolo

Nessuna area deve dominare in modo eccessivo nella prima versione.

# Sitemap consigliata

```
/
/auto-in-vendita
/auto-in-vendita/[slug]
/auto-a-noleggio
/auto-a-noleggio/[slug]
/moto-in-vendita
/moto-in-vendita/[slug]
/moto-a-noleggio
/moto-a-noleggio/[slug]
/servizi
/servizi/autolavaggio
/servizi/officina
/servizi/diagnosi
/servizi/manutenzione
/chi-siamo
/contatti
/richiesta-informazioni
/privacy-policy
/cookie-policy
```

# Navigazione principale

Menu consigliato:

```
Auto
Moto
Noleggio
Servizi
Chi siamo
Contatti
```

Variante più esplicita:

```
Auto in vendita
Auto a noleggio
Moto
Servizi
Contatti
```

# Header

Elementi obbligatori:

- Logo
- Menu principale
- Pulsante WhatsApp
- Pulsante Contattaci
- Numero telefono visibile su desktop
- Menu mobile chiaro e rapido

# Homepage

La homepage deve funzionare come una mappa di ingresso.

Struttura consigliata:

1. Header
2. Hero section
3. Selettore rapido esigenza
4. Macro-aree: vendita / noleggio / servizi
5. Veicoli in evidenza
6. Servizi in evidenza
7. Perché scegliere Autopertutti
8. Come funziona
9. Chat AI / supporto
10. CTA finale
11. Footer

# Cataloghi veicoli

I cataloghi devono essere separati per evitare confusione:

- Auto in vendita
- Auto a noleggio
- Moto in vendita
- Moto a noleggio

Ogni catalogo deve avere filtri specifici.

## Filtri per vendita

- Marca
- Modello
- Prezzo
- Anno
- Chilometraggio
- Alimentazione
- Cambio
- Stato disponibilità

## Filtri per noleggio

- Marca
- Modello
- Categoria
- Prezzo giornaliero
- Date richieste
- Cauzione
- Cambio
- Alimentazione
- Disponibilità

# Scheda veicolo

Le schede veicolo sono il punto più importante per la conversione.

## Struttura consigliata

1. Gallery immagini
2. Titolo veicolo
3. Prezzo vendita o prezzo noleggio
4. Stato disponibilità
5. CTA principali
6. Specifiche tecniche
7. Condizioni vendita / noleggio
8. Descrizione
9. Veicoli simili
10. Form rapido

## CTA scheda vendita

- Richiedi informazioni
- Prenota una visita
- Contattaci su WhatsApp
- Chiama ora

## CTA scheda noleggio

- Verifica disponibilità
- Richiedi preventivo
- Prenota ora
- WhatsApp

# Pagine servizi

Le pagine servizi devono essere chiare e orientate alla prenotazione.

Pagine consigliate:

- Autolavaggio
- Officina
- Diagnosi
- Manutenzione

Ogni pagina servizio deve includere:

- descrizione servizio
- cosa è incluso
- eventuali pacchetti
- tempi indicativi
- CTA prenotazione
- WhatsApp / telefono
- FAQ

# Punti di conversione

Ogni pagina deve avere almeno un punto di conversione.

Tipologie:

- Form richiesta informazioni
- WhatsApp
- Telefono
- Chat AI
- Prenotazione servizio
- Richiesta preventivo

# Mobile-first

Il sito deve essere pensato prima per mobile.

Elementi mobile obbligatori:

- CTA visibili senza scroll eccessivo
- Sticky bottom bar con WhatsApp / Chiama / Chat
- Filtri semplici e non invasivi
- Schede veicolo leggere
- Immagini ottimizzate
- Form brevi

# Logica premium

Per avvicinarsi ai siti di noleggio e vendita premium, servono:

- immagini grandi e curate
- poche parole ma molto chiare
- prezzi e disponibilità ben visibili
- CTA immediate
- schede veicolo pulite
- sensazione di fiducia
- velocità del sito
- contatto umano sempre accessibile

# Architettura contenuti

Ogni area deve avere una logica simile:

```
Pagina categoria
↓
Catalogo / lista
↓
Scheda dettaglio
↓
CTA
↓
CRM / n8n
↓
Follow-up
```

# Regola importante

Non costruire tutto intorno al catalogo. Il catalogo è importante, ma l’esperienza deve partire dal bisogno dell’utente.

Esempio:

```
Voglio acquistare
Voglio noleggiare
Voglio un servizio
Voglio parlare con qualcuno
```

# Raccomandazione

La prima versione deve essere semplice, elegante e misurabile.

Meglio avere meno pagine ma ben strutturate, piuttosto che una piattaforma complessa ma confusa.

Dopo il lancio, la struttura potrà essere ottimizzata in base a dati reali: traffico, lead, conversioni e richieste qualificate.