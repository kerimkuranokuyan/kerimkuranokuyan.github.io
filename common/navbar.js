(async function () {
  // Navbar HTML’ini sayfaya bas
  const host = document.getElementById("navbar-host");
  if (!host) return;

  const res = await fetch("common/navbar.html", { cache: "no-store" });
  const html = await res.text();
  host.innerHTML = html;

  // Elemanlar
  const surahSelect = document.getElementById("surahSelect");
  const ayahSelect  = document.getElementById("ayahSelect");
  const goBtn       = document.getElementById("goBtn");

  /* =========================
     SÛRE TANIMLARI
     ========================= */
  const surahs = {
    fatiha: {
      label: "Fâtiha",
      ayet: 7
    },
    bakara: {
      label: "Bakara",
      ayet: 286
    }
  };

  /* =========================
     SÛRE SELECT DOLDUR
     ========================= */
  surahSelect.innerHTML = "";
  Object.keys(surahs).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = surahs[key].label;
    surahSelect.appendChild(opt);
  });

  /* =========================
     BULUNULAN SAYFAYI ALGILA
     ========================= */
  const file = (location.pathname.split("/").pop() || "index.html");

  let currentSurah = "fatiha";
  let currentAyah  = "1";

  // Fâtiha: index.html, 2.html ... 7.html
  if (file === "index.html") {
    currentSurah = "fatiha";
    currentAyah = "1";
  } else if (/^\d+\.html$/.test(file)) {
    currentSurah = "fatiha";
    currentAyah = file.replace(".html", "");
  }

  // Bakara: Bakara-1.html, Bakara-2.html ...
  const bakaraMatch = file.match(/^Bakara-(\d+)\.html$/i);
  if (bakaraMatch) {
    currentSurah = "bakara";
    currentAyah = bakaraMatch[1];
  }

  surahSelect.value = currentSurah;

  /* =========================
     AYET SELECT DOLDUR
     ========================= */
  function fillAyahs() {
    const surah = surahSelect.value;
    const total = surahs[surah].ayet;

    ayahSelect.innerHTML = "";
    for (let i = 1; i <= total; i++) {
      const opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = i + ". Âyet";
      ayahSelect.appendChild(opt);
    }
  }

  // İlk yükleme
  fillAyahs();
  ayahSelect.value = currentAyah;

  /* =========================
     SÛRE DEĞİŞİNCE AYETLERİ YENİLE
     ========================= */
  surahSelect.addEventListener("change", function () {
    fillAyahs();
    ayahSelect.value = "1";
  });

  /* =========================
     YÖNLENDİRME
     ========================= */
  function targetUrl(surah, ayah) {
    if (surah === "fatiha") {
      if (ayah === "1") return "index.html";
      return ayah + ".html";
    }

    if (surah === "bakara") {
      return "Bakara-" + ayah + ".html";
    }

    return "index.html";
  }

  function go() {
    const surah = surahSelect.value;
    const ayah  = ayahSelect.value;
    location.href = targetUrl(surah, ayah);
  }

  goBtn.addEventListener("click", go);

})();
