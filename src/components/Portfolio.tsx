import { Code2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function Portfolio() {
  return (
    <section id="portofolio" className="pt-[60px] pb-[60px] px-6 lg:px-8 border-t border-border transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300 flex items-center flex-wrap gap-3">
            Portofolio & Studi Kasus
            <span className="bg-gradient-to-r from-[#1e3a8a] to-[#581c87] text-[#e0e7ff] border border-[#3b82f6]/30 text-[9px] tracking-[0.15em] px-2.5 py-0.5 font-[900] uppercase rounded shadow-sm">
              COMING SOON
            </span>
          </h2>
          <p className="text-[18px] leading-[1.6] text-muted max-w-2xl m-0 transition-colors duration-300">
            Karya dan integrasi sistem untuk modernisasi pendidikan dan branding digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          <motion.a
            href="https://arekgresik.my.id/umkm"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-border p-[25px] aspect-[4/3] md:aspect-auto md:min-h-[250px] flex flex-col justify-between bg-gradient-to-br from-card-from to-card-to hover:border-border-hover transition-colors duration-300 block cursor-pointer group"
          >
            <div>
              <span className="text-[18px] font-mono text-muted block mb-6 transition-colors duration-300">[01]</span>
              <Code2 className="w-8 h-8 text-ink mb-6 transition-colors duration-300 group-hover:text-pink-500" />
              <h3 className="text-[20px] font-[800] uppercase tracking-[1px] text-ink mb-4 transition-colors duration-300 group-hover:underline">Web & Code Development</h3>
            </div>
            <p className="text-[18px] leading-[1.6] text-muted m-0 transition-colors duration-300 mt-4 md:mt-8">
              Integrasi Layanan Cloudflare, pengembangan dengan framework Vercel, Laravel, serta perancangan Sistem Informasi Manajemen sekolah yang terintegrasi dengan sistem otomatisasi data untuk menyederhanakan pelaporan, menghemat waktu guru, dan mempermudah pengambilan keputusan.
            </p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-border p-[25px] aspect-[4/3] md:aspect-auto md:min-h-[250px] flex flex-col justify-between bg-gradient-to-br from-card-from to-card-to hover:border-border-hover transition-colors duration-300 relative"
          >
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#1e3a8a] to-[#581c87] text-[#e0e7ff] border border-[#3b82f6]/30 text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 font-[900] rounded shadow-sm">
              COMING SOON
            </div>
            <div>
              <span className="text-[18px] font-mono text-muted block mb-6 transition-colors duration-300">[02]</span>
              <Sparkles className="w-8 h-8 text-ink mb-6 transition-colors duration-300" />
              <h3 className="text-[20px] font-[800] uppercase tracking-[1px] text-ink mb-4 transition-colors duration-300">AI Integration & Branding</h3>
            </div>
            <p className="text-[18px] leading-[1.6] text-muted m-0 transition-colors duration-300 mt-4 md:mt-8">
              Kurasi desain kreatif menggunakan Canva, Figma, dan Microsoft Designer. Pemanfaatan AI Agent strategis (Gemini, Claude, Leonardo AI, Suno AI) untuk konten edukasi cerdas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
