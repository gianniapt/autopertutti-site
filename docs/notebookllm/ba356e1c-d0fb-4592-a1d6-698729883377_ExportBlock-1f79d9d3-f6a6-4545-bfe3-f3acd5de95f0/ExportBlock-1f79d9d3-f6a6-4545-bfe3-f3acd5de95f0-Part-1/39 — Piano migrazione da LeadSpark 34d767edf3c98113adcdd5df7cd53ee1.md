# 39 — Piano migrazione da LeadSpark

# Piano migrazione da LeadSpark

Questa pagina definisce il piano per uscire gradualmente da LeadSpark senza perdere lead, appuntamenti, follow-up, storico commerciale e controllo operativo.

# Obiettivo

Sostituire progressivamente le funzioni utili di LeadSpark con un ecosistema basato su:

- HubSpot per CRM, lead, deal, pipeline e attività
- n8n per automazioni, notifiche e sincronizzazioni
- database Autopertutti per veicoli, servizi e richieste
- sito Autopertutti per conversione e raccolta lead
- strumenti AI per classificazione, riepilogo e supporto interno

# Principio fondamentale

Non spegnere LeadSpark finché il nuovo flusso non gestisce correttamente:

- nuovi lead
- attività e scadenze
- appuntamenti
- follow-up
- pipeline commerciale
- storico clienti importante
- report minimi

# Funzionalità LeadSpark da recuperare

## 1. Funnel completo

Da replicare in HubSpot:

```
Lead totali
Lead gestiti
Lead qualificati
Opportunità gestite
Contratti firmati
```

# 2. Pipeline opportunità

Da ricostruire con deal stage HubSpot:

```
Nuovo lead
Da contattare
Contattato
Qualificato
Preventivo / proposta inviata
In trattativa
Appuntamento / test drive fissato
Chiuso vinto
Chiuso perso
```

# 3. Attività e follow-up

Da migrare verso task HubSpot:

- chiamate da fare
- follow-up scaduti
- appuntamenti
- test drive
- visite in concessionaria
- richieste assistenza
- discussioni finanziamento

# 4. Prossimi eventi

Da replicare con HubSpot Tasks, Google Calendar o calendario interno:

- chiamate programmate
- test drive
- appuntamenti officina
- ritiro veicolo
- valutazione permuta
- appuntamenti noleggio

# 5. Comunicazione multicanale

Da ricostruire progressivamente:

- telefono
- WhatsApp
- email
- SMS
- form sito
- chat AI

# 6. Report e KPI

Da replicare in dashboard HubSpot o Looker/custom in futuro:

- lead totali
- lead qualificati
- opportunità
- contratti
- conversion rate
- attività scadute
- lead non gestiti
- performance venditori

# Cosa non ricostruire subito

Non ricostruire nella prima fase:

- campagne predittive avanzate
- AI call completamente autonoma
- sentiment analysis chiamate
- preventivatore complesso
- dashboard custom completa
- automazioni marketing complesse

Queste funzioni possono restare in roadmap fase 2/3.

# Piano migrazione

## Fase 1 — Audit LeadSpark

Obiettivo: capire cosa viene usato davvero.

Da verificare:

- numero lead presenti
- pipeline attive
- stati usati
- utenti attivi
- attività aperte
- appuntamenti futuri
- canali collegati
- export disponibile
- integrazioni attive
- automazioni configurate
- report usati dal team

# Fase 2 — Export dati

Dati da esportare:

- contatti
- lead
- opportunità
- attività aperte
- attività chiuse recenti
- appuntamenti futuri
- note commerciali importanti
- storico comunicazioni, se disponibile
- origine lead
- stato lead
- proprietario lead
- esito trattativa

# Fase 3 — Mappatura verso HubSpot

Mappare i campi LeadSpark verso HubSpot.

Esempio:

```
Cliente → Contact
Lead → Contact + Deal
Opportunità → Deal
Attività → Task
Evento → Meeting / Task
Stato lead → Lifecycle stage / Deal stage
Origine → Lead source
Venditore → Owner
```

# Fase 4 — Setup HubSpot

Configurare:

- pipeline vendita
- pipeline noleggio, se separata
- pipeline servizi / ticket
- proprietari lead
- stati deal
- task type
- proprietà custom
- lead source
- campi veicolo richiesto
- campi campagna / UTM

# Fase 5 — Setup n8n

Creare workflow base:

```
Form sito → n8n → HubSpot
WhatsApp click / lead → n8n → HubSpot
AI search lead → n8n → HubSpot
Reminder lead non gestiti → n8n alert
Aggiornamento stato → log / report
```

# Fase 6 — Import controllato

Importare prima un campione dati.

Controllare:

- duplicati
- proprietari corretti
- stati corretti
- attività future
- note importanti
- lead source
- collegamento a veicolo / servizio

Solo dopo validazione importare tutto.

# Fase 7 — Parallel run

Per un periodo breve usare LeadSpark e HubSpot in parallelo.

Durata consigliata:

```
2–4 settimane
```

Obiettivo:

- verificare che nessun lead venga perso
- confrontare pipeline
- testare notifiche
- testare follow-up
- correggere mapping dati

# Fase 8 — Cutover

Quando HubSpot funziona correttamente:

- bloccare nuovi inserimenti in LeadSpark
- mantenere LeadSpark solo in lettura, se possibile
- usare HubSpot come CRM principale
- usare n8n per alert e automazioni
- monitorare errori ogni giorno nella prima settimana

# Checklist prima dello switch

- tutti i lead attivi sono in HubSpot
- tutti gli appuntamenti futuri sono migrati
- tutti i responsabili sono assegnati
- tutti gli stati sono mappati
- i form sito creano lead correttamente
- WhatsApp è tracciato
- n8n invia notifiche
- pipeline visibile al team
- dashboard minima pronta
- backup export LeadSpark salvato

# Rischi principali

## Perdita storico lead

Mitigazione: export completo + backup prima dello switch.

## Duplicati contatti

Mitigazione: deduplica per telefono ed email.

## Attività future perse

Mitigazione: esportare e importare appuntamenti / task separatamente.

## Team confuso

Mitigazione: dashboard semplice e procedure chiare.

## Lead WhatsApp non registrati

Mitigazione: regola operativa + workflow n8n dove possibile.

## Pipeline diversa da LeadSpark

Mitigazione: mapping chiaro prima dell’import.

# Funzioni da implementare dopo la migrazione

## Fase 2

- dashboard funnel avanzata
- viste per ruolo
- calendario integrato
- lead scoring AI
- riepilogo AI dei lead
- reminder follow-up automatici

## Fase 3

- AI call semplice
- campagne predittive
- riattivazione lead dormienti
- preventivatore
- analytics avanzata performance venditori

# Raccomandazione finale

LeadSpark non va sostituito in modo brusco. Va prima auditato, poi esportato, poi replicato nelle parti essenziali su HubSpot e n8n.

La priorità non è copiare tutto, ma mantenere ciò che protegge il business:

```
lead + follow-up + appuntamenti + pipeline + report minimi
```

Solo dopo si possono aggiungere AI call, campagne predittive e dashboard avanzate.