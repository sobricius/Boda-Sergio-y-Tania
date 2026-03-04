/* ============================================
   BOTANIC WEDDING — MAIN JS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DOM REFS ---------- */
  const splash = document.getElementById("splash");
  const enterBtn = document.getElementById("enterBtn");
  const navbar = document.getElementById("navbar");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const iconPause = document.getElementById("iconPause");
  const iconPlay = document.getElementById("iconPlay");
  const navHamburger = document.getElementById("navHamburger");
  const navMenu = document.getElementById("navMenu");
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpSuccess = document.getElementById("rsvpSuccess");

  /* ================================================
       1. SPLASH SCREEN — ENVELOPE ANIMATION
       ================================================ */
  const envelope = document.getElementById("envelope");
  const envelopeWrapper = document.getElementById("envelopeWrapper");

  // Clicking the envelope opens the flap & raises the letter
  envelope.addEventListener("click", () => {
    if (envelopeWrapper.classList.contains("opened")) return;
    envelopeWrapper.classList.add("opened");
  });

  // Clicking ENTRAR dismisses the splash
  enterBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // don't re-trigger envelope click

    // Add 'entered' class to trigger the zoom-in CSS animation on the letter/envelope
    envelopeWrapper.classList.add("entered");

    // Wait for the zoom animation to happen (e.g., 800ms) before fading out the splash
    setTimeout(() => {
      splash.classList.add("hidden");
      navbar.classList.add("visible");
      musicToggle.classList.add("visible");

      // Scroll to Hero section
      const hero = document.getElementById("INICIO");
      if (hero) hero.scrollIntoView({ behavior: "smooth" });

      // Attempt to play music
      bgMusic.play().catch(() => {
        iconPause.style.display = "none";
        iconPlay.style.display = "block";
      });

      // Remove splash from DOM after transitions complete
      setTimeout(() => {
        splash.style.display = "none";
      }, 1200);
    }, 200);
  });

  /* ================================================
       2. MUSIC TOGGLE
       ================================================ */
  let isPlaying = true;

  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      iconPause.style.display = "none";
      iconPlay.style.display = "block";
    } else {
      bgMusic.play();
      iconPause.style.display = "block";
      iconPlay.style.display = "none";
    }
    isPlaying = !isPlaying;
  });

  /* ================================================
       3. HAMBURGER MENU (mobile)
       ================================================ */
  navHamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close menu on link click
  navMenu.querySelectorAll(".navbar__link").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });

  /* ================================================
       4. ACTIVE NAV ON SCROLL
       ================================================ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__link");

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /* ================================================
       5. COUNTDOWN TIMER
       ================================================ */
  const weddingDate = new Date("2027-07-31T12:00:00+02:00").getTime();
  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMins = document.getElementById("cdMins");
  const cdSecs = document.getElementById("cdSecs");

  function updateCountdown() {
    const now = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      cdDays.textContent = "0";
      cdHours.textContent = "0";
      cdMins.textContent = "0";
      cdSecs.textContent = "0";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = String(d).padStart(3, "0");
    cdHours.textContent = String(h).padStart(2, "0");
    cdMins.textContent = String(m).padStart(2, "0");
    cdSecs.textContent = String(s).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ================================================
       6. SCROLL ANIMATIONS (IntersectionObserver)
       ================================================ */
  const animElements = document.querySelectorAll(".anim");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  animElements.forEach((el) => observer.observe(el));

  /* ================================================
       7. RSVP FORM
       ================================================ */
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the submit button and set it to a loading state
    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toISOString();

    // Google Apps Script Web App URL
    const scriptURL =
      "https://script.google.com/macros/s/AKfycby0jK9B_KGjkJNUGVJJ8scyn_uayz6EJbh9YfSb7cFc_4wbEbWmKPnLo7ENlKM8cQmy/exec";

    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // no-cors is required for Google Apps Script
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Convert data object to URL encoded string
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        // Show success message
        rsvpForm.reset();
        rsvpForm.style.display = "none";
        rsvpSuccess.style.display = "block";
      })
      .catch((error) => {
        console.error("Error!", error.message);
        alert(
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
        );
      })
      .finally(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
  });
});
