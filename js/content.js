/* =====================================================================
   CONTENUTI DEL SITO - QUESTO È L'UNICO FILE CHE DEVI MODIFICARE
   =====================================================================

   Come funziona:
   - Ogni riga del tipo   nomeCampo: "testo",   è un'informazione del sito.
   - Modifica SOLO il testo tra le virgolette "..." (o i numeri).
   - Non cancellare le virgole alla fine delle righe e non togliere
     le parentesi { } e [ ].
   - Se nel testo ti serve una virgoletta doppia, scrivila così: \"
   - Tutto ciò che inizia con [DA COMPILARE] è un testo di esempio
     da sostituire con le informazioni vere.
   - Dopo aver salvato il file, ricarica la pagina del sito per vedere
     le modifiche (su GitHub Pages servono 1-2 minuti).

   Le righe che iniziano con // oppure sono dentro /* ... * / sono
   commenti: servono solo a spiegare e non compaiono sul sito.
   ===================================================================== */

const CONTENT = {

  /* -------------------------------------------------------------------
     ACCESSO AL SITO
     ------------------------------------------------------------------- */

  // Parola d'ordine da scrivere sull'invito. Maiuscole/minuscole non contano.
  password: "agazzano2027",

  // Indirizzo del modulo Google Apps Script che riceve le conferme (vedi GUIDA.md, punto B).
  // Finché resta "INCOLLA_QUI_URL_APPS_SCRIPT" il modulo NON invia nulla.
  scriptUrl: "https://script.google.com/macros/s/AKfycbxHnue3rENw9MQ0JVEfawg-TBfFXp1xWbHVikD3yR7MK_S3LV9aiK2LbcK-KnTrz9ry/exec",

  /* -------------------------------------------------------------------
     GLI SPOSI E L'EVENTO
     ------------------------------------------------------------------- */

  nomi: {
    sposa: "Annalisa",
    sposo: "Manolo",
    // Come compaiono insieme nel titolo e nel piè di pagina
    coppia: "Annalisa e Manolo"
  },

  // Data e ora dell'inizio della cerimonia, formato ANNO-MESE-GIORNO T ORE:MINUTI:SECONDI
  // seguito dal fuso orario (+02:00 = ora legale italiana). Serve per il conto alla rovescia.
  dataISO: "2027-05-29T17:00:00+02:00",

  // Data scritta come appare sul sito
  dataTesto: "29 maggio 2027",
  giornoSettimana: "Sabato",

  // Luogo "principale" come compare nella home (sotto la data) e nel piè di pagina,
  // uguale al save the date. I dettagli dei due luoghi sono nel blocco "luoghi" qui sotto.
  luogo: {
    nome: "Castello di Agazzano",
    // Riga principale sotto la data nella Home
    nomeBreve: "Cerimonia · Chiesa di San Savino, Rezzanello"
  },

  /* -------------------------------------------------------------------
     I DUE LUOGHI DELLA GIORNATA (sezione "Location")
     La cerimonia è nella chiesa di Rezzanello; aperitivo, cena e festa
     al Castello di Agazzano (a pochi minuti d'auto).
     Ogni luogo ha la sua scheda con la mappa: per cambiare la mappa
     modifica "ricercaMaps" (è il testo che viene cercato su Google Maps).
     ------------------------------------------------------------------- */

  luoghi: {
    cerimonia: {
      etichetta: "Cerimonia",
      nome: "Chiesa di San Savino",
      indirizzo: "Frazione Rezzanello, 29010 Gazzola (PC)",
      ricercaMaps: "Chiesa di San Savino, Rezzanello, Gazzola PC",
      orario: "ore 17:00",
      descrizione: "La cerimonia si terrà nella chiesa di Rezzanello, a pochi minuti d'auto dal castello.",
      parcheggio: "Libero lungo la strada."
    },
    ricevimento: {
      etichetta: "Aperitivo, cena e festa",
      nome: "Castello di Agazzano",
      indirizzo: "Via del Castello 4, 29010 Agazzano (PC)",
      ricercaMaps: "Castello di Agazzano, Via del Castello 4, Agazzano PC",
      orario: "dalle 19:00",
      descrizione: "Dopo la cerimonia ci spostiamo al Castello di Agazzano (circa 7 minuti in auto) per aperitivo, cena e festa. Il complesso è composto da due strutture e un ampio giardino-parco a terrazza che si affaccia sulla Val Luretta, terra di vigneti, cantine e vini d'eccellenza. La Rocca unisce l'architettura difensiva medievale all'eleganza della dimora signorile rinascimentale.",
      // Link facoltativo "Scopri di più" mostrato sotto la descrizione
      linkInfo: "https://www.castellidelducato.it/castellidelducato/castello.asp?el=rocca-e-castello-di-agazzano",
      linkInfoTesto: "Scopri di più sul castello",
      parcheggio: "Nelle vie davanti al cancello del castello."
    }
  },

  /* -------------------------------------------------------------------
     HOME
     ------------------------------------------------------------------- */

  home: {
    sottotitolo: "Ci sposiamo!",
    // Seconda riga sotto la cerimonia, con il luogo del ricevimento
    sottoLuogo: "Ricevimento · Castello di Agazzano (PC)",
    // Testo di benvenuto: lasciato vuoto su richiesta degli sposi (non compare nulla)
    benvenuto: "",
    // Testo del pulsante che porta al modulo di conferma
    pulsanteRsvp: "Conferma la tua presenza"
  },

  // La sezione "La nostra storia" è stata rimossa di proposito: al suo posto c'è la galleria qui sotto.

  /* -------------------------------------------------------------------
     GALLERIA FOTO
     Le foto stanno nella cartella img/galleria. Per AGGIUNGERE una foto:
       1. copia il file (jpg) in img/galleria, es. img/galleria/foto-12.jpg
          (meglio se non più larga di 1600 px, così la pagina resta veloce);
       2. aggiungi una riga { src: "...", thumb: "...", alt: "..." } in fondo
          all'elenco "foto" qui sotto, con la virgola dopo la riga precedente.
          "thumb" è la versione piccola mostrata nella griglia: se non ne hai
          una, scrivi lo stesso nome di "src". "alt" è una breve descrizione
          (serve a chi non vede l'immagine).
     Per TOGLIERE una foto cancella la sua riga (e la virgola in più).
     Su GitHub ricorda di caricare sia il file in img/galleria sia questo file.
     ------------------------------------------------------------------- */

  galleria: {
    titolo: "Qualche foto di noi",
    // Frase sotto il titolo: lascia "" per non mostrarla
    sottotitolo: "",
    foto: [
      { src: "img/galleria/foto-01.jpg", thumb: "img/galleria/thumb-01.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-02.jpg", thumb: "img/galleria/thumb-02.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-03.jpg", thumb: "img/galleria/thumb-03.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-04.jpg", thumb: "img/galleria/thumb-04.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-05.jpg", thumb: "img/galleria/thumb-05.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-06.jpg", thumb: "img/galleria/thumb-06.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-07.jpg", thumb: "img/galleria/thumb-07.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-08.jpg", thumb: "img/galleria/thumb-08.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-09.jpg", thumb: "img/galleria/thumb-09.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-10.jpg", thumb: "img/galleria/thumb-10.jpg", alt: "Annalisa e Manolo" },
      { src: "img/galleria/foto-11.jpg", thumb: "img/galleria/thumb-11.jpg", alt: "Annalisa e Manolo" }
    ]
  },

  /* -------------------------------------------------------------------
     PROGRAMMA DELLA GIORNATA
     Per aggiungere un momento copia un blocco { ... }, incollalo dopo
     l'ultimo e cambia i testi. Ricorda la virgola tra un blocco e l'altro.
     ------------------------------------------------------------------- */

  programma: {
    titolo: "Programma",
    introduzione: "Ecco come trascorreremo insieme la giornata: la cerimonia a Rezzanello, poi tutti al Castello di Agazzano.",
    tappe: [
      {
        ora: "17:00",
        titolo: "Cerimonia",
        descrizione: "Il momento del \"sì\".",
        luogo: "Chiesa di San Savino, Rezzanello"
      },
      {
        ora: "19:00",
        titolo: "Aperitivo",
        descrizione: "Brindisi e stuzzichini nel giardino, meteo permettendo.",
        luogo: "Giardino del castello"
      },
      {
        ora: "20:30",
        titolo: "Cena",
        descrizione: "Cena nel giardino se il meteo lo consente, altrimenti nelle sale del castello.",
        luogo: "Giardino del castello"
      },
      {
        ora: "23:00",
        titolo: "Taglio della torta e festa",
        descrizione: "Si balla fino a tarda notte!",
        luogo: "Castello di Agazzano"
      }
    ]
  },

  /* -------------------------------------------------------------------
     LOCATION / COME ARRIVARE
     (le schede dei due luoghi sono nel blocco "luoghi" più in alto;
     qui c'è il titolo della sezione e il riquadro "Come arrivare")
     ------------------------------------------------------------------- */

  location: {
    titolo: "Location",
    inAuto: "Uscita autostradale consigliata: Piacenza Nord. Da lì seguire le indicazioni per Agazzano (circa 25 minuti).",
    // Spostamento tra la chiesa e il castello. Servizio navetta NON previsto
    // (le voci "In treno" e "Navetta" non compaiono più sul sito).
    spostamento: "Dalla chiesa al castello sono circa 4 km (7 minuti in auto). Non è previsto un servizio navetta: vi chiediamo di organizzarvi con la vostra auto o con altri invitati.",
    pulsanteMaps: "Apri in Google Maps"
  },

  /* -------------------------------------------------------------------
     DOVE DORMIRE
     Per aggiungere un hotel copia un blocco { ... } e incollalo dopo
     l'ultimo (con la virgola). Lascia "" se un dato non c'è.
     ------------------------------------------------------------------- */

  dormire: {
    titolo: "Dove dormire",
    introduzione: "Abbiamo selezionato alcune strutture a non più di 15 minuti dal Castello. Vi consigliamo di prenotare con anticipo: a fine maggio la zona è molto richiesta.",
    // Per ogni struttura: nome, indirizzo, telefono, sito (può essere un link Booking) e note.
    // Se un dato manca lascia "" : la scheda non lo mostra.
    // Il link "Apri su Google Maps" viene creato automaticamente da nome + indirizzo.
    hotel: [
      {
        nome: "I Galli – Bed & Breakfast",
        indirizzo: "Agazzano (PC)",
        telefono: "",
        sito: "https://www.booking.com/searchresults.it.html?ss=I+Galli+Agazzano",
        note: "In paese, a 2-3 minuti dal Castello. B&B nuovo, giardino e cucina in comune. Valutazione Booking 9,2/10 (80+ recensioni)."
      },
      {
        nome: "Sfumature del Borgo",
        indirizzo: "Agazzano (PC)",
        telefono: "",
        sito: "https://www.booking.com/searchresults.it.html?ss=Sfumature+del+Borgo+Agazzano",
        note: "Camere curate nel centro di Agazzano. Valutazione Booking 9,2/10. A 2-3 minuti dal Castello."
      },
      {
        nome: "Albergo Ristorante Il Cervo",
        indirizzo: "Piazza Europa 20, 29010 Agazzano (PC)",
        telefono: "+39 0523 975208",
        sito: "https://www.albergoristoranteilcervo.it",
        note: "Albergo con ristorante di cucina piacentina nella piazza del paese, soluzione pratica ed economica. A 2 minuti a piedi dal Castello."
      },
      {
        nome: "Residenza Torre di San Martino",
        indirizzo: "Borgo di Rivalta, 29010 Gazzola (PC)",
        telefono: "",
        sito: "https://www.booking.com/hotel/it/residenza-torre-di-san-martino.it.html",
        note: "Hotel 4 stelle superior in un'antica torre davanti al Castello di Rivalta, sul Trebbia; ristorante e spa. Circa 12 minuti in auto dal Castello di Agazzano."
      },
      {
        nome: "Agriturismo L'Urteia",
        indirizzo: "Viale Marconi 56, loc. Pieve Dugliara, 29029 Rivergaro (PC)",
        telefono: "",
        sito: "https://www.urteia.it",
        note: "Agriturismo con ristorante, piscina e giardino. Valutazione Booking 9,0/10 (110+ recensioni). Circa 15 minuti in auto dal Castello di Agazzano. Email: info@urteia.it"
      }
    ]
  },

  /* -------------------------------------------------------------------
     LISTA NOZZE
     ------------------------------------------------------------------- */

  regalo: {
    titolo: "Lista nozze",
    testo: "La vostra presenza è il regalo più grande. Se desiderate farci un pensiero, ci aiuterà ad arredare la nostra nuova casa.",
    // Sul sito compaiono SOLO intestatario, IBAN e BIC/SWIFT (più il pulsante "Copia IBAN")
    // Nome del beneficiario del bonifico
    intestatario: "M Mizzi & A De Vincenzi",
    // IBAN: gli spazi servono solo per leggerlo meglio, il pulsante "Copia IBAN" li toglie da solo
    iban: "IT75 O036 6901 6006 1203 6678 152",
    bic: "REVOITM2",
    pulsanteCopia: "Copia IBAN",
    copiato: "IBAN copiato!",
    // Dati NON mostrati sul sito (la scheda è stata volutamente semplificata):
    // li teniamo qui solo come promemoria, per chi li chiede in privato.
    dettagliExtra: {
      banca: "Revolut Bank UAB, Via Dante 7, 20123 Milano (MI), Italy",
      valuta: "Euro",
      causale: "Regalo di nozze Annalisa e Manolo",
      // BIC della banca corrispondente: serve solo a chi fa il bonifico dall'estero
      bicCorrispondente: "CHASDEFX"
    }
  },

  /* -------------------------------------------------------------------
     DOMANDE FREQUENTI
     Per aggiungere una domanda copia un blocco { ... } e incollalo dopo
     l'ultimo (con la virgola).
     ------------------------------------------------------------------- */

  faq: {
    titolo: "Domande frequenti",
    domande: [
      {
        domanda: "Dove si svolge la cerimonia? E il ricevimento?",
        risposta: "La cerimonia è alle 17:00 nella Chiesa di San Savino a Rezzanello (Gazzola). Aperitivo, cena e festa sono al Castello di Agazzano, a circa 7 minuti in auto dalla chiesa."
      },
      {
        domanda: "I bambini sono invitati?",
        risposta: "Certo! Indicate nel modulo di conferma nome e fascia d'età dei bambini, così da prevedere un menù dedicato."
      },
      {
        domanda: "Posso portare un accompagnatore?",
        risposta: "Certo, basta aggiungerlo nel modulo di conferma con il pulsante \"Aggiungi partner / familiare\"."
      },
      {
        domanda: "C'è il parcheggio?",
        risposta: "Sì: a Rezzanello nei pressi della chiesa, ad Agazzano nelle vie davanti al cancello del castello."
      },
      {
        domanda: "E se piove?",
        risposta: "Nessun problema: aperitivo e cena si spostano nelle sale interne del castello."
      },
      {
        domanda: "Posso pubblicare le foto sui social?",
        risposta: "Ci sarà un fotografo. Noi non pubblicheremo nulla sui social: ognuno è libero di fare come preferisce."
      },
      {
        domanda: "Entro quando devo confermare?",
        risposta: "Vi chiediamo di confermare la presenza entro il 31 gennaio 2027 tramite il modulo in questo sito."
      }
    ]
  },

  /* -------------------------------------------------------------------
     MODULO DI CONFERMA (RSVP)
     ------------------------------------------------------------------- */

  rsvp: {
    titolo: "Conferma la tua presenza",
    introduzione: "Compila il modulo entro la data indicata: ci aiuterai a organizzare tutto al meglio.",
    // Data limite per confermare, formato ANNO-MESE-GIORNO
    scadenzaISO: "2027-01-31",
    scadenzaTesto: "31 gennaio 2027",

    // Numero massimo di persone (compilatore incluso) che si possono inserire
    // in una sola conferma con il pulsante "Aggiungi partner / familiare".
    // Raggiunto questo numero il pulsante sparisce.
    massimoPersone: 8,

    // Fasce d'età proposte quando si spunta "È un bambino o ragazzo".
    // Servono per preparare i tavoli e i menù bimbi: puoi cambiarle o
    // aggiungerne altre (una per riga, tra virgolette, con la virgola).
    fasceEta: [
      "0-2 anni",
      "3-6 anni",
      "7-12 anni",
      "oltre 12 anni"
    ],

    // Opzioni del menu a tendina "Dieta / restrizioni alimentari" di ogni ospite.
    // La prima è quella proposta di default. "Altro" ha un comportamento
    // speciale (fa comparire un campo di testo obbligatorio): non rinominarla.
    diete: [
      "Nessuna",
      "Vegetariano",
      "Vegano",
      "Senza glutine / celiachia",
      "Senza lattosio",
      "Altro"
    ],

    // Etichette delle schede del modulo
    testiOspiti: {
      tu: "Tu",                                  // titolo della scheda di chi compila (nome, email, telefono, dieta)
      ospite: "Ospite",                          // titolo delle schede aggiunte, seguito dal numero (Ospite 2, 3...)
      aggiungi: "+ Aggiungi partner / familiare",
      rimuovi: "Rimuovi",
      nome: "Nome",
      cognome: "Cognome",
      bambino: "È un bambino o ragazzo",
      fasciaEta: "Fascia d'età",
      dieta: "Dieta / restrizioni alimentari",
      dietaAltro: "Specifica (allergie, altre esigenze)",
      noteAlimentari: "Note alimentari (allergie, ecc.)",
      // Inizio della riga di riepilogo sopra il pulsante di invio,
      // completata automaticamente: "... 3 persone: 2 adulti, 1 bambino/ragazzo"
      riepilogo: "Confermi per"
    },

    messaggioSuccesso: "Grazie! La tua risposta è stata inviata. Non vediamo l'ora di festeggiare con te!",
    messaggioErrore: "Ops, qualcosa è andato storto. Riprova tra qualche minuto oppure scrivici direttamente (vedi Contatti)."
  },

  /* -------------------------------------------------------------------
     CONTATTI
     ------------------------------------------------------------------- */

  contatti: {
    titolo: "Contatti",
    introduzione: "Per qualsiasi domanda non esitate a scriverci o chiamarci.",
    persone: [
      {
        nome: "Annalisa",
        ruolo: "La sposa",
        telefono: "339 3123483"
      },
      {
        nome: "Manolo",
        ruolo: "Lo sposo",
        telefono: "366 7868441"
      },
      {
        nome: "Dania",
        ruolo: "Testimone",
        telefono: "348 9203138"
      }
    ]
  }
};
