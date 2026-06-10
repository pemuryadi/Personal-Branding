import { motion } from "framer-motion";
import { Newspaper, Building2, GraduationCap, Laptop, BadgeCheck } from "lucide-react";

type InfoItem = {
  icon: any;
  title: string;
  date: string;
  content: string;
};

const infoItems: InfoItem[] = [
  {
    icon: Newspaper,
    title: "Akses Testimoni Publik Kini Dibuka!",
    date: "Terbaru",
    content: "Merespon tingginya antusiasme serta partisipasi masyarakat, kini fitur ulasan (testimoni) telah dibuka untuk publik tanpa memerlukan login. Pengunjung yang telah terbantu dengan platform ini dapat dengan mudah dan cepat memberikan tanggapan maupun cerita inspiratif mereka secara langsung."
  },
  {
    icon: Newspaper,
    title: "Peluncuran Fitur Baru: Pengelolaan Kelas Berbasis AI",
    date: "Baru",
    content: "Merespon kebutuhan guru akan efisiensi waktu, kini hadir fitur pengelolaan kelas berbasis Artificial Intelligence (AI) yang terintegrasi langsung dengan sistem administrasi. Fitur ini dirancang untuk mempermudah guru dalam menganalisis perkembangan belajar siswa secara otomatis serta memberikan rekomendasi strategi pembelajaran yang lebih personal dan tepat sasaran."
  },
  {
    icon: Newspaper,
    title: "Penetapan 'Hari Belajar Guru' Nasional",
    date: "Sedang Berjalan",
    content: "Kementerian Pendidikan Dasar dan Menengah (Kemendikdasmen) resmi menetapkan program 'Hari Belajar Guru' yang dilaksanakan satu kali dalam seminggu. Program ini merupakan inisiatif strategis untuk memberikan ruang khusus bagi para guru di seluruh Indonesia agar dapat saling berbagi praktik baik, meningkatkan kompetensi pedagogik, serta melakukan inovasi pembelajaran. Pelaksanaan program ini telah dirancang secara khusus agar tidak mengganggu jadwal mengajar murid di kelas, sehingga peningkatan kualitas guru dan hak belajar siswa dapat berjalan beriringan."
  },
  {
    icon: Building2,
    title: "Target Revitalisasi 71.000 Sekolah di Tahun 2026",
    date: "Target 2026",
    content: "Sebagai upaya nyata dalam meningkatkan pemerataan akses dan kualitas fasilitas pendidikan, Kemendikdasmen menargetkan revitalisasi terhadap sekitar 71.000 satuan pendidikan di seluruh Indonesia sepanjang tahun 2026. Langkah masif ini merupakan bagian dari cetak biru pemerintah untuk sepenuhnya menghapus sekolah dengan kondisi kerusakan berat pada tahun 2028. Selain itu, pemerintah juga mempercepat pembangunan gedung 'Sekolah Rakyat' yang ditargetkan rampung pada pertengahan tahun 2026 untuk menyambut tahun ajaran baru."
  },
  {
    icon: BadgeCheck,
    title: "Peningkatan Kesejahteraan dan Pelatihan Guru",
    date: "Prioritas 2026",
    content: "Dalam rangka meningkatkan kualitas pendidik, Kemendikdasmen memprioritaskan peningkatan kesejahteraan bagi guru non-ASN dengan menambah insentif bulanan untuk hampir 800 ribu guru. Di samping itu, program ini juga mencakup pelatihan besar-besaran terkait metode pembelajaran mendalam (deep learning), STEM, serta program Pendidikan Profesi Guru (PPG) untuk memastikan sertifikasi bagi puluhan ribu guru baru di tahun 2026."
  },
  {
    icon: Laptop,
    title: "Akselerasi Digitalisasi Pembelajaran Nasional",
    date: "Sedang Berjalan",
    content: "Untuk memastikan pemanfaatan teknologi secara merata, pemerintah terus menggalakkan distribusi perangkat digital. Ratusan ribu sekolah saat ini sedang mendapat pendampingan dalam pemanfaatan Interactive Flat Panel dan perangkat komputer penunjang. Target besar kementerian adalah menyediakan minimal tiga perangkat digital terpadu untuk setiap satuan pendidikan di daerah guna mempermudah akses informasi dan menunjang literasi digital peserta didik."
  },
  {
    icon: GraduationCap,
    title: "Perluasan Akses Wajib Belajar & Program ATS",
    date: "Segera Hadir",
    content: "Pemerintah menerbitkan regulasi terbaru (Perpres No. 3 Tahun 2026) untuk program Pencegahan dan Penanganan Anak Tidak Sekolah (ATS), menyasar hampir 192 ribu anak agar kembali mendapatkan pendidikan yang layak. Selain itu, cakupan Program Indonesia Pintar (PIP) kini diperluas untuk mencakup anak usia dini (PAUD), sejalan dengan penguatan wajib belajar 13 tahun untuk memutus rantai kemiskinan."
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
            Rangkuman program prioritas dan kebijakan terbaru dari Kementerian Pendidikan untuk menunjang wawasan tenaga pendidik.
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
