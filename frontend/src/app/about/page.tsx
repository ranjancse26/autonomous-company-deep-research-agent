export default function AboutPage() {
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
              Meet the Founder
            </h2>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Ranjan Dailata</h3>
              <p className="text-lg text-gray-600">Co-Founder & Enterprise Architect</p>
              <p className="text-sm text-gray-500">MachinaOne | AI Agents, SaaS APIs, Architecting & Consulting</p>
              <p className="text-sm text-gray-500">Mysore, Karnataka, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact & Certifications */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">📧</span>
                  <a href="mailto:ranjan.cse@gmail.com" className="text-blue-600 hover:text-blue-800">
                    ranjancse@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">🔗</span>
                  <a href="https://www.linkedin.com/in/ranjan-dailata" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <span className="text-gray-700">100 Mentorship Minutes</span>
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Artificial Intelligence (AI)', 'Automation'].map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Summary & Experience */}
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">
                Experienced Enterprise Architect and AI specialist with expertise in building AI-first products and services.
                Specialized in healthcare domain analysis, system architecture, and cutting-edge technologies including Machine Learning,
                Blockchain, and Natural Language Processing.
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Role</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800">Co-Founder, MachinaOne</h4>
                <p className="text-sm text-gray-600">August 2025 - Present • Mysore, Karnataka, India</p>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• AI Automations - Designing and deploying autonomous workflows powered by LLMs and intelligent agents</p>
                <p>• Architecting Solutions - Building scalable system architectures for AI-first applications and SaaS products</p>
                <p>• Consulting - Guiding businesses on AI adoption, strategy, and best practices for automation</p>
                <p>• Custom Integrations - Connecting APIs, SaaS platforms and enterprise tools</p>
                <p>• Vector Intelligence - Implementing vector databases for knowledge retrieval and personalization</p>
                <p>• AI SaaS APIs - Developing RESTful APIs to expose AI services</p>
                <p>• Security & Compliance - Ensuring enterprise-grade data security and governance</p>
                <p>• MCP Orchestration - Leveraging Model Context Protocol for unified workflows</p>
              </div>
            </div>

            {/* Key Expertise */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Expertise</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">Programming</p>
                  <p className="text-gray-600">C#, VB.NET, Node.js, Next.js</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">Frameworks</p>
                  <p className="text-gray-600">.NET Core, React, Angular, ASP.NET</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">Cloud Platforms</p>
                  <p className="text-gray-600">Azure, AWS, Docker, Kubernetes</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">AI/ML Technologies</p>
                  <p className="text-gray-600">Machine Learning, Deep Learning, Natural Language Processing (NLP), 
                    Computer Vision, Generative AI, Large Language Models (LLMs), 
                    Speech Recognition, Knowledge Graphs, AI Agents & Autonomous Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}