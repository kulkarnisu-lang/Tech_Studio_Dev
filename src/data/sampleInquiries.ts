import { AdminInquiry } from '../types';

export const INITIAL_INQUIRIES: AdminInquiry[] = [
  {
    id: 'inq-101',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@cloudscale.ai',
    company: 'CloudScale AI Technologies',
    serviceInterest: 'AI-Powered Quality Engineering',
    message:
      'We run 12,000+ Playwright and API tests per release cycle. Our CI runners are bogged down by test flakiness and manual triage. Looking to deploy intelligent test triage and automated failure clustering to decrease developer wait time.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'new',
    source: 'modal',
    notes: 'High priority lead. Team size: 45 engineers. Inquired about quick-start advisory sprint.',
  },
  {
    id: 'inq-102',
    name: 'Marcus Vance',
    email: 'm.vance@finmatrix.io',
    company: 'FinMatrix Global Payments',
    serviceInterest: 'Quality Engineering Strategy',
    message:
      'Transitioning our 40-engineer fintech core platform to shift-left testing. Need an architecture audit, test maturity benchmarking, and CI/CD quality gate blueprint for SOC2/PCI compliance.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    source: 'contact-form',
    notes: 'Discovery call scheduled with Dev Marlow for Thursday at 3:00 PM EST. Architecture deck prepared.',
  },
  {
    id: 'inq-103',
    name: 'Elena Rostova',
    email: 'elena.rostova@healthsync.io',
    company: 'HealthSync Systems',
    serviceInterest: 'Test Automation Architecture',
    message:
      'Our legacy Cypress suites have 18% flakiness and run over 45 minutes on PR checks. Seeking a strategic assessment to stabilize, optimize execution, and evaluate migration to Playwright with parallelized runners.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'contacted',
    source: 'modal',
    notes: 'Sent initial Automation Health Audit scope and sample report. Follow-up email sent yesterday.',
  },
  {
    id: 'inq-104',
    name: 'David Chen',
    email: 'david@nextgenlogistics.com',
    company: 'NextGen Logistics',
    serviceInterest: 'CI/CD Pipeline Quality Gates',
    message:
      'Fast-growing Series A supply chain startup with 8 developers and no dedicated QA. Need foundational automation framework, PR blocking quality gates, and automated smoke suites.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'closed',
    source: 'contact-form',
    notes: 'Engagement kickoff completed. 6-week foundational Quality Engineering Sprint started.',
  },
];
