/* =====================================================================
   PAGINA FOTO DEGLI OSPITI (foto.html) - NON SERVE MODIFICARE QUESTO FILE
   I testi vengono letti da js/content.js (CONTENT.fotoOspiti).
   Le foto vengono ridotte nel telefono dell'ospite (max 2048 px) e poi
   inviate, una alla volta, allo script Apps Script indicato in
   CONTENT.fotoScriptUrl, che le salva su Google Drive.
   ===================================================================== */
(function () {
  'use strict';

  var URL_PLACEHOLDER = 'INCOLLA_QUI_URL_APPS_SCRIPT_FOTO';
  var LATO_MAX = 2048;     // lato lungo massimo delle foto inviate (px)
  var QUALITA_JPEG = 0.85; // qualità della ricompressione JPEG

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

  function formatoMB(byte) { return (byte / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB'; }

  /* ---------- Preparazione dei file ---------- */

  // Legge un Blob/File e restituisce il contenuto in base64 (senza il prefisso data:)
  function leggiBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var s = String(reader.result || '');
        resolve(s.slice(s.indexOf(',') + 1));
      };
      reader.onerror = function () { reject(reader.error || new Error('Lettura del file fallita')); };
      reader.readAsDataURL(blob);
    });
  }

  // Riduce una foto a LATO_MAX px sul lato lungo e la ricomprime in JPEG.
  // Restituisce { blob, nome }. Se la foto non si riesce a decodificare
  // (es. HEIC su alcuni browser) o la versione ridotta non è più piccola,
  // restituisce il file originale.
  function riduciFoto(file) {
    var originale = { blob: file, nome: file.name };
    // Le GIF (animate) non passano dal canvas: le invieremmo "congelate"
    if (!/^image\//.test(file.type) || file.type === 'image/gif') return Promise.resolve(originale);

    return new Promise(function (resolve) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      function fine(risultato) {
        URL.revokeObjectURL(url);
        resolve(risultato);
      }
      img.onerror = function () { fine(originale); };
      img.onload = function () {
        try {
          var w = img.naturalWidth, h = img.naturalHeight;
          if (!w || !h) return fine(originale);
          var scala = Math.min(1, LATO_MAX / Math.max(w, h));
          var canvas = document.createElement('canvas');
          canvas.width = Math.round(w * scala);
          canvas.height = Math.round(h * scala);
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(function (blob) {
            // teniamo l'originale se la ricompressione non ha ridotto il peso
            if (!blob || blob.size >= file.size) return fine(originale);
            fine({ blob: blob, nome: file.name.replace(/\.[^.]+$/, '') + '.jpg' });
          }, 'image/jpeg', QUALITA_JPEG);
        } catch (e) {
          fine(originale);
        }
      };
      img.src = url;
    });
  }

  // Prepara il JSON da inviare allo script: { nome, tipo, dati (base64), autore }
  function prepara(file, autore) {
    var pronto = /^video\//.test(file.type)
      ? Promise.resolve({ blob: file, nome: file.name })
      : riduciFoto(file);
    return pronto.then(function (r) {
      return leggiBase64(r.blob).then(function (b64) {
        return {
          nome: r.nome,
          tipo: r.blob.type || file.type || 'application/octet-stream',
          dati: b64,
          autore: autore
        };
      });
    });
  }

  /* ---------- Invio ---------- */

  // Invia un file allo script. A differenza del modulo RSVP qui NON c'è il
  // fallback "no-cors": se non riusciamo a leggere una risposta {ok:true}
  // la consideriamo un errore, perché l'ospite deve sapere se la foto è arrivata.
  function invia(payload) {
    var url = CONTENT.fotoScriptUrl;
    var opzioni = {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    };
    return fetch(url, opzioni).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json().then(function (j) {
        if (j && j.ok === true) return j;
        throw new Error('Lo script ha risposto con errore: ' + ((j && j.errore) || 'ok=false'));
      }, function () {
        throw new Error('Risposta non leggibile');
      });
    });
  }

  /* ---------- Pagina ---------- */

  function init() {
    var F = CONTENT.fotoOspiti;
    var maxVideo = (parseFloat(F.videoMaxMB) || 40) * 1024 * 1024;

    setText('foto-brand', CONTENT.nomi.sposa.charAt(0) + ' & ' + CONTENT.nomi.sposo.charAt(0));
    setText('foto-titolo', F.titolo);
    setText('foto-testo', F.testo);
    setText('foto-autore-label', F.etichettaNome);
    setText('foto-scegli', F.pulsanteScegli);
    setText('foto-altre', F.caricaAltre);
    setText('footer-testo', CONTENT.nomi.coppia + ' · ' + CONTENT.dataTesto);
    document.title = F.titolo + ' · ' + CONTENT.nomi.coppia;

    var form = $('foto-form');
    var input = $('foto-file');
    var scegli = $('foto-scegli');
    var lista = $('foto-lista');
    var btnInvia = $('foto-invia');
    var feedback = $('foto-feedback');
    var avviso = $('foto-avviso');
    var altreBox = $('foto-altre-box');
    var autore = $('foto-autore');

    // Finché l'indirizzo dello script non è impostato la pagina non può inviare nulla
    var attivo = CONTENT.fotoScriptUrl && CONTENT.fotoScriptUrl !== URL_PLACEHOLDER;
    if (!attivo) {
      avviso.textContent = F.nonAttivo;
      avviso.removeAttribute('hidden');
      input.disabled = true;
      scegli.classList.add('is-disabled');
      scegli.setAttribute('aria-disabled', 'true');
    }

    var voci = []; // { file, li, stato, saltato }

    function setStato(voce, stato, classe) {
      voce.stato.textContent = stato;
      voce.stato.className = 'foto__stato' + (classe ? ' foto__stato--' + classe : '');
    }

    function daInviare() { return voci.filter(function (v) { return !v.saltato; }); }

    function aggiornaPulsante() {
      var n = daInviare().length;
      btnInvia.textContent = F.pulsanteInvia.replace('N', String(n));
      if (n > 0) btnInvia.removeAttribute('hidden');
      else btnInvia.setAttribute('hidden', '');
    }

    function aggiungiFile(file) {
      var stato = el('span', { 'class': 'foto__stato' });
      var li = el('li', { 'class': 'foto__voce' }, [
        el('span', { 'class': 'foto__nome', text: file.name }),
        el('span', { 'class': 'foto__peso', text: formatoMB(file.size) }),
        stato
      ]);
      var voce = { file: file, li: li, stato: stato, saltato: false };
      // I video troppo pesanti non partono: avvisiamo subito
      if (/^video\//.test(file.type) && file.size > maxVideo) {
        voce.saltato = true;
        li.classList.add('foto__voce--saltato');
        setStato(voce, F.videoTroppoGrande, 'errore');
      } else {
        setStato(voce, F.statoAttesa);
      }
      voci.push(voce);
      lista.appendChild(li);
    }

    input.addEventListener('change', function () {
      feedback.className = 'form__feedback';
      feedback.textContent = '';
      Array.prototype.forEach.call(input.files || [], aggiungiFile);
      // svuota l'input: così si possono aggiungere altri file con un secondo clic
      input.value = '';
      aggiornaPulsante();
    });

    // Invio sequenziale: un file alla volta, aggiornando lo stato di ciascuno
    function inviaTutti() {
      var coda = daInviare();
      var nomeAutore = autore.value.trim();
      var errori = 0;
      var i = 0;

      function prossimo() {
        if (i >= coda.length) return Promise.resolve();
        var voce = coda[i++];
        setStato(voce, F.statoCaricamento, 'caricamento');
        return prepara(voce.file, nomeAutore)
          .then(invia)
          .then(function () {
            setStato(voce, F.statoCaricato, 'ok');
          }, function (err) {
            console.error(voce.file.name, err);
            errori++;
            setStato(voce, F.statoErrore, 'errore');
          })
          .then(prossimo);
      }

      return prossimo().then(function () { return errori; });
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!attivo || daInviare().length === 0) return;

      btnInvia.disabled = true;
      input.disabled = true;
      scegli.classList.add('is-disabled');
      autore.disabled = true;
      feedback.className = 'form__feedback';
      feedback.textContent = '';

      inviaTutti().then(function (errori) {
        btnInvia.setAttribute('hidden', '');
        if (errori === 0) {
          feedback.className = 'form__feedback ok';
          feedback.textContent = F.messaggioSuccesso;
        } else {
          feedback.className = 'form__feedback error';
          feedback.textContent = F.messaggioErrore;
        }
        altreBox.removeAttribute('hidden');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof CONTENT === 'undefined' || !CONTENT.fotoOspiti) {
      document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif">Errore: il file js/content.js non è stato caricato o contiene un errore.</p>';
      return;
    }
    init();
  });
})();
