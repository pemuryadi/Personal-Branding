import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function Navbar({ activeTab = 'home', setActiveTab = () => {} }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [time, setTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const links = [
    { name: "Home", tab: "home" },
    { name: "Ekosistem", tab: "ekosistem" },
    { name: "Portofolio", tab: "portofolio" },
    { name: "Info Guru", tab: "info-guru" },
  ];

  const dropdownLinks = [
    { name: "Administrasi Sekolah", tab: "unduhan-sekolah" },
    { name: "Administrasi Mengajar", tab: "unduhan-mengajar" },
    { name: "Administrasi Kelas", tab: "unduhan-kelas" },
    { name: "Prompt Poster", tab: "unduhan-prompt" },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-bg border-b border-border py-[15px] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="flex-shrink-0 flex items-center">
            <div className="flex flex-col">
              <span className="text-[14px] font-[800] tracking-wider text-ink transition-colors duration-300">
                {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="text-[12px] font-bold text-muted tracking-[0.2em] transition-colors duration-300">
                {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 lg:gap-10">
            <div className="flex items-center gap-4 lg:gap-8">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleTabClick(link.tab)}
                  className={`whitespace-nowrap text-[16px] font-[700] tracking-[0.2em] uppercase hover:text-muted transition-colors duration-300 ${activeTab === link.tab ? 'text-btn-bg' : 'text-ink'}`}
                >
                  {link.name}
                </button>
              ))}
              
              {/* Dropdown for Unduhan */}
              <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
                <button
                  onMouseEnter={() => setDropdownOpen(true)}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`whitespace-nowrap flex items-center gap-1 text-[16px] font-[700] tracking-[0.2em] uppercase hover:text-muted transition-colors duration-300 ${activeTab.startsWith('unduhan-') ? 'text-btn-bg' : 'text-ink'}`}
                >
                  Unduhan <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full pt-4 w-64 z-50">
                    <div className="bg-bg border border-border rounded-lg shadow-lg py-2">
                      {dropdownLinks.map((dlink) => (
                        <button
                          key={dlink.name}
                          onClick={() => handleTabClick(dlink.tab)}
                          className={`block w-full text-left px-4 py-3 text-[14px] font-[700] uppercase hover:bg-border transition-colors ${activeTab === dlink.tab ? 'text-btn-bg' : 'text-ink'}`}
                        >
                          {dlink.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="https://wa.me/6281347697809"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-ink text-[16px] font-[700] tracking-[0.2em] uppercase hover:text-muted transition-colors duration-300"
              >
                Kontak
              </a>
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
              <button
                key={link.name}
                onClick={() => handleTabClick(link.tab)}
                className={`block w-full text-left px-3 py-3 text-[16px] font-[700] tracking-[0.2em] uppercase hover:text-muted transition-colors duration-300 ${activeTab === link.tab ? 'text-btn-bg' : 'text-ink'}`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="px-3 py-2">
              <span className="block text-[16px] font-[700] tracking-[0.2em] uppercase text-ink mb-2">Unduhan</span>
              <div className="pl-4 space-y-2 border-l-2 border-border">
                {dropdownLinks.map((dlink) => (
                  <button
                    key={dlink.name}
                    onClick={() => handleTabClick(dlink.tab)}
                    className={`block w-full text-left py-2 text-[14px] font-[700] uppercase transition-colors ${activeTab === dlink.tab ? 'text-btn-bg' : 'text-muted hover:text-ink'}`}
                  >
                    {dlink.name}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/6281347697809"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-[16px] font-[700] tracking-[0.2em] uppercase text-ink hover:text-muted transition-colors duration-300"
            >
              Kontak
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
