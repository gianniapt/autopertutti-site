# 24 — Centro di controllo operativo

# Centro di controllo operativo

Questa pagina definisce il concetto di Command Center per Autopertutti: una dashboard interna che aiuta il team a vedere cosa sta succedendo, cosa richiede attenzione e quali azioni fare subito.

# Principio generale

Una dashboard utile non deve mostrare solo numeri. Deve aiutare il team a decidere cosa fare.

Il Centro di controllo deve rispondere a quattro domande:

1. Cosa sta succedendo oggi?
2. Quali lead richiedono attenzione?
3. Quali opportunità sono a rischio?
4. Quali azioni devono essere fatte subito?

# HubSpot come base principale

HubSpot deve restare la fonte principale per:

- contatti
- lead
- deal
- ticket
- pipeline
- attività commerciali
- follow-up
- stato richieste

Per la prima fase, il Centro di controllo può essere costruito dentro HubSpot usando dashboard, pipeline, report e viste filtrate.

# Quando serve una dashboard custom

Una dashboard custom ha senso solo dopo aver capito quali dati mancano davvero in HubSpot.

Ha senso valutarla quando si vuole unire:

- dati HubSpot
- dati sito
- dati GA4
- dati n8n
- dati WhatsApp
- dati marketplace
- dati finanziari
- costi AI e infrastruttura

# Struttura consigliata del Centro di controllo

```
Overview
↓
Lead e pipeline
↓
Act Now
↓
Alert e rischi
↓
Performance canali
↓
Servizi e prenotazioni
↓
Finanza / ricavi stimati
↓
Automazioni e salute sistema
```

# 1. Overview

La prima schermata deve mostrare pochi numeri importanti.

KPI consigliati:

- nuovi lead oggi
- lead attivi
- deal aperti
- deal vinti
- richieste servizi
- richieste WhatsApp
- valore pipeline
- lead non gestiti

# 2. Lead e pipeline

Vista consigliata tipo board / kanban:

```
Nuovo lead
Da contattare
Contattato
Qualificato
Preventivo inviato
In trattativa
Prenotato / visita fissata
Chiuso vinto
Chiuso perso
```

Per servizi:

```
Nuova richiesta
Da confermare
Contatto effettuato
Appuntamento fissato
In lavorazione
Completato
Annullato
```

# 3. Act Now

Questa è la parte più importante.

Il sistema deve mostrare azioni prioritarie, non solo dati.

Esempi:

- chiamare lead caldo
- rispondere a richiesta WhatsApp
- confermare appuntamento officina
- ricontattare lead fermo
- controllare deal senza prossima attività
- aggiornare veicolo venduto
- verificare workflow n8n fallito

# 4. At Risk / Stagnanti

Sezione per identificare opportunità ferme o a rischio.

Regole possibili:

- lead senza contatto oltre 30 minuti
- lead senza proprietario oltre 10 minuti
- deal fermo oltre 7 giorni
- ticket servizio senza conferma oltre 24 ore
- richiesta noleggio con data vicina non confermata
- veicolo molto visto ma senza richieste

# 5. Performance canali

Mostrare quali canali portano richieste reali.

Canali:

- sito organico
- Google Business Profile
- WhatsApp
- form sito
- chat AI
- marketplace
- QR code / flyer
- newsletter
- social
- partner locali

Metriche:

- visite
- lead
- conversion rate
- richieste qualificate
- deal vinti

# 6. Servizi e prenotazioni

Dashboard dedicata ad autolavaggio e officina.

KPI:

- nuove richieste servizi
- appuntamenti da confermare
- appuntamenti confermati
- servizi completati
- richieste annullate
- servizi più richiesti

# 7. Finanza e ricavi stimati

Nella prima fase, usare dati commerciali stimati da HubSpot.

Esempi:

- valore deal aperti
- valore deal vinti
- ricavi stimati per categoria
- noleggi confermati
- servizi completati

Per una visione finanziaria reale, in futuro integrare:

- fatture
- pagamenti
- costi
- margini
- spese operative

# 8. Automazioni e salute sistema

Monitorare che il sistema funzioni.

KPI / alert:

- workflow n8n falliti
- webhook non ricevuti
- form con errori
- sito offline
- API lente
- AI cost sopra soglia
- errori frontend / backend

# 9. AI interna nel Command Center

L’AI può aiutare a trasformare dati in azioni.

Possibili funzioni:

- riepilogo giornaliero
- priorità lead
- suggerimento prossima azione
- rilevazione anomalie CRM
- report settimanale
- identificazione lead stagnanti
- suggerimento veicoli alternativi

# Esempio riepilogo AI giornaliero

```
Oggi ci sono 8 nuovi lead, 3 ad alta priorità. Due richieste noleggio hanno date entro 72 ore. Un deal vendita è fermo da 9 giorni senza prossima attività. Il canale WhatsApp ha generato il maggior numero di richieste.
```

# Layout consigliato

## Sidebar

- Dashboard
- Lead
- Opportunità
- Servizi
- Marketplace
- Marketing
- Automazioni
- Report
- Impostazioni

## Dashboard principale

```
KPI cards
↓
Act Now
↓
Lead board
↓
At Risk
↓
Channel performance
↓
Reports
```

# Priorità MVP

Non costruire subito tutto.

Per la prima versione bastano:

1. dashboard HubSpot per lead e pipeline
2. vista lead stagnanti
3. alert n8n per lead non gestiti
4. report settimanale semplice
5. tracking fonti lead

# Fase successiva

Dopo 30–60 giorni, valutare:

- dashboard custom
- integrazione dati GA4
- integrazione marketplace
- report automatici AI
- dati finanziari più completi
- monitoraggio costi AI / infrastruttura

# Raccomandazione finale

Il Command Center non deve essere costruito per sembrare bello, ma per ridurre ritardi, perdita di lead e decisioni al buio.

La priorità è creare una dashboard che dica chiaramente: cosa è urgente, cosa è fermo, cosa funziona e cosa va migliorato.