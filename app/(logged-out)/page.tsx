import { Container } from "@/components/blog/Container";
import { Hero } from "@/components/blog/Hero";
import { SectionTitle } from "@/components/blog/SectionTitle";
import { Benefits } from "@/components/blog/Benefits";
import { Video } from "@/components/blog/Video";
import { Testimonials } from "@/components/blog/Testimonials";
import { Faq } from "@/components/blog/Faq";
import { Cta } from "@/components/blog/Cta";

import { benefitOne, benefitTwo } from "@/components/blog/data";
export default function Home() {
  return (
    <Container>
      <Hero />
      <div id="features" className="scroll-mt-28">
        <SectionTitle
          preTitle="Projectxwire"
          title="İnşaat Sahalarında Sorun Yönetimi İçin Güçlü ve Etkili Çözüm"
        >
          Projectxwire, inşaat sahalarındaki sorunları hızla yönetmenizi sağlayan bir
          mobil ve web platformudur. Uygulama içi mesajlaşma ve belge yönetimi ile
          ekibinizin iletişimini ve dokümantasyonu güvenli bir şekilde organize
          eder. İş akışınızı optimize ederek projelerinizin sorunsuz
          ilerlemesine katkı sağlar.
        </SectionTitle>

        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
      </div>

      <div id="video" className="scroll-mt-28">
        <SectionTitle
          preTitle="Tanıtım Videosu"
          title="Projectxwire ile Süreçlerinizi Nasıl Hızlandırırsınız?"
        >
          Projectxwire&apos;ın şantiyelerdeki sorun bildirim, takip ve çözüm süreçlerini nasıl
          kolaylaştırdığını tanıtım videomuzda adım adım izleyin.
        </SectionTitle>

        <Video videoId="fZ0D0cnR88E" />
      </div>

      <div id="testimonials" className="scroll-mt-28">
        <SectionTitle preTitle="Geri Bildirimler" title="Müşterilerimiz Ne Diyor?">
          Sektörün önde gelen inşaat firmaları ve proje yöneticilerinin Projectxwire deneyimleri.
        </SectionTitle>

        <Testimonials />
      </div>

      <div id="faq" className="scroll-mt-28">
        <SectionTitle preTitle="SSS" title="Sıkça Sorulan Sorular">
          Projectxwire platformu ve mobil uygulamalar hakkında en çok merak edilen soruların yanıtları.
        </SectionTitle>

        <Faq />
      </div>

      <Cta />
    </Container>
  );
}
