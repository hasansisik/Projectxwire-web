import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  project: string;
  comment: string;
  initials: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ahmet Özkan",
    title: "Yönetim Kurulu Başkanı",
    company: "Özkanlar İnşaat & Taahhüt",
    project: "Kartal Rezidans & Yaşam Merkezi (340 Konut)",
    comment:
      "4 farklı şantiyemizde Projectxwire kullanmaya başladığımızdan beri teslim öncesi eksik listesi (punch list) tamamlama süremiz neredeyse yarı yarıya azaldı. Alt yüklenici takibi inanılmaz kolaylaştı.",
    initials: "AÖ",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    name: "Serdar Kalyoncu",
    title: "Genel Müdür & Kurucu Ortak",
    company: "Kalyoncu Yapı Grubu",
    project: "Bursa OSB Otomotiv Fabrika Tesisi",
    comment:
      "Eskiden WhatsApp gruplarında kaybolan şantiye fotoğrafları ve teknik notlar artık tek bir platformda kayıt altında. Hakediş onay süreçlerinde fotoğraflı kanıt sistemi şantiyemizin vazgeçilmezi oldu.",
    initials: "SK",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    name: "Merve Çelik Demirel",
    title: "Proje Direktörü",
    company: "Çelikoğlu Mimarlık & Mühendislik",
    project: "İzmir Kordon Karma Yaşam Projesi",
    comment:
      "Hem sahada çalışan ustabaşlarımız hem de merkez ofisteki mimarlarımız aynı dili konuşmaya başladı. Çevrimdışı (offline) mod özelliği sayesinde bodrum ve otopark katlarında bile sorunsuz veri topluyoruz.",
    initials: "MÇ",
    gradient: "from-emerald-500 to-teal-700",
  },
  {
    name: "Mustafa Polat",
    title: "Şantiye Koordinatörü",
    company: "Polat Yapı Denetim & Taahhüt",
    project: "Ankara İncek Villaları Projesi",
    comment:
      "Saha denetimlerimizde tespit ettiğimiz uygunsuzlukları tek tıkla fotoğraflayıp ilgili taşerona atayabiliyoruz. Görev tamamlandığında gelen anlık bildirimler teslimat süreçlerimizi 2 hafta öne çekti.",
    initials: "MP",
    gradient: "from-rose-500 to-red-700",
  },
  {
    name: "Cemil Karahan",
    title: "İcra Kurulu Başkanı",
    company: "Karahan Gayrimenkul Yatırım",
    project: "Antalya Kundu 5 Yıldızlı Resort Otel",
    comment:
      "Milyonluk projeler yönetiyoruz; sahadaki en ufak aksama ciddi maliyet yaratıyordu. Projectxwire sayesinde taşeronlarımızın hata çözme hızını canlı panodan izleyip anında müdahale edebiliyoruz.",
    initials: "CK",
    gradient: "from-purple-600 to-violet-800",
  },
  {
    name: "Hakan Akdeniz",
    title: "Teknik Direktör",
    company: "Akdeniz Proje Taahhüt A.Ş.",
    project: "Gebze Lojistik ve Soğuk Hava Depoları",
    comment:
      "Projectxwire şantiyedeki evrak ve görsel karmaşasını kökten bitirdi. Dijital kusur yönetimindeki şeffaflık hem bize hem de işveren müşavirlerimize büyük güven veriyor. Kesinlikle vazgeçilmez bir araç.",
    initials: "HA",
    gradient: "from-cyan-600 to-blue-700",
  },
];

export const Testimonials = () => {
  // Kesintisiz sonsuz kayma (marquee) için listeyi iki kez render ediyoruz
  const marqueeList = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Sol ve Sağ yumuşak geçiş maskeleri */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />

      {/* Kayan kartlar şeridi */}
      <div className="animate-marquee flex items-stretch gap-6 py-4">
        {marqueeList.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="w-[320px] sm:w-[380px] flex-shrink-0 flex flex-col justify-between p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300 backdrop-blur-xs"
          >
            <div>
              {/* Yıldız Derecelendirmesi ve Proje Etiketi */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 truncate max-w-[190px]">
                  {item.project}
                </span>
              </div>

              {/* Yorum Metni */}
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-normal italic">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>

            {/* Profil Bilgisi */}
            <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-gray-100 dark:border-zinc-800">
              <div
                className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.gradient} text-white font-semibold flex items-center justify-center text-sm shadow-sm flex-shrink-0`}
              >
                {item.initials}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium truncate">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {item.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

