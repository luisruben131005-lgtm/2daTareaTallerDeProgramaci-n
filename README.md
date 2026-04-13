# Results Summary Component
### Frontend Mentor Challenge — with Atomic Design

![Design preview](./preview-atomic-design.png)

## 🔗 Links
- **Challenge:** [Frontend Mentor — Results Summary Component](https://www.frontendmentor.io/challenges/results-summary-component-CE_K6s0maV)
- **Live Demo:** *(deploy to Vercel/Netlify and add URL here)*
- **Repository:** *(add GitHub repo URL here)*

---

## 🧬 Atomic Design Architecture

This project is built following Brad Frost's **Atomic Design** methodology, separating UI concerns into three layers:

```
results-summary-project/
├── index.html                  ← Page template (uses all layers)
├── main.js                     ← Data, factories & animation logic
│
├── atoms/
│   └── atoms.css               ← Layer 1: Design tokens & base elements
│
├── molecules/
│   └── molecules.css           ← Layer 2: Composed components
│
├── organisms/
│   └── organisms.css           ← Layer 3: Complex sections & layout
│
└── assets/
    ├── fonts/                  ← Hanken Grotesk variable font
    └── images/                 ← Icons & favicon
```

---

### ⚛️ Atoms (Layer 1) — `atoms/atoms.css`

> *The smallest indivisible building blocks*

| Atom | Class | Description |
|------|-------|-------------|
| Design Tokens | `:root` CSS variables | Colors, gradients, spacing, radii |
| Score Number | `.atom-score-number` | Large 76/100 display |
| Score Label | `.atom-score-label` | "of 100" text |
| Score Circle | `.atom-score-circle` | Gradient background circle |
| Heading | `.atom-heading` | "Great" result title |
| Body Text | `.atom-body-text` | Descriptive paragraph |
| Section Title | `.atom-section-title` | "Summary" heading |
| Category Label | `.atom-category-label` | "Reaction", "Memory" etc. |
| Category Score | `.atom-category-score` | "80 / 100" score display |
| Button | `.atom-btn` | "Continue" CTA button |
| Icon | `.atom-icon` | SVG icon wrapper |
| Result Label | `.atom-result-label` | "Your Result" label |

Atoms are also **created in JS** via factory functions:
- `createIcon(name)` → `.atom-icon`
- `createCategoryLabel(text)` → `.atom-category-label`
- `createCategoryScore(score)` → `.atom-category-score`

---

### 🧪 Molecules (Layer 2) — `molecules/molecules.css`

> *Groups of atoms functioning as a unit*

| Molecule | Class | Composed From |
|----------|-------|---------------|
| Result Panel | `.molecule-result-panel` | result-label + score-circle + heading + body-text |
| Score Display | `.molecule-score-display` | score-circle + score-number + score-label |
| Result Footer | `.molecule-result-footer` | heading + body-text |
| Summary Panel | `.molecule-summary-panel` | section-title + categories-list + button |
| Category Item | `.molecule-category-item` | icon + category-label + category-score |
| Categories List | `.molecule-categories-list` | Collection of category items |

Category items also carry **color modifier classes**:
- `.molecule-category-item--reaction` (red)
- `.molecule-category-item--memory` (yellow)
- `.molecule-category-item--verbal` (green)
- `.molecule-category-item--visual` (blue)

---

### 🏛️ Organisms (Layer 3) — `organisms/organisms.css`

> *Complex, distinct UI sections*

| Organism | Class | Description |
|----------|-------|-------------|
| Results Card | `.organism-results-card` | Full two-panel card (result + summary) |
| Page Wrapper | `.page-wrapper` | Full-page centering layout |

The organism layer also handles:
- **Responsive layout** (desktop: row / mobile: column)
- **Entry animations** (staggered with `animation-delay`)
- **Box shadows** and card elevation

---

## 🛠️ Built With
- Semantic HTML5
- CSS Custom Properties (Design Tokens)
- CSS Flexbox
- Vanilla JavaScript (ES6+)
- Atomic Design methodology
- Mobile-first responsive design

## 📐 Design Specs
- Mobile: 375px
- Desktop: 1440px
- Font: [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (500, 700, 800)

## 👤 Author
- Frontend Mentor: [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub: [@yourusername](https://github.com/yourusername)
