import { AIWorkflowStage, AIUseCase } from '../types';

export const AI_WORKFLOW_STAGES: AIWorkflowStage[] = [
  {
    id: 'discover',
    number: '01',
    name: 'Discover',
    shortDesc: 'Identify testing opportunities, repetitive activities, and quality bottlenecks.',
    fullDesc:
      'We analyze code changes, commit histories, PR patterns, and historical defect hotspots to uncover high-risk testing surfaces and repetitive manual overhead.',
    keyOutcomes: [
      'High-risk code path detection',
      'Flaky test & manual bottleneck audit',
      'Test gap identification across new features',
    ],
    engineeringInsight:
      'Targeted intelligence replaces generic blanket testing with risk-proportional validation.',
    icon: 'Search',
  },
  {
    id: 'generate',
    number: '02',
    name: 'Generate',
    shortDesc: 'Accelerate creation of test ideas, scenarios, test data, and automation assets.',
    fullDesc:
      'We leverage structured AI models to synthesize boundary test cases, edge scenarios, mock data structures, and baseline automation scripts directly from acceptance criteria.',
    keyOutcomes: [
      'Edge-case & boundary scenario synthesis',
      'Realistic synthetic test dataset generation',
      'Scaffolded automation boilerplate in seconds',
    ],
    engineeringInsight:
      'Engineers guide the prompt architecture and review the synthesis to ensure rigorous domain fidelity.',
    icon: 'FileCode2',
  },
  {
    id: 'automate',
    number: '03',
    name: 'Automate',
    shortDesc: 'Convert repeatable testing activities into maintainable automated workflows.',
    fullDesc:
      'Transform manual verification steps and API contracts into clean, modular, maintainable automation code with deterministic assertions and self-documenting steps.',
    keyOutcomes: [
      'Clean TypeScript/Python test automation suites',
      'Resilient locator strategies and page object models',
      'Deterministic assertions with minimal test fragility',
    ],
    engineeringInsight:
      'Avoid unmaintainable recorded scripts by enforcing strict software engineering patterns.',
    icon: 'Layers',
  },
  {
    id: 'analyze',
    number: '04',
    name: 'Analyze',
    shortDesc: 'Use AI-assisted analysis to identify patterns, risks, failures, and potential improvements.',
    fullDesc:
      'Process execution logs, stack traces, and failure screenshots with AI triage to instantly classify infrastructure blips versus real regressions and suggest root fixes.',
    keyOutcomes: [
      'Instant stack trace & failure log summarization',
      'Flakiness vs. product defect clustering',
      'Accelerated developer feedback with triage context',
    ],
    engineeringInsight:
      'Significantly reduces developer and QA triage fatigue during active CI/CD execution runs.',
    icon: 'LineChart',
  },
  {
    id: 'optimize',
    number: '05',
    name: 'Optimize',
    shortDesc: 'Continuously improve coverage, execution efficiency, and engineering productivity.',
    fullDesc:
      'Prune duplicate test cases, identify obsolete assertions, prioritize test suites based on changed modules, and refine automation execution times.',
    keyOutcomes: [
      'Predictive test selection for faster CI builds',
      'Automated test suite deduplication & cleanup',
      'Ongoing feedback loop for QA engineering productivity',
    ],
    engineeringInsight:
      'Maximizes coverage per CI minute without running unnecessary redundant regression suites.',
    icon: 'Sliders',
  },
];

export const AI_USE_CASES: AIUseCase[] = [
  {
    id: 'test-case-generation',
    title: 'Test Case Generation',
    shortDesc: 'Generate and refine test scenarios from requirements and user stories.',
    detailedOverview:
      'Automatically extract positive flows, negative boundary cases, edge permutations, and security edge cases from product requirements and API specs.',
    practicalApplication: [
      'Extract acceptance criteria into structured Gherkin or checklist test cases',
      'Identify unstated edge cases and implicit business logic gaps',
      'Standardize scenario formatting across distributed development squads',
    ],
    engineeringBenefit:
      'Accelerates initial test design by 40–60% while uncovering overlooked boundary conditions.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 'test-automation-assistance',
    title: 'Test Automation Assistance',
    shortDesc: 'Accelerate automation development and maintenance.',
    detailedOverview:
      'Assist engineers in drafting resilient locator selectors, generating boilerplates, and updating brittle tests when UI elements or API contracts evolve.',
    practicalApplication: [
      'Generate idiomatic Playwright, Cypress, or Selenium Page Objects',
      'Update broken locators automatically during UI refactoring',
      'Convert manual exploratory test logs into structured automated scripts',
    ],
    engineeringBenefit:
      'Reduces boilerplate creation time and accelerates automation coverage ramp-up.',
    icon: 'Code2',
  },
  {
    id: 'test-data-assistance',
    title: 'Test Data Assistance',
    shortDesc: 'Help create and manage realistic test data scenarios.',
    detailedOverview:
      'Generate complex, realistic, schema-valid synthetic test datasets with proper relational constraints without exposing sensitive production PII.',
    practicalApplication: [
      'Generate diverse JSON payloads with complex nested schemas',
      'Simulate edge-case localized data (currencies, addresses, date formats)',
      'Produce anonymized test fixtures for integration suites',
    ],
    engineeringBenefit:
      'Eliminates test data bottlenecks and ensures compliance with data privacy standards.',
    icon: 'Database',
  },
  {
    id: 'failure-analysis',
    title: 'Failure Analysis',
    shortDesc: 'Assist engineers in analyzing failed tests and identifying potential causes.',
    detailedOverview:
      'Parse massive CI test run logs, diff historical execution runs, and produce concise human-readable summaries pinpointing the failure origin.',
    practicalApplication: [
      'Cluster identical failures across hundreds of parallelized test runs',
      'Distinguish test environment timeouts from genuine regression bugs',
      'Annotate pull requests with actionable failure diagnosis and stack context',
    ],
    engineeringBenefit:
      'Saves engineering hours spent debugging repetitive logs and accelerates defect resolution.',
    icon: 'AlertTriangle',
  },
  {
    id: 'regression-optimization',
    title: 'Regression Optimization',
    shortDesc: 'Identify high-value regression scenarios and opportunities for optimization.',
    detailedOverview:
      'Use impact analysis to map code diffs to relevant test suites, enabling smart test selection instead of running slow exhaustive test suites on every commit.',
    practicalApplication: [
      'Score and rank regression tests by historical defect correlation',
      'Prune overlapping test cases that validate identical code paths',
      'Execute targeted smoke suites on PRs and full suites nightly',
    ],
    engineeringBenefit:
      'Reduces CI run times and cloud runner compute costs while maintaining high risk protection.',
    icon: 'Zap',
  },
  {
    id: 'documentation-assistance',
    title: 'Documentation Assistance',
    shortDesc: 'Accelerate test documentation, summaries, and quality reporting.',
    detailedOverview:
      'Automatically generate release readiness summaries, test coverage matrices, traceability tables, and compliance documentation directly from test code.',
    practicalApplication: [
      'Produce executive-ready release quality memos and risk sign-offs',
      'Keep living automation framework documentation synced with codebases',
      'Auto-generate audit logs for SOC2, ISO, or regulatory compliance reviews',
    ],
    engineeringBenefit:
      'Provides transparent quality visibility to engineering managers and stakeholders with zero manual documentation toil.',
    icon: 'FileText',
  },
  {
    id: 'api-testing-assistance',
    title: 'API Testing Assistance',
    shortDesc: 'Accelerate API test creation and validation.',
    detailedOverview:
      'Generate contract validation tests, schema drift verifications, and negative payload fuzzing directly from OpenAPI/Swagger specifications.',
    practicalApplication: [
      'Automate contract testing across microservices architectures',
      'Fuzz API endpoints with malformed, boundary, and unexpected headers',
      'Verify status codes, response headers, and latency thresholds',
    ],
    engineeringBenefit:
      'Catches breaking backend integration changes before they reach upstream web/mobile clients.',
    icon: 'Network',
  },
  {
    id: 'qa-knowledge-assistant',
    title: 'QA Knowledge Assistant',
    shortDesc: 'Help teams discover, summarize, and organize quality-related knowledge.',
    detailedOverview:
      'Enable engineering teams to query test plans, past post-mortems, automation conventions, and quality standards in natural language.',
    practicalApplication: [
      'Provide instant answers on testing guidelines and framework standards',
      'Surface past defect patterns when designing new feature tests',
      'Onboard new software and QA engineers faster with interactive knowledge access',
    ],
    engineeringBenefit:
      'Breaks down QA silos and democratizes Quality Engineering knowledge across developers.',
    icon: 'BookOpenCheck',
  },
];
