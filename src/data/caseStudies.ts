import { CaseStudy } from '../types';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'scaling-test-automation',
    tag: 'Case Study 01',
    title: 'Scaling Test Automation & Regression Acceleration',
    problem: [
      'Slow regression cycles due to heavy manual testing across multiple modules',
      'Lack of stable automation framework leading to flaky test results and false alarms',
      'Difficulty maintaining test coverage as the product scaled rapidly with new squad releases',
    ],
    approach:
      'Implemented a scalable Quality Engineering solution leveraging a robust test automation framework, CI/CD integration, and AI-assisted test generation to improve test coverage, reduce regression effort, and accelerate feedback cycles.',
    outcome:
      'Reduced regression cycle time by 30–50%, increased automation coverage across core journeys, and significantly improved release confidence through faster defect detection and automated PR feedback loops.',
    metrics: [
      { label: 'Regression Cycle Reduction', value: '30–50%' },
      { label: 'Feedback Loop Speed', value: 'Minutes vs. Days' },
      { label: 'Release Confidence', value: 'High' },
    ],
    isPlaceholder: false,
  },
  {
    id: 'ai-augmented-qa',
    tag: 'Case Study 02 (Sample / Template)',
    title: 'AI-Augmented QA & Intelligent Test Generation',
    problem: [
      '[Add client problem: e.g., High cognitive load on QA team creating test matrices for 20+ microservices]',
      '[Add client problem: e.g., Overlooked edge cases and negative scenarios in rapidly changing acceptance criteria]',
      '[Add client problem: e.g., Extended time spent triaging noisy CI failure logs across test runs]',
    ],
    approach:
      '[Add solution: Implemented an AI-assisted Quality Engineering workflow combining automated scenario extraction from specifications, synthetic test data generation, and intelligent failure clustering in the CI pipeline.]',
    outcome:
      '[Add measurable result: e.g., Accelerated test scenario drafting by 45%, eliminated test data provisioning bottlenecks, and reduced failure triage time by 40%.]',
    metrics: [
      { label: 'Test Creation Velocity', value: '+45%' },
      { label: 'Data Provisioning', value: 'Automated' },
      { label: 'Triage Overhead', value: '-40%' },
    ],
    isPlaceholder: true,
  },
  {
    id: 'continuous-testing-transformation',
    tag: 'Case Study 03 (Sample / Template)',
    title: 'Continuous Testing Transformation & Pipeline Quality Gates',
    problem: [
      '[Add client problem: e.g., QA testing disconnected from development sprints, creating end-of-quarter release freezes]',
      '[Add client problem: e.g., Production defect leakage due to inconsistent quality checks across squads]',
      '[Add client problem: e.g., Lack of centralized quality metrics and flakiness tracking for engineering leadership]',
    ],
    approach:
      '[Add solution: Designed a unified Quality Operating Model, established shift-left pull-request quality gates, and integrated automated parallel regression suites into the continuous deployment pipeline.]',
    outcome:
      '[Add measurable result: e.g., Shifted from quarterly releases to bi-weekly deployments with zero major production rollback incidents and comprehensive automated quality reporting.]',
    metrics: [
      { label: 'Deployment Cadence', value: 'Bi-Weekly' },
      { label: 'Critical Escapes', value: 'Near Zero' },
      { label: 'Pipeline Automation', value: '100% Zero-Touch' },
    ],
    isPlaceholder: true,
  },
];
