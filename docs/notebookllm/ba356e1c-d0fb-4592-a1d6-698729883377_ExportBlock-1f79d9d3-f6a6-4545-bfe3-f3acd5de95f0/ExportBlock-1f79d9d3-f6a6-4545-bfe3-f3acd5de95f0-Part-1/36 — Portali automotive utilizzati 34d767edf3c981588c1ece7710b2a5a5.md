# 36 — Portali automotive utilizzati

# Portali automotive utilizzati

Questa pagina raccoglie i portali automotive indicati come riferimento per la pubblicazione dello stock veicoli.

# Portali da considerare

Dalla schermata di riferimento risultano presenti questi portali:

- AutoScout24
- [Automoto.it](http://Automoto.it)
- AutoSuperMercato
- [Automobile.it](http://Automobile.it)
- [Bakeca.it](http://Bakeca.it)
- [CheAnnunci.it](http://CheAnnunci.it)
- Easy Avvisi
- Gestionale Auto
- [Moto.it](http://Moto.it)
- [Motorionline.com](http://Motorionline.com)
- [Subito.it](http://Subito.it)
- [TuttoAnnunci.org](http://TuttoAnnunci.org)

# Portali evidenziati nello screenshot

Nello screenshot risultano selezionati / attivi:

- AutoScout24
- [Automoto.it](http://Automoto.it)
- [Moto.it](http://Moto.it)
- [Bakeca.it](http://Bakeca.it)

Da confermare:

- [Subito.it](http://Subito.it)
- [Automobile.it](http://Automobile.it)
- AutoSuperMercato
- [CheAnnunci.it](http://CheAnnunci.it)
- Easy Avvisi
- Gestionale Auto
- [Motorionline.com](http://Motorionline.com)
- [TuttoAnnunci.org](http://TuttoAnnunci.org)

# Implicazione per il nuovo sistema

Il nuovo sistema Autopertutti deve supportare almeno una gestione assistita dei portali realmente usati.

Per ogni veicolo sarà utile tracciare:

- portale di pubblicazione
- stato pubblicazione
- data pubblicazione
- link annuncio esterno
- eventuale errore pubblicazione
- ultima sincronizzazione

# Strategia MVP

Nella prima versione non è necessario automatizzare tutti i portali.

Approccio consigliato:

```
Database veicoli
↓
Scheda veicolo completa
↓
Generazione testo annuncio
↓
Export assistito / CSV dove possibile
↓
Pubblicazione manuale o semi-automatica sui portali prioritari
↓
Salvataggio link annuncio nel nuovo sistema
```

# Priorità consigliata

## Priorità alta

- AutoScout24
- [Subito.it](http://Subito.it)
- [Moto.it](http://Moto.it)
- [Automoto.it](http://Automoto.it)

## Priorità media

- [Automobile.it](http://Automobile.it)
- [Bakeca.it](http://Bakeca.it)
- AutoSuperMercato

## Da verificare

- Easy Avvisi
- Gestionale Auto
- [CheAnnunci.it](http://CheAnnunci.it)
- [Motorionline.com](http://Motorionline.com)
- [TuttoAnnunci.org](http://TuttoAnnunci.org)

# Domande tecniche da verificare

Per ogni portale:

- accetta feed XML / CSV?
- ha API ufficiale?
- richiede account dealer?
- permette gestione automatizzata degli annunci?
- permette aggiornamento prezzo / stato?
- permette rimozione automatica annuncio?
- quali sono i costi?
- quali sono le limitazioni contrattuali?

# Raccomandazione finale

Prima di sviluppare integrazioni avanzate, identificare i 3–4 portali realmente importanti per Autopertutti e costruire il flusso attorno a quelli.

La priorità non è pubblicare ovunque, ma pubblicare bene, mantenere dati coerenti e tracciare quali portali generano lead reali.