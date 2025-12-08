import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Github, Instagram } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 header-blur">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8 animate-fade-in">
            {/* Profile Photo */}
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-3xl overflow-hidden">
                <ImageWithFallback
                  src="/Ishaan_headshot.png"
                  alt="Ishaan Narang"
                  className="w-full h-full object-cover scale-150 object-top"
                />
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-5xl mb-3 text-white font-['Playfair_Display'] font-medium italic">Ishaan Narang</h1>
              <p className="text-zinc-500">Computer Science • Builder • Founder • NYC</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/ishaannarang22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://instagram.com/_ishaannarang_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/ishaanvibes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-400 transition-colors"
                aria-label="X"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 section-spacing animate-stagger">
        <About />
        <Projects />
        <Experience />
        <Interests />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-black mt-20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-zinc-700 text-sm text-center">© 2025 Ishaan Narang</p>
        </div>
      </footer>
    </div>
  );
}