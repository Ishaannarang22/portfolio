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
      <h2 className="mb-6 text-crema section-heading"><span className="text-caramel">&gt;</span> Other Interests</h2>

      <div className="space-y-10 section-content">
        <div className="pb-10 border-b border-roasted/50">
          <h3 className="mb-4 text-amber">Coffee</h3>
          <p className="text-latte body-text mb-5">
            Outside tech, I'm deeply into specialty coffee. I serve as Treasurer of the Coffee Club, manage budgets, and help run tastings and brew classes. My personal setup leans toward clean, bright, fruity cups — usually with V60 and light-roast beans. I'm the guy who will happily discuss extraction theory or grind calibration at 2 AM.
          </p>

          <div className="space-y-4">
            <p className="text-latte text-sm font-mono">My Setup:</p>
            <div className="highlight-list font-mono text-sm">
              {coffeeGear.map((gear, index) => (
                <div key={index} className="text-latte">
                  <span className="text-caramel">{'>>'} </span>
                  {gear.name}
                  <span className="text-mocha"> // {gear.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-amber">Chess</h3>
          <p className="text-latte body-text mb-5">
            I enjoy playing chess as a way to unwind and sharpen my thinking. Big fan of classical openings — the Ruy Lopez is my go-to. Always down for a game.
          </p>

          <div className="space-y-4">
            <p className="text-latte text-sm font-mono">Stats:</p>
            <div className="highlight-list font-mono text-sm">
              {chessStats.map((stat, index) => (
                <div key={index} className="text-latte">
                  <span className="text-caramel">{'>>'} </span>
                  {stat.link ? (
                    <a
                      href={stat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber transition-colors"
                    >
                      {stat.name}
                    </a>
                  ) : (
                    stat.name
                  )}
                  <span className="text-mocha"> // {stat.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}