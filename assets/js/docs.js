/* =============================================================================
   docs.js — behaviour for the Ausgetrunken documentation pages

   Two concerns only. Everything else on these pages is plain HTML on purpose:
   a privacy policy has to render for a store reviewer, a crawler and a reader
   with JavaScript switched off, so nothing here is load-bearing.

     1. Theme   — light / dark / auto, remembered per visitor
     2. Misc    — footer year

   The theme is applied a second time, earlier, by a small inline script in each
   page's <head>; that one exists purely to avoid a flash of the wrong theme
   before this file runs. Both use the same storage key as markono.dev so the
   two sites behave identically, though they cannot share the value itself —
   different origins, separate storage.
   ============================================================================= */

(function () {
  "use strict";

  var THEME_KEY = "markono.theme";
  var ORDER = ["auto", "light", "dark"];

  /* localStorage throws in some privacy modes — never let that break the page. */
  function readStore(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function writeStore(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ============================================================ 1. THEME ==== */

  var root = document.documentElement;

  function currentTheme() {
    var stored = readStore(THEME_KEY);
    return ORDER.indexOf(stored) !== -1 ? stored : "auto";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function labelFor(theme) {
    var labels = root.getAttribute("lang") === "de"
      ? { auto: "Farbschema: automatisch", light: "Farbschema: hell", dark: "Farbschema: dunkel" }
      : { auto: "Colour theme: automatic", light: "Colour theme: light", dark: "Colour theme: dark" };
    return labels[theme];
  }

  applyTheme(currentTheme());

  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    var sync = function () {
      var label = labelFor(currentTheme());
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
    };

    sync();

    toggle.addEventListener("click", function () {
      var next = ORDER[(ORDER.indexOf(currentTheme()) + 1) % ORDER.length];
      writeStore(THEME_KEY, next);
      applyTheme(next);
      sync();
    });
  }

  /* ============================================================= 2. MISC ==== */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
