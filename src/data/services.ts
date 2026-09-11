import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'quality-engineering',
    title: 'Quality Engineering',
    tag: 'Core Discipline',
    description:
      'Move beyond traditional testing by integrating quality throughout the software development lifecycle.',
    capabilities: [
      'Quality strategy & architecture',
      'Shift-left testing practices',
      'Continuous quality engineering',
      'Risk-based test analysis',
      'Non-functional quality attributes',
    ],
    deliverables: [
      'End-to-end Quality Strategy Blueprint',
      'Shift-left testing guidelines & pipelines',
      'Risk-coverage matrix & defect prevention metrics',
    ],
    icon: 'ShieldCheck',
    ctaText: 'Explore Quality Engineering',
  },
  {
    id: 'software-testing',
    title: 'Software Testing',
    tag: 'Functional & Risk Confidence',
    description:
      'Build confidence in your software through structured, scalable, and risk-focused testing.',
    capabilities: [
      'Functional & exploratory testing',
      'Structured regression testing',
      'Integration & contract testing',
      'System & end-to-end validation',
      'API testing & payload validation',
    ],
    deliverables: [
      'Comprehensive test plans & risk catalogs',
      'API & functional test suites',
      'Release readiness & sign-off reports',
    ],
    icon: 'CheckCircle2',
    ctaText: 'Explore Software Testing',
  },
  {
    id: 'test-automation',
    title: 'Test Automation',
    tag: 'Scalable Frameworks',
    description:
      'Reduce repetitive testing effort with maintainable, scalable automation frameworks.',
    capabilities: [
      'Automation strategy & ROI roadmap',
      'Modern framework design & architecture',
      'UI automation (web & mobile)',
      'API & headless service automation',
      'Automated regression suites & maintenance',
    ],
    deliverables: [
      'Maintainable, modular test automation framework',
      'Reliable, self-healing regression test suites',
      'Flakiness reduction & execution optimization',
    ],
    icon: 'Cpu',
    ctaText: 'Explore Test Automation',
  },
  {
    id: 'ai-powered-automation',
    title: 'AI-Powered Test Automation',
    tag: 'Featured Capability',
    isFeatured: true,
    description:
      'Use AI to accelerate test creation, test analysis, automation development, and quality engineering workflows.',
    capabilities: [
      'AI-assisted test scenario generation',
      'AI-assisted automation script development',
      'Test case optimization & deduplication',
      'Intelligent failure & root-cause analysis',
      'Defect pattern detection & categorization',
      'QA productivity automation & workflows',
    ],
    deliverables: [
      'AI-augmented test design accelerators',
      'Intelligent test triage & failure summarization',
      'Custom QA engineering prompt & workflow toolkits',
    ],
    icon: 'Sparkles',
    ctaText: 'Explore AI Automation',
  },
  {
    id: 'cicd-continuous-testing',
    title: 'CI/CD & Continuous Testing',
    tag: 'Pipeline Integration',
    description:
      'Integrate automated quality checks into your delivery pipeline so quality becomes continuous.',
    capabilities: [
      'CI/CD pipeline test integration',
      'Automated pull request regression gates',
      'Quality gates & deployment thresholds',
      'Continuous testing orchestration',
      'Release validation & smoke checks',
      'Automated test reporting & telemetry',
    ],
    deliverables: [
      'Zero-touch CI/CD quality gate pipelines',
      'Parallelized test execution architectures',
      'Real-time dashboards & build break alerts',
    ],
    icon: 'GitBranch',
    ctaText: 'Explore Continuous Testing',
  },
  {
    id: 'qa-consulting-transformation',
    title: 'QA Consulting & Transformation',
    tag: 'Strategic Advisory',
    description:
      'Improve your QA organization, processes, automation strategy, and engineering practices.',
    capabilities: [
      'QA & test maturity assessment',
      'Test automation audit & refactoring plan',
      'Target operating model for Quality Engineering',
      'Process improvement & agile QA enablement',
      'Engineering enablement & technical mentoring',
    ],
    deliverables: [
      'Executive QA Maturity & Gap Analysis',
      'Phased transformation roadmap & milestone plan',
      'Hands-on technical upskilling for QA/Dev teams',
    ],
    icon: 'Compass',
    ctaText: 'Explore QA Consulting',
  },
];
