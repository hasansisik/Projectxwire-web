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
  title: "Sahada Kesintisiz İş Birliği ve Hızlı Çözüm",
  desc: "İnşaat sürecindeki tüm aksaklıkları anında tespit edin, ilgili ekiplere görev atayın ve şantiyedeki ilerlemeyi gerçek zamanlı olarak izleyin.",
  image: leftApp,
  bullets: [
    {
      title: "Sorunları Hızla Raporlayın",
      desc: "Projectxwire ile sahadaki sorunları anında fotoğraflayıp raporlayabilir ve hızlı çözümler üretebilirsiniz.",
      icon: <SmileyIcon />,
    },
    {
      title: "Etkili İletişim Sağlayın",
      desc: "Uygulama içi mesajlaşma özelliği ile ekiplerinizle doğrudan ve güvenli bir şekilde iletişim kurabilirsiniz.",
      icon: <BarChart2Icon />,
    },
    {
      title: "Belge Yönetimini Kolaylaştırın",
      desc: "Şantiye tutanakları, belge imzalama ve saklama işlemlerini dijital ortamda güvenle yönetin.",
      icon: <ArrowRightCircleIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Mobil ve Web ile Güçlü Yönetim",
  desc: "Ofisteki proje yöneticilerinden sahadaki teknik ekiplere kadar herkes tek bir platform üzerinden senkronize çalışır.",
  image: rightApp,
  bullets: [
    {
      title: "Hızlı Erişim ve Bildirimler",
      desc: "Sahadaki kritik güncellemeler ve atanan işler hakkında anında anlık bildirimler alın.",
      icon: <PhoneIcon />,
    },
    {
      title: "Gelişmiş Saha Kontrolü",
      desc: "Tüm şantiyelerinizin durumunu, açık sorunları ve tamamlama oranlarını tek ekrandan izleyin.",
      icon: <SettingsIcon />,
    },
    {
      title: "Kullanıcı Dostu ve Hızlı Arayüz",
      desc: "Karmaşık eğitim süreçlerine gerek kalmadan, ilk günden itibaren tüm ekibinizin rahatça kullanabileceği sade tasarım.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
