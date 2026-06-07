import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] leading-tight tracking-tight text-left uppercase text-ink m-0 transition-colors duration-300">
            Transformasi<br/>Administrasi<br/>Sekolah
            <span className="text-muted transition-colors duration-300 block mt-2">Paperless & Berbasis AI</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
