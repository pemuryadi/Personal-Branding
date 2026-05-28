import { Github, Youtube, Facebook, Instagram, HeartHandshake } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/pemuryadi", icon: Github },
    { name: "YouTube", href: "https://youtube.com/@p.e.muryadi", icon: Youtube },
    { name: "Facebook", href: "https://www.facebook.com/p.e.muryadi", icon: Facebook },
    { name: "Instagram", href: "https://www.instagram.com/p.e.muryadi", icon: Instagram },
    { name: "TikTok", href: "https://www.tiktok.com/@p.e.muryadi", icon: TikTokIcon },
    { name: "Saweria", href: "https://saweria.co/pemuryadi", icon: HeartHandshake },
  ];

  return (
    <footer className="text-[9px] text-[#555555] tracking-[0.1em] uppercase border-t border-[#222222] pt-[20px] pb-[20px] px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-[#555555] hover:text-[#ffffff] transition-colors"
            >
              [{link.name}]
            </a>
          ))}
        </div>
        <div className="text-center md:text-right">
          © {new Date().getFullYear()} Praswara Eko Maryadi<br/>Designed for High Impact
        </div>
      </div>
    </footer>
  );
}
