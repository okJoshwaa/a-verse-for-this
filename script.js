(function () {
  "use strict";

  var feelingInput = document.getElementById("feelingInput");
  var findBtn = document.getElementById("findBtn");
  var anotherBtn = document.getElementById("anotherBtn");
  var result = document.getElementById("result");
  var verseText = document.getElementById("verseText");
  var verseRef = document.getElementById("verseRef");
  var verseFeeling = document.getElementById("verseFeeling");
  var resultHint = document.getElementById("resultHint");

  var CATEGORIES = window.VERSE_CATEGORIES;
  var GENERAL = CATEGORIES[CATEGORIES.length - 1];

  // Tracks every verse reference already shown this session, across all
  // categories, so nothing repeats no matter how many times "another" is hit.
  var shownRefs = {};
  var currentCategory = null;

  function matchCategory(text) {
    var trimmed = (text || "").trim();
    if (!trimmed) return GENERAL;
    for (var i = 0; i < CATEGORIES.length; i++) {
      var cat = CATEGORIES[i];
      if (cat.keywords && cat.keywords.test(trimmed)) return cat;
    }
    return GENERAL;
  }

  function unusedVersesIn(category) {
    return category.verses.filter(function (v) { return !shownRefs[v.ref]; });
  }

  function allUnusedVerses() {
    var out = [];
    CATEGORIES.forEach(function (cat) {
      cat.verses.forEach(function (v) {
        if (!shownRefs[v.ref]) out.push(v);
      });
    });
    return out;
  }

  function pickVerse(category) {
    var pool = unusedVersesIn(category);
    var usedFallback = false;
    if (pool.length === 0) {
      pool = allUnusedVerses();
      usedFallback = true;
    }
    if (pool.length === 0) {
      // Entire 65-verse set has been shown this session — start over.
      shownRefs = {};
      pool = category.verses;
    }
    var verse = pool[Math.floor(Math.random() * pool.length)];
    shownRefs[verse.ref] = true;
    return { verse: verse, usedFallback: usedFallback };
  }

  function render(category, picked) {
    verseFeeling.textContent = category.label;
    verseText.textContent = "“" + picked.verse.text + "”";
    verseRef.textContent = picked.verse.ref;
    resultHint.textContent = picked.usedFallback
      ? "You've seen every verse for “" + category.label + "” this session — here's one from elsewhere that still fits."
      : "";
    result.classList.remove("hidden");
  }

  function findVerse() {
    currentCategory = matchCategory(feelingInput.value);
    var picked = pickVerse(currentCategory);
    render(currentCategory, picked);
  }

  function anotherVerse() {
    if (!currentCategory) return;
    var picked = pickVerse(currentCategory);
    render(currentCategory, picked);
  }

  findBtn.addEventListener("click", findVerse);
  anotherBtn.addEventListener("click", anotherVerse);

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var feeling = chip.getAttribute("data-feeling");
      feelingInput.value = feeling;
      findVerse();
    });
  });

  feelingInput.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") findVerse();
  });
})();
