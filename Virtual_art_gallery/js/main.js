/*
 * Tun'Art – script principal (JavaScript natif, sans framework ni build).
 * Fonctionne en ouvrant simplement index.html (pas de serveur requis).
 */
(function () {
  "use strict";

  const DATA = window.TUNART;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Crée un élément DOM sans innerHTML (évite toute injection). */
  function el(tag, props = {}, ...kids) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else if (value !== false && value != null) node.setAttribute(key, value === true ? "" : value);
    }
    kids.flat().forEach((kid) => node.append(kid));
    return node;
  }

  const fmtPrice = (p) => (p === 0 ? "Gratuit" : p + " TND");
  const eventDate = (e) => new Date(e.date + "T" + e.time);
  const isPast = (e) => eventDate(e) < new Date();
  const upcoming = () => DATA.events.filter((e) => !isPast(e)).sort((a, b) => eventDate(a) - eventDate(b));
  const safeStorage = {
    get: (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* navigation privée */ } }
  };

  /* ---------- Navigation mobile ---------- */
  function initNav() {
    const toggle = $(".nav-toggle");
    const nav = $("#nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Vidéo de fond (respecte « réduire les animations ») ---------- */
  function initBackgroundVideo() {
    const video = $(".bg-video");
    if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }

  /* ---------- Musique d'ambiance ----------
     Les navigateurs bloquent la lecture automatique avec son : la musique est donc
     activée par un bouton, et son état (on/off + position) est mémorisé entre les pages. */
  function initMusic() {
    const btn = $("#musicBtn");
    if (!btn) return;
    const audio = new Audio("assets/audio/mozart.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "none";

    const label = el("span", { class: "label" });
    btn.append("♪ ", label);

    function render(on) {
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Couper la musique d'ambiance" : "Activer la musique d'ambiance");
      label.textContent = on ? "Musique : on" : "Musique : off";
    }

    async function play() {
      try {
        await audio.play();
        safeStorage.set("tunart-music", "on");
        render(true);
      } catch (_) {
        render(false); // lecture refusée par le navigateur : l'utilisateur cliquera
      }
    }
    function pause() {
      audio.pause();
      safeStorage.set("tunart-music", "off");
      render(false);
    }

    btn.addEventListener("click", () => (audio.paused ? play() : pause()));
    audio.addEventListener("timeupdate", () => safeStorage.set("tunart-music-time", String(audio.currentTime)));
    window.addEventListener("pagehide", () => safeStorage.set("tunart-music-time", String(audio.currentTime)));

    render(false);
    if (safeStorage.get("tunart-music") === "on") {
      audio.addEventListener("loadedmetadata", () => {
        audio.currentTime = parseFloat(safeStorage.get("tunart-music-time")) || 0;
      }, { once: true });
      audio.preload = "metadata";
      play();
    }
  }

  /* ---------- Connexion (démo) ---------- */
  function initLogin() {
    const btn = $(".login-btn");
    if (!btn) return;
    const msg = el("p", { class: "hint", role: "status" });
    const dialog = el("dialog", { class: "dialog", "aria-labelledby": "loginTitle" },
      el("button", { class: "dialog__close", type: "button", "aria-label": "Fermer", text: "×",
        onclick: () => dialog.close() }),
      el("h2", { id: "loginTitle", text: "Connexion" }),
      el("form", {
        onsubmit: (e) => {
          e.preventDefault();
          msg.textContent = "Démo front-end : l'authentification n'est pas implémentée dans cette version.";
        }
      },
        el("input", { type: "email", placeholder: "Email", required: true, autocomplete: "email", "aria-label": "Email" }),
        el("input", { type: "password", placeholder: "Mot de passe", required: true, autocomplete: "current-password", "aria-label": "Mot de passe" }),
        el("button", { class: "btn", type: "submit", text: "Se connecter" }),
        msg
      )
    );
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    document.body.append(dialog);
    btn.addEventListener("click", () => { msg.textContent = ""; dialog.showModal(); });
  }

  /* ---------- Composants réutilisables ---------- */
  function artCard(art, onOpen) {
    return el("figure", { class: "art-card", "data-theme": art.theme },
      el("button", { class: "art-card__open", type: "button", "aria-label": "Agrandir : " + art.title, onclick: onOpen },
        el("img", { src: "assets/images/" + art.file, alt: art.alt, width: art.w, height: art.h, loading: "lazy" })),
      el("figcaption", {},
        el("span", { class: "tag", text: art.theme }),
        el("h3", { text: art.title }),
        el("p", { text: art.artist ? art.artist + " – " + art.text : art.text })
      )
    );
  }

  function eventRow(ev) {
    const d = eventDate(ev);
    const past = isPast(ev);
    const day = el("strong", { text: String(d.getDate()).padStart(2, "0") });
    const month = el("span", { text: d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "") });
    return el("article", { class: "event" + (past ? " is-past" : "") },
      el("div", { class: "event__date", "aria-hidden": "true" }, day, month),
      el("div", {},
        el("h3", { class: "event__title", text: ev.title }),
        el("p", { class: "event__meta",
          text: ev.type + " · " + d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " à " + ev.time.replace(":", "h") })
      ),
      el("span", { class: "event__price", text: fmtPrice(ev.price) }),
      past
        ? el("span", { class: "tag", text: "Terminé" })
        : el("a", { class: "btn btn--small", href: "contact.html?event=" + encodeURIComponent(ev.id), text: "Réserver" })
    );
  }

  /* ---------- Page Accueil ---------- */
  function initHome() {
    const stats = $("#stats");
    if (stats) {
      [[DATA.artworks.length, "œuvres"], [DATA.themes.length, "thèmes"], [upcoming().length, "événements à venir"]]
        .forEach(([n, label]) => stats.append(el("div", {}, el("strong", { text: String(n) }), el("span", { text: label }))));
    }
    const featured = $("#featured");
    if (featured) {
      [DATA.artworks[3], DATA.artworks[6], DATA.artworks[5]].forEach((art) =>
        featured.append(artCard(art, () => { location.href = "gallery.html"; })));
    }
    const next = $("#nextEvents");
    if (next) {
      const list = upcoming().slice(0, 3);
      list.forEach((ev) => next.append(eventRow(ev)));
    }
  }

  /* ---------- Page Galerie : filtres + lightbox ---------- */
  function initGallery() {
    const grid = $("#galleryGrid");
    const filters = $("#filters");
    if (!grid || !filters) return;

    let current = DATA.artworks.slice();
    let index = 0;

    const img = el("img", { alt: "" });
    const title = el("h2", { id: "lbTitle" });
    const tag = el("span", { class: "tag" });
    const text = el("p");
    const count = el("span", { class: "count" });
    const dialog = el("dialog", { class: "lightbox", "aria-labelledby": "lbTitle" },
      el("button", { class: "icon-btn lightbox__close", type: "button", "aria-label": "Fermer", text: "×", onclick: () => dialog.close() }),
      el("div", { class: "lightbox__body" },
        el("div", { class: "lightbox__img" }, img),
        el("div", { class: "lightbox__info" }, tag, title, text,
          el("div", { class: "lightbox__nav" },
            el("button", { class: "icon-btn", type: "button", "aria-label": "Œuvre précédente", text: "‹", onclick: () => show(index - 1) }),
            el("button", { class: "icon-btn", type: "button", "aria-label": "Œuvre suivante", text: "›", onclick: () => show(index + 1) }),
            count))
      )
    );
    document.body.append(dialog);
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });

    function show(i) {
      index = (i + current.length) % current.length;
      const art = current[index];
      img.src = "assets/images/" + art.file;
      img.alt = art.alt;
      title.textContent = art.title;
      tag.textContent = art.theme;
      text.textContent = art.artist ? art.artist + " – " + art.text : art.text;
      count.textContent = index + 1 + " / " + current.length;
    }

    function render() {
      grid.replaceChildren(...current.map((art, i) =>
        artCard(art, () => { show(i); dialog.showModal(); })));
    }

    ["Toutes", ...DATA.themes].forEach((name, i) => {
      filters.append(el("button", {
        class: "chip", type: "button", "aria-pressed": String(i === 0), text: name,
        onclick: (e) => {
          $$(".chip", filters).forEach((c) => c.setAttribute("aria-pressed", "false"));
          e.currentTarget.setAttribute("aria-pressed", "true");
          current = i === 0 ? DATA.artworks.slice() : DATA.artworks.filter((a) => a.theme === name);
          render();
        }
      }));
    });
    render();
  }

  /* ---------- Page Événements ---------- */
  function initEvents() {
    const list = $("#eventsList");
    if (!list) return;
    const sorted = DATA.events.slice().sort((a, b) => eventDate(a) - eventDate(b));
    sorted.forEach((ev) => list.append(eventRow(ev)));
  }

  /* ---------- Page Contact / Réservation ---------- */
  function initContact() {
    const form = $("#contactForm");
    if (!form) return;

    const reservation = $("#reservation");
    const select = $("#evenement");
    const persons = $("#personnes");
    const total = $("#total");
    const message = $("#message");
    const success = $("#success");
    const radios = $$('input[name="type"]', form);

    upcoming().forEach((ev) => select.append(el("option", { value: ev.id, text: ev.title + " – " + eventDate(ev).toLocaleDateString("fr-FR") })));

    const isReservation = () => form.elements.type.value === "reservation";

    function syncType() {
      const res = isReservation();
      reservation.hidden = !res;
      select.required = res;
      persons.required = res;
      message.required = !res;
      message.placeholder = res ? "Un commentaire ? (facultatif)" : "Votre question…";
    }

    function syncTotal() {
      const ev = DATA.events.find((e) => e.id === select.value);
      const n = Math.max(1, Math.min(20, parseInt(persons.value, 10) || 1));
      total.value = ev ? fmtPrice(ev.price * n) : "–";
    }

    radios.forEach((r) => r.addEventListener("change", syncType));
    select.addEventListener("change", syncTotal);
    persons.addEventListener("input", syncTotal);

    // Pré-sélection depuis le bouton « Réserver » : contact.html?event=<id>
    const wanted = new URLSearchParams(location.search).get("event");
    if (wanted && upcoming().some((e) => e.id === wanted)) {
      $("#reservation-radio").checked = true;
      select.value = wanted;
    }
    syncType();
    syncTotal();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const first = $("#prenom").value.trim();
      const ev = DATA.events.find((x) => x.id === select.value);
      $("#successText").textContent = isReservation() && ev
        ? "Merci " + first + " ! Votre demande pour « " + ev.title + " » (" + persons.value + " pers., " + total.value + ") a bien été enregistrée."
        : "Merci " + first + " ! Votre message a bien été enregistré, nous vous répondrons rapidement.";
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });

    $("#again").addEventListener("click", () => {
      form.reset();
      syncType();
      syncTotal();
      success.hidden = true;
      form.hidden = false;
      $("#nom").focus();
    });
  }

  /* ---------- Démarrage ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initBackgroundVideo();
    initMusic();
    initLogin();
    const page = document.body.dataset.page;
    ({ home: initHome, gallery: initGallery, events: initEvents, contact: initContact })[page]?.();
  });
})();
