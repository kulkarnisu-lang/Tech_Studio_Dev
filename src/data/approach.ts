import { ApproachStep } from '../types';

export const APPROACH_STEPS: ApproachStep[] = [
  {
    stepNumber: '01',
    name: 'Discover',
    subtitle: 'Understand your product, architecture & challenges',
    description:
      'We begin by diving deep into your application architecture, release pipelines, existing test assets, team dynamics, and core quality bottlenecks.',
    activities: [
      'Architecture & tech stack review',
      'Test suite inventory & flakiness audit',
      'Developer & QA workflow mapping',
      'Pain-point & regression bottleneck analysis',
    ],
    output: 'Executive Discovery Summary & Baseline Quality Health Assessment',
  },
  {
    stepNumber: '02',
    name: 'Assess',
    subtitle: 'Identify automation gaps & risk hotspots',
    description:
      'We evaluate coverage gaps, manual regression overhead, CI/CD execution bottlenecks, and AI-readiness opportunities with clear risk prioritization.',
    activities: [
      'Coverage vs. risk hotspot mapping',
      'Automation framework architectural audit',
      'CI/CD pipeline test gate evaluation',
      'AI productivity & automation feasibility scoring',
    ],
    output: 'Prioritized Gap Analysis & ROI-Driven Recommendations',
  },
  {
    stepNumber: '03',
    name: 'Design',
    subtitle: 'Create a tailored Quality Engineering strategy',
    description:
      'We architect a pragmatic, maintainable Quality Engineering blueprint tailored to your team skills, release frequency, and business targets.',
    activities: [
      'Test automation framework architectural design',
      'Shift-left testing guidelines & PR quality gate criteria',
      'AI-assisted test tooling & workflow design',
      'Phased rollout milestones & metric definitions',
    ],
    output: 'Comprehensive Quality Engineering Blueprint & Execution Roadmap',
  },
  {
    stepNumber: '04',
    name: 'Implement',
    subtitle: 'Build automation, pipelines & AI workflows',
    description:
      'We write robust test automation, integrate automated pipeline gates, implement AI-assisted accelerators, and upskill your engineering squad.',
    activities: [
      'Core framework engineering & regression suite build-out',
      'CI/CD quality gate & parallel runner integration',
      'AI test generation & triage workflow setup',
      'Pair programming & technical mentoring for engineers',
    ],
    output: 'Production-Ready Framework, Automated Suites & Upskilled Team',
  },
  {
    stepNumber: '05',
    name: 'Improve',
    subtitle: 'Measure outcomes & continuously optimize',
    description:
      'We track defect leakage, build speeds, maintenance overhead, and automation stability, continuously refining workflows as your platform grows.',
    activities: [
      'Regression execution time telemetry & optimization',
      'Flakiness tracking & automated root-cause tuning',
      'Quarterly quality reviews & framework updates',
      'Continuous AI workflow refinement & prompt tuning',
    ],
    output: 'Measurable Quality Metrics, Faster Releases & Sustainable Autonomy',
  },
];
