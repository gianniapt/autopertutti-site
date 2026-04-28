# 05 — CRM e automazioni n8n

# CRM e automazioni n8n

Questa pagina definisce il flusso completo di gestione lead per Autopertutti: dal sito al CRM, passando per form, WhatsApp, chat AI, n8n e HubSpot.

# Obiettivo

Ogni richiesta deve essere raccolta correttamente, classificata per area business, inviata al CRM, notificata al team giusto, tracciata negli analytics e seguita senza ritardi.

L’obiettivo non è solo ricevere lead, ma evitare che vengano persi o gestiti in modo disordinato.

# Fonti lead

Le richieste possono arrivare da:

- form scheda veicolo
- form homepage
- form pagina servizi
- WhatsApp
- telefono
- chat AI
- richiesta disponibilità noleggio
- richiesta acquisto
- richiesta preventivo
- prenotazione servizio

# Tipologie lead

Ogni lead deve avere una categoria chiara:

- Vendita auto
- Noleggio auto
- Vendita moto
- Noleggio moto
- Autolavaggio
- Officina / assistenza
- Richiesta generica

# Flusso completo lead

```
Utente
↓
Sito / Form / WhatsApp / Chat AI
↓
n8n Webhook
↓
Validazione dati
↓
Classificazione lead
↓
Creazione / aggiornamento contatto in HubSpot
↓
Creazione deal o ticket
↓
Notifica al team
↓
Follow-up commerciale
↓
Cambio stato CRM
↓
Conversione o chiusura
↓
Analytics e report
```

# Dati minimi da raccogliere

## Dati cliente

- Nome
- Telefono
- Email opzionale
- Canale di provenienza
- Messaggio / richiesta
- Consenso privacy

## Dati richiesta

- Categoria richiesta
- Veicolo interessato, se presente
- Servizio interessato, se presente
- Tipo: vendita / noleggio / servizio
- URL pagina di provenienza
- UTM source / medium / campaign
- Timestamp

## Dati noleggio

- Data inizio
- Data fine
- Tipo veicolo
- Eventuale budget
- Eventuali esigenze specifiche

## Dati servizio

- Tipo servizio
- Giorno preferito
- Orario preferito
- Descrizione problema, se officina

# Regole anti-perdita lead

## 1. Ogni lead deve entrare in HubSpot

Nessuna richiesta deve restare solo in email, WhatsApp o chat. Anche se arriva da WhatsApp, deve essere registrata nel CRM quando possibile.

## 2. Ogni lead deve avere un proprietario

Ogni richiesta deve avere un responsabile assegnato:

- vendite auto
- noleggio
- moto
- servizi
- officina
- amministrazione / generico

## 3. Ogni lead deve avere uno stato

Un lead senza stato è un lead perso. Lo stato deve essere aggiornato dopo ogni interazione.

## 4. Notifica immediata al team

Dopo la creazione del lead, n8n deve inviare una notifica interna con:

- nome cliente
- telefono
- categoria richiesta
- veicolo / servizio interessato
- link al record HubSpot
- urgenza, se presente

## 5. Deduplicazione contatti

Prima di creare un nuovo contatto, n8n deve controllare se esiste già un contatto con lo stesso telefono o email.

Se esiste:

- aggiornare il contatto
- aggiungere nuova richiesta
- non creare duplicati inutili

## 6. SLA di risposta

Impostare un tempo massimo di risposta.

Raccomandazione:

- lead caldo: risposta entro 5-15 minuti
- lead standard: risposta entro 1 ora lavorativa
- servizio / officina: risposta entro giornata

## 7. Alert per lead non gestiti

Se un lead resta senza aggiornamento troppo a lungo, il sistema deve avvisare il team.

Esempi:

- nessun proprietario assegnato dopo 10 minuti
- nessun contatto dopo 30 minuti
- stato invariato per 24 ore

## 8. Campi obbligatori

Il CRM deve impedire o segnalare lead incompleti.

Campi minimi obbligatori:

- nome o identificativo
- telefono o email
- categoria richiesta
- fonte lead
- stato

## 9. Separare deal e ticket

Consiglio:

- Vendita e noleggio → deal
- Officina e servizi → ticket o pipeline servizi

In questo modo non si mescolano trattative commerciali e richieste operative.

# Pipeline CRM consigliata

## Pipeline vendita / noleggio

```
Nuovo lead
↓
Da contattare
↓
Contattato
↓
Qualificato
↓
Preventivo / proposta inviata
↓
In trattativa
↓
Prenotato / visita fissata
↓
Chiuso vinto
```

Stati negativi:

```
Non risponde
Non interessato
Non qualificato
Chiuso perso
Duplicato
```

# Pipeline servizi

```
Nuova richiesta
↓
Da confermare
↓
Contatto effettuato
↓
Appuntamento fissato
↓
In lavorazione
↓
Completato
```

Stati negativi:

```
Annullato
Non risponde
Non qualificato
Duplicato
```

# Campi HubSpot consigliati

## Contatto

- Nome
- Telefono
- Email
- Lingua
- Fonte lead
- Ultima richiesta
- Categoria interesse
- Consenso privacy

## Deal vendita / noleggio

- Tipo richiesta
- Categoria veicolo
- Veicolo interessato
- Prezzo / budget
- Data richiesta
- Fonte
- Stato
- Responsabile
- Priorità

## Ticket servizi

- Tipo servizio
- Descrizione richiesta
- Data preferita
- Orario preferito
- Stato
- Responsabile
- Priorità

# Priorità lead

Definire priorità per evitare che richieste calde vengano trattate come generiche.

## Alta priorità

- richiesta da scheda veicolo specifica
- richiesta disponibilità noleggio con date
- chiamata o WhatsApp
- richiesta con budget chiaro
- richiesta “prenota ora”

## Media priorità

- richiesta informazioni generica
- visita catalogo con form
- domanda da chat AI con contatto

## Bassa priorità

- messaggio incompleto
- nessun telefono
- richiesta non chiara

# Automazioni n8n consigliate

## Workflow 1 — Form lead

```
Form submit
↓
Webhook n8n
↓
Validazione dati
↓
Deduplica contatto
↓
Crea/aggiorna contatto HubSpot
↓
Crea deal/ticket
↓
Notifica team
↓
Invia evento analytics
```

## Workflow 2 — Chat AI lead

```
Chat raccoglie richiesta
↓
Webhook n8n
↓
Classificazione richiesta
↓
Crea/aggiorna contatto
↓
Crea deal/ticket
↓
Notifica team
```

## Workflow 3 — Alert lead non gestiti

```
Ogni 15 minuti
↓
Cerca lead nuovi senza attività
↓
Se oltre soglia SLA
↓
Invia alert al team
```

## Workflow 4 — Aggiornamento status

```
Cambio stato in HubSpot
↓
Aggiorna log interno
↓
Invia evento analytics / report
```

# Come non perdere richieste WhatsApp

WhatsApp è spesso il canale più forte, ma anche il più facile da perdere.

Raccomandazioni:

- usare link WhatsApp con parametro di contesto
- distinguere pagina di provenienza
- usare messaggi precompilati diversi per vendita, noleggio e servizi
- registrare manualmente o automaticamente i contatti importanti in HubSpot
- usare notifica interna quando un click WhatsApp avviene su scheda veicolo

Esempio contesto:

```
Ciao, vorrei informazioni su BMW Serie 3 2021 vista sul sito.
```

# Controlli qualità

Ogni settimana controllare:

- lead senza proprietario
- lead senza telefono o email
- lead senza categoria
- lead duplicati
- lead senza attività
- lead chiusi senza motivo
- tempi medi di risposta
- conversioni per categoria

# KPI CRM

Metriche consigliate:

- numero lead per categoria
- tempo medio di risposta
- lead non gestiti
- conversion rate per area
- richieste WhatsApp
- richieste form
- richieste chat AI
- deal vinti
- deal persi
- motivi di perdita

# Raccomandazione finale

Il sito deve generare lead, ma il CRM deve impedire che vengano persi.

La regola principale: ogni richiesta deve avere categoria, stato, responsabile e prossima azione.