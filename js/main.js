/* =====================================================================
   LOGICA DEL SITO - NON SERVE MODIFICARE QUESTO FILE
   Tutti i testi vengono letti da js/content.js (oggetto CONTENT).
   ===================================================================== */
(function () {
  'use strict';

  var SCRIPT_URL_PLACEHOLDER = 'INCOLLA_QUI_URL_APPS_SCRIPT';
  var SESSION_KEY = 'matrimonio_sbloccato';

  /* ---------- Utilità ---------- */
  function $(id) { return document.getElementById(id); }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text == null ? '' : text;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'text') node.textContent = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (c) node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  /* ---------- Cancello password ---------- */
  function initGate() {
    var gate = $('gate');
    var site = $('site');
    var form = $('gate-form');
    var input = $('gate-password');
    var error = $('gate-error');
    var box = form;

    setText('gate-names', CONTENT.nomi.coppia);

    function unlock() {
      gate.setAttribute('hidden', '');
      site.removeAttribute('hidden');
    }

    var sbloccato = false;
    try { sbloccato = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { /* storage non disponibile */ }
    if (sbloccato) {
      unlock();
      return;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var tentativo = (input.value || '').trim().toLowerCase();
      var corretta = String(CONTENT.password || '').trim().toLowerCase();
      if (tentativo && tentativo === corretta) {
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) { /* ignora */ }
        error.textContent = '';
        unlock();
        return;
      }
      error.textContent = 'Parola d\'ordine non corretta. Controlla l\'invito e riprova.';
      input.setAttribute('aria-invalid', 'true');
      box.classList.remove('shake');
      // forza il riavvio dell'animazione
      void box.offsetWidth;
      box.classList.add('shake');
      input.select();
    });

    input.focus();
  }

  /* ---------- Navigazione ---------- */
  function initNav() {
    var toggle = $('nav-toggle');
    var menu = $('nav-menu');
    setText('nav-brand', CONTENT.nomi.sposa.charAt(0) + ' & ' + CONTENT.nomi.sposo.charAt(0));

    function chiudi() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Apri il menu');
    }

    toggle.addEventListener('click', function () {
      var aperto = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', aperto ? 'true' : 'false');
      toggle.setAttribute('aria-label', aperto ? 'Chiudi il menu' : 'Apri il menu');
    });

    menu.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') chiudi();
    });
  }

  /* ---------- Home + conto alla rovescia ---------- */
  function initHome() {
    setText('home-sottotitolo', CONTENT.home.sottotitolo);
    setText('home-nomi', CONTENT.nomi.coppia);
    setText('home-data', CONTENT.giornoSettimana + ' ' + CONTENT.dataTesto);
    setText('home-luogo', CONTENT.luogo.nomeBreve);
    setText('home-sotto-luogo', CONTENT.home.sottoLuogo);
    setText('home-benvenuto', CONTENT.home.benvenuto);
    if (!CONTENT.home.benvenuto) $('home-benvenuto').setAttribute('hidden', '');
    setText('home-cta', CONTENT.home.pulsanteRsvp);
    $('hero-img').alt = 'Save the date: ' + CONTENT.nomi.coppia + ', ' + CONTENT.dataTesto + ', ' + CONTENT.luogo.nomeBreve;

    var target = new Date(CONTENT.dataISO).getTime();
    var countdown = $('countdown');
    var done = $('countdown-done');

    function aggiorna() {
      var diff = target - Date.now();
      if (isNaN(target) || diff <= 0) {
        countdown.setAttribute('hidden', '');
        done.textContent = isNaN(target) ? '' : 'Oggi è il grande giorno!';
        done.removeAttribute('hidden');
        return;
      }
      var minutiTot = Math.floor(diff / 60000);
      var giorni = Math.floor(minutiTot / 1440);
      var ore = Math.floor((minutiTot % 1440) / 60);
      var minuti = minutiTot % 60;
      setText('cd-giorni', String(giorni));
      setText('cd-ore', pad(ore));
      setText('cd-minuti', pad(minuti));
    }
    aggiorna();
    setInterval(aggiorna, 30000);
  }

  /* ---------- Galleria foto + lightbox ---------- */
  function initGalleria() {
    var G = CONTENT.galleria;
    var foto = (G && G.foto) || [];
    setText('galleria-titolo', G.titolo);
    var sotto = $('galleria-sottotitolo');
    if (G.sottotitolo) { sotto.textContent = G.sottotitolo; sotto.removeAttribute('hidden'); }

    var griglia = $('galleria-griglia');
    clear(griglia);

    var box = $('lightbox');
    var img = $('lightbox-img');
    var contatore = $('lightbox-contatore');
    var corrente = -1;
    var ultimoFocus = null;

    function mostra(i) {
      corrente = (i + foto.length) % foto.length;
      var f = foto[corrente];
      img.src = f.src;
      img.alt = f.alt || '';
      contatore.textContent = (corrente + 1) + ' / ' + foto.length;
    }

    function apri(i, origine) {
      ultimoFocus = origine || document.activeElement;
      mostra(i);
      box.removeAttribute('hidden');
      document.body.classList.add('no-scroll'); // blocca lo scorrimento della pagina
      $('lightbox-chiudi').focus();
    }

    function chiudi() {
      box.setAttribute('hidden', '');
      document.body.classList.remove('no-scroll');
      img.src = '';
      if (ultimoFocus && ultimoFocus.focus) ultimoFocus.focus();
    }

    foto.forEach(function (f, i) {
      var btn = el('button', { type: 'button', 'class': 'galleria__item', 'aria-label': 'Apri foto ' + (i + 1) + ' di ' + foto.length }, [
        el('img', { src: f.thumb || f.src, alt: f.alt || '', loading: 'lazy', decoding: 'async' })
      ]);
      btn.addEventListener('click', function () { apri(i, btn); });
      griglia.appendChild(btn);
    });

    if (!foto.length) return;

    $('lightbox-chiudi').addEventListener('click', chiudi);
    $('lightbox-prec').addEventListener('click', function () { mostra(corrente - 1); });
    $('lightbox-succ').addEventListener('click', function () { mostra(corrente + 1); });
    // clic sullo sfondo (fuori dalla foto) chiude
    box.addEventListener('click', function (ev) {
      if (ev.target === box) chiudi();
    });

    document.addEventListener('keydown', function (ev) {
      if (box.hasAttribute('hidden')) return;
      if (ev.key === 'Escape') chiudi();
      else if (ev.key === 'ArrowLeft') mostra(corrente - 1);
      else if (ev.key === 'ArrowRight') mostra(corrente + 1);
    });

    // scorrimento con il dito (swipe) su telefono/tablet
    var touchX = null;
    box.addEventListener('touchstart', function (ev) {
      touchX = ev.touches.length === 1 ? ev.touches[0].clientX : null;
    }, { passive: true });
    box.addEventListener('touchend', function (ev) {
      if (touchX === null) return;
      var dx = ev.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 40) return;
      mostra(dx < 0 ? corrente + 1 : corrente - 1);
    });
  }

  /* ---------- Programma ---------- */
  function initProgramma() {
    setText('programma-titolo', CONTENT.programma.titolo);
    setText('programma-intro', CONTENT.programma.introduzione);
    var lista = $('programma-lista');
    clear(lista);
    CONTENT.programma.tappe.forEach(function (t) {
      lista.appendChild(el('li', null, [
        el('span', { 'class': 'timeline__ora', text: t.ora }),
        el('h3', { 'class': 'timeline__titolo', text: t.titolo }),
        t.luogo ? el('p', { 'class': 'timeline__luogo', text: t.luogo }) : null,
        el('p', { text: t.descrizione })
      ]));
    });
  }

  /* ---------- Location ---------- */
  function initLocation() {
    var L = CONTENT.location;
    setText('location-titolo', L.titolo);
    setText('location-auto', L.inAuto);
    setText('location-spostamento', L.spostamento);

    // Una scheda per luogo (cerimonia e ricevimento), ciascuna con la sua mappa
    var lista = $('luoghi-lista');
    clear(lista);
    [CONTENT.luoghi.cerimonia, CONTENT.luoghi.ricevimento].forEach(function (V) {
      if (!V) return;
      var q = encodeURIComponent(V.ricercaMaps || V.nome);
      lista.appendChild(el('article', { 'class': 'card luogo' }, [
        el('p', { 'class': 'luogo__etichetta', text: V.etichetta }),
        el('h3', { text: V.nome }),
        V.orario ? el('p', { 'class': 'luogo__orario', text: V.orario }) : null,
        V.indirizzo ? el('p', { 'class': 'card__meta', text: V.indirizzo }) : null,
        V.descrizione ? el('p', { text: V.descrizione }) : null,
        V.linkInfo ? el('p', { 'class': 'card__meta' }, [
          el('a', { href: V.linkInfo, target: '_blank', rel: 'noopener', text: V.linkInfoTesto || 'Scopri di più' })
        ]) : null,
        V.parcheggio ? el('p', { 'class': 'card__meta' }, ['Parcheggio: ', V.parcheggio]) : null,
        el('div', { 'class': 'map' }, [
          el('iframe', {
            src: 'https://www.google.com/maps?q=' + q + '&output=embed',
            title: 'Mappa: ' + V.nome,
            loading: 'lazy',
            referrerpolicy: 'no-referrer-when-downgrade',
            allowfullscreen: ''
          })
        ]),
        el('a', { 'class': 'btn', href: 'https://www.google.com/maps/search/?api=1&query=' + q, target: '_blank', rel: 'noopener', text: L.pulsanteMaps })
      ]));
    });
  }

  /* ---------- Dove dormire ---------- */
  function initDormire() {
    var D = CONTENT.dormire;
    setText('dormire-titolo', D.titolo);
    setText('dormire-intro', D.introduzione);
    var lista = $('dormire-lista');
    clear(lista);
    D.hotel.forEach(function (h) {
      var mapsQuery = encodeURIComponent([h.nome, h.indirizzo].filter(Boolean).join(', '));
      var link = el('p', { 'class': 'card__links' }, [
        h.sito ? el('a', { href: h.sito, target: '_blank', rel: 'noopener', text: 'Vai al sito' }) : null,
        el('a', { href: 'https://www.google.com/maps/search/?api=1&query=' + mapsQuery, target: '_blank', rel: 'noopener', text: 'Apri su Google Maps' })
      ]);
      lista.appendChild(el('article', { 'class': 'card' }, [
        el('h3', { text: h.nome }),
        h.indirizzo ? el('p', { 'class': 'card__meta', text: h.indirizzo }) : null,
        h.telefono ? el('p', { 'class': 'card__meta' }, ['Tel. ', el('a', { href: 'tel:' + h.telefono.replace(/[^+\d]/g, ''), text: h.telefono })]) : null,
        h.note ? el('p', { text: h.note }) : null,
        link
      ]));
    });
  }

  /* ---------- Lista nozze ---------- */
  function initRegalo() {
    var R = CONTENT.regalo;
    setText('regalo-titolo', R.titolo);
    setText('regalo-testo', R.testo);
    setText('regalo-intestatario', R.intestatario);
    setText('regalo-iban', R.iban);
    setText('regalo-bic', R.bic);
    // R.dettagliExtra (banca, valuta, causale, BIC corrispondente) non viene mostrato: scheda volutamente essenziale
    var btn = $('regalo-copia');
    var fb = $('regalo-feedback');
    btn.textContent = R.pulsanteCopia;

    btn.addEventListener('click', function () {
      var iban = R.iban.replace(/\s+/g, '');
      function ok() {
        fb.textContent = R.copiato;
        setTimeout(function () { fb.textContent = ''; }, 2500);
      }
      function fallback() {
        var tmp = el('textarea', { text: iban });
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); ok(); } catch (e) { fb.textContent = 'Copia manuale: ' + iban; }
        document.body.removeChild(tmp);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(iban).then(ok, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    setText('faq-titolo', CONTENT.faq.titolo);
    var lista = $('faq-lista');
    clear(lista);
    CONTENT.faq.domande.forEach(function (f) {
      lista.appendChild(el('details', null, [
        el('summary', { text: f.domanda }),
        el('p', { text: f.risposta })
      ]));
    });
    // in stampa apri tutte le risposte
    window.addEventListener('beforeprint', function () {
      lista.querySelectorAll('details').forEach(function (d) { d.setAttribute('open', ''); });
    });
  }

  /* ---------- Contatti ---------- */
  function initContatti() {
    var C = CONTENT.contatti;
    setText('contatti-titolo', C.titolo);
    setText('contatti-intro', C.introduzione);
    var lista = $('contatti-lista');
    clear(lista);
    C.persone.forEach(function (p) {
      lista.appendChild(el('article', { 'class': 'card' }, [
        el('p', { 'class': 'card__ruolo', text: p.ruolo }),
        el('h3', { text: p.nome }),
        p.telefono ? el('p', null, [el('a', { href: 'tel:' + p.telefono.replace(/[^+\d]/g, ''), text: p.telefono })]) : null
      ]));
    });
  }

  /* ---------- Footer ---------- */
  function initFooter() {
    setText('footer-testo', CONTENT.nomi.coppia + ' · ' + CONTENT.dataTesto);
    document.title = CONTENT.nomi.coppia + ' · ' + CONTENT.dataTesto;
  }

  /* ---------- RSVP ---------- */
  function initRsvp() {
    var R = CONTENT.rsvp;
    setText('rsvp-titolo', R.titolo);
    setText('rsvp-intro', R.introduzione);
    setText('rsvp-scadenza', R.scadenzaTesto);

    var form = $('rsvp-form');
    var partecipa = $('f-partecipa');
    var dettagli = $('rsvp-dettagli');
    var tuCibo = $('rsvp-tu-cibo');
    var boxPersone = $('rsvp-persone');
    var btnAggiungi = $('rsvp-aggiungi');
    var riepilogo = $('rsvp-riepilogo');
    var nome = $('f-nome');
    var cognome = $('f-cognome');
    var email = $('f-email');
    var feedback = $('rsvp-feedback');
    var submit = $('rsvp-submit');

    var T = R.testiOspiti;
    var max = parseInt(R.massimoPersone, 10) || 8;
    var contatore = 0; // per generare id univoci anche dopo le rimozioni

    setText('rsvp-tu-titolo', T.tu);
    setText('f-nome-label', T.nome + ' *');
    setText('f-cognome-label', T.cognome + ' *');
    btnAggiungi.textContent = T.aggiungi;

    // Schede degli altri ospiti (chi compila ha la scheda fissa "Tu" in index.html)
    function schede() { return boxPersone.querySelectorAll('.persona'); }

    function isAltro(valore) { return String(valore || '').trim().toLowerCase() === 'altro'; }

    // Campi alimentari (dieta + "Specifica" se Altro + note libere), usati sia
    // nella scheda "Tu" sia in quelle degli altri ospiti.
    function aggiungiCampiCibo(contenitore, idBase) {
      var selDieta = el('select', { id: idBase + '-dieta', 'class': 'p-dieta' });
      R.diete.forEach(function (d) {
        selDieta.appendChild(el('option', { value: d, text: d }));
      });
      var inputAltro = el('input', { type: 'text', id: idBase + '-dieta-altro', 'class': 'p-dieta-altro', autocomplete: 'off' });
      var rowAltro = el('div', { 'class': 'form__row p-dieta-altro-row', hidden: '' }, [
        el('label', { 'for': idBase + '-dieta-altro', text: T.dietaAltro + ' *' }),
        inputAltro
      ]);
      selDieta.addEventListener('change', function () {
        if (isAltro(selDieta.value)) rowAltro.removeAttribute('hidden');
        else { rowAltro.setAttribute('hidden', ''); inputAltro.value = ''; segnala(inputAltro, false); }
      });
      contenitore.appendChild(el('div', { 'class': 'form__grid' }, [
        el('div', { 'class': 'form__row' }, [
          el('label', { 'for': idBase + '-dieta', text: T.dieta }),
          selDieta
        ]),
        rowAltro
      ]));
      contenitore.appendChild(el('div', { 'class': 'form__row' }, [
        el('label', { 'for': idBase + '-note', text: T.noteAlimentari }),
        el('input', { type: 'text', id: idBase + '-note', 'class': 'p-note', autocomplete: 'off' })
      ]));
    }

    aggiungiCampiCibo(tuCibo, 'tu');

    // Costruisce la scheda di un ospite aggiuntivo (Ospite 2, 3...), con "Rimuovi".
    function creaScheda() {
      contatore++;
      var idBase = 'p' + contatore;
      var fs = el('fieldset', { 'class': 'persona' });
      fs.appendChild(el('legend', { 'class': 'persona__titolo' }));

      var rimuovi = el('button', { type: 'button', 'class': 'persona__rimuovi', text: T.rimuovi });
      rimuovi.addEventListener('click', function () {
        boxPersone.removeChild(fs);
        aggiornaSchede();
      });
      fs.appendChild(rimuovi);

      // nome e cognome (affiancati su schermo largo, uno sotto l'altro su telefono)
      fs.appendChild(el('div', { 'class': 'form__grid' }, [
        el('div', { 'class': 'form__row' }, [
          el('label', { 'for': idBase + '-nome', text: T.nome + ' *' }),
          el('input', { type: 'text', id: idBase + '-nome', 'class': 'p-nome', required: '', autocomplete: 'off' })
        ]),
        el('div', { 'class': 'form__row' }, [
          el('label', { 'for': idBase + '-cognome', text: T.cognome + ' *' }),
          el('input', { type: 'text', id: idBase + '-cognome', 'class': 'p-cognome', required: '', autocomplete: 'off' })
        ])
      ]));

      // bambino/ragazzo + fascia d'età
      var chkBambino = el('input', { type: 'checkbox', id: idBase + '-bambino', 'class': 'p-bambino' });
      var selFascia = el('select', { id: idBase + '-fascia', 'class': 'p-fascia' });
      selFascia.appendChild(el('option', { value: '', text: 'Seleziona...' }));
      R.fasceEta.forEach(function (f) {
        selFascia.appendChild(el('option', { value: f, text: f }));
      });
      var rowFascia = el('div', { 'class': 'form__row p-fascia-row', hidden: '' }, [
        el('label', { 'for': idBase + '-fascia', text: T.fasciaEta + ' *' }),
        selFascia
      ]);
      fs.appendChild(el('div', { 'class': 'form__grid persona__eta' }, [
        el('div', { 'class': 'form__row' }, [
          el('label', { 'class': 'check-inline', 'for': idBase + '-bambino' }, [chkBambino, document.createTextNode(T.bambino)])
        ]),
        rowFascia
      ]));
      chkBambino.addEventListener('change', function () {
        if (chkBambino.checked) rowFascia.removeAttribute('hidden');
        else { rowFascia.setAttribute('hidden', ''); selFascia.value = ''; segnala(selFascia, false); }
        aggiornaRiepilogo();
      });

      aggiungiCampiCibo(fs, idBase);

      return fs;
    }

    // Persone totali = chi compila + schede aggiuntive
    function totale() { return schede().length + 1; }

    function aggiungiScheda() {
      if (totale() >= max) return;
      boxPersone.appendChild(creaScheda());
      aggiornaSchede();
    }

    // Rinumera i titoli, mostra/nasconde il pulsante "Aggiungi" e aggiorna il riepilogo
    function aggiornaSchede() {
      schede().forEach(function (fs, i) {
        fs.querySelector('.persona__titolo').textContent = T.ospite + ' ' + (i + 2);
      });
      if (totale() >= max) btnAggiungi.setAttribute('hidden', '');
      else btnAggiungi.removeAttribute('hidden');
      aggiornaRiepilogo();
    }

    // Riga "Confermi per N persone: A adulti, B bambini/ragazzi" (chi compila conta come adulto)
    function aggiornaRiepilogo() {
      if (partecipa.value !== 'si') {
        riepilogo.setAttribute('hidden', '');
        return;
      }
      var tot = totale(), bimbi = 0;
      schede().forEach(function (fs) {
        if (fs.querySelector('.p-bambino').checked) bimbi++;
      });
      var adulti = tot - bimbi;
      var parti = [];
      if (adulti > 0) parti.push(adulti + (adulti === 1 ? ' adulto' : ' adulti'));
      if (bimbi > 0) parti.push(bimbi + (bimbi === 1 ? ' bambino/ragazzo' : ' bambini/ragazzi'));
      riepilogo.textContent = T.riepilogo + ' ' + tot + (tot === 1 ? ' persona' : ' persone') + ': ' + parti.join(', ');
      riepilogo.removeAttribute('hidden');
    }

    btnAggiungi.addEventListener('click', aggiungiScheda);

    partecipa.addEventListener('change', function () {
      if (partecipa.value === 'si') {
        tuCibo.removeAttribute('hidden');
        dettagli.removeAttribute('hidden');
        aggiornaSchede();
      } else {
        tuCibo.setAttribute('hidden', '');
        dettagli.setAttribute('hidden', '');
        riepilogo.setAttribute('hidden', '');
      }
    });

    // --- Validazione ---
    function segnala(campo, invalido) {
      if (invalido) campo.setAttribute('aria-invalid', 'true');
      else campo.removeAttribute('aria-invalid');
    }

    function valida() {
      var primoErrore = null;
      function check(campo, cond) {
        segnala(campo, !cond);
        if (!cond && !primoErrore) primoErrore = campo;
      }
      // "Specifica" obbligatorio se la dieta è "Altro"
      function checkAltro(box) {
        var altro = box.querySelector('.p-dieta-altro');
        check(altro, !isAltro(box.querySelector('.p-dieta').value) || altro.value.trim() !== '');
      }
      check(partecipa, partecipa.value !== '');
      check(nome, nome.value.trim() !== '');
      check(cognome, cognome.value.trim() !== '');
      check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
      if (partecipa.value === 'si') {
        checkAltro(tuCibo);
        schede().forEach(function (fs) {
          var pn = fs.querySelector('.p-nome');
          check(pn, pn.value.trim() !== '');
          var pc = fs.querySelector('.p-cognome');
          check(pc, pc.value.trim() !== '');
          var fascia = fs.querySelector('.p-fascia');
          check(fascia, !fs.querySelector('.p-bambino').checked || fascia.value !== '');
          checkAltro(fs);
        });
      }
      if (primoErrore) {
        primoErrore.focus();
        feedback.className = 'form__feedback error';
        feedback.textContent = 'Controlla i campi evidenziati: mancano alcune informazioni obbligatorie.';
        return false;
      }
      return true;
    }

    // --- Raccolta dati ---
    // ATTENZIONE: le chiavi qui sotto (comprese quelle di ogni ospite) devono
    // corrispondere ESATTAMENTE alle colonne INTESTAZIONI di apps-script/Code.gs
    // (tranne "timestamp", aggiunta dallo script). Se ne cambi una, cambiala anche lì.
    function rigaOspite(nomeOspite, cognomeOspite, bambino, fascia, box) {
      var dieta = box.querySelector('.p-dieta').value;
      return {
        nome_ospite: nomeOspite,
        cognome_ospite: cognomeOspite,
        tipo: bambino ? 'bambino/ragazzo' : 'adulto',
        fascia_eta: bambino ? fascia : '',
        dieta: dieta,
        dieta_altro: isAltro(dieta) ? box.querySelector('.p-dieta-altro').value.trim() : '',
        note_alimentari: box.querySelector('.p-note').value.trim()
      };
    }

    function raccogli() {
      var partecipaTesto = partecipa.options[partecipa.selectedIndex].text;
      var dati = {
        nome_compilatore: nome.value.trim(),
        cognome_compilatore: cognome.value.trim(),
        email: email.value.trim(),
        telefono: $('f-telefono').value.trim(),
        partecipa: partecipaTesto,
        navetta: '',
        alloggio: '',
        accessibilita: '',
        canzone: '',
        messaggio: $('f-messaggio').value.trim(),
        ospiti: []
      };
      if (partecipa.value === 'si') {
        // Navetta non prevista: la colonna resta vuota nel foglio (compatibilità con Code.gs)
        dati.alloggio = $('f-alloggio').value;
        dati.accessibilita = $('f-accessibilita').value.trim();
        dati.canzone = $('f-canzone').value.trim();
        // Prima riga: chi compila (sempre adulto), poi gli altri ospiti
        dati.ospiti.push(rigaOspite(nome.value.trim(), cognome.value.trim(), false, '', tuCibo));
        schede().forEach(function (fs) {
          dati.ospiti.push(rigaOspite(
            fs.querySelector('.p-nome').value.trim(),
            fs.querySelector('.p-cognome').value.trim(),
            fs.querySelector('.p-bambino').checked,
            fs.querySelector('.p-fascia').value,
            fs
          ));
        });
      }
      return dati;
    }

    // --- Invio ---
    function invia(dati) {
      var url = CONTENT.scriptUrl;
      var body = JSON.stringify(dati);
      var opzioni = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: body
      };
      // Fallback: in no-cors non possiamo leggere la risposta, consideriamo inviato.
      // Si usa solo se la richiesta cors fallisce (errore di rete/CORS) o la risposta non è leggibile.
      function inviaNoCors(err) {
        console.warn('Invio in modalità cors fallito, riprovo in no-cors:', err);
        return fetch(url, Object.assign({ mode: 'no-cors' }, opzioni)).then(function () { return true; });
      }
      // Primo tentativo in modalità "cors": leggiamo la risposta {ok:true}
      return fetch(url, Object.assign({ mode: 'cors', redirect: 'follow' }, opzioni))
        .then(function (res) {
          if (!res.ok) return inviaNoCors(new Error('HTTP ' + res.status));
          return res.json().then(function (j) {
            if (j && j.ok === true) return true;
            // Lo script ha risposto in modo leggibile con ok:false: errore vero, nessun fallback
            if (j && j.ok === false) throw new Error('Lo script ha risposto con errore: ' + (j.errore || 'ok=false'));
            return inviaNoCors(new Error('Risposta inattesa'));
          }, function () { return inviaNoCors(new Error('Risposta non leggibile')); });
        }, inviaNoCors);
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      feedback.className = 'form__feedback';
      feedback.textContent = '';
      if (!valida()) return;

      if (!CONTENT.scriptUrl || CONTENT.scriptUrl === SCRIPT_URL_PLACEHOLDER) {
        var msg = 'Form non ancora collegato: vedi GUIDA.md punto (b)';
        console.warn(msg);
        alert(msg);
        feedback.className = 'form__feedback error';
        feedback.textContent = msg;
        return;
      }

      var dati = raccogli();
      submit.disabled = true;
      feedback.textContent = 'Invio in corso...';
      invia(dati).then(function () {
        feedback.className = 'form__feedback ok';
        feedback.textContent = R.messaggioSuccesso;
        form.reset();
        clear(boxPersone);
        tuCibo.querySelector('.p-dieta-altro-row').setAttribute('hidden', '');
        tuCibo.setAttribute('hidden', '');
        dettagli.setAttribute('hidden', '');
        riepilogo.setAttribute('hidden', '');
      }).catch(function (err) {
        console.error(err);
        feedback.className = 'form__feedback error';
        feedback.textContent = R.messaggioErrore;
      }).then(function () {
        submit.disabled = false;
      });
    });
  }

  /* ---------- Avvio ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof CONTENT === 'undefined') {
      document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif">Errore: il file js/content.js non è stato caricato o contiene un errore.</p>';
      return;
    }
    initGate();
    initNav();
    initHome();
    initGalleria();
    initProgramma();
    initLocation();
    initDormire();
    initRegalo();
    initFaq();
    initRsvp();
    initContatti();
    initFooter();
  });
})();
