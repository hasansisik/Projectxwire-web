"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Info, LayoutGrid, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Toggle } from "@/components/ui/toggle";
import {
  createSite,
  CreateSitePayload,
  getSites,
  deleteSite,
} from "@/redux/actions/siteActions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Site } from "@/redux/reducers/siteReducer";
import { storage } from "@/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Clock } from "lucide-react";

const uploadLogoToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `ProjectxwireSites/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const formSchema = z.object({
  siteName: z.string().nonempty("Şantiye ismi zorunludur"),
  siteCode: z.string().nonempty("Şantiye kodu zorunludur"),
  logo: z.any().optional(),
});

export default function Sites() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const sites = useSelector((state: RootState) => state.sites.sites);
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      siteCode: "",
      logo: null,
    },
  });

  useEffect(() => {
    const companyId = getCompanyId();
    if (companyId) {
      dispatch(getSites(companyId));
    }
  }, [dispatch]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const companyId = getCompanyId();
    if (!companyId) {
      toast({
        title: "Hata",
        description: "Şirket ID'si bulunamadı.",
      });
      return;
    }

    let logoURL = "";
    if (data.logo && data.logo[0]) {
      const logoFile = data.logo[0] as unknown as File;
      logoURL = await uploadLogoToFirebase(logoFile);
    }

    const payload: CreateSitePayload = {
      ...data,
      companyId,
      logo: logoURL || undefined,
    };

    const actionResult = await dispatch(createSite(payload));
    if (createSite.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Şantiye Oluşturuldu",
          description: "Başarıyla Şantiye Oluşturuldu.",
        });
        if (companyId) {
          dispatch(getSites(companyId));
        }
      } else {
        toast({
          title: "Şantiye Oluşturulamadı",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (createSite.rejected.match(actionResult)) {
      toast({
        title: "Şantiye Başarısız",
        description: actionResult.payload as React.ReactNode,
      });
    }
  };

  const handleDeleteSite = async () => {
    if (!selectedSiteId) return;

    const actionResult = await dispatch(deleteSite(selectedSiteId));
    if (deleteSite.fulfilled.match(actionResult)) {
      toast({
        title: "Şantiye Silindi",
        description: "Şantiye başarıyla silindi.",
      });
      const companyId = getCompanyId();
      if (companyId) {
        dispatch(deleteSite(companyId));
      }
    } else if (deleteSite.rejected.match(actionResult)) {
      toast({
        title: "Silme Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  const calculateRemainingTime = (
    startDate: string,
    endDate: string
  ): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} gün`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="px-10">
      <div className="pb-5  flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-5">
          <LayoutGrid />
          <h5>Şantiyeler</h5>
        </div>
        <div className="flex-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 text-xs">
                <Plus />
                Şantiye Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Şantiye Ekle</DialogTitle>
                <DialogDescription>
                  Şantiye eklemek için gerekli bilgileri giriniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(handleSubmit)}
                  >
                    {/* siteName Input */}
                    <FormField
                      control={form.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şantiye İsmi</FormLabel>
                          <FormControl>
                            <Input placeholder="İstanbul Şantiye" {...field} />
                          </FormControl>
                          <FormDescription>
                            Şantiye İsmini Girin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* siteCode Input */}
                    <FormField
                      control={form.control}
                      name="siteCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şantiye Kodu</FormLabel>
                          <FormControl>
                            <Input placeholder="IST001" {...field} />
                          </FormControl>
                          <FormDescription>
                            Şantiye Kodunu Girin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Logo Input */}
                    <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Şantiye Logosu</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              onChange={(e) => field.onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormDescription>
                            Şantiye Logosunu Girin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit">Şantiye Ekle</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="cards-container">
        {sites.map((site: Site) => (
          <div
            key={site._id}
            className="sm:form-card cursor-pointer"
            onClick={() => {
              window.location.href = `/projects/${site._id}`;
            }}
          >
            <Card className="rounded-2xl">
              {user?.role === "admin" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Toggle
                      aria-label="Toggle italic"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSiteId(site._id);
                      }}
                    >
                      <Trash2 size={20} />
                    </Toggle>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Şantiyeyi Sil</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu şantiyeyi silmek istediğinizden emin misiniz? Bu işlem
                        geri alınamaz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSite();
                        }}
                        className="bg-red-500 text-white"
                      >
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <CardHeader className="p-0 flex flex-row justify-between w-full h-10 relative">
                {/* Üst Kısım */}
                <div className="absolute top-0 left-[42%] w-[25px] h-[50%] bg-[#EBEBEB] rounded-tr-2xl"></div>
                {/* Alt Kısım (Renkli Barlar) */}
                <div className="absolute bottom-0 left-[45%] w-[3%] h-[50%] bg-[#383838] rounded-tr-[20px]"></div>
                {/* Sol Kısım */}
                <div className="relative w-[45%] h-full flex items-center px-5 py-1 bg-[#383838] rounded-tl-2xl rounded-tr-2xl">
                  <div className="px-10 py-1 gap-2 rounded-full border border-white flex items-center justify-center">
                    <Info size={15} color="#FFF" />
                    <p className="text-white text-xs">{site.siteCode}</p>
                  </div>
                </div>
                {/* Sağ Kısım */}
                <div className="relative w-[55%] h-full flex justify-center items-center px-5 bg-[#EBEBEB] rounded-bl-2xl rounded-tr-2xl">
                  <p className="text-black text-xs font-medium">
                    {site.siteName}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-3 flex flex-row rounded-b-2xl items-center justify-between gap-2 bg-[#383838]">
                <div className="w-[75px] h-[75px] rounded-full bg-white flex items-center justify-center">
                  <Image
                    src={site.logo}
                    alt="Projectxwire"
                    width={75}
                    height={75}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-rows justify-center items-center">
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white">Kalan Süre</p>
                    <p className="text-xs text-white">
                      {calculateRemainingTime(site.createdAt, site.finishDate)}
                    </p>
                  </div>
                  <div className="border-l border-gray-300 mx-2 h-full">.</div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white">Başlangıç Tarihi</p>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} color="white" />
                      <p className="text-xs text-white">
                        {formatDate(site.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="border-l border-gray-300 mx-2 h-full">.</div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-white">Bitiş Tarihi</p>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} color="white" />
                      <p className="text-xs text-white">
                        {formatDate(site.finishDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
