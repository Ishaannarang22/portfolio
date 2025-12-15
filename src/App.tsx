import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { GithubLogo, InstagramLogo, XLogo } from '@phosphor-icons/react';

export default function App() {
  return (
    <div className="min-h-screen bg-espresso">
      {/* Header */}
      <header className="sticky top-0 z-10 header-blur">
        <div className="content-width mx-auto px-6 py-12">
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
              <h1 className="text-5xl mb-3 text-crema font-display font-medium italic accent-glow">Ishaan Narang</h1>
              <p className="text-latte">Computer Science • Builder • Founder • Coffee Enthusiast</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/ishaannarang22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mocha hover:text-caramel transition-colors"
                aria-label="GitHub"
              >
                <GithubLogo size={20} weight="regular" />
              </a>
              <a
                href="https://instagram.com/_ishaannarang_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mocha hover:text-caramel transition-colors"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} weight="regular" />
              </a>
              <a
                href="https://x.com/ishaanvibes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mocha hover:text-caramel transition-colors"
                aria-label="X"
              >
                <XLogo size={20} weight="regular" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-width mx-auto px-6 py-12 section-spacing animate-stagger">
        <About />
        <Projects />
        <Experience />
        <Interests />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-espresso mt-20 border-t border-roasted">
        <div className="content-width mx-auto px-6 py-6">
          <p className="text-mocha text-sm text-center">© 2025 Ishaan Narang</p>
        </div>
      </footer>
    </div>
  );
}