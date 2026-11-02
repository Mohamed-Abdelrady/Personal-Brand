const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  primaryNav.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


// Reveal content as it enters the viewport; respect reduced-motion preferences.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  document.body.classList.add("reveal-ready");
  const revealTargets = document.querySelectorAll(
    ".section-heading, .project-card, .service-item, .about-grid > *, .tech-row, .agency-grid > *, .contact-inner"
  );
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
}


// Theme preference: keep the existing mixed palette by default, with an optional dark mode.
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const savedTheme = (() => {
  try { return localStorage.getItem("moe-portfolio-theme"); }
  catch (_) { return null; }
})();

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
  if (themeLabel) themeLabel.textContent = isDark ? "Light" : "Dark";
  if (themeToggle) {
    const label = isDark ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", isDark ? "#151f29" : "#111a24");
}

applyTheme(savedTheme === "dark" ? "dark" : "light");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { localStorage.setItem("moe-portfolio-theme", nextTheme); }
    catch (_) { /* Theme still works for this page view if storage is unavailable. */ }
  });
}
