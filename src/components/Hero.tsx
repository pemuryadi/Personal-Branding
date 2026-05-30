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
          <h1 className="text-5xl md:text-[clamp(4rem,7vw,100px)] font-[900] leading-[0.8] tracking-[-0.05em] text-left uppercase text-ink m-0 transition-colors duration-300">
            Transformasi<br/>Administrasi<br/>Sekolah <br className="hidden md:block" />
            <span className="text-muted transition-colors duration-300 block mt-4">Paperless & Berbasis AI</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
