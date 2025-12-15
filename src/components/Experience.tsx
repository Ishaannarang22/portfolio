import { ReactNode } from 'react';

interface ExperienceItem {
  id: string;
  title: string;
  company: ReactNode;
  period: string;
  description: string;
  highlights: string[];
}

export function Experience() {
  const experiences: ExperienceItem[] = [
    {
      id: '1',
      title: 'Co-founder & CTO',
      company: <a href="https://surge.events" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Surge.Events</a>,
      period: 'Fall 2025 – Present',
      description: 'Built a full SaaS ecosystem for tourism organizations to manage public events.',
      highlights: [
        'Designed ingestion pipelines, semantic search, and analytics dashboards',
        'Integrated municipal APIs and managed full client onboarding',
        'Owned the entire engineering roadmap, infra, and partner communications'
      ]
    },
    {
      id: '2',
      title: 'Technical Lead',
      company: <><a href="https://mlpsu.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Machine Learning Club</a> @ Penn State</>,
      period: 'Spring 2025 – Present',
      description: 'Leading technical initiatives and AI education for the club.',
      highlights: [
        'Ran AI literacy seminars for freshmen and new developers',
        'Led development of major club project (PSU AI chatbot)',
        'Delivered technical talks on advanced Transformer architectures',
        'Grew club membership to 100+ through outreach and community-building'
      ]
    },
    {
      id: '3',
      title: 'Operations',
      company: 'Quality Hotel (Choice Hotels Affiliate)',
      period: 'Summer 2025',
      description: 'Managed hotel operations and automated key business processes.',
      highlights: [
        'Supervised bilingual housekeeping staff and streamlined communication through PMS',
        'Automated payroll and housekeeping reports via API',
        'Negotiated with airlines for distressed-passenger programs, boosting occupancy'
      ]
    },
    {
      id: '4',
      title: 'Additional Technical Experience',
      company: 'Academic & Research',
      period: 'Ongoing',
      description: 'Continuous hands-on engineering across various domains.',
      highlights: [
        'Built autonomous agents, fraud detection tools, and financial safety workflows',
        'Conducted research on ML optimization & agent-based systems',
        'Hands-on engineering across Python, C, Docker, AWS, and database systems'
      ]
    }
  ];

  return (
    <section id="experience" className="scroll-mt-8">
      <h2 className="mb-6 text-white section-heading"><span className="text-zinc-600">&gt;</span> Experience</h2>
      
      <div className="space-y-10 section-content">
        {experiences.map((exp) => (
          <article key={exp.id} className="experience-card">
            <h3 className="text-white">{exp.title}</h3>
            <div className="flex flex-wrap gap-3 mt-1 mb-2 text-zinc-500 text-sm">
              <span>{exp.company}</span>
              <span>•</span>
              <span>{exp.period}</span>
            </div>
            
            <p className="text-zinc-400 body-text mb-4">
              {exp.description}
            </p>

            <div className="highlight-list font-mono text-sm">
              {exp.highlights.map((highlight, idx) => (
                <div key={idx} className="text-zinc-400">
                  <span className="text-zinc-600">&gt;</span>{' '}
                  {highlight}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}