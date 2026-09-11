import { SolutionItem } from '../types';

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'slow-regression',
    problemHeadline: 'Our regression cycle is too slow',
    challengeDetail:
      'Releases are delayed by days or weeks waiting for manual test passes across complex multi-platform features.',
    solutionTitle: 'Automation Strategy + Regression Optimization + CI/CD Integration',
    approach: [
      'Audit existing regression suite to identify high-impact, critical business flows',
      'Architect a parallelized, fast test automation suite in TypeScript/Python',
      'Integrate automated smoke and regression checks directly into the CI/CD pipeline',
      'Apply smart test selection to avoid redundant test executions on isolated PRs',
    ],
    keyOutcome: 'Dramatically reduce regression cycle times and accelerate deployment cadence.',
    icon: 'Timer',
  },
  {
    id: 'difficult-maintenance',
    problemHeadline: 'Our automation is difficult to maintain',
    challengeDetail:
      'Tests are flaky, break on minor UI tweaks, and require more effort to fix than manual execution would take.',
    solutionTitle: 'Framework Assessment + Architecture Improvements + Automation Engineering',
    approach: [
      'Perform deep audit of test flakiness, locator strategies, and async wait mechanisms',
      'Refactor brittle tests into clean Page Object / App Action architectural patterns',
      'Implement deterministic mock layers and isolated test environments',
      'Establish robust coding standards and peer review guidelines for test code',
    ],
    keyOutcome: 'Transform unstable test suites into trustworthy, low-maintenance assets.',
    icon: 'Wrench',
  },
  {
    id: 'introduce-ai',
    problemHeadline: 'We want to introduce AI into QA',
    challengeDetail:
      'Leadership wants to leverage AI in quality engineering, but the team lacks a practical, safe roadmap.',
    solutionTitle: 'AI Readiness Assessment + Practical AI Use Cases + AI-Assisted QA Workflows',
    approach: [
      'Evaluate current QA workflows, test artifacts, and tooling for AI readiness',
      'Pilot high-ROI AI test generation and failure log analysis tools',
      'Integrate AI prompt toolkits into engineer workflows while enforcing human verification',
      'Establish security and privacy guidelines for proprietary codebases and test data',
    ],
    keyOutcome: 'Achieve practical, measurable AI productivity gains without risking test integrity.',
    icon: 'Sparkles',
  },
  {
    id: 'lack-confidence',
    problemHeadline: 'Our releases lack confidence',
    challengeDetail:
      'Bugs frequently leak into production despite passing QA tests, causing customer frustration and emergency rollbacks.',
    solutionTitle: 'Quality Strategy + Risk-Based Testing + Continuous Testing',
    approach: [
      'Map critical user journeys and business risk matrices across all microservices',
      'Implement API contract testing and end-to-end integration validations',
      'Establish objective quality gates (coverage, defect severity, performance thresholds)',
      'Introduce shift-left exploratory testing protocols during sprint development',
    ],
    keyOutcome: 'Eliminate production surprise defects and give engineering leaders true release confidence.',
    icon: 'ShieldAlert',
  },
  {
    id: 'modernize-process',
    problemHeadline: 'Our QA process needs modernization',
    challengeDetail:
      'QA is treated as a downstream bottleneck rather than an integrated engineering discipline.',
    solutionTitle: 'QA Transformation + Quality Engineering Strategy + Mentoring',
    approach: [
      'Transition the organization from manual validation to a Quality Engineering culture',
      'Train software developers and QA testers on modern automation tools and shift-left testing',
      'Align QA milestones with agile sprint cadences and continuous delivery workflows',
      'Implement executive quality metrics and automated release telemetry',
    ],
    keyOutcome: 'Build an agile, engineering-driven quality culture that scales with the company.',
    icon: 'RefreshCw',
  },
  {
    id: 'need-expertise',
    problemHeadline: 'We need QA expertise without building a large team',
    challengeDetail:
      'You need senior test architects to set the foundation without the overhead of hiring a full in-house QA department.',
    solutionTitle: 'Consulting + Technical Guidance + Targeted Automation Engineering',
    approach: [
      'Provide on-demand principal quality engineering direction and architecture design',
      'Build core automation scaffolding and CI/CD integrations for internal developers',
      'Offer hands-on code reviews, framework mentoring, and quarterly health checks',
      'Scale engagement up or down based on your product roadmap and release milestones',
    ],
    keyOutcome: 'Access senior test engineering leadership with maximum organizational flexibility.',
    icon: 'Users',
  },
];
