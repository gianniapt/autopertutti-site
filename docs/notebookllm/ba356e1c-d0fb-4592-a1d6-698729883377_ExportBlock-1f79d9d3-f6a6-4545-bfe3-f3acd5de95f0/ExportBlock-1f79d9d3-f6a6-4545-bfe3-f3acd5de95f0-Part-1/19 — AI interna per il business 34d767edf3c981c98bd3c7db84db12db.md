# 19 — AI interna per il business

# AI interna per il business

Questa pagina definisce come usare l’intelligenza artificiale all’interno dell’operatività di Autopertutti, non solo come chat per i clienti.

# Principio generale

L’AI interna deve aiutare il team a lavorare meglio, non sostituire le decisioni umane.

Obiettivi principali:

- ridurre lavoro manuale
- migliorare gestione lead
- velocizzare risposte e follow-up
- dare priorità alle richieste più importanti
- riassumere conversazioni e chiamate
- aiutare il team a prendere decisioni basate sui dati
- migliorare controllo su CRM, stock e performance

# Aree dove usare AI internamente

## 1. Lead scoring

L’AI può aiutare a capire quali lead sono più urgenti o più qualificati.

Segnali utili:

- richiesta da scheda veicolo specifica
- presenza di telefono
- richiesta con date di noleggio
- richiesta con budget
- click WhatsApp
- messaggio chiaro
- lead già esistente nel CRM
- canale di provenienza

Esempio output AI:

```
Priorità: Alta
Motivo: cliente interessato a veicolo specifico, ha lasciato telefono e date noleggio.
```

# 2. Riassunto automatico lead

Quando arriva una richiesta, l’AI può creare un riepilogo breve per il team.

Esempio:

```
Cliente interessato a Jeep Renegade per noleggio dal 12 al 16 maggio. Ha chiesto disponibilità e prezzo. Telefono presente. Priorità alta.
```

Questo riepilogo può essere salvato in HubSpot e inviato nella notifica interna.

# 3. Classificazione automatica richieste

L’AI può classificare automaticamente il tipo di richiesta:

- vendita auto
- noleggio auto
- vendita moto
- noleggio moto
- autolavaggio
- officina
- candidatura
- richiesta generica

Questo riduce errori manuali e aiuta n8n a creare il record giusto in CRM.

# 4. Suggerimento prossima azione

L’AI può suggerire al team cosa fare dopo.

Esempi:

- chiamare il cliente
- inviare disponibilità
- richiedere documenti
- proporre veicolo simile
- fissare appuntamento
- passare a officina
- chiudere come non qualificato

# 5. Riepilogo chiamate e messaggi

Se vengono usati voice agent o trascrizione chiamate, l’AI può generare:

- riepilogo chiamata
- motivo richiesta
- dati mancanti
- prossima azione
- livello urgenza
- sentiment cliente

# 6. Controllo qualità CRM

L’AI può aiutare a trovare problemi nel CRM:

- lead senza stato
- lead senza proprietario
- lead duplicati
- lead senza telefono
- deal aperti da troppo tempo
- richieste senza follow-up
- record con categoria errata

# 7. Suggerimenti su veicoli alternativi

Quando un veicolo non è disponibile, l’AI può suggerire alternative dal database.

Logica:

- stesso brand
- stessa fascia prezzo
- stessa categoria
- stessa tipologia vendita/noleggio
- disponibilità confermata

Regola: mostrare solo veicoli realmente disponibili.

# 8. Supporto al team vendite

L’AI può aiutare il team a prepararsi prima di rispondere al cliente.

Esempi:

- riepilogo veicolo richiesto
- condizioni principali
- veicoli simili
- storico cliente
- stato disponibilità
- prossima azione suggerita

# 9. Supporto per contenuti e annunci

L’AI può generare bozze per:

- descrizioni veicoli
- testi marketplace
- post social
- descrizioni servizi
- testi per blog
- contenuti per WhatsApp Catalog

Regola: il team deve revisionare prima della pubblicazione.

# 10. Analisi dati e report

L’AI può trasformare dati grezzi in insight leggibili.

Esempi:

- quali canali portano più lead
- quali veicoli ricevono più interesse
- quali servizi sono più richiesti
- quali lead restano non gestiti
- dove si perdono conversioni
- quali campagne generano richieste reali

# Architettura consigliata

```
Sito / WhatsApp / Voice / Form
↓
n8n
↓
AI internal service
↓
Database + HubSpot
↓
Output strutturato
↓
Notifica team / CRM / dashboard
```

# Workflow consigliati

## Workflow 1 — Nuovo lead con AI scoring

```
Nuovo lead
↓
n8n riceve dati
↓
AI classifica richiesta
↓
AI assegna priorità
↓
AI crea riepilogo
↓
HubSpot viene aggiornato
↓
Team riceve notifica
```

## Workflow 2 — Controllo CRM giornaliero

```
Ogni giorno
↓
n8n legge lead aperti
↓
AI identifica anomalie
↓
Report interno
↓
Team corregge o aggiorna
```

## Workflow 3 — Suggerimento alternative veicolo

```
Veicolo non disponibile
↓
Sistema cerca alternative nel database
↓
AI prepara riepilogo opzioni
↓
Team decide cosa proporre
```

## Workflow 4 — Report settimanale

```
Dati CRM + analytics
↓
AI genera sintesi
↓
Insight principali
↓
Azioni consigliate
```

# Cosa NON far fare all’AI interna

L’AI non deve:

- modificare prezzi senza approvazione
- promettere disponibilità non confermata
- chiudere deal automaticamente
- inviare comunicazioni sensibili senza controllo
- cancellare record CRM
- decidere condizioni commerciali finali
- accedere a dati non necessari

# Dati necessari

Per funzionare bene, l’AI interna ha bisogno di dati puliti:

- lead con categoria
- stato lead aggiornato
- veicoli con disponibilità corretta
- storico conversazioni
- fonte lead
- UTM e canali
- dati CRM coerenti

# Strumenti possibili

- n8n per orchestrazione
- HubSpot per CRM
- Supabase per database
- OpenAI / Claude API per analisi e generazione
- modelli locali in futuro per classificazione semplice
- dashboard analytics per report

# Strategia consigliata

Partire da casi d’uso interni semplici:

1. classificazione lead
2. priorità lead
3. riepilogo lead
4. alert lead non gestiti
5. report settimanale

Solo dopo aggiungere:

- suggerimenti commerciali
- analisi avanzata
- voice summary
- alternative veicoli
- automazioni più profonde

# Raccomandazione finale

L’AI interna deve essere invisibile al cliente ma molto utile al team.

Il valore principale non è “rispondere in modo intelligente”, ma aiutare il business a non perdere opportunità, lavorare più velocemente e prendere decisioni migliori.