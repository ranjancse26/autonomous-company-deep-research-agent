import ProductFeatures from '@/components/ProductFeatures';

const detailedFeatures = [
  {
    icon: '📊',
    label: 'Company Overview',
    description: 'Comprehensive company analysis including business model, market position, and key metrics.'
  },
  {
    icon: '💰',
    label: 'Funding History',
    description: 'Detailed funding rounds, investment amounts, and investor profiles with historical data.'
  },
  {
    icon: '⚔️',
    label: 'Competitors Analysis',
    description: 'In-depth competitor landscape mapping with SWOT analysis and market positioning.'
  },
  {
    icon: '👥',
    label: 'Founders Analysis',
    description: 'Background research on company founders, their experience, and track record.'
  },
  {
    icon: '👷',
    label: 'Hiring Analysis',
    description: 'Current job openings, hiring trends, and company culture insights.'
  },
  {
    icon: '📰',
    label: 'News Intelligence',
    description: 'Latest news, press releases, and media coverage analysis for the company.'
  },
  {
    icon: '💻',
    label: 'Technology Stack',
    description: 'Analysis of the company\'s technology infrastructure and development practices.'
  },
  {
    icon: '📋',
    label: 'VC Due Diligence Reports',
    description: 'Professional VC-grade reports in PDF or Markdown format for investment decisions.'
  },
  {
    icon: '🤖',
    label: 'AI-Powered Research',
    description: 'Autonomous AI agents that continuously gather and analyze company intelligence.'
  },
  {
    icon: '🌐',
    label: 'Global Coverage',
    description: 'Support for companies across different countries with localized research capabilities.'
  },
  {
    icon: '⚡',
    label: 'Real-time Updates',
    description: 'Continuous monitoring and real-time updates on company developments.'
  },
  {
    icon: '🔒',
    label: 'Secure & Private',
    description: 'Enterprise-grade security with privacy-first data handling practices.'
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/deep_research_agent_logo.png" alt="Deep Research Agent Logo" height="48" width="48" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Company Deep Research Agent
                </h1>
                <p className="text-xs text-gray-500 font-medium">Autonomous Company Intelligence</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </a>
              <a href="/features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Features
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Deep Research
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Explore the comprehensive capabilities of our autonomous company deep research agent.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ProductFeatures features={detailedFeatures} />
      </main>
    </div>
  );
}