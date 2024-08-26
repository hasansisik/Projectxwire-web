import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileBadge, FileLock2, FileText } from "lucide-react";
import privacyPolicy from "@/public/Data/privacyPolicy";
import cookiePolicy from "@/public/Data/cookiePolicy";
import termsPolicy from "@/public/Data/termsPolicy";

export default function PolitcyPage() {
  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Politikalarımız</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Uygulama Politikalarımızı İnceleyebilirsiniz.
          </p>
        </div>
      </div>
      <p className="pb-4">Uygulama Politikaları</p>
      <Accordion
        type="single"
        collapsible
        className="bg-muted p-5 rounded-lg border border-gray-300"
      >
        <AccordionItem value="item-1" className="py-2 border-b border-gray-300">
          <AccordionTrigger className="p-3 ">
            <div className="flex-center">
              <FileLock2 />
              <p>Gizlilik Politikası</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-5 bg-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: privacyPolicy.replace(/\n/g, "<br />"),
              }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="py-2 border-b border-gray-300">
          <AccordionTrigger className="p-3 ">
            <div className="flex-center">
              <FileText />
              <p>Kullanım Koşulları</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-5 bg-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: termsPolicy.replace(/\n/g, "<br />"),
              }}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="py-2 ">
          <AccordionTrigger className="p-3 ">
            <div className="flex-center">
              <FileBadge />
              <p>Çerez Politikaları</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-5 bg-white rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: cookiePolicy.replace(/\n/g, "<br />"),
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
