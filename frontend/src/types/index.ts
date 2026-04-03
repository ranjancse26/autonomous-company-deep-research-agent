// API Types for the Deep Research Agent

export interface VCReportRequest {
  company: string;
  format?: 'pdf' | 'markdown';
  country?: string;
}

export interface MarketAnalysis {
  market_size: string;
  growth_rate: string;
  trends: string[];
  target_market: string;
  market_segments: string[];
}

export interface Competitor {
  name: string;
  description: string;
  pricing: string;
  strengths: string[];
  weaknesses: string[];
  market_share: string;
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  background: string;
}

export interface Financials {
  revenue_model: string;
  revenue_projections: string;
  key_expenses: string[];
  funding_history: string[];
}

export interface VCReport {
  company_name: string;
  summary: string;
  company_overview: string;
  product: string;
  technology: string;
  business_model: string;
  market_analysis: MarketAnalysis;
  competitors: Competitor[];
  swot: SWOT;
  team: TeamMember[];
  financials: Financials;
  traction: string;
  go_to_market_strategy: string;
  use_of_funds: string;
  investment_thesis: string;
  risks: string[];
  exit_potential: string;
}

export interface FundingHistory {
  round: string;
  amount: string;
  investors: string[];
}

// Removed old conflicting schema types

export interface ResearchResponse {
  company_name: string;
  overview?: string;
  products?: string[];
  funding_history?: FundingHistory[];
  competitors?: Competitor[];
  team?: TeamMember[];
  hiring_signals?: {
    open_roles?: number;
    growth_rate?: string;
    roles_in_demand?: string[];
  };
  news?: {
    articles?: Array<{
      title: string;
      date: string;
      sentiment?: string;
    }>;
  };
  technology_stack?: {
    languages?: string[];
    frameworks?: string[];
    cloud?: string[];
    databases?: string[];
  };
}

// Competitor Analysis Response
export interface DirectCompetitor {
  name: string | null;
  description: string | null;
  similarity_score: number | null;
  key_products: string[];
  strengths: string[];
  weaknesses: string[];
  source: string | null;
}

export interface IndirectCompetitor {
  name: string | null;
  description: string | null;
  market_segment: string | null;
  source: string | null;
}

export interface EmergingCompetitor {
  name: string | null;
  description: string | null;
  innovation_area: string | null;
  source: string | null;
}

export interface CompetitiveLandscape {
  market_category: string | null;
  differentiation_factors: string[];
  competitive_advantages: string[];
  market_leaders: string[];
}

export interface InvestmentThesis {
  summary: string;
  scale: {
    total_payment_volume_2025: string;
    reported_revenue_2024: string;
    valuation_2026_tender: string;
  };
  monetization_levers: string[];
  strengths: string[];
  opportunities: string[];
  risks: string[];
  investment_view: {
    bull_case: string;
    bear_case: string;
  };
}

export interface CompetitorsAnalysisResponse {
  company: string | null;
  direct_competitors: DirectCompetitor[];
  indirect_competitors: IndirectCompetitor[];
  emerging_competitors: EmergingCompetitor[];
  competitive_landscape: CompetitiveLandscape;
  investment_thesis?: InvestmentThesis;
  sources: Array<{ id: number; url: string }>;
}

export interface CompetitorsResponse {
  competitors: CompetitorsAnalysisResponse;
}

// Updated Company Analysis Response based on new schema
export interface Headquarters {
  city: string | null;
  state: string | null;
  country: string | null;
}

export interface CompanyProfile {
  name: string | null;
  legal_name: string | null;
  website: string | null;
  description: string | null;
  industry: string | null;
  sub_industry: string | null;
  founded_year: number | null;
  headquarters: Headquarters;
  business_model: string | null;
  company_stage: string | null;
  employee_count_estimate: number | null;
}

export interface Founder {
  name: string | null;
  role: string | null;
  linkedin: string | null;
  previous_companies: string[];
  education: string[];
  background_summary: string | null;
  notable_achievements: string[];
}

export interface LeadershipTeamMember {
  name: string | null;
  title: string | null;
  linkedin: string | null;
  previous_roles: string[];
}

export interface ProductService {
  name: string | null;
  description: string | null;
  category: string | null;
  target_customer: string | null;
  pricing_model: string | null;
}

export interface TechnologyStack {
  ai_technologies: string[];
  core_technologies: string[];
  infrastructure: string[];
  data_stack: string[];
}

export interface LatestRound {
  round_type: string | null;
  amount_usd: number | null;
  date: string | null;
}

export interface FundingRound {
  round: string | null;
  amount_usd: number | null;
  date: string | null;
  lead_investors: string[];
  investors: string[];
}

export interface Funding {
  total_funding_usd: number | null;
  latest_round: LatestRound;
  funding_rounds: FundingRound[];
  notable_investors: string[];
}

export interface TractionMetrics {
  users: number | null;
  customers: number | null;
  revenue_estimate: number | null;
  growth_rate: number | null;
  partnerships: string[];
}

export interface MarketSize {
  tam: number | null;
  sam: number | null;
  som: number | null;
}

export interface MarketAnalysisSchema {
  market_category: string | null;
  target_market: string | null;
  market_size: MarketSize;
  growth_rate: number | null;
  key_trends: string[];
}

export interface CompetitiveCompetitor {
  name: string | null;
  description: string | null;
  differentiation: string | null;
}

export interface CompetitiveLandscapeSchema {
  direct_competitors: CompetitiveCompetitor[];
  indirect_competitors: string[];
  competitive_advantages: string[];
  barriers_to_entry: string[];
}

export interface GoToMarket {
  target_customers: string[];
  distribution_channels: string[];
  sales_strategy: string | null;
  marketing_strategy: string | null;
}

export interface HiringSignalsSchema {
  open_roles: string[];
  engineering_roles: string[];
  growth_indicator: string | null;
  hiring_trend: string | null;
}

export interface FinancialSignals {
  revenue_model: string | null;
  unit_economics: string | null;
  burn_rate_estimate: number | null;
  runway_estimate: number | null;
}

export interface RiskAnalysis {
  risk_type: string | null;
  description: string | null;
  severity: string | null;
  mitigation: string | null;
}

export interface InvestmentThesisSchema {
  summary: string | null;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  key_questions_for_founders: string[];
}

export interface Signals {
  positive_signals: string[];
  warning_signals: string[];
}

export interface ConfidenceScore {
  overall: number | null;
  data_quality: number | null;
  source_coverage: number | null;
}

export interface Source {
  id: string | null;
  url: string | null;
  title: string | null;
}

export interface CompanyAnalysisResponse {
  company_profile: CompanyProfile;
  founders: Founder[];
  leadership_team: LeadershipTeamMember[];
  products_services: ProductService[];
  technology_stack: TechnologyStack;
  funding: Funding;
  traction_metrics: TractionMetrics;
  market_analysis: MarketAnalysisSchema;
  competitive_landscape: CompetitiveLandscapeSchema;
  go_to_market: GoToMarket;
  hiring_signals: HiringSignalsSchema;
  financial_signals: FinancialSignals;
  risk_analysis: RiskAnalysis[];
  investment_thesis: InvestmentThesisSchema;
  signals: Signals;
  confidence_score: ConfidenceScore;
  sources: Source[];
}

export interface ApiError {
  detail: string;
}

export type ResearchType = 
  | 'comprehensive'
  | 'funding'
  | 'competitors'
  | 'founders'
  | 'hiring'
  | 'news'
  | 'technology';

export interface FoundersResponse {
  company: string;
  founders: Array<{
    name: string;
    title: string;
    linkedin?: string;
    twitter?: string;
    education: any[];
    previous_companies: any[];
    notable_achievements: string[];
    location?: string;
    bio_summary: string;
    credibility_signals: string[];
    source: string;
  }>;
  leadership_team: Array<{
    name: string;
    title: string;
    background: string;
    source: string;
  }>;
  sources: Array<{
    id: number;
    url: string;
  }>;
}

export interface HiringAnalysisResponse {
  company: string;
  hiring_summary: {
    total_open_roles: number;
    engineering_roles: number | null;
    hiring_velocity: string;
    growth_signal: string;
  };
  department_hiring: {
    engineering: string[];
    sales: string[];
    product: string[];
    marketing: string[];
    operations: string[];
  };
  job_postings: string[];
  hiring_locations: string[];
  recruiting_platforms: string[];
  remote_work_policy: string | null;
  growth_indicators: string[];
  sources: Array<{ id: number; url: string }>;
}

export interface NewsArticle {
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
}

export interface NewsIntelligenceResponse {
  news: NewsArticle[];
  metadata: {
    company: string;
    article_count: number;
  };
}

export interface TechnologyStackResponse {
  technology_stack: {
    programming_languages: string[];
    developer_tools: string[];
    frameworks: string[];
    databases: string[];
    devops_tools: string[];
    other_technologies: string[];
  };
  metadata: {
    company: string;
    source_count: number;
  };
}

export interface ResearchFormData {
  company: string;
  country: string;
  researchTypes: ResearchType[];
}
