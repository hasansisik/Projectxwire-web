import Image from "next/image";
import { Container } from "@/components/blog/Container";
import { StoreButtons } from "@/components/blog/StoreButtons";
import building from "../../public/img/building.png";

export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-white">
              Projectxwire , web veya mobil uygulama üzerinden ulaşabilirsiniz.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Panele gidebilir veya ios cihazlarınız için App store veya Android
              için Play store den indirebilirsiniz.
            </p>

            <StoreButtons idPrefix="hero" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2" />
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={building}
              width="900"
              height="850"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}