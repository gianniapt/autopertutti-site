# 08 — Database e modello dati

# Database e modello dati

Questa pagina definisce il modello dati di Autopertutti e il modo in cui database, sito, CRM e chat AI devono lavorare insieme.

# Obiettivo

Creare una base dati pulita, strutturata e affidabile, utilizzabile per:

- catalogo veicoli
- schede auto e moto
- disponibilità vendita e noleggio
- richieste lead
- servizi e prenotazioni
- automazioni n8n
- HubSpot CRM
- chat AI basata su dati reali

# Principio principale

La chat AI non deve inventare informazioni. Deve rispondere solo usando dati presenti nel database o nelle fonti approvate.

Se un dato non è presente, incerto o non aggiornato, la chat deve raccogliere il contatto e passare la richiesta al team.

# Entità principali

```
Veicoli
Lead
Servizi
Prenotazioni
Disponibilità
Media
Team
FAQ / Knowledge base
```

# Tabella: Veicoli

Questa è la tabella centrale del progetto.

## Campi principali

- ID veicolo
- Tipo veicolo: auto / moto
- Categoria business: vendita / noleggio / entrambi
- Marca
- Modello
- Versione
- Anno
- Alimentazione
- Cambio
- Chilometraggio
- Colore
- Numero posti
- Porte
- Targa interna o codice stock
- Stato disponibilità
- Prezzo vendita
- Prezzo noleggio giornaliero
- Cauzione
- Descrizione breve
- Descrizione completa
- Note interne
- Data ultimo aggiornamento

## Stati disponibilità

```
Disponibile
Riservato
Venduto
In manutenzione
Non pubblicato
In arrivo
```

# Campi specifici per vendita

- Prezzo vendita
- Possibilità finanziamento
- Garanzia
- IVA esposta / non esposta
- Stato veicolo
- Proprietari precedenti
- Revisione
- Documentazione disponibile

# Campi specifici per noleggio

- Prezzo giornaliero
- Prezzo settimanale
- Prezzo mensile
- Cauzione
- Chilometri inclusi
- Costo km extra
- Età minima conducente
- Patente richiesta
- Documenti richiesti
- Disponibilità date
- Condizioni noleggio

# Tabella: Lead

Ogni richiesta generata dal sito, dalla chat o da WhatsApp deve diventare un lead tracciabile.

## Campi principali

- ID lead
- Nome
- Telefono
- Email
- Categoria richiesta
- Tipo richiesta: vendita / noleggio / servizio / generica
- Veicolo interessato
- Servizio interessato
- Messaggio
- Fonte lead
- Pagina di provenienza
- UTM source
- UTM medium
- UTM campaign
- Stato lead
- Priorità
- Responsabile
- Data creazione
- Ultimo aggiornamento

# Tabella: Servizi

Usata per autolavaggio, officina, diagnosi e manutenzione.

## Campi principali

- ID servizio
- Nome servizio
- Categoria: autolavaggio / officina / diagnosi / manutenzione
- Descrizione breve
- Descrizione completa
- Prezzo indicativo
- Durata indicativa
- Disponibile online
- Richiede appuntamento
- Note interne

# Tabella: Prenotazioni

Usata per richieste di servizi o noleggi quando è prevista una data.

## Campi principali

- ID prenotazione
- Cliente
- Tipo prenotazione: noleggio / servizio
- Veicolo o servizio collegato
- Data inizio
- Data fine
- Orario preferito
- Stato prenotazione
- Responsabile
- Note

## Stati prenotazione

```
Richiesta ricevuta
Da confermare
Confermata
In corso
Completata
Annullata
```

# Tabella: Media

Serve per gestire immagini e asset collegati ai veicoli e ai servizi.

## Campi principali

- ID media
- Tipo media: immagine / video / documento
- URL file
- Veicolo collegato
- Servizio collegato
- Ordine visualizzazione
- Alt text
- Stato pubblicazione

# Tabella: FAQ / Knowledge base

Questa tabella aiuta la chat AI a rispondere a domande ricorrenti senza inventare.

## Campi principali

- Domanda
- Risposta approvata
- Categoria: vendita / noleggio / servizi / documenti / pagamenti
- Stato: approvata / da revisionare / non pubblicata
- Ultimo aggiornamento

# Collegamento con la chat AI

La chat AI deve poter consultare solo dati approvati.

## Fonti AI consentite

- Veicoli pubblicati
- Disponibilità veicoli
- Prezzi pubblici
- Condizioni di noleggio approvate
- Servizi disponibili
- FAQ approvate
- Informazioni aziendali approvate

## Fonti AI non consentite

- Note interne
- Margini
- Dati sensibili cliente
- Informazioni non confermate
- Veicoli non pubblicati
- Prezzi non approvati

# Regole anti-allucinazione AI

1. La chat deve rispondere solo se trova dati nel database.
2. Se non trova dati, deve dichiarare che verificherà con il team.
3. Non deve promettere disponibilità se lo stato non è “Disponibile”.
4. Non deve inventare prezzi, cauzioni o condizioni.
5. Non deve mostrare note interne.
6. Deve proporre il contatto umano quando la richiesta è specifica o ambigua.
7. Deve registrare la richiesta come lead se l’utente lascia un contatto.

# Esempi di logica AI

## Domanda: “Avete una BMW disponibile?”

La chat deve:

1. Cercare marca BMW tra veicoli pubblicati
2. Controllare stato disponibilità
3. Distinguere vendita e noleggio
4. Mostrare solo veicoli disponibili
5. Se non trova risultati, proporre contatto con il team

## Domanda: “Quanto costa noleggiare una Jeep?”

La chat deve:

1. Cercare veicoli Jeep con categoria noleggio
2. Mostrare prezzo giornaliero solo se presente
3. Specificare che disponibilità e condizioni vanno confermate
4. Proporre richiesta disponibilità con date

# Collegamento con CRM

Quando un utente invia una richiesta, il sistema deve creare o aggiornare:

```
Contatto HubSpot
↓
Lead / Deal / Ticket
↓
Categoria richiesta
↓
Veicolo o servizio collegato
↓
Responsabile
↓
Stato
```

# Dati obbligatori per pubblicare un veicolo

Un veicolo non dovrebbe essere pubblicato se mancano:

- marca
- modello
- tipo veicolo
- categoria business
- stato disponibilità
- almeno una immagine
- prezzo vendita o prezzo noleggio, se applicabile
- descrizione breve

# Dati obbligatori per la chat AI

Per rispondere correttamente, la chat deve avere almeno:

- marca
- modello
- categoria vendita/noleggio
- stato disponibilità
- prezzo, se pubblico
- condizioni principali, se noleggio
- data ultimo aggiornamento

# Qualità dati

Controlli consigliati:

- veicoli senza immagini
- veicoli senza prezzo
- veicoli con stato non aggiornato
- veicoli venduti ancora pubblicati
- noleggi senza cauzione
- servizi senza descrizione
- FAQ non approvate
- record duplicati

# Aggiornamento disponibilità

La disponibilità deve essere aggiornata frequentemente.

Raccomandazione:

- veicoli in vendita: aggiornamento almeno giornaliero
- veicoli a noleggio: aggiornamento più frequente, soprattutto se gestiscono date
- servizi: aggiornamento quando cambiano prezzi, orari o disponibilità

# Raccomandazione finale

Il database è il cuore del progetto. Se i dati sono puliti, il sito vende meglio, il CRM lavora meglio e la chat AI risponde meglio.

La priorità è creare un modello dati semplice, coerente e aggiornabile, evitando campi inutili nella prima versione.