import { FAQItem } from '../types';

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Services',
    question: 'What types of testing do you provide?',
    answer:
      'We provide end-to-end Quality Engineering services spanning functional testing, structured regression testing, API & contract testing, system integration testing, UI/web automation, mobile validation, and performance/security quality attributes. Rather than simple manual execution, we focus on engineering quality through architecture, automation, and pipeline integration.',
  },
  {
    id: 'faq-2',
    category: 'Automation',
    question: 'Can you help us build a test automation framework from scratch?',
    answer:
      'Yes. We design and build custom, production-grade test automation frameworks tailored to your technology stack (such as TypeScript with Playwright/Cypress or Python with PyTest). Our frameworks emphasize modularity, maintainability, parallel execution, resilient locators, clear reporting, and direct integration into your CI/CD delivery pipelines.',
  },
  {
    id: 'faq-3',
    category: 'Automation',
    question: 'Can you assess our existing test automation?',
    answer:
      'Yes. We offer an Automation Health Audit to evaluate your current test suites for flakiness, maintenance overhead, execution time, architectural antipatterns, and coverage blind spots. We deliver an actionable, prioritized refactoring plan with clear recommendations for stabilization and speed optimization.',
  },
  {
    id: 'faq-4',
    category: 'AI',
    question: 'How can AI be realistically used in software testing without risking quality?',
    answer:
      'We focus on practical, safe AI augmentation where AI accelerates human engineering tasks rather than replacing engineering judgment. Practical use cases include generating boundary test cases from user stories, synthesizing realistic synthetic test datasets, scaffolding automation boilerplates, clustering CI failure logs, and optimizing regression suites based on code diffs.',
  },
  {
    id: 'faq-5',
    category: 'Automation',
    question: 'Can you integrate automated testing into our CI/CD pipeline?',
    answer:
      'Yes. We integrate automated smoke and regression checks directly into your CI/CD tools (GitHub Actions, GitLab CI, CircleCI, Jenkins, etc.) with parallel test execution, automated pull-request quality gates, and failure notifications. This ensures broken code is caught within minutes before merging into main branches.',
  },
  {
    id: 'faq-6',
    category: 'Consulting',
    question: 'Do you work with both startups and enterprise software organizations?',
    answer:
      'Yes. We work across high-growth startups establishing their first structured automation frameworks, scaling scale-ups expanding multi-squad delivery, and enterprise software teams modernizing legacy QA processes into modern Quality Engineering practices.',
  },
  {
    id: 'faq-7',
    category: 'Consulting',
    question: 'Do you provide ongoing QA consulting or only project-based work?',
    answer:
      'We offer flexible engagement models including short-term Advisory audits (2–4 weeks), milestone-driven Project-Based implementations (4–12 weeks), and ongoing Continuous Quality Engineering partnerships where we provide fractional principal QE leadership and continuous automation engineering.',
  },
  {
    id: 'faq-8',
    category: 'Consulting',
    question: 'Can you help modernize an existing QA organization?',
    answer:
      'Yes. We guide organizations through QA transformation—shifting from reactive, manual end-of-sprint testing toward an integrated, engineering-driven Quality Engineering culture. This includes process re-engineering, shift-left testing enablement, developer testing guidelines, and hands-on technical mentoring.',
  },
];
