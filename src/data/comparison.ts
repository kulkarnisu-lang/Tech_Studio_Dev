export interface ComparisonPoint {
  category: string;
  traditional: string;
  modern: string;
  impact: string;
}

export const COMPARISON_DATA = {
  traditionalTitle: 'Traditional QA Approach',
  traditionalTagline: 'Manual, Late-Stage, Reactive Bottleneck',
  modernTitle: 'Modern AI-Augmented QE',
  modernTagline: 'Continuous, Shift-Left, Scalable Engineering',
  points: [
    {
      category: 'Regression Execution',
      traditional: 'Large manual regression cycles taking days or weeks before each release.',
      modern: 'Automated regression suites running continuously in CI/CD within minutes.',
      impact: 'Up to 70% faster feedback loops on pull requests.',
    },
    {
      category: 'Test Maintenance',
      traditional: 'Fragile scripts that break constantly, causing maintenance churn and distrust.',
      modern: 'Maintainable, modular frameworks with intelligent locator resiliency & triage.',
      impact: 'Engineers spend time building new coverage rather than fixing brittle tests.',
    },
    {
      category: 'Feedback Timing',
      traditional: 'Late feedback concentrated near release staging, leading to release delays.',
      modern: 'Shift-left quality gates providing immediate feedback during code review.',
      impact: 'Defects are caught when they are 10x cheaper to fix.',
    },
    {
      category: 'AI & Automation',
      traditional: 'No AI integration; repetitive test case drafting and manual log digging.',
      modern: 'AI-assisted test generation, failure root-cause analysis, and regression pruning.',
      impact: 'Augments engineers to focus on architectural risk and exploratory testing.',
    },
    {
      category: 'Quality Visibility',
      traditional: 'Limited visibility into actual quality risks until production incidents occur.',
      modern: 'Continuous quality telemetry, flakiness monitoring, and clear release thresholds.',
      impact: 'Data-driven release confidence for engineering leaders and product teams.',
    },
  ],
};
