// MOVIFLEX — Logo SVG component, used across the site
// Renders into any element with class "logo-mount"
(function () {
  const SVG = `
    <svg class="mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M 88 24 A 42 42 0 1 0 88 76" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none" class="ring" />
      <circle cx="38" cy="38" r="2.2" fill="#3D464E" /><circle cx="35" cy="44" r="2.2" fill="#3D464E" />
      <circle cx="33" cy="50" r="2.2" fill="#3D464E" /><circle cx="32" cy="56" r="2.2" fill="#3D464E" />
      <circle cx="58" cy="30" r="6" fill="#3D464E" class="figure" />
      <path d="M 56 38 Q 68 42 64 54 Q 60 64 70 70 Q 64 76 54 70 Q 46 64 50 54 Q 44 48 46 42 Z" fill="#3D464E" class="figure" />
      <path d="M 44 56 Q 36 62 32 70 Q 38 72 46 66 Z" fill="#3D464E" class="figure" />
      <path d="M 28 78 Q 50 92 76 78" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none" class="ring" />
      <path d="M 32 80 L 30 86" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="ring" />
      <path d="M 42 84 L 41 90" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="ring" />
      <path d="M 52 85 L 52 91" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="ring" />
      <path d="M 62 84 L 63 90" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="ring" />
      <path d="M 72 80 L 74 86" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="ring" />
    </svg>
    <div>
      <div class="word">MOVI<span class="alt">FLEX</span></div>
      <div class="tag">TERAPIA · REHABILITACIÓN</div>
    </div>
  `;
  document.querySelectorAll('.logo-mount').forEach(el => {
    el.innerHTML = SVG;
    el.classList.add('logo');
    // For light variant, override figure fill
    if (el.classList.contains('logo--light')) {
      el.style.color = '#fff';
      el.querySelectorAll('.figure').forEach(p => p.setAttribute('fill', '#fff'));
    } else {
      el.style.color = 'var(--teal-600)';
    }
  });
})();
