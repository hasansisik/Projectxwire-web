import {
  Smile as SmileyIcon,
  BarChart2 as BarChart2Icon,
  ArrowRightCircle as ArrowRightCircleIcon,
  Phone as PhoneIcon,
  Settings as SettingsIcon,
  Sun as SunIcon,
} from "lucide-react";
import leftApp from "../../public/img/left-app.png";
import rightApp from "../../public/img/right-app.png";

const benefitOne = {
  title: "Faydalarınızı Vurgulayın",
  desc: "Bu alanı ürününüzün ilk faydasını veya özelliğini vurgulamak için kullanabilirsiniz. Ayrıca, örnekte olduğu gibi bir resim veya illüstrasyon ve bazı madde işaretleri içerebilir.",
  image: leftApp,
  bullets: [
    {
      title: "Sorunları Hızla Raporlayın",
      desc: "Planwire ile sahadaki sorunları anında raporlayabilir ve hızlı çözümler üretebilirsiniz.",
      icon: <SmileyIcon />,
    },
    {
      title: "Etkili İletişim Sağlayın",
      desc: "Uygulama içi mesajlaşma özelliği ile ekibinizle etkili bir şekilde iletişim kurabilirsiniz.",
      icon: <BarChart2Icon />,
    },
    {
      title: "Belge Yönetimini Kolaylaştırın",
      desc: "Belge imzalama ve saklama işlemlerini uygulama üzerinden kolayca yönetebilirsiniz.",
      icon: <ArrowRightCircleIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Diğer Faydaları Burada Sunun",
  desc: "Bu düzeni, ürününüzün geri kalan faydalarını vurgulamak için kullanabilirsiniz. Ayrıca, önceki bölümde olduğu gibi bir resim veya illüstrasyon ve bazı madde işaretleri içerebilir.",
  image: rightApp,
  bullets: [
    {
      title: "Hızlı Erişim ve Bildirimler",
      desc: "Sorunlar ve güncellemeler hakkında anında bildirimler alarak hızlı erişim sağlayın.",
      icon: <PhoneIcon />,
    },
    {
      title: "Gelişmiş Uygulama İçi Özellikler",
      desc: "Uygulama, kullanıcı deneyimini artırmak için çeşitli gelişmiş özellikler sunar.",
      icon: <SettingsIcon />,
    },
    {
      title: "Kullanıcı Dostu Arayüz",
      desc: "Planwire, kullanımı kolay ve kullanıcı dostu bir arayüze sahiptir.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
