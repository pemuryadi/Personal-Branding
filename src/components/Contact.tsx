import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    // Replace with the actual Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxxxxx_xxxxx/exec';
    
    try {
      // Typically, Apps Script accepts FormData via POST, 
      // mode 'no-cors' may be required depending on setup.
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' 
      });
      // no-cors will always return an opaque response, so we optimistically show success
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error('Error!', error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="pt-[60px] pb-[60px] px-6 lg:px-8 border-t border-[#222222]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-[60px] items-start">
        <div className="flex-1 w-full">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-[#555555] mb-[15px] font-[700] m-0">
            Mulai Kolaborasi
          </h2>
          <p className="text-[14px] leading-[1.6] text-[#a0a0a0] m-0 mb-8 md:mb-0 max-w-sm">
            Punya ide atau proyek terkait transformasi digital sekolah? Kirim pesan sekarang.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 w-full max-w-md">
          <div className="flex flex-col">
            <input
              id="nama"
              name="nama"
              type="text"
              required
              className="w-full bg-transparent border-b border-[#222222] py-[10px] text-[#ffffff] text-[11px] uppercase tracking-[1px] outline-none placeholder-[#333333] mb-[15px]"
              placeholder="Nama Lengkap"
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent border-b border-[#222222] py-[10px] text-[#ffffff] text-[11px] uppercase tracking-[1px] outline-none placeholder-[#333333] mb-[15px]"
              placeholder="Email Anda"
            />
            <textarea
              id="pesan"
              name="pesan"
              rows={4}
              required
              className="w-full bg-transparent border-b border-[#222222] py-[10px] text-[#ffffff] text-[11px] uppercase tracking-[1px] outline-none placeholder-[#333333] mb-[15px] resize-y"
              placeholder="Pesan"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-[#ffffff] text-[#0a0a0a] py-[12px] px-[25px] text-[10px] font-[900] uppercase tracking-[0.15em] border-none cursor-pointer w-full mt-[5px] hover:bg-[#a0a0a0] transition-colors disabled:opacity-50"
          >
            {status === "submitting" ? "Mengirim..." : "Kirim Pesan"}
          </button>

          {status === "success" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#a0a0a0] text-[11px] mt-4 uppercase tracking-[1px]">
              [Pesan terkirim]
            </motion.p>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#555555] text-[11px] mt-4 uppercase tracking-[1px]">
              [Gagal mengirim]
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
}
