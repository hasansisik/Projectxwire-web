import React from "react";
import { Container } from "@/components/blog/Container";

export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-orange-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-2xl">
            Uygulama Hakkında
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-l">
            Bilgi almak ve uygulamayı indirmek için hemen tıklayın
          </p>
        </div>
        <div className="flex-shrink-0 w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.projectxwire.apps"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 text-base font-semibold text-orange-950 bg-white hover:bg-orange-50 rounded-xl shadow-sm transition-all"
          >
            <span>Google Play</span>
          </a>
          <a
            href="https://apps.apple.com/tr/app/projectxwire/id6720710483?l=tr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 text-base font-semibold text-white bg-black/20 hover:bg-black/30 border border-white/30 rounded-xl shadow-sm transition-all"
          >
            <span>App Store</span>
          </a>
        </div>
      </div>
    </Container>
  );
};
