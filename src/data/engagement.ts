import { EngagementModel } from '../types';

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'advisory',
    title: 'Advisory',
    subtitle: 'Strategic Guidance & Architecture Review',
    description:
      'For engineering leaders and product teams that need senior QA/QE strategic guidance, architecture reviews, or an objective audit of their quality practices.',
    idealFor:
      'CTOs, VPs of Engineering, and QA Managers looking to set a clear direction before making major tooling or organizational investments.',
    keyOfferings: [
      'Comprehensive QA & Automation Health Audit',
      'AI-Readiness Assessment & Roadmap',
      'Test Architecture & Framework Selection Review',
      'Target Quality Operating Model Design',
      'Bi-weekly Strategic Quality Architecture Office Hours',
    ],
    engagementFormat: 'Structured advisory sprint (2–4 weeks) or ongoing leadership advisory retainer.',
    ctaText: 'Discuss Advisory',
  },
  {
    id: 'project-based',
    title: 'Project-Based',
    subtitle: 'Targeted Automation & Framework Engineering',
    description:
      'For teams with specific, well-defined quality and automation initiatives that need dedicated expert execution to build or overhaul test capabilities.',
    idealFor:
      'Engineering teams wanting to stand up a brand new Playwright/Cypress framework, automate critical API regressions, or integrate automated quality gates into CI/CD.',
    keyOfferings: [
      'Custom Test Automation Framework Build (Web, API, Mobile)',
      'Critical Path Regression Automation Suite Delivery',
      'Zero-Touch CI/CD Quality Gate Pipeline Setup',
      'Legacy Test Suite Modernization & Flakiness Remediation',
      'AI-Powered Test Generation & Triage Toolkit Integration',
    ],
    engagementFormat: 'Milestone-based project delivery (4–12 weeks) with full handover and documentation.',
    ctaText: 'Discuss a Project',
  },
  {
    id: 'continuous-partnership',
    title: 'Continuous Partnership',
    subtitle: 'Embedded Quality Engineering & Continuous Transformation',
    description:
      'For organizations that want ongoing, proactive Quality Engineering leadership and continuous automation engineering integrated directly into their release cadence.',
    idealFor:
      'High-growth software companies requiring ongoing Quality Engineering expertise, continuous test expansion, and progressive AI adoption without large overhead.',
    keyOfferings: [
      'Continuous Test Automation Coverage Expansion',
      'Ongoing CI/CD Test Pipeline Tuning & Speed Optimization',
      'Proactive Defect & Flakiness Root-Cause Remediation',
      'Progressive AI Testing Workflows & Prompt Engineering',
      'Continuous Hands-on Mentoring & Code Reviews for Developers',
    ],
    engagementFormat: 'Dedicated monthly fractional QE partnership with clear quarterly objectives.',
    ctaText: 'Discuss Partnership',
  },
];
