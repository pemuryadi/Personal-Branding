import { useState } from "react";
import { X } from "lucide-react";

export function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  const modalContent = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 text-ink/80 text-sm md:text-base leading-relaxed">
          <p><strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID')}</p>
          <p>
            Kebijakan Privasi ini menjelaskan bagaimana pemuryadi (melalui pemuryadi.my.id) mengumpulkan, menggunakan, dan melindungi informasi pengunjung. Website ini dirancang sebagai platform personal branding dan agregator informasi pendidikan untuk mendukung rekan-rekan guru di Indonesia.
          </p>
          <h3 className="text-ink font-bold mt-4">1. Pengumpulan Data</h3>
          <p>
            Kami tidak mengumpulkan data pribadi yang sensitif. Kami menggunakan layanan pihak ketiga (seperti CounterAPI) yang hanya mencatat jumlah kunjungan anonim secara umum untuk keperluan analitik trafik, tanpa mengidentifikasi individu.
          </p>
          <h3 className="text-ink font-bold mt-4">2. Keamanan Informasi</h3>
          <p>
            Website ini beroperasi sepenuhnya pada arsitektur statis (Frontend-only) yang tidak memiliki database pengguna, sehingga risiko kebocoran data sangat minimal.
          </p>
          <h3 className="text-ink font-bold mt-4">3. Tautan Pihak Ketiga</h3>
          <p>
            Fitur "Berita Pendidikan" kami memuat tautan (URL) yang mengarah ke sumber eksternal (seperti Kemendikbud dan portal berita lainnya). Kami tidak bertanggung jawab atas kebijakan privasi di situs-situs eksternal tersebut.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-4 text-ink/80 text-sm md:text-base leading-relaxed">
          <p><strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID')}</p>
          <p>
            Dengan mengakses website pemuryadi.my.id, Anda setuju untuk terikat dengan Syarat dan Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan di website ini.
          </p>
          <h3 className="text-ink font-bold mt-4">1. Penggunaan Konten</h3>
          <p>
            Semua konten edukatif, informasi, dan fitur motivasi disediakan "sebagaimana adanya" untuk tujuan pendidikan dan non-komersial. Pengguna bebas membagikan tautan website ini untuk menyebarkan manfaat positif bagi dunia pendidikan.
          </p>
          <h3 className="text-ink font-bold mt-4">2. Akurasi Informasi Berita</h3>
          <p>
            Website ini menyajikan berita dari agregasi RSS pihak ketiga yang kredibel. Kami tidak mengubah isi berita, sehingga akurasi berita bergantung pada sumber aslinya (misalnya media massa atau situs kementerian).
          </p>
          <h3 className="text-ink font-bold mt-4">3. Hak Kekayaan Intelektual</h3>
          <p>
            Nama, logo "pemuryadi", dan desain website ini adalah hak milik pengelola. Modifikasi atau penggunaan desain tanpa izin tertulis dilarang.
          </p>
        </div>
      )
    },
    blog: {
      title: "Blog",
      content: (
        <div className="space-y-4 text-ink/80 text-center py-8">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-xl text-ink font-bold">Blog Sedang Dalam Pengembangan</h3>
          <p className="leading-relaxed max-w-md mx-auto">
            Halaman blog saat ini masih dalam tahap penyusunan. Nantikan segera artikel-artikel menarik seputar dunia pendidikan, teknologi pembelajaran, dan opini pribadi dari Pemuryadi.
          </p>
        </div>
      )
    }
  };

  return (
    <>
      <footer className="w-full border-t border-border/50 bg-bg transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
            
            {/* Left Side: Contact Info */}
            <div className="flex flex-col space-y-3 max-w-lg">
              <h2 className="text-ink font-bold text-xl mb-1 tracking-tight">pemuryadi</h2>
              <p className="text-muted text-[15px] leading-relaxed font-medium">
                Jl. Batu Cermin Samarinda Kalimantan Timur Indonesia
              </p>
              <p className="text-muted text-[15px] leading-relaxed font-medium">
                Telp/WA: +6281347697809 · Email: p.e.muryadi@gmail.com
              </p>
            </div>

            {/* Right Side: Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-end">
              <button 
                onClick={() => setActiveModal('privacy')}
                className="text-ink/80 hover:text-blue-500 font-medium text-[15px] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setActiveModal('terms')}
                className="text-ink/80 hover:text-blue-500 font-medium text-[15px] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setActiveModal('blog')}
                className="text-ink/80 hover:text-blue-500 font-medium text-[15px] transition-colors cursor-pointer"
              >
                Blog
              </button>
              <a 
                href="mailto:p.e.muryadi@gmail.com"
                className="text-ink/80 hover:text-blue-500 font-medium text-[15px] transition-colors"
              >
                Contact
              </a>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="mt-16 text-center">
            <p className="text-muted text-sm font-medium">
              © {new Date().getFullYear()} pemuryadi. all rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />
          <div className="relative bg-bg border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-border bg-card-from/50">
              <h2 className="text-xl font-bold text-ink">
                {modalContent[activeModal as keyof typeof modalContent].title}
              </h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-border/50 text-muted hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-5 md:p-6 overflow-y-auto bg-bg">
              {modalContent[activeModal as keyof typeof modalContent].content}
            </div>
            
            {/* Modal Footer */}
            <div className="p-5 border-t border-border bg-card-from/30 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
