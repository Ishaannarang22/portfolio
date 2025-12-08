import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export function Contact() {
  const links = [
    { name: 'Email', url: 'mailto:ishaannarang22@gmail.com', icon: Mail },
    { name: 'GitHub', url: 'https://github.com/ishaannarang22', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ishaannarang22', icon: Linkedin },
    { name: 'Instagram', url: 'https://instagram.com/_ishaannarang_', icon: Instagram },
    {
      name: 'X',
      url: 'https://x.com/ishaanvibes', 
      icon: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
  ];

  return (
    <section id="contact" className="scroll-mt-8">
      <h2 className="mb-6 text-white section-heading"><span className="text-zinc-600">&gt;</span> Contact</h2>
      
      <div className="space-y-6 section-content">
        <p className="text-zinc-400 leading-relaxed">
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
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
