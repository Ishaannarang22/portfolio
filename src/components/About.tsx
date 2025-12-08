export function About() {
  const ishaan = {
    bio: "I'm a computer science student, builder, and founder who loves turning chaotic ideas into clean, scalable systems. I thrive at the intersection of AI, full-stack development, and product execution, and I'm happiest when shipping fast, solving real problems, and watching people actually use what I create. Whether it's an event-aggregation SaaS, a financial safety tool, or an autonomous resale platform, I focus on building things that work and deliver real-world impact.",
    // bio_full: "I'm a computer science student, builder, and founder who loves turning chaotic ideas into clean, scalable systems. I thrive at the intersection of AI, full-stack development, and product execution, and I'm happiest when shipping fast, solving real problems, and watching people actually use what I create. Whether it's an event-aggregation SaaS, a financial safety tool, or an autonomous resale platform, I focus on building things that work — and that deliver real-world impact.",
    // achievements: [
    //   "Built Surge.Events from idea to paying customer in 4 weeks",
    //   "4× hackathon winner — CalHacks, MHacks, Bitcamp, HackPSU",
    //   "Created Penn State's AI chatbot, now used by 100+ students",
    //   "Dean's List, multiple semesters",
    //   "Speaker on AI & transformers to 50+ attendees",
    //   "Secured tourism & airline partnerships through leadership roles"
    // ],
    // strengths: [
    //   "Full-stack — React, Next.js, React Native, Supabase, PostgreSQL",
    //   "AI/ML — vector search, agent frameworks, multi-agent pipelines",
    //   "End-to-end execution — idea to deployed product",
    //   "Rapid prototyping — MVPs in days, not months",
    //   "Leadership — teaching, speaking, running technical teams",
    //   "Automation — workflows, APIs, backend agents"
    // ],
    // goals: [
    //   "Build AI infrastructure that solves real problems",
    //   "Scale Surge.Events to tourism departments nationwide",
    //   "Master distributed systems, search, and AI agents",
    //   "Mentor developers through ML Club",
    //   "Ship products that feel like magic"
    // ]
  };

  return (
    <section id="about" className="scroll-mt-8">
      <h2 className="mb-6 text-white section-heading"><span className="text-zinc-600">&gt;</span> About</h2>
      
      <div className="space-y-8 section-content">
        {/* Bio */}
        <p className="text-zinc-400 leading-relaxed">
          {ishaan.bio}
        </p>

        {/* Achievements - commented out for now
        <div>
          <h3 className="mb-3 text-zinc-500 font-mono">ishaan.achievements</h3>
          <div className="space-y-1 font-mono text-sm">
            {ishaan.achievements.map((achievement, index) => (
              <div key={index} className="text-zinc-400">
                <span className="text-zinc-600">&gt;</span>{' '}
                {achievement}
              </div>
            ))}
          </div>
        </div>
        */}

        {/* Strengths - commented out for now
        <div>
          <h3 className="mb-3 text-zinc-500 font-mono">ishaan.strengths</h3>
          <div className="space-y-1 font-mono text-sm">
            {ishaan.strengths.map((strength, index) => (
              <div key={index} className="text-zinc-400">
                <span className="text-zinc-600">&gt;</span>{' '}
                {strength}
              </div>
            ))}
          </div>
        </div>
        */}

        {/* Goals - commented out for now
        <div>
          <h3 className="mb-3 text-zinc-500 font-mono">ishaan.goals</h3>
          <div className="space-y-1 font-mono text-sm">
            {ishaan.goals.map((goal, index) => (
              <div key={index} className="text-zinc-400">
                <span className="text-zinc-600">&gt;</span>{' '}
                {goal}
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}