import Image from "next/image";
import React from "react";
import { Container } from "@/components/blog/Container";

import userOneImg from "../../public/img/user1.jpg";
import userTwoImg from "../../public/img/user2.jpg";
import userThreeImg from "../../public/img/user3.jpg";

export const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-l leading-normal ">
              Planwire uygulaması, inşaat projelerimizdeki sorunları hızlıca
              raporlamamıza ve çözüm üretmemize büyük katkı sağladı.{" "}
              <Mark>Uygulama</Mark>, ekibimizin iletişimini ve verimliliğini
              artırdı.
            </p>

            <Avatar
              image={userOneImg}
              name="Ayşe Yılmaz"
              title="Proje Müdürü, XYZ İnşaat"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-l leading-normal ">
              Planwire ile proje süreçlerimizi daha etkili yönetiyoruz.{" "}
              <Mark>Gelişmiş özellikleri</Mark> sayesinde iş akışımız oldukça
              hızlandı.
            </p>

            <Avatar
              image={userTwoImg}
              name="Mehmet Demir"
              title="İş Geliştirme Müdürü, ABC Yapı"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
            <p className="text-l leading-normal ">
              Planwire, inşaat projelerimizdeki sorunları anında tespit etmemizi
              ve çözmemizi sağladı. <Mark>Gerçekten</Mark> etkili bir araç.
            </p>

            <Avatar
              image={userThreeImg}
              name="Elif Öztürk"
              title="Teknik Müdür, DEF İnşaat"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: any;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-l font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-orange-800 bg-orange-100 rounded-md ring-orange-100 ring-4 dark:ring-orange-900 dark:bg-orange-900 dark:text-orange-200">
        {props.children}
      </mark>{" "}
    </>
  );
}
