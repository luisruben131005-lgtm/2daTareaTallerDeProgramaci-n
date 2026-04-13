/**
 * main.js
 * ============================================================
 * Drives the Results Summary Component using Atomic Design.
 *
 * Responsibilities:
 *  - Holds the data (simulates data.json)
 *  - Dynamically renders MOLECULE: Category Items into the DOM
 *  - Animates the score counter (atom-score-number)
 *  - Handles the Continue button interaction
 * ============================================================
 */

// ── DATA (mirrors data.json) ─────────────────────────────────
const summaryData = [
  {
    category: "Reaction",
    score: 80,
    icon: "reaction",
    color: "reaction"
  },
  {
    category: "Memory",
    score: 92,
    icon: "memory",
    color: "memory"
  },
  {
    category: "Verbal",
    score: 61,
    icon: "verbal",
    color: "verbal"
  },
  {
    category: "Visual",
    score: 72,
    icon: "visual",
    color: "visual"
  }
];

// ── SVG ICONS (inline – avoids extra HTTP requests) ──────────
const icons = {
  reaction: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path stroke="hsl(0,100%,67%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M10.833 8.333V2.5l-6.666 9.167h5V17.5l6.666-9.167h-5Z"/>
  </svg>`,

  memory: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path stroke="hsl(39,100%,56%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M5.833 11.667a2.5 2.5 0 1 0 .834 4.858"/>
    <path stroke="hsl(39,100%,56%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M3.553 13.004a3.333 3.333 0 0 1-.728-5.53m.025-.067a2.083 2.083 0 0 1 2.983-2.824m.199.054A2.083 2.083 0 1 1 10 3.75v12.917a1.667 1.667 0 0 1-3.333 0M10 5.833a2.5 2.5 0 0 0 2.5 2.5m1.667 3.334a2.5 2.5 0 1 1-.834 4.858"/>
    <path stroke="hsl(39,100%,56%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M16.447 13.004a3.334 3.334 0 0 0 .728-5.53m-.025-.067a2.083 2.083 0 0 0-2.983-2.824M10 3.75a2.085 2.085 0 0 1 2.538-2.033 2.084 2.084 0 0 1 1.43 2.92m-.635 12.03a1.667 1.667 0 0 1-3.333 0"/>
  </svg>`,

  verbal: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path stroke="hsl(166,100%,37%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M7.5 10h5M10 18.333A8.333 8.333 0 1 0 1.667 10c0 1.518.406 2.942 1.115 4.167l-.699 3.75 3.75-.699A8.295 8.295 0 0 0 10 18.333Z"/>
  </svg>`,

  visual: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
    <path stroke="hsl(234,85%,45%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M10 11.667a1.667 1.667 0 1 0 0-3.334 1.667 1.667 0 0 0 0 3.334Z"/>
    <path stroke="hsl(234,85%,45%)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25"
      d="M17.5 10c-1.574 2.492-4.402 5-7.5 5s-5.926-2.508-7.5-5C4.416 7.632 6.66 5 10 5s5.584 2.632 7.5 5Z"/>
  </svg>`
};

/**
 * ATOM FACTORY: createIcon
 * Returns an .atom-icon wrapper with the inline SVG
 */
function createIcon(name) {
  const wrapper = document.createElement('span');
  wrapper.className = 'atom-icon';
  wrapper.setAttribute('role', 'img');
  wrapper.setAttribute('aria-label', `${name} icon`);
  wrapper.innerHTML = icons[name] || '';
  return wrapper;
}

/**
 * ATOM FACTORY: createCategoryLabel
 * Returns a span.atom-category-label
 */
function createCategoryLabel(text) {
  const span = document.createElement('span');
  span.className = 'atom-category-label';
  span.textContent = text;
  return span;
}

/**
 * ATOM FACTORY: createCategoryScore
 * Returns a span.atom-category-score with "XX / 100"
 */
function createCategoryScore(score) {
  const span = document.createElement('span');
  span.className = 'atom-category-score';
  span.innerHTML = `${score} <span>/ 100</span>`;
  return span;
}

/**
 * MOLECULE FACTORY: createCategoryItem
 * Assembles icon + label + score into a list item
 */
function createCategoryItem({ category, score, icon, color }) {
  const li = document.createElement('li');
  li.className = `molecule-category-item molecule-category-item--${color}`;
  li.setAttribute('role', 'listitem');

  const left = document.createElement('div');
  left.className = 'molecule-category-item__left';

  // Atoms
  left.appendChild(createIcon(icon));
  left.appendChild(createCategoryLabel(category));

  li.appendChild(left);
  li.appendChild(createCategoryScore(score));

  return li;
}

/**
 * RENDERER: Populate the categories list (organism-level)
 * Uses the molecule factory per data entry
 */
function renderCategories() {
  const list = document.getElementById('categories-list');
  if (!list) return;
  summaryData.forEach(item => {
    list.appendChild(createCategoryItem(item));
  });
}

/**
 * ATOM ANIMATION: Score Counter
 * Animates the large score number from 0 to final value
 */
function animateScore(targetScore = 76, duration = 900) {
  const el = document.getElementById('score-display');
  if (!el) return;

  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * targetScore);
    if (progress < 1) requestAnimationFrame(step);
  }

  // Delay slightly so CSS animation completes first
  setTimeout(() => requestAnimationFrame(step), 350);
}

/**
 * INTERACTION: Continue button handler
 */
function handleContinue() {
  const btn = document.querySelector('.atom-btn');
  if (!btn) return;
  btn.textContent = '✓ Done!';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.textContent = 'Continue';
    btn.style.pointerEvents = '';
  }, 2000);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  animateScore(76, 900);
});
