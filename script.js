// Current year in the footer
document.getElementById("rok").textContent = new Date().getFullYear();

// Mobile menu (hamburger)
const menuTlacidlo = document.getElementById("menuTlacidlo");
const menu = document.getElementById("menu");

menuTlacidlo.addEventListener("click", function () {
  const otvorene = menu.classList.toggle("otvorene");
  menuTlacidlo.setAttribute("aria-expanded", otvorene);
});

menu.querySelectorAll("a").forEach(function (odkaz) {
  odkaz.addEventListener("click", function () {
    menu.classList.remove("otvorene");
    menuTlacidlo.setAttribute("aria-expanded", "false");
  });
});

// Form validation (runs only on kontakt.html)
const form = document.getElementById("kontaktForm");

if (form) {
  const meno = document.getElementById("meno");
  const email = document.getElementById("email");
  const sprava = document.getElementById("sprava");
  const pocet = document.getElementById("pocet");
  const vysledok = document.getElementById("vysledok");

  // Each rule returns an error text, or "" if the field is fine
  const pravidla = {
    meno: function () {
      return meno.value.trim().length < 2 ? "Enter your name (at least 2 characters)." : "";
    },
    email: function () {
      const platny = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
      return platny ? "" : "Enter a valid e-mail, e.g. name@domain.com.";
    },
    sprava: function () {
      return sprava.value.trim().length < 10 ? "Your message must have at least 10 characters." : "";
    }
  };

  const polia = { meno: meno, email: email, sprava: sprava };

  // Checks one field and shows its error
  function skontroluj(nazov) {
    const chyba = pravidla[nazov]();
    const pole = polia[nazov].closest(".pole");
    document.getElementById(nazov + "-chyba").textContent = chyba;
    pole.classList.toggle("neplatne", chyba !== "");
    pole.classList.toggle("platne", chyba === "");
    return chyba === "";
  }

  Object.keys(polia).forEach(function (nazov) {
    polia[nazov].addEventListener("blur", function () {
      skontroluj(nazov);
    });
    polia[nazov].addEventListener("input", function () {
      if (polia[nazov].closest(".pole").classList.contains("neplatne")) {
        skontroluj(nazov);
      }
    });
  });

  // Character counter
  sprava.addEventListener("input", function () {
    pocet.textContent = sprava.value.length;
  });

  // Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    vysledok.textContent = "";

    let vsetkoOk = true;
    let prvaChyba = null;

    Object.keys(polia).forEach(function (nazov) {
      if (!skontroluj(nazov)) {
        vsetkoOk = false;
        if (!prvaChyba) prvaChyba = polia[nazov];
      }
    });

    if (vsetkoOk) {
      vysledok.textContent = "Thank you, " + meno.value.trim() + "! Your message is valid.";
      form.reset();
      pocet.textContent = "0";
      document.querySelectorAll(".pole").forEach(function (p) {
        p.classList.remove("platne", "neplatne");
      });
    } else {
      prvaChyba.focus();
    }
  });
}