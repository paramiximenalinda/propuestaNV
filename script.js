(() => {
  "use strict";

  /* PERSONALIZA ESTAS DOS OPCIONES ANTES DE COMPARTIR LA PÁGINA.
   * 1) nickname: apodo que usas con esa persona.
   * 2) songSrc: ruta a tu canción, por ejemplo "assets/nuestra-cancion.mp3".
   */
  const CONFIG = {
    nickname: "mi ximena ++ ❤️",
    songSrc: "assets/nuestra-cancion.mp3",
    songTitle: "Beach House - PPP"
  };

  const yesButton = document.querySelector("#yes-button");
  const yesLabel = document.querySelector("#yes-label");
  const noButton = document.querySelector("#no-button");
  const letterButton = document.querySelector("#letter-button");
  const letterPanel = document.querySelector("#letter-panel");
  const closeLetterButton = document.querySelector("#close-letter");
  const closeLetterLink = document.querySelector("#letter-close-link");
  const responseNote = document.querySelector("#response-note");
  const overlay = document.querySelector("#success-overlay");
  const closeSuccess = document.querySelector("#close-success");
  const celebrateAgain = document.querySelector("#celebrate-again");
  const readLetterAfterYes = document.querySelector("#read-letter-after-yes");
  const confettiLayer = document.querySelector("#confetti-layer");
  const heroTitle = document.querySelector("#hero-title");
  const eyebrow = document.querySelector("#eyebrow");
  const intro = document.querySelector("#intro");
  const musicButton = document.querySelector("#music-button");
  const musicTitle = document.querySelector("#music-title");
  const musicSubtitle = document.querySelector("#music-subtitle");
  const musicPlayIcon = document.querySelector("#music-play-icon");
  const musicStatus = document.querySelector("#music-status");
  const audio = document.querySelector("#love-audio");
  const emailNotificationStatus = document.querySelector("#email-notification-status");

  const playfulMessages = [
    "Jajaja, sabía que ibas a investigar ese botón. 👀💗",
    "Desde aquí te mando mi mejor carita de ‘ándale, porfi’. 🥺",
    "Fuera de bromas: no tienes que responder con prisa. Lo importante es que lo sientas de verdad. ♡"
  ];
  let noClicks = 0;
  let hasAccepted = false;
  let notificationAttempted = false;
  let lastFocusedElement = null;
  let letterReturnFocus = null;

  // El apodo se aplica desde CONFIG sin tener que buscarlo por todo el HTML.
  document.querySelectorAll("[data-nickname]").forEach((element) => {
    element.textContent = CONFIG.nickname;
  });
  musicTitle.textContent = CONFIG.songTitle;

  function showNote(message) {
    responseNote.textContent = message;
    responseNote.classList.remove("note-pop");
    // Reinicia la animación de respuesta en cada clic.
    void responseNote.offsetWidth;
    responseNote.classList.add("note-pop");
  }

  function launchConfetti(amount = 75) {
    const colors = ["#e9457f", "#f3a7ca", "#d7a1e5", "#ffd166", "#f68b9f", "#bc75cb"];
    const hearts = ["♥", "♡", "✦"];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("span");
      const isHeart = Math.random() > 0.72;
      piece.className = `confetti${isHeart ? " is-heart" : ""}`;
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty("--fall-duration", `${2.2 + Math.random() * 2.4}s`);
      piece.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
      piece.style.setProperty("--spin", `${Math.round(Math.random() * 900 - 450)}deg`);
      piece.style.animationDelay = `${Math.random() * 0.45}s`;

      if (isHeart) {
        piece.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        piece.style.color = colors[Math.floor(Math.random() * colors.length)];
      } else {
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.transform = `rotate(${Math.random() * 180}deg)`;
      }

      confettiLayer.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove(), { once: true });
    }
  }

  function openLetter(returnFocusTo = letterButton) {
    if (!letterPanel.hidden) return;
    letterReturnFocus = returnFocusTo;
    letterPanel.hidden = false;
    document.body.classList.add("modal-open");
    letterButton.setAttribute("aria-expanded", "true");
    letterButton.classList.add("letter-button--open");
    letterButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v12H4zM4.5 7l7.5 6 7.5-6" /></svg> cartita abierta ♡';
    // Lleva el foco al control de cierre y respeta las preferencias de movimiento.
    closeLetterButton.focus();
  }

  function closeLetter() {
    if (letterPanel.hidden) return;
    letterPanel.hidden = true;
    document.body.classList.remove("modal-open");
    letterButton.setAttribute("aria-expanded", "false");
    letterButton.classList.remove("letter-button--open");
    letterButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h16v12H4zM4.5 7l7.5 6 7.5-6" /></svg> leer mi cartita';
    if (letterReturnFocus instanceof HTMLElement && letterReturnFocus.isConnected) {
      letterReturnFocus.focus();
    }
  }

  function toggleLetter() {
    if (letterPanel.hidden) openLetter();
    else closeLetter();
  }

  function acceptProposal() {
    if (hasAccepted) return;
    hasAccepted = true;

    eyebrow.textContent = "QUÉ BONITO QUE SEA CONTIGO";
    heroTitle.innerHTML = '¡Entonces,<br />empecemos<br /><span class="script-word">nosotros!</span>';
    intro.textContent = "No importa cuántos kilómetros haya entre nosotros: quiero que sigamos conociéndonos, eligiéndonos y construyendo recuerdos que algún día podamos abrazar.";
    yesButton.hidden = true;
    noButton.hidden = true;
    letterButton.classList.add("letter-button--after-yes");
    showNote("Acabas de hacer que alguien al otro lado de la pantalla sonría muchísimo. 💗");

    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    closeSuccess.focus();
    launchConfetti();

    // La celebración visual no espera a la red; el correo es un extra opcional.
    void sendAcceptanceNotification();
  }

  function setEmailNotificationStatus(state, message) {
    if (!emailNotificationStatus) return;
    emailNotificationStatus.dataset.state = state;
    emailNotificationStatus.textContent = message;
  }

  function isEmailJSConfigured(config) {
    const values = [config.publicKey, config.serviceId, config.templateId];
    return values.every((value) =>
      typeof value === "string" && value.trim() !== "" && !value.startsWith("TU_")
    );
  }

  async function sendAcceptanceNotification() {
    if (notificationAttempted) return;
    notificationAttempted = true;

    const emailConfig = window.EMAILJS_CONFIG || {};
    if (!isEmailJSConfigured(emailConfig)) {
      setEmailNotificationStatus(
        "unconfigured",
        "El aviso por correo está pendiente de configuración. La celebración sigue aquí. ♡"
      );
      return;
    }

    if (!window.emailjs || typeof window.emailjs.send !== "function") {
      setEmailNotificationStatus(
        "error",
        "No se pudo cargar el servicio de correo. La celebración sigue aquí. 💗"
      );
      return;
    }

    setEmailNotificationStatus("pending", "Enviando un pequeño aviso por correo… 💌");

    const responseTime = new Intl.DateTimeFormat("es-CL", {
      dateStyle: "full",
      timeStyle: "short"
    }).format(new Date());

    const templateParams = {
      // Alias compatibles con la plantilla HTML actual de EmailJS.
      name: CONFIG.nickname,
      time: responseTime,
      // Parámetros descriptivos que también pueden usarse en otras plantillas.
      response: "Sí, acepto 💗",
      nickname: CONFIG.nickname,
      song_title: CONFIG.songTitle,
      response_time: responseTime,
      page_url: window.location.href,
      message: "Ximena dijo que sí!, ha pulsado el botón de aceptación. 💗"
    };

    try {
      await window.emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        {
          publicKey: emailConfig.publicKey,
          // Evita reintentos consecutivos desde este navegador.
          limitRate: { id: "proposal-acceptance-email", throttle: 60000 }
        }
      );
      setEmailNotificationStatus("success", "Aviso enviado con cariño. 💌♡");
    } catch (error) {
      // No se interrumpe la experiencia romántica si EmailJS o la conexión fallan.
      console.error("No se pudo enviar la notificación de EmailJS:", error);
      setEmailNotificationStatus(
        "error",
        "No se pudo enviar el aviso automático, pero la celebración sigue aquí. 💗"
      );
    }
  }

  function closeProposalSuccess() {
    overlay.hidden = true;
    if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
      lastFocusedElement.focus();
    } else if (!yesButton.hidden) {
      yesButton.focus();
    }
  }

  function openLetterFromDialog() {
    overlay.hidden = true;
    // Al volver desde la felicitación, el foco debe regresar al botón de la página.
    openLetter(letterButton);
  }

  yesButton.addEventListener("click", acceptProposal);
  letterButton.addEventListener("click", toggleLetter);
  closeLetterButton.addEventListener("click", closeLetter);
  closeLetterLink.addEventListener("click", closeLetter);
  letterPanel.addEventListener("click", (event) => {
    if (event.target === letterPanel) closeLetter();
  });

  noButton.addEventListener("click", () => {
    noClicks += 1;
    const messageIndex = Math.min(noClicks - 1, playfulMessages.length - 1);
    showNote(playfulMessages[messageIndex]);

    if (noClicks >= 2) {
      noButton.textContent = "todavía lo estoy pensando ♡";
      noButton.classList.add("no-button--softened");
    }
  });

  closeSuccess.addEventListener("click", closeProposalSuccess);
  celebrateAgain.addEventListener("click", () => launchConfetti(95));
  readLetterAfterYes.addEventListener("click", openLetterFromDialog);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeProposalSuccess();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!letterPanel.hidden) {
        closeLetter();
        return;
      }
      if (!overlay.hidden) closeProposalSuccess();
    }

    // Mantiene la navegación por teclado dentro de la carta mientras el modal está abierto.
    if (event.key === "Tab" && !letterPanel.hidden) {
      const focusable = [closeLetterButton, closeLetterLink];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  function setMusicState(isPlaying) {
    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.classList.toggle("music-button--playing", isPlaying);
    musicPlayIcon.textContent = isPlaying ? "Ⅱ" : "▶";
    musicSubtitle.textContent = isPlaying ? "sonando para ti ♡" : "para sentirte un poquito más cerca";
  }

  musicButton.addEventListener("click", async () => {
    if (!CONFIG.songSrc) {
      musicStatus.textContent = "Nuestra canción está esperando su estreno. Pronto tendremos este momentito. ♡";
      return;
    }

    if (audio.paused) {
      // Carga el archivo al primer clic para no intentar reproducir audio automáticamente.
      if (!audio.src || !audio.src.endsWith(CONFIG.songSrc)) {
        audio.src = CONFIG.songSrc;
      }
      try {
        await audio.play();
        setMusicState(true);
        musicStatus.textContent = "Un poquito de música para sentirnos más cerquita. ♫";
      } catch (error) {
        setMusicState(false);
        musicStatus.textContent = "Nuestra canción todavía está esperando su estreno. Añádela a la página y vuelve a darle play. 💗";
      }
    } else {
      audio.pause();
      setMusicState(false);
      musicStatus.textContent = "La dejamos en pausa para seguir cuando quieras. ♡";
    }
  });

  audio.addEventListener("ended", () => {
    setMusicState(false);
    musicStatus.textContent = "La escucharía contigo una y otra vez. ♡";
  });
  audio.addEventListener("error", () => {
    setMusicState(false);
    musicStatus.textContent = "Nuestra canción todavía está esperando su estreno. Añádela a la página y vuelve a darle play. 💗";
  });
})();
