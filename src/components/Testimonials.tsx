import { motion } from "framer-motion";
import { Quote, MessageSquare, X, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [user, setUser] = useState<{name: string, avatar: string} | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to check auth", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert("Mohon selesaikan verifikasi keamanan (CAPTCHA) terlebih dahulu.");
      return;
    }
    setSubmitStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const role = formData.get("role") as string;
    const text = formData.get("text") as string;

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          text,
          cfTurnstileResponse: turnstileToken
        })
      });

      if (res.ok) {
        setSubmitStatus("success");
        fetchTestimonials(); // Refresh list
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus("idle");
          setTurnstileToken("");
        }, 2000);
      } else {
        const errData = await res.json();
        alert("Gagal mengirim testimoni: " + (errData.error || "Unknown error"));
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
      setSubmitStatus("error");
    }
  };

  return (
    <section id="testimoni" className="py-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
              Kata Mereka
            </h2>
            <p className="text-[18px] leading-[1.6] text-ink font-bold max-w-2xl m-0 transition-colors duration-300">
              Testimoni dari pengunjung dan orang tua siswa yang telah merasakan manfaat langsung.
            </p>
          </div>
          <div className="flex gap-2">
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-border text-ink font-bold rounded-lg hover:bg-card-from transition-colors shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-btn-bg text-bg font-bold rounded-lg hover:bg-btn-hover transition-colors shadow-sm"
            >
              <MessageSquare className="w-5 h-5" />
              Beri Testimoni
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border rounded-2xl p-6 relative bg-card-from/30 backdrop-blur-sm transition-colors duration-300 hover:border-border-hover shadow-sm flex flex-col"
            >
              <Quote className="w-8 h-8 text-btn-bg mb-4 opacity-50" />
              <p className="text-[15px] leading-relaxed text-ink italic mb-6 flex-grow">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-btn-bg/10 flex items-center justify-center border border-btn-bg/20 text-btn-bg font-bold text-[14px]">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-ink">{item.name}</div>
                  <div className="text-[12px] text-muted">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-bg border border-border rounded-2xl p-6 md:p-8 w-full max-w-md relative shadow-xl"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-[24px] font-[900] tracking-tight text-ink mb-2">Tulis Testimoni</h3>
            <p className="text-[14px] text-muted mb-6">Bagikan pengalaman Anda tentang layanan kami.</p>
            
            {!user ? (
              <div className="text-center py-6">
                <div className="mb-4">
                  <LogIn className="w-12 h-12 text-muted mx-auto" />
                </div>
                <p className="text-ink mb-6">Anda harus login terlebih dahulu untuk meninggalkan testimoni agar terhindar dari spam.</p>
                <a 
                  href="/api/auth/google"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white text-black border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm w-full"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>
                  Login dengan Google
                </a>
              </div>
            ) : submitStatus === "success" ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-[18px] font-bold text-ink">Terima Kasih, {user.name}!</h4>
                <p className="text-[14px] text-muted mt-2">Testimoni Anda telah berhasil ditambahkan.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[14px] font-bold text-ink mb-1">Nama Lengkap</label>
                  <input type="text" readOnly value={user.name} className="w-full bg-card-from/50 border border-border rounded-lg px-4 py-2.5 text-muted focus:outline-none cursor-not-allowed" />
                  <p className="text-[11px] text-muted mt-1">Sesuai dengan akun Google Anda.</p>
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-ink mb-1">Status / Peran</label>
                  <input name="role" required type="text" className="w-full bg-card-from border border-border rounded-lg px-4 py-2.5 text-ink focus:outline-none focus:border-btn-bg transition-colors" placeholder="Misal: Orang Tua Siswa, Rekan Guru, dll" />
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-ink mb-1">Pesan Testimoni</label>
                  <textarea name="text" required rows={4} className="w-full bg-card-from border border-border rounded-lg px-4 py-2.5 text-ink focus:outline-none focus:border-btn-bg transition-colors resize-none" placeholder="Tuliskan pengalaman Anda..."></textarea>
                </div>
                
                <div className="pt-2">
                  <Turnstile
                    siteKey="1x00000000000000000000AA" // Dummy valid site key for testing
                    onSuccess={(token) => setTurnstileToken(token)}
                  />
                </div>

                <button 
                  disabled={submitStatus === "submitting"}
                  type="submit" 
                  className="w-full bg-btn-bg text-bg font-bold py-3 rounded-lg hover:bg-btn-hover transition-colors mt-2 disabled:opacity-70 flex justify-center items-center"
                >
                  {submitStatus === "submitting" ? (
                    <span className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Kirim Testimoni"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
