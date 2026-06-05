import { motion } from "framer-motion";
import { Send, Calendar, Mic2 } from "lucide-react";

export function SpeakerBooking() {
  return (
    <section id="undang" className="py-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-8 md:p-12 text-center shadow-lg"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-400 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20 backdrop-blur-md">
              <Mic2 className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-[28px] md:text-[36px] font-[900] text-white tracking-tight mb-4">
              Undang Sebagai Narasumber
            </h2>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-indigo-100 mb-8 max-w-2xl mx-auto">
              Mencari pemateri untuk In-House Training (IHT), Workshop Kurikulum Merdeka, atau Pelatihan Integrasi AI dalam Pendidikan di instansi Anda? Mari berkolaborasi untuk meningkatkan kompetensi tenaga pendidik.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:halo@emailanda.com?subject=Undangan%20Narasumber%20IHT"
                className="flex items-center gap-2 bg-white text-[#312e81] px-8 py-4 rounded-xl font-bold text-[16px] hover:bg-indigo-50 transition-all transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <Send className="w-5 h-5" />
                Kirim Email Invitation
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-[16px] border border-white/20 hover:bg-white/20 transition-all w-full sm:w-auto justify-center backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5" />
                Cek Jadwal Kosong
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
