import { GithubLogo, LinkedinLogo, InstagramLogo, Envelope, XLogo } from '@phosphor-icons/react';

export function Contact() {
  const links = [
    { name: 'Email', url: 'mailto:ishaannarang22@gmail.com', icon: Envelope },
    { name: 'GitHub', url: 'https://github.com/ishaannarang22', icon: GithubLogo },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ishaannarang22', icon: LinkedinLogo },
    { name: 'Instagram', url: 'https://instagram.com/_ishaannarang_', icon: InstagramLogo },
    { name: 'X', url: 'https://x.com/ishaanvibes', icon: XLogo }
  ];

  return (
    <section id="contact" className="scroll-mt-8">
      <h2 className="mb-6 text-crema section-heading"><span className="text-caramel">&gt;</span> Contact</h2>

      <div className="space-y-6 section-content">
        <p className="text-latte body-text">
          Always open to conversations around AI, startups, software engineering, design systems, or even coffee gear.
        </p>

        <div className="flex flex-wrap gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.name === 'Email' ? undefined : '_blank'}
                rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-2 text-mocha hover:text-caramel transition-colors"
              >
                <Icon size={18} weight="regular" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
