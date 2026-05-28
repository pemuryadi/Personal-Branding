import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Ekosistem", href: "#ekosistem" },
    { name: "Portofolio", href: "#portofolio" },
    { name: "Kontak", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a] border-b border-[#222222] py-[15px]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div className="flex-shrink-0">
            <a href="#home" className="text-[11px] font-[700] tracking-[0.3em] uppercase text-[#555555]">
              Pemuryadi<span className="text-[#ffffff]">.dev</span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-[40px]">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#ffffff] text-[11px] font-[700] tracking-[0.2em] uppercase hover:text-[#a0a0a0] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#ffffff] hover:text-[#a0a0a0] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#222222] mt-[15px]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-[11px] font-[700] tracking-[0.2em] uppercase text-[#ffffff] hover:text-[#a0a0a0]"
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
