import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Ekosistem", href: "#ekosistem" },
    { name: "Portofolio", href: "#portofolio" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-bg border-b border-border py-[15px] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="flex-shrink-0 flex items-center">
            {/* Brand text removed as requested */}
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-baseline space-x-[40px]">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-ink text-[18px] font-[700] tracking-[0.2em] uppercase hover:text-muted transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Sun className={`w-5 h-5 ${!isDark ? 'text-ink' : 'text-muted'}`} />
              <button 
                onClick={() => setIsDark(!isDark)}
                className="w-12 h-6 rounded-full bg-border relative transition-colors duration-300"
                aria-label="Toggle Dark Mode"
              >
                <div className={`w-4 h-4 rounded-full bg-ink absolute top-1 transition-all duration-300 ${isDark ? 'right-1' : 'left-1'}`} />
              </button>
              <Moon className={`w-5 h-5 ${isDark ? 'text-ink' : 'text-muted'}`} />
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="w-12 h-6 rounded-full bg-border relative transition-colors duration-300"
                aria-label="Toggle Dark Mode"
              >
                <div className={`w-4 h-4 rounded-full bg-ink absolute top-1 transition-all duration-300 ${isDark ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-ink hover:text-muted focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-bg border-t border-border mt-[15px] transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-[18px] font-[700] tracking-[0.2em] uppercase text-ink hover:text-muted transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
