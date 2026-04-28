# 11 — Catalogo e scheda veicolo

# Catalogo e scheda veicolo

Questa pagina definisce la struttura del catalogo veicoli e della scheda dettaglio per Autopertutti. L’obiettivo è creare un’esperienza chiara, premium e orientata alla conversione, prendendo ispirazione dai migliori siti di noleggio e vendita automotive.

# Principio generale

Il catalogo non deve essere solo una lista di veicoli. Deve aiutare l’utente a trovare rapidamente il veicolo giusto e trasformare l’interesse in richiesta.

La scheda veicolo è uno dei punti più importanti del sito: qui l’utente decide se contattare il team, richiedere disponibilità, prenotare una visita o inviare una richiesta.

# Struttura catalogo

## Cataloghi separati

Per evitare confusione, i cataloghi devono essere separati:

- Auto in vendita
- Auto a noleggio
- Moto in vendita
- Moto a noleggio

Ogni catalogo può avere struttura simile, ma filtri e CTA devono cambiare in base all’obiettivo.

# Layout catalogo desktop

```
Titolo pagina
Descrizione breve
Filtri laterali / superiori
Griglia veicoli
CTA rapida
```

Struttura consigliata:

```
[ Filtri ] [ Card veicolo ] [ Card veicolo ] [ Card veicolo ]
          [ Card veicolo ] [ Card veicolo ] [ Card veicolo ]
```

# Layout catalogo mobile

Su mobile i filtri non devono occupare troppo spazio.

Struttura consigliata:

```
Titolo
Descrizione breve
Pulsante “Filtra”
Lista card veicoli
Sticky bottom bar: WhatsApp / Chiama / Chat
```

# Filtri catalogo vendita

- Marca
- Modello
- Prezzo
- Anno
- Chilometraggio
- Alimentazione
- Cambio
- Stato disponibilità

# Filtri catalogo noleggio

- Marca
- Modello
- Categoria
- Prezzo giornaliero
- Date richieste
- Cauzione
- Cambio
- Alimentazione
- Disponibilità

# Card veicolo

Ogni card deve essere chiara e non sovraccarica.

## Elementi card

- Immagine principale
- Badge stato: Disponibile / Riservato / Venduto / In manutenzione
- Marca e modello
- Anno
- Prezzo vendita oppure prezzo al giorno
- 3-4 specifiche rapide
- CTA: Vedi dettagli
- CTA secondaria: WhatsApp o Richiedi info

## Esempio card vendita

```
BMW Serie 3 2021
€ 28.900
Diesel · Automatico · 72.000 km
[ Vedi dettagli ] [ Richiedi info ]
```

## Esempio card noleggio

```
Jeep Renegade
Da € 65 / giorno
Automatico · 5 posti · Disponibile
[ Verifica disponibilità ] [ WhatsApp ]
```

# Ordinamento consigliato

Opzioni utili:

- Più recenti
- Prezzo crescente
- Prezzo decrescente
- Chilometraggio più basso
- Disponibili prima

# Scheda veicolo

La scheda veicolo deve essere costruita per convertire.

# Layout desktop scheda veicolo

```
[ Gallery immagini grande ] [ Box prezzo + CTA sticky ]
[ Specifiche principali ]
[ Descrizione ]
[ Condizioni vendita/noleggio ]
[ Form rapido ]
[ Veicoli simili ]
```

# Layout mobile scheda veicolo

```
Gallery immagini
Titolo veicolo
Prezzo / disponibilità
CTA primaria
Specifiche rapide
Descrizione
Condizioni
Form rapido
Veicoli simili
Sticky bottom bar
```

# Elementi obbligatori scheda veicolo

- Gallery immagini
- Titolo chiaro
- Prezzo
- Stato disponibilità
- CTA primaria
- CTA WhatsApp
- Specifiche tecniche
- Condizioni
- Descrizione
- Form rapido
- Veicoli simili

# CTA per vendita

- Richiedi informazioni
- Prenota una visita
- Contattaci su WhatsApp
- Chiama ora

# CTA per noleggio

- Verifica disponibilità
- Richiedi preventivo
- Prenota ora
- Contattaci su WhatsApp

# Box CTA sticky

Su desktop, nella scheda veicolo è consigliato un box laterale sticky con:

- prezzo
- disponibilità
- CTA principale
- WhatsApp
- telefono
- breve nota di fiducia

Esempio:

```
Disponibile ora
Da € 65 / giorno
[ Verifica disponibilità ]
[ WhatsApp ]
```

# Form rapido

Il form non deve essere lungo.

Campi consigliati:

- Nome
- Telefono
- Email opzionale
- Tipo richiesta
- Messaggio opzionale

Per noleggio:

- Data inizio
- Data fine

# Logica premium

Per dare una sensazione premium:

- immagini grandi
- molto spazio bianco
- testo breve
- dettagli tecnici chiari
- CTA sempre visibili
- status disponibilità visibile
- niente confusione tra vendita e noleggio

# Errori da evitare

- Troppe informazioni nella card
- Filtri troppo complessi su mobile
- Prezzi nascosti
- Nessun pulsante WhatsApp
- Form troppo lunghi
- Schede senza disponibilità
- Nessun veicolo simile
- Troppi CTA uguali nello stesso blocco

# Analytics da tracciare

Eventi consigliati:

```
view_catalog_sale_car
view_catalog_rent_car
view_catalog_sale_motorcycle
view_catalog_rent_motorcycle
use_filter
sort_catalog
view_vehicle
click_vehicle_card
click_vehicle_whatsapp
click_vehicle_call
submit_vehicle_form
request_vehicle_availability
request_vehicle_purchase
request_vehicle_rent
```

# Raccomandazione finale

La prima versione deve avere cataloghi semplici ma molto chiari. Meglio pochi filtri ben scelti e card pulite, piuttosto che un catalogo troppo complesso.

L’obiettivo non è mostrare tutto, ma far arrivare rapidamente l’utente al contatto giusto.