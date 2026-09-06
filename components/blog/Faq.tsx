"use client";
import React from "react";
import { Container } from "@/components/blog/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUp
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-blue-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Projectxwire nedir ve inşaat projelerine ne gibi avantajlar sağlar?",
    answer:
      "Projectxwire; şantiyelerdeki kusur/eksik (punch list) takibini, ekip iletişimini, görev dağılımını ve dijital belge yönetimini tek bir çatı altında toplayan yeni nesil bir platformdur. Sahadaki aksaklıkların teslim süreçlerini geciktirmesini engeller ve veri akışını şeffaflaştırır.",
  },
  {
    question: "Projectxwire mobil uygulamasını nasıl indirebilirim?",
    answer:
      "Projectxwire mobil uygulamasını iOS cihazlarınız için Apple App Store'dan, Android cihazlarınız için Google Play Store'dan ücretsiz olarak indirebilirsiniz. Ayrıca web panelimiz üzerinden masaüstü tarayıcınızdan da tüm projelerinizi yönetebilirsiniz.",
  },
  {
    question: "Sahadaki ustalar ve saha personeli uygulamayı kolayca kullanabilir mi?",
    answer:
      "Kesinlikle. Projectxwire, şantiyenin dinamik şartları göz önünde bulundurularak sade ve sezgisel bir arayüzle geliştirilmiştir. Karmaşık eğitimlere ihtiyaç duymadan birkaç dakika içinde fotoğraf çekip sorun bildirmeye başlayabilirsiniz.",
  },
  {
    question: "Şantiyede internet bağlantısı olmadığında (çevrimdışı/offline) veri kaydedebilir miyim?",
    answer:
      "Evet. Projectxwire gelişmiş çevrimdışı çalışma desteğine sahiptir. Sahada sinyalin olmadığı veya zayıf olduğu alanlarda yapılan fotoğraf çekimleri, notlar ve durum güncellemeleri cihazınızda saklanır; internet bağlantısı sağlandığında otomatik olarak buluta senkronize edilir.",
  },
  {
    question: "Görev atama ve sorun (kusur/hata) takibi nasıl yapılır?",
    answer:
      "Sahada tespit edilen bir kusur için fotoğraf çekip konum, öncelik derecesi ve ilgili taşeron ekibi seçilerek anında görev oluşturulur. İlgili personele anlık bildirim gider ve sorun giderildiğinde kanıt fotoğrafıyla birlikte onayınıza sunulur.",
  },
  {
    question: "Uygulama içinde anlık mesajlaşma ve dosya paylaşımı var mı?",
    answer:
      "Evet. Her şantiye ve görev başlığı altında entegre mesajlaşma sistemi mevcuttur. Ekipler harici mesajlaşma uygulamalarına ihtiyaç duymadan sesli mesaj, görsel, PDF ve teknik şartname gibi belgeleri doğrudan proje altında güvenle paylaşabilir.",
  },
  {
    question: "Web yönetim paneli ile mobil uygulama senkronize mi çalışır?",
    answer:
      "Evet, sistem tamamen gerçek zamanlı bulut mimarisiyle çalışır. Sahadan mobil uygulama ile girilen her güncelleme anında merkez ofisteki proje yöneticisinin web ekranına yansır, böylece ofis ve saha kesintisiz senkronizasyon halinde olur.",
  },
  {
    question: "Projelerimize kaç kullanıcı veya alt yüklenici (taşeron) ekleyebiliriz?",
    answer:
      "Projectxwire esnek lisanslama modelleri sunar. Projenizin büyüklüğüne göre dilediğiniz sayıda taşeron, mimar, mühendis ve denetim personeli ekleyebilir; rol bazlı yetkilendirme ile herkesin yalnızca sorumlu olduğu alanları görmesini sağlayabilirsiniz.",
  },
  {
    question: "Proje verilerimiz ve şantiye fotoğraflarımız ne kadar güvende?",
    answer:
      "Tüm verileriniz endüstri standardı şifreleme yöntemleriyle korunur ve düzenli olarak yedeklenir. Şantiye tutanaklarınız, denetim raporlarınız ve fotoğraflı kayıtlarınız geriye dönük olarak güvenle arşivlenir.",
  },
  {
    question: "Şirketimize özel kurumsal entegrasyon veya canlı demo alabilir miyiz?",
    answer:
      "Evet. Büyük ölçekli şantiyeler ve kurumsal taahhüt firmaları için özel entegrasyon ve danışmanlık hizmeti sağlıyoruz. İletişim kanallarımızdan bize ulaşarak firmanız için özel canlı ürün demosu planlayabilirsiniz.",
  },
];
