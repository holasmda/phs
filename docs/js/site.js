(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var nav = document.querySelector('.nav');
  var fab = document.getElementById('fab');
  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 12);
      nav.classList.toggle('scrolled', y > 8);
    }
    if (fab) fab.classList.toggle('show', y > 520);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // Calendario de temporada (solo fresco de rancho)
  var nowFruitEl = document.getElementById('nowFruit');
  if (nowFruitEl) {
    var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    var SEASONS = [
      { es: 'Uvas', en: 'Grapes', months: [6, 7, 8] },
      { es: 'Higos', en: 'Figs', months: [8, 9, 10] },
      { es: 'Guayabas', en: 'Guavas', months: [9, 10, 11, 12] },
      { es: 'Naranjas para jugo', en: 'Juicing oranges', months: [12, 1, 2, 3] }
    ];
    var m = new Date().getMonth() + 1;
    var list = SEASONS.filter(function (s) { return s.months.indexOf(m) !== -1; })
      .map(function (s) { return s[lang]; });
    nowFruitEl.textContent = list.length
      ? list.join(lang === 'es' ? ' y ' : ' & ')
      : (lang === 'es' ? 'Entre temporadas' : 'Between seasons');
    var monthEls = document.querySelectorAll('#calMonths span');
    if (monthEls[m - 1]) monthEls[m - 1].classList.add('is-now');
  }
})();
