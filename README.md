# Tech_Studio — Quality Engineering & AI Automation Consultancy

A modern, high-performance, responsive B2B technology consultancy website for **Quality Engineering, Software Testing, Test Automation, and AI Automation**.

Built with **React / TypeScript / Tailwind CSS / Lucide Icons**, optimized for static generation and instant deployment on **Vercel**.

---

## 🚀 Key Features & Architectural Modules

1. **Brand Positioning & Hero**: High-conversion B2B messaging with an interactive 6-step Quality Engineering transformation visual.
2. **Value Strip**: Instant navigation across core capabilities (*Quality Engineering, Test Automation, AI Automation, Continuous Testing, QA Transformation*).
3. **6 Core Services**: Interactive capability cards with expandable key deliverables and direct consultation triggers.
4. **AI Automation Signature Section**: Interactive 5-stage workflow (*Discover &rarr; Generate &rarr; Automate &rarr; Analyze &rarr; Optimize*) with engineering guardrails.
5. **8 AI Acceleration Use Cases**: Expandable cards detailing practical applications and engineering benefits.
6. **Traditional QA vs. AI-Augmented QE**: Interactive comparison matrix highlighting shift-left quality impact.
7. **Solutions by Business Need**: 6 challenge-driven solutions (*"Our regression cycle is too slow"*, *"Our automation is difficult to maintain"*, etc.).
8. **Our Approach**: 5-step structured engineering process (*Discover, Assess, Design, Implement, Improve*).
9. **Engagement Models**: Clear collaboration structures (*Advisory, Project-Based, Continuous Partnership*).
10. **Technology Ecosystem**: Categorized stack (*Languages, Frameworks, DevOps/CI, AI Tooling*) with modular data configuration.
11. **Selected Challenges & Solutions**: Structured case study templates and real-world outcomes.
12. **QA & Automation Maturity Assessment**: 100% client-side 5-question maturity benchmark with score calculation (*Getting Started, Developing, Scaling, AI-Augmented*) and targeted priorities.
13. **Expandable FAQs**: Searchable / categorized accordion for common engineering questions.
14. **Direct Consultation & Contact**: Form with mailto fallback, clipboard copy, and quick consultation modal.
15. **Dark & Light Mode**: System preference detection with persistent toggle.

---

## 🛠️ Project Structure & Data Configuration

All editable business details and copy are strictly isolated inside the `src/data/` directory for simple maintenance:

```text
src/
  ├── data/
  │    ├── company.ts       # Company name, founder profile, contact email, location, social links
  │    ├── services.ts      # 6 Core services, focus areas, and deliverables
  │    ├── aiAutomation.ts  # 5-stage AI workflow & 8 use cases
  │    ├── comparison.ts    # Traditional QA vs. Modern QE metrics
  │    ├── solutions.ts     # 6 Problem-solution blueprints
  │    ├── approach.ts      # 5-step methodology details
  │    ├── engagement.ts    # Advisory, Project-Based, Partnership models
  │    ├── whyUs.ts         # 5 Differentiation pillars
  │    ├── technologies.ts  # Technology ecosystem & categories
  │    ├── caseStudies.ts   # Case study templates & metric highlights
  │    ├── assessment.ts    # 5-question maturity benchmark scoring
  │    └── faqs.ts          # FAQ questions & answers
  ├── components/           # Modular UI components
  ├── types.ts              # TypeScript interfaces & types
  ├── App.tsx               # Main application layout
  ├── main.tsx              # React entry point
  └── index.css             # Tailwind base styles & typography
```

---

## 💻 Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 3. Production Build

```bash
npm run build
```

---

## 🚀 Deploying to Vercel

1. Push your repository to **GitHub** / **GitLab** / **Bitbucket**.
2. Sign in to [Vercel](https://vercel.com).
3. Click **"Add New..."** &rarr; **"Project"**.
4. Import your repository.
5. Keep default build settings:
   - **Framework Preset**: `Vite` (or `Other`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.

No environment variables or external database configurations are required.

---

## 📄 License
MIT © 2026 Tech_Studio
