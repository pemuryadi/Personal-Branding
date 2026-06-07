import { motion } from "framer-motion";
import { Newspaper, Building2 } from "lucide-react";

type InfoItem = {
  icon: any;
  title: string;
  date: string;
  content: string;
};

const infoItems: InfoItem[] = [
  {
    icon: Newspaper,
    title: "Penetapan 'Hari Belajar Guru' Nasional",
    date: "Update Terbaru (3 Hari Terakhir)",
    content: "Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) resmi menetapkan program 'Hari Belajar Guru' yang dilaksanakan satu kali dalam seminggu. Program ini merupakan inisiatif strategis untuk memberikan ruang khusus bagi para guru di seluruh Indonesia agar dapat saling berbagi praktik baik, meningkatkan kompetensi pedagogik, serta melakukan inovasi pembelajaran. Pelaksanaan program ini telah dirancang secara khusus agar tidak mengganggu jadwal mengajar murid di kelas, sehingga peningkatan kualitas guru dan hak belajar siswa dapat berjalan beriringan."
  },
  {
    icon: Building2,
    title: "Target Revitalisasi 71.000 Sekolah di Tahun 2026",
    date: "Update Terbaru (3 Hari Terakhir)",
    content: "Sebagai upaya nyata dalam meningkatkan pemerataan akses dan kualitas fasilitas pendidikan, Kemendikdasmen menargetkan revitalisasi terhadap sekitar 71.000 satuan pendidikan di seluruh Indonesia sepanjang tahun 2026. Langkah masif ini merupakan bagian dari cetak biru pemerintah untuk sepenuhnya menghapus sekolah dengan kondisi kerusakan berat pada tahun 2028. Selain itu, pemerintah juga mempercepat pembangunan gedung 'Sekolah Rakyat' yang ditargetkan rampung pada pertengahan tahun 2026 untuk menyambut tahun ajaran baru."
  }
];

export function InfoGuru() {
  return (
    <section id="info-guru" className="pt-[60px] pb-[60px] px-6 lg:px-8 transition-colors duration-300 bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[18px] tracking-[0.2em] uppercase text-muted mb-[15px] font-[700] m-0 transition-colors duration-300">
            Kabar Pendidikan (Info Guru)
          </h2>
          <p className="text-[18px] leading-[1.6] text-muted max-w-2xl m-0 transition-colors duration-300">
            Rangkuman berita dan kebijakan terbaru dari Kementerian Pendidikan untuk menunjang wawasan para tenaga pendidik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {infoItems.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-border p-[30px] flex flex-col bg-gradient-to-br from-card-from to-card-to transition-colors duration-300 relative"
              >
                <div className="mb-6 flex justify-between items-start">
                  <item.icon className="w-10 h-10 text-ink transition-colors duration-300" />
                  <span className="text-[12px] font-bold uppercase tracking-[1px] text-muted bg-border px-3 py-1 rounded-full">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-[22px] font-[800] uppercase tracking-[1px] text-ink mb-4 transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-[1.8] text-muted m-0 transition-colors duration-300 text-justify">
                  {item.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
