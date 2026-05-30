import { Facebook, Instagram, Heart, Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="pt-[80px] pb-[60px] px-6 lg:px-8 bg-bg flex flex-col items-center transition-colors duration-300">
      <div className="max-w-3xl w-full">
        {/* Support Card */}
        <div className="border border-emerald-400/50 rounded-xl p-8 md:p-10 mb-20 relative overflow-hidden bg-card-from/30 backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            <h3 className="text-pink-500 font-bold text-2xl m-0 tracking-wide font-sans">Dukung Pemuryadi</h3>
          </div>
          
          <p className="text-ink text-[18px] leading-relaxed mb-8 font-sans transition-colors duration-300 opacity-90">
            Website ini dikembangkan secara mandiri untuk membantu rekan-rekan guru di seluruh Indonesia. Dukungan Anda sangat berarti agar saya bisa terus merawat dan meningkatkan fitur-fitur di sini.
          </p>

          <a 
            href="https://saweria.co/pemuryadi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-lg bg-[#eab308] text-white text-[18px] font-bold tracking-wide hover:bg-[#ca8a04] transition-colors font-sans"
          >
            <Coffee className="w-6 h-6" />
            Dukung via Saweria
          </a>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h4 className="text-[18px] text-muted font-bold tracking-[0.2em] uppercase mb-8 transition-colors duration-300">
            Ikuti Media Sosial Kami
          </h4>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/p.e.muryadi" target="_blank" rel="noopener noreferrer" className="w-[60px] h-[60px] bg-[#1877f2] rounded-2xl flex items-center justify-center text-white hover:opacity-90 transition-opacity">
              <Facebook strokeWidth={0} fill="currentColor" className="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/p.e.muryadi" target="_blank" rel="noopener noreferrer" className="w-[60px] h-[60px] bg-gradient-to-tr from-[#fd5949] to-[#d6249f] rounded-2xl flex items-center justify-center text-white hover:opacity-90 transition-opacity">
              <Instagram strokeWidth={2} className="w-8 h-8" />
            </a>
            <a href="https://www.tiktok.com/@p.e.muryadi" target="_blank" rel="noopener noreferrer" className="w-[60px] h-[60px] bg-black border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-[#111] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-20 text-center text-[18px] text-muted tracking-[0.2em] uppercase transition-colors duration-300">
          © {new Date().getFullYear()} Pemuryadi Digital Hub
        </div>
      </div>
    </footer>
  );
}
