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
      <SectionTitle
        preTitle="Planwire"
        title="İnşaat Sahalarında Sorun Yönetimi İçin Güçlü ve Etkili Çözüm"
      >
        Planwire, inşaat sahalarındaki sorunları hızla yönetmenizi sağlayan bir
        mobil uygulamadır. Uygulama içi mesajlaşma ve belge yönetimi ile
        ekibinizin iletişimini ve dokümantasyonu güvenli bir şekilde organize
        eder. Planwire, iş akışınızı optimize ederek projelerinizin sorunsuz
        ilerlemesine katkı sağlar.
      </SectionTitle>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />

      <SectionTitle
        preTitle="Video İzleyin"
        title="İhtiyaçlarınıza Nasıl Ulaşacağınızı Öğrenin"
      >
        Bu bölüm, Planwire ürününüzün tanıtım veya demo videosunu vurgulamak
        için tasarlanmıştır. Analistler, bir açılış sayfasının video ile %3 daha
        yüksek dönüşüm oranına sahip olduğunu belirtiyor. Bu yüzden, videoyu
        eklemeyi unutmayın. Tam da böyle.
      </SectionTitle>

      <Video videoId="fZ0D0cnR88E" />

      <SectionTitle preTitle="Geri Bildirimler" title="Müşterilerimiz Ne Dedi?">
        Geri bildirimler, marka güvenini ve bilinirliğini artırmanın harika bir
        yoludur. Bu bölümü popüler müşterilerinizi vurgulamak için kullanın.
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="SSS" title="Sıkça Sorulan Sorular">
        Müşterilerinizin olası sorularını burada yanıtlayın, bu hem dönüşüm
        oranını artırır hem de destek veya sohbet taleplerini azaltır.
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}
