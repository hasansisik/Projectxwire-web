import React from "react";
import { Container } from "@/components/blog/Container";
import { StoreButtons } from "@/components/blog/StoreButtons";

export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-6 mx-auto text-white bg-gradient-to-r from-orange-600 to-amber-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-2xl shadow-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-semibold lg:text-3xl text-white">
            Uygulama Hakkında
          </h2>
          <p className="mt-2 font-normal text-white/90 lg:text-base max-w-md">
            Hemen indirin ve sahadaki tüm süreçlerinizi dijital ortamda yönetmeye başlayın.
          </p>
        </div>
        <div className="flex-shrink-0 w-full lg:w-auto">
          <StoreButtons idPrefix="cta" />
        </div>
      </div>
    </Container>
  );
};

