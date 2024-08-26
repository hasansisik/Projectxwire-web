import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleHelp, Headset, Info } from "lucide-react";
import aboutUs from "@/public/Data/aboutUs";
import contact from "@/public/Data/contact";

export default function HelpersPage() {
  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Yardım ve Destek Merkezi</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Size Nasıl Yardımcı Olabiliriz?
          </p>
        </div>
      </div>
      <p className="pb-4">Yardım ve Destek Merkezi</p>
      <Accordion
        type="single"
        collapsible
        className="bg-muted p-5 rounded-lg border border-gray-300"
      >
        <AccordionItem value="item-1" className="py-2 border-b border-gray-300">
          <AccordionTrigger className="p-3 ">
            <div className="flex-center">
              <Info />
              <p>Hakkımızda</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-5 bg-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: aboutUs.replace(/\n/g, "<br />"),
              }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="py-2 border-b border-gray-300">
          <AccordionTrigger className="p-3 ">
            <div className="flex-center">
              <CircleHelp />
              <p>Sıkça Sorulan Sorular</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-5 bg-white rounded-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Soru 1 ?</AccordionTrigger>
                <AccordionContent>
                  Cevap 1.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Soru 2?</AccordionTrigger>
                <AccordionContent>
                  Cevap 2.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Soru 3 ?</AccordionTrigger>
                <AccordionContent>
                  Cevap 3.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="py-2 ">
          <AccordionTrigger className="p-3 ">
            <div className="flex-center">
              <Headset />
              <p>İletişim ve Destek</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-5 bg-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: contact.replace(/\n/g, "<br />"),
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
