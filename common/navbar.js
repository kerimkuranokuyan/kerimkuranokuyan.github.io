(async function () {
  // Navbar HTML’ini sayfaya bas
  const host = document.getElementById("navbar-host");
  if (!host) return;

  const res = await fetch("common/navbar.html", { cache: "no-store" });
  const html = await res.text();
  host.innerHTML = html;

  // Elemanlar artık DOM’da
  const surahSelect = document.getElementById("surahSelect");
  const ayahSelect  = document.getElementById("ayahSelect");
  const goBtn       = document.getElementById("goBtn");

  // Sayfaya göre seçili ayeti otomatik işaretle
  // index.html => 1, 2.html => 2, ... 7.html => 7
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  let currentAyah = "1";
  if (path !== "index.html") {
    const m = path.match(/^(\d+)\.html$/);
    if (m) currentAyah = m[1];
  }
  ayahSelect.value = currentAyah;

  function targetUrl(surah, ayah) {
    if (surah === "fatiha") {
      if (ayah === "1") return "index.html";
      return ayah + ".html";
    }
    return "index.html";
  }

  function go() {
    const surah = surahSelect.value;
    const ayah  = ayahSelect.value;
    location.href = targetUrl(surah, ayah);
  }

  goBtn.addEventListener("click", go);

  // İstersen seçer seçmez gitsin:
  // ayahSelect.addEventListener("change", go);
})();
