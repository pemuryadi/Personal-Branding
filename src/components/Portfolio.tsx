import { Code2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function Portfolio() {
  return (
    <section id="portofolio" className="pt-[60px] pb-[60px] px-6 lg:px-8 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-[15px] font-[700] m-0">
            Portofolio & Studi Kasus
          </h2>
          <p className="text-[14px] leading-[1.6] text-[#a0a0a0] max-w-2xl m-0">
            Karya dan integrasi sistem untuk modernisasi pendidikan dan branding digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-[#222222] p-[15px] aspect-[4/3] md:aspect-auto md:min-h-[250px] flex flex-col justify-between bg-gradient-to-br from-[#111111] to-[#0a0a0a] hover:border-[#444444] transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono text-[#555555] block mb-4">[01]</span>
              <Code2 className="w-6 h-6 text-[#ffffff] mb-4" />
              <h3 className="text-[12px] font-[800] uppercase tracking-[1px] text-[#ffffff] mb-3">Web & Code Development</h3>
            </div>
            <p className="text-[11px] leading-[1.6] text-[#a0a0a0] m-0">
              Integrasi layanan Firebase, pengembangan dengan framework Laravel, serta perancangan sistem informasi manajemen sekolah yang terintegrasi dengan Google Cloud/Apps Script.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-[#222222] p-[15px] aspect-[4/3] md:aspect-auto md:min-h-[250px] flex flex-col justify-between bg-gradient-to-br from-[#111111] to-[#0a0a0a] hover:border-[#444444] transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono text-[#555555] block mb-4">[02]</span>
              <Sparkles className="w-6 h-6 text-[#ffffff] mb-4" />
              <h3 className="text-[12px] font-[800] uppercase tracking-[1px] text-[#ffffff] mb-3">AI Integration & Branding</h3>
            </div>
            <p className="text-[11px] leading-[1.6] text-[#a0a0a0] m-0">
              Kurasi desain kreatif menggunakan Canva, Figma, dan Microsoft Designer. Pemanfaatan AI Agent strategis (Gemini, Claude, Leonardo AI, Suno AI) untuk konten edukasi cerdas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
