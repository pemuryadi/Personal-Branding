import { Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-[30px] md:pb-[40px] px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-[60px] items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-[clamp(4rem,7vw,100px)] font-[900] leading-[0.8] tracking-[-0.05em] text-left uppercase text-[#ffffff] m-0 mb-8">
            Transformasi<br/>Administrasi<br/>Sekolah <br className="hidden md:block" />
            <span className="text-[#555555]">Paperless & Berbasis AI</span>
          </h1>

          <p className="text-[14px] leading-[1.6] text-[#a0a0a0] max-w-2xl text-left m-0">
            Pengembang Teknologi Pendidikan (EdTech) dan Kurikulum Merdeka.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-start gap-4"
        >
          <a
            href="#portofolio"
            className="bg-[#ffffff] text-[#0a0a0a] py-[12px] px-[25px] text-[10px] font-[900] uppercase tracking-[0.15em] border-none cursor-pointer w-full text-center hover:bg-[#a0a0a0] transition-colors"
          >
            Lihat Portofolio
          </a>
          <a
            href="#contact"
            className="bg-transparent text-[#ffffff] py-[12px] px-[25px] text-[10px] font-[900] uppercase tracking-[0.15em] border border-[#222222] cursor-pointer w-full text-center hover:bg-[#222222] transition-colors"
          >
            Hubungi via Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
