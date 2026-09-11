import { AssessmentQuestion, MaturityResult } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'How much of your regression testing is currently automated?',
    subtitle: 'Evaluate your active automated regression coverage across critical paths.',
    options: [
      {
        label: '< 20% (Primarily manual verification)',
        description: 'Most regression testing relies on manual test cases and checklists before each release.',
        score: 1,
      },
      {
        label: '20% – 50% (Partial automation)',
        description: 'Core happy-path scenarios are automated, but significant manual testing remains required.',
        score: 2,
      },
      {
        label: '50% – 80% (Substantial coverage)',
        description: 'Most critical business journeys and APIs have automated regression coverage.',
        score: 3,
      },
      {
        label: '> 80% (Comprehensive automation)',
        description: 'Near-complete automated regression coverage across UI, API, and microservice layers.',
        score: 4,
      },
    ],
  },
  {
    id: 2,
    question: 'How long does your full regression cycle take to execute & report?',
    subtitle: 'From code freeze or release candidate to final QA sign-off.',
    options: [
      {
        label: 'More than 1 week (Slow release cadence)',
        description: 'Manual cycles take days or weeks, causing release bottlenecks and schedule slippage.',
        score: 1,
      },
      {
        label: '2 to 5 days (Moderate bottleneck)',
        description: 'Regression requires several days of coordinated testing and defect re-testing.',
        score: 2,
      },
      {
        label: 'A few hours (Same-day feedback)',
        description: 'Automated test suites complete within hours, allowing same-day release validation.',
        score: 3,
      },
      {
        label: '< 30 minutes (Fast continuous feedback)',
        description: 'Parallelized automated tests run on every pull request within minutes.',
        score: 4,
      },
    ],
  },
  {
    id: 3,
    question: 'Are automated tests integrated into your CI/CD delivery pipeline?',
    subtitle: 'Automated triggers and quality gates on pull requests and deployments.',
    options: [
      {
        label: 'No CI/CD integration',
        description: 'Tests are executed manually on local engineer machines when remembered.',
        score: 1,
      },
      {
        label: 'Basic nightly runs only',
        description: 'Tests run on a schedule overnight, but failures are not blocking pull requests.',
        score: 2,
      },
      {
        label: 'Triggered on Pull Requests / Merges',
        description: 'Smoke and regression tests execute in CI and block merging on test failure.',
        score: 3,
      },
      {
        label: 'Full Continuous Quality Gates',
        description: 'Automated quality, performance, and security gates validate every build to production.',
        score: 4,
      },
    ],
  },
  {
    id: 4,
    question: 'How difficult is your test automation suite to maintain and trust?',
    subtitle: 'Flakiness, false alarms, and maintenance overhead when features change.',
    options: [
      {
        label: 'Very fragile / Frequently ignored',
        description: 'High test flakiness and false alarms make the team distrust test results.',
        score: 1,
      },
      {
        label: 'Moderate maintenance burden',
        description: 'Frequent script fixes required whenever UI or APIs change, slowing down QA.',
        score: 2,
      },
      {
        label: 'Stable with manageable upkeep',
        description: 'Framework is structured with page objects/fixtures; flakiness is isolated quickly.',
        score: 3,
      },
      {
        label: 'Highly resilient & low overhead',
        description: 'Robust architecture with self-healing/resilient locators and minimal flakiness.',
        score: 4,
      },
    ],
  },
  {
    id: 5,
    question: 'Are you currently leveraging AI in your QA or testing workflows?',
    subtitle: 'Using generative AI or intelligent tools for test generation, data, or triage.',
    options: [
      {
        label: 'No AI adoption yet',
        description: 'All test design, test data, and log debugging is handled purely manually.',
        score: 1,
      },
      {
        label: 'Ad-hoc experimentation',
        description: 'Individual engineers occasionally use ChatGPT/Claude for generating test ideas.',
        score: 2,
      },
      {
        label: 'Structured AI tooling in workflows',
        description: 'Team uses AI tools for test generation, API contract checks, or log triage.',
        score: 3,
      },
      {
        label: 'AI-Augmented Quality Engineering',
        description: 'Systematic AI pipelines for test design, failure clustering, and predictive test selection.',
        score: 4,
      },
    ],
  },
];

export const MATURITY_RESULTS: Record<string, MaturityResult> = {
  'Getting Started': {
    level: 'Getting Started',
    scoreRange: '5 – 9 points',
    summary:
      'Your quality processes are largely manual and reactive. Releases rely heavily on manual verification checklists, leading to extended regression cycles and delayed feedback.',
    keyPriorities: [
      'Define a core automation strategy and select a modern framework (Playwright/TypeScript)',
      'Automate the top 10–15 critical business paths to establish baseline regression safety',
      'Integrate automated smoke checks into your primary deployment pipeline',
      'Establish shift-left exploratory test standards to catch defects earlier in sprint cycles',
    ],
    recommendedModel: 'Project-Based Foundation Build or Strategic QA Advisory',
  },
  'Developing': {
    level: 'Developing',
    scoreRange: '10 – 14 points',
    summary:
      'You have initial test automation in place, but maintenance overhead, flaky tests, and incomplete CI/CD integration prevent you from achieving rapid, continuous release confidence.',
    keyPriorities: [
      'Refactor brittle tests into modular, resilient page object/component patterns',
      'Integrate automated test runs into pull-request quality gates with parallel execution',
      'Expand API and contract test coverage to reduce reliance on heavy UI tests',
      'Pilot AI-assisted test generation to accelerate new feature coverage without extra toil',
    ],
    recommendedModel: 'Project-Based Automation Overhaul or Advisory Review',
  },
  'Scaling': {
    level: 'Scaling',
    scoreRange: '15 – 18 points',
    summary:
      'You have solid automation practices and continuous testing pipelines. Your primary opportunity is optimizing execution speeds, eliminating residual flakiness, and augmenting the team with AI.',
    keyPriorities: [
      'Implement intelligent test impact analysis and predictive test selection in CI/CD',
      'Introduce AI-powered failure triage to cluster logs and pinpoint root causes automatically',
      'Establish automated synthetic test data provisioning for complex integration scenarios',
      'Deepen developer-owned quality engineering practices and performance gates',
    ],
    recommendedModel: 'Continuous QE Partnership or AI Automation Pilot',
  },
  'AI-Augmented': {
    level: 'AI-Augmented',
    scoreRange: '19 – 20 points',
    summary:
      'Your team demonstrates advanced Quality Engineering maturity with high automation coverage, rapid CI/CD feedback, and systematic AI acceleration throughout the delivery lifecycle.',
    keyPriorities: [
      'Explore continuous autonomous defect prediction models based on historical code diffs',
      'Optimize multi-region parallel test runner efficiency and cloud infrastructure costs',
      'Refine proprietary QA prompt libraries and engineer knowledge assistants',
      'Benchmark advanced quality telemetry against top tier engineering organizations',
    ],
    recommendedModel: 'Advanced AI Quality Architecture Advisory',
  },
};
