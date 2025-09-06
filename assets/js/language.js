document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("lang-switcher");
  const wrap = document.getElementById("flags");
  if (!btn || !wrap) return;

  // Altura real del botón => desplazar exactamente esa altura
  const flagH = btn.clientHeight;

  // Configurar el wrapper de banderas
  wrap.style.height = flagH * 2 + "px";
  wrap.querySelectorAll(".flag").forEach(f => {
    f.style.height = flagH + "px";
  });

  // Detectar idioma actual según URL
  let currentLang = /^\/en(\/|$)/.test(location.pathname) ? "en" : "es";

  // Colocar posición inicial SIN transición para evitar saltos
  const saveTransition = wrap.style.transition;
  wrap.style.transition = "none";
  wrap.style.transform =
    currentLang === "en" ? `translateY(-${flagH}px)` : "translateY(0)";
  requestAnimationFrame(() => {
    wrap.style.transition = saveTransition;
  });

  // Bloquear clicks durante animación
  let busy = false;

  btn.addEventListener("click", () => {
    if (busy) return;
    busy = true;

    // Alternar idioma
    currentLang = currentLang === "es" ? "en" : "es";

    // Animar banderas
    wrap.style.transform =
      currentLang === "en" ? `translateY(-${flagH}px)` : "translateY(0)";

    // Redirigir a la misma página pero en el idioma nuevo
    const duration = 350; // Debe coincidir con la transición CSS
    setTimeout(() => {
      const path = location.pathname.replace(/^\/(es|en)/, "") || "/";
      location.href = `/${currentLang}${path}${location.search}${location.hash}`;
    }, duration + 20);
  });
});
