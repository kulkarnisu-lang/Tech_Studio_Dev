import { TechCategory } from '../types';

export const TECHNOLOGIES_DATA: TechCategory[] = [
  {
    category: 'Programming & Languages',
    description: 'Modern, strongly typed languages and runtimes for test architecture and automation.',
    items: [
      {
        name: 'TypeScript',
        description: 'Strongly typed test automation frameworks, type-safe API assertions, and test tooling.',
        badge: 'Primary',
      },
      {
        name: 'JavaScript / Node.js',
        description: 'Lightweight automation runners, microservices validation, and npm script orchestration.',
      },
      {
        name: 'Python',
        description: 'Backend test frameworks, data pipeline validation, AI automation scripts, and test tooling.',
        badge: 'Core',
      },
    ],
  },
  {
    category: 'Automation & Frameworks',
    description: 'Scalable frameworks for web, API, headless, and end-to-end regression validation.',
    items: [
      {
        name: 'UI Test Automation',
        description: 'Modern browser automation with resilient locators, auto-waiting, and cross-browser coverage.',
      },
      {
        name: 'API & Contract Automation',
        description: 'REST, GraphQL, and microservice contract testing with automated schema drift detection.',
      },
      {
        name: 'Test Framework Architecture',
        description: 'Modular Page Object, App Action, and Screenplay patterns designed for multi-team scale.',
      },
      {
        name: 'Component & Integration Testing',
        description: 'Fast, isolated component and headless service verification for shift-left feedback.',
      },
    ],
  },
  {
    category: 'DevOps & Continuous Quality',
    description: 'Zero-touch pipeline orchestration, parallel execution, and automated deployment gating.',
    items: [
      {
        name: 'CI/CD Pipeline Integration',
        description: 'Pull-request test triggers, matrix runners, and automated branch deployment validation.',
      },
      {
        name: 'Continuous Testing & Quality Gates',
        description: 'Threshold-based deployment blockers for test pass rates, flakiness, and security checks.',
      },
      {
        name: 'Parallel Runner Orchestration',
        description: 'Distributed test execution across cloud containers to compress 2-hour suites into minutes.',
      },
      {
        name: 'Telemetry & Test Reporting',
        description: 'Real-time test telemetry, flakiness trend analysis, and automated release reports.',
      },
    ],
  },
  {
    category: 'AI & Engineering Productivity',
    description: 'Intelligent AI-assisted tools that accelerate test design, triage, and optimization.',
    items: [
      {
        name: 'AI-Assisted Test Generation',
        description: 'Extracting boundary scenarios, edge cases, and synthetic test datasets from user stories.',
        badge: 'AI Powered',
      },
      {
        name: 'Intelligent Failure Analysis',
        description: 'AI-powered stack trace parsing, failure categorization, and automated root-cause suggestions.',
        badge: 'AI Powered',
      },
      {
        name: 'Regression Suite Optimization',
        description: 'Predictive test selection and impact analysis based on repository code diffs.',
      },
      {
        name: 'QA Productivity Automation',
        description: 'Custom engineering prompt toolkits, test documentation synthesis, and QA knowledge agents.',
      },
    ],
  },
];
