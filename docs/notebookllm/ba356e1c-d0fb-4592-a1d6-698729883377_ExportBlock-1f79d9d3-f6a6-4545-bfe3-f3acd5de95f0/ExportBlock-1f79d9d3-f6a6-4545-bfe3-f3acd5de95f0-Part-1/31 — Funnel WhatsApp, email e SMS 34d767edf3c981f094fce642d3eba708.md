# 31 — Funnel WhatsApp, email e SMS

# Funnel WhatsApp, email e SMS

Questa pagina definisce come usare WhatsApp, email e SMS come canali di comunicazione e follow-up per Autopertutti.

# Principio generale

WhatsApp, email e SMS non devono essere usati come spam. Devono servire a gestire meglio richieste reali, follow-up, appuntamenti, offerte pertinenti e aggiornamenti utili.

Ogni canale deve avere:

- consenso appropriato
- tracciamento
- obiettivo chiaro
- collegamento CRM
- possibilità di opt-out quando necessario

# Ruolo dei canali

## WhatsApp

Canale più diretto e ad alta conversione.

Utile per:

- richieste rapide
- disponibilità veicolo
- follow-up caldo
- appuntamenti
- conferme
- invio link scheda veicolo
- contatto umano veloce

## Email

Canale migliore per comunicazioni strutturate.

Utile per:

- newsletter
- nuovi veicoli
- contenuti blog
- offerte noleggio
- promemoria manutenzione
- conferme più formali
- documenti e riepiloghi

## SMS

Canale breve e urgente.

Utile per:

- reminder appuntamenti
- conferme rapide
- avvisi importanti
- messaggi time-sensitive

SMS non deve essere usato come canale marketing principale se non strettamente necessario.

# Funnel WhatsApp

## Funnel 1 — Richiesta veicolo

```
Utente visita scheda veicolo
↓
Clicca WhatsApp
↓
Messaggio precompilato con veicolo
↓
Team riceve richiesta contestualizzata
↓
Lead viene creato / aggiornato in HubSpot
↓
Follow-up commerciale
```

Esempio messaggio precompilato:

```
Ciao, vorrei informazioni su [Marca Modello] vista sul sito Autopertutti.
```

# Funnel 2 — Noleggio

```
Utente cerca veicolo a noleggio
↓
Clicca “Verifica disponibilità”
↓
Lascia date o apre WhatsApp
↓
Sistema salva contesto
↓
HubSpot crea deal noleggio
↓
Team conferma disponibilità e condizioni
```

# Funnel 3 — Servizi

```
Utente visita pagina autolavaggio / officina
↓
Clicca WhatsApp o form prenotazione
↓
Richiesta entra in CRM come ticket servizio
↓
Team conferma appuntamento
↓
Reminder via WhatsApp / SMS / email
```

# Funnel 4 — AI search → WhatsApp

```
Utente usa ricerca AI
↓
Sistema mostra veicoli compatibili
↓
Utente clicca WhatsApp su uno dei risultati
↓
Messaggio include richiesta originale + veicolo
↓
HubSpot riceve contesto ricerca AI
↓
Team risponde con più precisione
```

Esempio contesto:

```
Ciao, sto cercando un SUV automatico sotto i 20.000 euro. Mi interessa questa Jeep Renegade vista sul sito.
```

# Funnel email

## Newsletter

Obiettivo:

- mantenere relazione
- comunicare nuovi veicoli
- promuovere servizi
- riportare utenti sul sito

Segmenti:

- auto in vendita
- noleggio
- moto
- officina
- autolavaggio
- clienti ricorrenti
- lead inattivi

Frequenza iniziale consigliata:

```
1 invio ogni 2–4 settimane
```

## Email transazionali

Utile per:

- conferma ricezione richiesta
- riepilogo appuntamento
- conferma candidatura
- conferma iscrizione newsletter
- promemoria documenti richiesti

Tool possibili:

- HubSpot Marketing
- Brevo
- Mailchimp
- Resend per email transazionali

# Funnel SMS

SMS è utile solo per comunicazioni brevi e importanti.

Esempi:

- reminder appuntamento officina
- reminder ritiro veicolo
- conferma prenotazione
- avviso urgente

Non usare SMS per comunicazioni lunghe o frequenti.

# Integrazione con HubSpot

Ogni comunicazione importante deve essere collegata a contatto, deal o ticket.

Campi utili:

- canale preferito
- consenso marketing
- consenso WhatsApp, se necessario
- consenso SMS, se necessario
- ultima comunicazione
- fonte lead
- segmento
- stato follow-up

# Integrazione con n8n

n8n può orchestrare:

- creazione lead da form
- notifica WhatsApp interna
- invio email transazionale
- reminder appuntamenti
- alert lead non gestiti
- aggiornamento stato CRM
- segmentazione newsletter

# Regole anti-spam

- non inviare messaggi senza consenso
- non usare WhatsApp per spam massivo
- non usare SMS per promozioni frequenti
- mantenere messaggi pertinenti
- permettere disiscrizione dalle newsletter
- rispettare GDPR e policy delle piattaforme

# Tracking

Eventi consigliati:

```
click_whatsapp
whatsapp_lead_created
email_signup
email_open
email_click
sms_sent
sms_reminder_clicked
unsubscribe
```

UTM email:

```
utm_source=newsletter
utm_medium=email
utm_campaign=nome_campagna
```

UTM WhatsApp:

```
utm_source=whatsapp
utm_medium=chat
utm_campaign=vehicle_inquiry
```

# Raccomandazione finale

Per Autopertutti, partire con WhatsApp ben tracciato, email transazionali e newsletter leggera.

SMS va usato solo per reminder e comunicazioni urgenti.

La priorità non è inviare più messaggi, ma inviare il messaggio giusto, al momento giusto, sul canale giusto.