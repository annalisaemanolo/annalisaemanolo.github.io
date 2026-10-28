# Guida al sito del matrimonio di Annalisa e Manolo

Questa guida spiega, passo per passo, come:

- **A.** modificare i testi del sito (un solo file: `js/content.js`)
- **B.** collegare il modulo di conferma a un foglio Google (per ricevere le risposte)
- **C.** pubblicare il sito gratis su GitHub Pages
- **D.** usare un nome di dominio personalizzato (es. `annalisaemanolo.it`)
- **E.** provare il sito sul tuo computer
- **F.** avvertenza importante sulla password

Non servono competenze tecniche. Dove c'è scritto "clicca", è letteralmente un clic.

---

## Com'è fatta la cartella

```
Matrimonio/
├── index.html            ← la pagina del sito (NON toccare)
├── css/style.css         ← l'aspetto grafico (NON toccare)
├── js/content.js         ← ★ TUTTI I TESTI: l'unico file da modificare
├── js/main.js            ← il "motore" del sito (NON toccare)
├── img/save-the-date.jpg ← immagine della home
├── img/galleria/         ← le foto della sezione "Qualche foto di noi" (vedi A.10)
├── apps-script/Code.gs   ← codice da incollare in Google (punto B)
└── GUIDA.md              ← questa guida
```

---

## A. Modificare i testi del sito (`js/content.js`)

### A.1 Aprire il file

1. Vai nella cartella `js`.
2. Clicca con il **tasto destro** su `content.js` → **Apri con** → **Blocco note** (Windows) oppure **TextEdit** (Mac).
   Se hai installato Visual Studio Code o Notepad++, ancora meglio: colorano il testo e aiutano a non sbagliare.

### A.2 Le regole d'oro

- Modifica **solo il testo tra le virgolette** `"..."` e i numeri.
- **Non cancellare** virgole `,`, parentesi `{ } [ ]` e virgolette `"`.
- Se dentro un testo ti serve una virgoletta doppia, scrivila come `\"`. Esempio: `"diremo il nostro \"sì\""`.
- Le righe che iniziano con `//` sono spiegazioni: puoi ignorarle, non compaiono sul sito.
- Sostituisci tutti i testi che iniziano con **`[DA COMPILARE]`** (e cancella anche la scritta `[DA COMPILARE]`).
- Dopo ogni modifica: **salva** (Ctrl+S) e ricarica la pagina del sito (F5).

Se dopo una modifica il sito mostra la scritta *"il file js/content.js non è stato caricato o contiene un errore"*, hai probabilmente cancellato una virgola o una virgoletta. Controlla l'ultima cosa che hai modificato.

### A.3 Cosa c'è in ogni parte del file

| Blocco | Cosa controlla |
|---|---|
| `password` | La parola d'ordine per entrare nel sito (vedi A.6) |
| `scriptUrl` | L'indirizzo che riceve le conferme (vedi punto B) |
| `nomi` | I nomi degli sposi come compaiono nel sito |
| `dataISO` | Data e ora della cerimonia, per il conto alla rovescia. Formato: `"2027-05-29T17:00:00+02:00"` (anno-mese-giorno **T** ore:minuti:secondi, poi `+02:00` = ora italiana legale) |
| `dataTesto`, `giornoSettimana` | La data scritta "in italiano" |
| `luogo` | Nome e indirizzo del castello; `ricercaMaps` è il testo cercato su Google Maps per mostrare la mappa |
| `home` | Sottotitolo, testo di benvenuto e testo del pulsante della home |
| `galleria` | Titolo e foto della sezione "Qualche foto di noi" (vedi A.10) |
| `programma` | Le tappe della giornata (ora, titolo, descrizione, luogo) |
| `location` | Come arrivare: auto, treno, parcheggio, navetta |
| `dormire` | L'elenco degli hotel consigliati |
| `regalo` | Testo della lista nozze, beneficiario, IBAN (puoi lasciare gli spazi: il pulsante "Copia IBAN" li toglie) e BIC/SWIFT. Sul sito compaiono solo questi tre dati; banca, valuta, causale e BIC corrispondente stanno in `dettagliExtra` e non vengono mostrati |
| `faq` | Le domande frequenti |
| `rsvp` | Testi del modulo di conferma, data di scadenza, numero massimo di persone per conferma (`massimoPersone`), fasce d'età dei bambini (`fasceEta`), diete (`diete`) e etichette delle schede ospite (`testiOspiti`). Vedi A.9 |
| `contatti` | Le persone da contattare con il telefono |

### A.4 Aggiungere un hotel

Nel blocco `dormire` → `hotel` ogni albergo è un gruppo tra parentesi graffe `{ ... }`. Per aggiungerne uno:

1. Copia un blocco intero, dalla `{` alla `}`:
   ```js
   {
     nome: "Hotel Esempio",
     indirizzo: "Via Roma 10, Agazzano (PC)",
     telefono: "0523 000000",
     sito: "https://www.esempio.it",
     note: "A 5 minuti dal castello."
   }
   ```
2. Incollalo **subito dopo** l'ultimo blocco, **prima** della parentesi quadra `]` che chiude l'elenco.
3. Metti una **virgola** tra la `}` del blocco precedente e la `{` del nuovo.
4. Cambia i testi. Se un dato non c'è (es. il telefono), lascia le virgolette vuote: `telefono: ""` e la scheda non lo mostra. Il link "Apri su Google Maps" viene creato da solo a partire da nome e indirizzo.

Per **eliminare** un hotel, cancella tutto il suo blocco `{ ... }` compresa la virgola che lo precede (o lo segue).

### A.5 Aggiungere una domanda frequente (FAQ)

Stesso metodo del punto A.4, nel blocco `faq` → `domande`:

```js
{
  domanda: "Si può fumare?",
  risposta: "Solo negli spazi esterni."
}
```

Allo stesso modo puoi aggiungere tappe nel `programma` o persone nei `contatti`.

### A.6 Cambiare la password

Trova la riga:

```js
password: "agazzano2027",
```

e sostituisci `agazzano2027` con la parola che preferisci (maiuscole/minuscole non contano). **Scrivi la stessa parola sugli inviti.**

### A.7 Cambiare la data di scadenza delle conferme

Nel blocco `rsvp` modifica sia `scadenzaISO` (formato `"2027-03-31"`) sia `scadenzaTesto` (`"31 marzo 2027"`). Ricorda di aggiornare anche la risposta alla FAQ "Entro quando devo confermare?".

### A.8 Cambiare l'immagine della home

Sostituisci il file `img/save-the-date.jpg` con la tua immagine, **mantenendo esattamente lo stesso nome** `save-the-date.jpg`.

### A.9 Come funziona il modulo di conferma (famiglie, bambini, diete)

Chi compila risponde prima a "Parteciperai?" e poi compila la **scheda "Tu"** con nome e cognome, email (obbligatori) e telefono. Se ha risposto **Sì**, nella stessa scheda compaiono anche il menu **"Dieta / restrizioni alimentari"** e le **"Note alimentari"**, e sotto il pulsante **"+ Aggiungi partner / familiare"**: ogni clic aggiunge una scheda "Ospite 2", "Ospite 3"… (ognuna con un link "Rimuovi"). In ogni scheda ospite si indicano:

- **Nome e cognome** (obbligatorio);
- la casella **"È un bambino o ragazzo"**: se spuntata compare il menu **"Fascia d'età"** (obbligatorio), così potete preparare tavoli e menù bimbi (chi compila conta sempre come adulto);
- il menu **"Dieta / restrizioni alimentari"** (proposto su "Nessuna"); scegliendo **"Altro"** compare un campo obbligatorio "Specifica (allergie, altre esigenze)";
- il campo libero **"Note alimentari (allergie, ecc.)"**, sempre visibile e facoltativo.

Sopra il pulsante "Invia" una riga riassume: *"Confermi per 3 persone: 2 adulti, 1 bambino/ragazzo"*.

Per cambiare queste impostazioni, nel blocco `rsvp` di `content.js`:

| Riga | Cosa fa |
|---|---|
| `massimoPersone: 8` | Quante persone al massimo si possono inserire in una conferma (compilatore incluso). Raggiunto il numero, il pulsante "Aggiungi" sparisce |
| `fasceEta: [ "0-2 anni", "3-6 anni", "7-12 anni", "oltre 12 anni" ]` | Le fasce d'età proposte per i bambini/ragazzi. Puoi cambiarle o aggiungerne (una per riga, tra virgolette, con la virgola) |
| `diete: [ "Nessuna", "Vegetariano", ... , "Altro" ]` | Le voci del menu "Dieta". La prima è quella proposta. **Non rinominare "Altro"**: è la voce che fa comparire il campo di testo |
| `testiOspiti` | Le etichette delle schede ("Tu", "Ospite", "+ Aggiungi partner / familiare", ecc.) |

### A.10 Aggiungere o sostituire le foto della galleria

Le foto della sezione "Qualche foto di noi" stanno nella cartella `img/galleria` (`foto-01.jpg`, `foto-02.jpg`… e le versioni piccole `thumb-01.jpg`, `thumb-02.jpg`…). Per **aggiungere** una foto:

1. Copia il file nella cartella `img/galleria`, ad esempio `foto-12.jpg` (meglio se non più larga di 1600 px, così la pagina resta veloce).
2. In `js/content.js`, nel blocco `galleria` → `foto`, aggiungi una riga in fondo all'elenco (con la virgola dopo la riga precedente):
   ```js
   { src: "img/galleria/foto-12.jpg", thumb: "img/galleria/foto-12.jpg", alt: "Annalisa e Manolo" }
   ```
   `thumb` è la versione piccola mostrata nella griglia: se non ne hai una, ripeti il nome di `src`.
3. Su GitHub carica **sia** il nuovo file in `img/galleria` **sia** `js/content.js` (Add file → Upload files, trascinando la cartella `img` e la cartella `js`).

Per **sostituire** una foto basta sovrascrivere il file in `img/galleria` con lo stesso nome. Per **toglierla**, cancella la sua riga in `content.js` (e la virgola in più). L'ordine delle righe è l'ordine in cui compaiono sul sito.

---

## B. Ricevere le conferme in un foglio Google

Il sito è "statico", cioè non può salvare dati da solo. Per questo il modulo invia le risposte a un piccolo programma gratuito di Google (Apps Script) che le scrive in un foglio Google Sheets. Serve un account Google (Gmail).

### B.1 Creare il foglio

1. Vai su [sheets.google.com](https://sheets.google.com) e accedi con il tuo account Google.
2. Clicca su **"+ Vuoto"** per creare un nuovo foglio.
3. In alto a sinistra, clicca su "Foglio senza titolo" e rinominalo, es. **"Conferme matrimonio"**.

### B.2 Incollare il codice

1. Nel menu del foglio clicca su **Estensioni** → **Apps Script**. Si apre una nuova scheda con un editor.
2. Nell'editor vedi un file `Code.gs` con un po' di testo (`function myFunction() {...}`). **Cancella tutto** quel testo.
3. Sul tuo computer apri il file `apps-script/Code.gs` con Blocco note, seleziona tutto (Ctrl+A), copia (Ctrl+C).
4. Torna nell'editor Apps Script e incolla (Ctrl+V).
5. Clicca sull'icona del **dischetto** (Salva progetto) in alto. Se chiede un nome al progetto, scrivi "RSVP matrimonio".

### B.3 Pubblicare lo script

1. In alto a destra clicca sul pulsante blu **Esegui il deployment** (o **Deploy**) → **Nuovo deployment**.
2. Clicca sull'ingranaggio ⚙️ accanto a "Seleziona tipo" → scegli **Applicazione web**.
3. Compila così:
   - **Descrizione**: `RSVP`
   - **Esegui come**: **Me** (il tuo indirizzo email)
   - **Chi può accedere**: **Chiunque** (⚠ non "Chiunque con un account Google")
4. Clicca **Esegui il deployment**.
5. Google chiede l'autorizzazione: clicca **Autorizza accesso**, scegli il tuo account.
   Comparirà una schermata "Google non ha verificato questa app": clicca su **Avanzate** (piccolo, in basso a sinistra) → **Vai a RSVP matrimonio (non sicuro)** → **Consenti**. È normale: l'app è la tua, non è stata inviata a Google per la verifica.
6. Alla fine compare un riquadro con l'**URL dell'applicazione web**, che inizia con `https://script.google.com/macros/s/...../exec`. Clicca **Copia**.

### B.4 Collegare il sito

1. Apri `js/content.js` e trova la riga:
   ```js
   scriptUrl: "INCOLLA_QUI_URL_APPS_SCRIPT",
   ```
2. Sostituisci `INCOLLA_QUI_URL_APPS_SCRIPT` con l'indirizzo copiato, lasciando le virgolette:
   ```js
   scriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
   ```
3. Salva.

### B.5 Verificare che funzioni

1. **Test rapido**: incolla l'indirizzo dello script nella barra del browser e premi Invio. Deve comparire la scritta **`ok`**. Se compare un errore, ripeti il punto B.3 controllando "Chi può accedere: Chiunque".
2. **Test completo**: apri il sito, compila il modulo con dati di prova e clicca "Invia la conferma". Entro qualche secondo nel foglio Google comparirà una scheda **"Risposte"** con una riga per ogni persona indicata. Cancella poi le righe di prova.

Le colonne del foglio "Risposte" sono, nell'ordine:

| Colonna | Contenuto |
|---|---|
| `timestamp` | Data e ora di arrivo della risposta |
| `nome_compilatore`, `email`, `telefono` | Chi ha compilato il modulo (uguali su tutte le righe della stessa conferma) |
| `partecipa` | "Sì, con gioia!" oppure "Purtroppo no" |
| `nome_ospite` | Nome della singola persona (una riga per persona) |
| `tipo` | `adulto` oppure `bambino/ragazzo` |
| `fascia_eta` | Fascia d'età scelta (vuota per gli adulti), es. `3-6 anni` |
| `dieta` | Voce scelta nel menu "Dieta / restrizioni alimentari" |
| `dieta_altro` | Testo scritto se la dieta è "Altro" |
| `note_alimentari` | Note libere (allergie, ecc.) |
| `navetta`, `alloggio`, `accessibilita`, `canzone`, `messaggio` | Risposte comuni a tutta la conferma |

Per contare gli adulti e i bambini usa un filtro sulla colonna `tipo`; per i menù bimbi guarda `fascia_eta`.

I nomi delle colonne sono scritti in `Code.gs` (elenco `INTESTAZIONI`) e devono restare identici a quelli usati dal sito in `js/main.js`: non cambiarli.

### B.6 Se modifichi il codice in futuro

Ogni volta che cambi `Code.gs` nell'editor devi fare **Esegui il deployment → Gestisci deployment → ✏️ (matita) → Versione: Nuova versione → Esegui il deployment**. L'indirizzo resta lo stesso. Se cambiano le colonne, l'intestazione del foglio "Risposte" non viene riscritta da sola: cancella la scheda "Risposte" (verrà ricreata al primo invio) oppure correggi a mano la prima riga.

---

## C. Pubblicare il sito su internet (GitHub Pages, gratis)

### C.1 Creare l'account

1. Vai su [github.com](https://github.com) → **Sign up**.
2. Inserisci email, password e un nome utente (es. `annalisaemanolo`). Conferma il codice ricevuto via email.

### C.2 Creare il "repository" (la cartella online)

1. In alto a destra clicca **+** → **New repository**.
2. **Repository name**: `matrimonio` (tutto minuscolo, senza spazi).
3. Lascia **Public** selezionato (è obbligatorio per il piano gratuito; il sito è comunque protetto dalla password, vedi punto F).
4. Spunta **Add a README file**.
5. Clicca **Create repository**.

### C.3 Caricare i file

1. Nella pagina del repository clicca **Add file** → **Upload files**.
2. Apri la cartella `Matrimonio` sul computer, seleziona **tutto il contenuto** (`index.html`, `GUIDA.md`, le cartelle `css`, `js`, `img`, `apps-script`) e **trascinalo** nella pagina del browser.
   Non caricare il file "WhatsApp Image ..." originale: non serve.
3. Attendi che tutti i file risultino caricati, poi in basso clicca **Commit changes**.

### C.4 Attivare il sito

1. Nel repository clicca **Settings** (in alto, con l'ingranaggio).
2. Nel menu a sinistra clicca **Pages**.
3. In **Build and deployment** → **Source** scegli **Deploy from a branch**.
4. In **Branch** scegli **main** e, accanto, **/ (root)**. Clicca **Save**.
5. Attendi 1-2 minuti e ricarica la pagina: in alto compare **"Your site is live at https://TUONOME.github.io/matrimonio/"**. Quello è l'indirizzo del sito.

### C.5 Aggiornare il sito dopo una modifica

1. Nel repository apri la cartella `js` e clicca su `content.js`.
2. Clicca sull'icona della **matita** ✏️ (Edit) in alto a destra.
3. Modifica il testo direttamente online (stesse regole del punto A), poi clicca **Commit changes...** → **Commit changes**.
4. Dopo 1-2 minuti il sito è aggiornato.

In alternativa, modifica il file sul computer e ricaricalo con **Add file → Upload files**: il nuovo file sostituisce il vecchio.

---

## D. Nome di dominio personalizzato (facoltativo)

Invece di `tuonome.github.io/matrimonio` puoi avere ad esempio `annalisaemanolo.it`. Costo indicativo: **10-15 € all'anno**.

### D.1 Comprare il dominio

Registrati su uno di questi siti e cerca il nome che vuoi:

- [Porkbun](https://porkbun.com) (economico, in inglese)
- [Namecheap](https://www.namecheap.com) (in inglese)
- [Register.it](https://www.register.it) (in italiano)

Scegli `.it` o `.com`, acquista **solo il dominio** (rifiuta hosting, email e altri extra: non servono).

### D.2 Impostare i "record DNS"

Nel pannello del tuo dominio cerca la sezione **DNS** (o "Gestione DNS", "DNS records") e aggiungi questi record (puoi cancellare eventuali record A o CNAME preesistenti sul dominio):

| Tipo | Nome / Host | Valore |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `TUONOME.github.io` (il tuo nome utente GitHub) |

Questi indirizzi sono quelli ufficiali di GitHub Pages; in caso di dubbio controlla la [documentazione ufficiale](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### D.3 Collegare il dominio a GitHub

1. Nel repository: **Settings** → **Pages** → **Custom domain**.
2. Scrivi il tuo dominio, es. `annalisaemanolo.it`, e clicca **Save**.
3. Attendi che il controllo DNS diventi verde (può richiedere da pochi minuti a 24 ore).
4. Spunta **Enforce HTTPS** (se è grigia, aspetta ancora un po' e ricarica).

Da quel momento il sito risponde su `https://annalisaemanolo.it`.

---

## E. Provare il sito sul tuo computer

Fai **doppio clic su `index.html`**: si apre nel browser. Puoi inserire la password, navigare, provare il modulo.

Note:

- La mappa e i caratteri eleganti si caricano da internet: senza connessione la mappa resta vuota e i caratteri sono quelli di sistema.
- Il modulo funziona anche da computer, se hai già fatto il punto B. Finché `scriptUrl` non è impostato, al clic su "Invia" compare l'avviso *"Form non ancora collegato"*.
- La password resta memorizzata finché non chiudi la scheda del browser.

---

## F. ⚠ Avvertenza sulla password

La protezione con password serve a tenere lontani i **visitatori occasionali** e i motori di ricerca, non è una vera misura di sicurezza:

- la password è scritta nel file `js/content.js`, che chiunque un po' esperto può leggere;
- le pagine sono comunque pubbliche su GitHub.

Per questo motivo:

- **non mettere nel sito dati sensibili** (documenti, indirizzi di casa privati, ecc.). L'IBAN della lista nozze è un dato che normalmente si condivide, ma valuta tu;
- **stampa la password sull'invito** (es. *"Tutte le informazioni su annalisaemanolo.it – parola d'ordine: agazzano2027"*);
- le risposte al modulo invece sono al sicuro: vengono salvate solo nel tuo foglio Google privato. Tieni però presente che l'indirizzo che riceve le conferme è pubblico, quindi nel foglio potrebbero comparire righe indesiderate o di disturbo: dai un'occhiata al foglio prima di contare gli invitati.

---

## Problemi comuni

| Problema | Soluzione |
|---|---|
| La pagina è bianca / dice che `content.js` contiene un errore | Hai cancellato una virgola, una virgoletta o una parentesi in `content.js`. Confronta con un blocco simile. |
| Il modulo dice "Form non ancora collegato" | Non hai incollato l'indirizzo in `scriptUrl` (punto B.4). |
| Nel foglio non compaiono righe (anche se il modulo dice "Grazie!") | È il sintomo tipico di un deployment sbagliato. Fai il test rapido B.5: apri l'indirizzo dello script nel browser, deve rispondere `ok`. Se no, rifai il deployment come **nuova versione** (B.6) controllando "Chi può accedere: **Chiunque**" e che l'indirizzo finisca con `/exec`. |
| Il modulo dice "qualcosa è andato storto" | Lo script ha ricevuto i dati ma non è riuscito a scriverli nel foglio. Controlla che il foglio esista ancora e riprova; se persiste, rifai il deployment come nuova versione (B.6). |
| La mappa non compare | Controlla che `ricercaMaps` in `content.js` abbia un testo che Google Maps riconosce. |
| Il sito su GitHub non si aggiorna | Attendi 2 minuti e ricarica con Ctrl+F5. |
