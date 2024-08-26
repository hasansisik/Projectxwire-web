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
    question: "Planwire uygulamasını nasıl indirebilirim?",
    answer:
      "Planwire uygulamasını Play Store, App Store veya web panelimizden indirebilirsiniz.",
  },
  {
    question: "Planwire uygulamasını ticari projelerde kullanabilir miyim?",
    answer: "Evet, Planwire uygulamasını ticari projelerde kullanabilirsiniz.",
  },
  {
    question: "Ücretsiz bir destek sunuyor musunuz?",
    answer:
      "Ücretsiz indirme için teknik destek sunmuyoruz. Destek planı satın alarak 6 ay süresince destek alabilirsiniz.",
  },
  {
    question: "Planwire uygulaması ile ilgili iade politikası nedir?",
    answer:
      "Uygulama ile ilgili herhangi bir memnuniyetsizlik durumunda, 90 gün içinde bize e-posta göndererek tam iade talebinde bulunabilirsiniz.",
  },
];
