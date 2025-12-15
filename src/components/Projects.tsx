import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function Projects() {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Surge.events',
      description: 'Multi-tenant tourism SaaS that aggregates, analyzes, and publishes events for municipalities. Includes Elastic-powered semantic search, multi-source ingestion pipelines, and real-time click tracking. Built in under 4 weeks and secured its first B2B customer immediately.',
      technologies: ['Next.js', 'Supabase', 'ElasticSearch', 'n8n', 'Edge Functions'],
      githubUrl: 'https://github.com/Ishaannarang22/surge-events',
      liveUrl: 'https://surge.events'
    },
    {
      id: '2',
      title: 'AgentOverflow',
      description: 'Best Use of Elastic Agents @ CalHacks 12.0. A "Stack Overflow for the AI era" that captures validated problem–solution pairs for AI debugging, then injects them directly into LLM contexts using a custom MCP server.',
      technologies: ['Node.js', 'ElasticSearch', 'MCP', 'Vectors'],
      githubUrl: 'https://github.com/Ishaannarang22/agentoverflow'
    },
    {
      id: '3',
      title: 'deCluttered.ai',
      description: 'Best Fetch.ai Hack @ MHacks 2025. Autonomous resale platform powered by multi-agent workflows—item detection → pricing → negotiation → listing automation.',
      technologies: ['Fetch.ai', 'YOLOv8', 'PostgreSQL', 'Agentverse', 'REST APIs'],
      githubUrl: 'https://github.com/Ishaannarang22/Decluttered.ai'
    },
    {
      id: '4',
      title: 'FinGuard',
      description: 'Best Capital One Hack @ Bitcamp 2025. AI-powered browser extension + dashboard that detects phishing and fraud signals in real time.',
      technologies: ['Gemini 1.5 Flash', 'MongoDB Atlas', 'Pinecone', 'AWS EC2/Lambda', 'Chrome Extension'],
      githubUrl: 'https://github.com/Ishaannarang22/FinGuard'
    },
    {
      id: '5',
      title: 'Penn State AI Resource Chatbot',
      description: 'Built for ML Club to help students access University resources through a natural interface. Used by 100+ students.',
      technologies: ['Next.js', 'Supabase', 'Custom Embeddings', 'RAG Pipeline'],
      liveUrl: 'https://buddy.mlpsu.org'
    },
    {
      id: '6',
      title: 'Virtual Memory Manager',
      description: 'C-based paging system handling page faults, signals, and replacement policies.',
      technologies: ['C', 'Systems Programming', 'Memory Management']
    },
    {
      id: '7',
      title: 'Custom TTS Fine-tuning Pipeline',
      description: 'Building voice models for personalized speech synthesis.',
      technologies: ['Python', 'ML', 'Audio Processing']
    },
    {
      id: '8',
      title: 'Algorithmic Trading',
      description: 'Actively exploring quantitative trading with a focus on Python-based strategies, backtesting, and live execution in the Indian markets. Working with Zerodha APIs and experimenting with machine learning techniques to improve signal quality, feature design, and trading performance.',
      technologies: ['Python', 'Pandas', 'NumPy', 'TA-Lib', 'Zerodha Kite Connect', 'WebSockets', 'PostgreSQL', 'ElasticSearch', 'scikit-learn'],
      githubUrl: 'https://github.com/Ishaannarang22/algo-trader-project'
    }
  ];

  return (
    <section id="projects" className="scroll-mt-8">
      <h2 className="mb-6 text-crema section-heading"><span className="text-caramel">&gt;</span> Projects</h2>

      <div className="space-y-10 section-content">
        {projects.map((project) => (
          <article key={project.id} className="project-card border-b border-roasted/50 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              {(project.liveUrl || project.githubUrl) ? (
                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crema hover:text-amber transition-colors"
                >
                  <h3>{project.title}</h3>
                </a>
              ) : (
                <h3 className="text-crema">{project.title}</h3>
              )}
              <div className="flex gap-4 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mocha hover:text-caramel transition-colors"
                    aria-label="View source on GitHub"
                  >
                    <GithubLogo size={18} weight="regular" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mocha hover:text-caramel transition-colors"
                    aria-label="View live demo"
                  >
                    <ArrowSquareOut size={18} weight="regular" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-latte mb-4 body-text">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 font-mono text-sm">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}