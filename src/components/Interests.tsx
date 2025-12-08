export function Interests() {
  const coffeeGear = [
    { name: 'V60', type: 'Brewer' },
    { name: 'Fellow EKG Pro Studio', type: 'Kettle' },
    { name: 'Fellow Ode Gen2 (SSP Burrs)', type: 'Grinder' }
  ];

  const chessStats = [
    { name: '1017', type: 'FIDE Standard Rating' },
    { name: 'Ruy Lopez', type: 'Favorite Opening' },
    { name: 'ishaan2204', type: 'Chess.com', link: 'https://www.chess.com/member/ishaan2204' }
  ];

  return (
    <section id="interests" className="scroll-mt-8">
      <h2 className="mb-6 text-white section-heading"><span className="text-zinc-600">&gt;</span> Other Interests</h2>

      <div className="space-y-8 section-content">
        <div className="pb-8 border-b border-zinc-800/50">
          <h3 className="mb-3 text-zinc-500">Coffee</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Outside tech, I'm deeply into specialty coffee. I serve as Treasurer of the Coffee Club, manage budgets, and help run tastings and brew classes. My personal setup leans toward clean, bright, fruity cups — usually with V60 and light-roast beans. I'm the guy who will happily discuss extraction theory or grind calibration at 2 AM.
          </p>

          <div className="space-y-3">
            <p className="text-zinc-500 text-sm font-mono">My Setup:</p>
            <div className="space-y-1 font-mono text-sm">
              {coffeeGear.map((gear, index) => (
                <div key={index} className="text-zinc-400">
                  <span className="text-zinc-600">{'>>'} </span>
                  {gear.name}
                  <span className="text-zinc-600"> // {gear.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-zinc-500">Chess</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            I enjoy playing chess as a way to unwind and sharpen my thinking. Big fan of classical openings — the Ruy Lopez is my go-to. Always down for a game.
          </p>

          <div className="space-y-3">
            <p className="text-zinc-500 text-sm font-mono">Stats:</p>
            <div className="space-y-1 font-mono text-sm">
              {chessStats.map((stat, index) => (
                <div key={index} className="text-zinc-400">
                  <span className="text-zinc-600">{'>>'} </span>
                  {stat.link ? (
                    <a
                      href={stat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      {stat.name}
                    </a>
                  ) : (
                    stat.name
                  )}
                  <span className="text-zinc-600"> // {stat.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}