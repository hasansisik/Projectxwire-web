"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  createPlan,
  CreatePlanPayload,
  deletePlan,
  getPlans,
} from "@/redux/actions/planActions";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { GalleryVerticalEnd, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { server } from "@/config";
import { Toggle } from "@/components/ui/toggle";

const formSchema = z.object({
  planName: z.string().nonempty("Plan ismi zorunludur"),
  planCode: z.string().nonempty("Plan kodu zorunludur"),
  planCategory: z.string().nonempty("Plan kategori zorunludur"),
  planImages: z.any().optional(),
});

type Plan = {
  _id: string;
  planName: string;
  planCode: string;
  planCategory: string;
  planImages: string;
  updatedAt: string;
};

export default function Plans() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<Plan[]>([]);
  const plans = useSelector((state: RootState) => state.plans.plans) as Plan[];
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      planCode: "",
      planCategory: "",
      planImages: "",
    },
  });

  let projectId: string | null | undefined = null;
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    projectId = url.pathname.split("/").pop();
  }

  useEffect(() => {
    if (projectId) {
      dispatch(getPlans(projectId));
    }
  }, [dispatch, projectId]);

  const handleSearch = async () => {
    try {
      let searchUrl = `${server}/search/plan/?`;

      if (searchKey) {
        searchUrl += `search=${searchKey}&`;
      }
      if (projectId) {
        searchUrl += `projectId=${projectId}&`;
      }
      if (searchUrl[searchUrl.length - 1] === "&") {
        searchUrl = searchUrl.slice(0, -1);
      }

      const response = await axios.get(searchUrl);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get plans", error);
    }
  };

  const handleClear = () => {
    setSearchKey("");
    setSearchResults([]);
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("planName", data.planName);
    formData.append("planCode", data.planCode);
    formData.append("planCategory", data.planCategory);
    formData.append("projectId", projectId || "");
    if (data.planImages && data.planImages[0]) {
      formData.append("planImages", data.planImages[0]);
    }

    const payload: CreatePlanPayload = {
      planName: data.planName,
      planCode: data.planCode,
      planCategory: data.planCategory,
      projectId: projectId || "",
      planImages:
        data.planImages && data.planImages[0] ? data.planImages[0] : "",
    };

    const actionResult = await dispatch(createPlan(payload));
    if (createPlan.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Plan Oluşturuldu",
          description: "Başarıyla plan oluşturuldu.",
        });
        if (projectId) {
          dispatch(getPlans(projectId));
        }
      } else {
        toast({
          title: "Plan Oluşturulamadı",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (createPlan.rejected.match(actionResult)) {
      toast({
        title: "Plan Oluşturulamadı",
        description: "Bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePlan = async () => {
    if (!selectedPlanId) return;

    const actionResult = await dispatch(deletePlan(selectedPlanId));
    if (deletePlan.fulfilled.match(actionResult)) {
      toast({
        title: "Plan Silindi",
        description: "Plan başarıyla silindi.",
      });
      if (projectId) {
        dispatch(getPlans(projectId));
      }
    } else if (deletePlan.rejected.match(actionResult)) {
      toast({
        title: "Silme Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <Accordion type="multiple" className="w-full">
      <div className="pb-5">
        <h4>Planlar</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Planlarınızı buradan inceleyebilir, ekleyebilir ve arama
          yapabilirsiniz.
        </p>
      </div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="flex flex-row gap-5">
          <Input
            className="w-[300px]"
            type="search"
            placeholder="Plan Ara"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button variant="outline" onClick={handleClear}>
            Temizle
          </Button>
          <Button onClick={handleSearch}>
            <Search size={20} />
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2 text-xs">
              <Plus />
              Plan Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Plan Ekle</DialogTitle>
              <DialogDescription>
                Plan eklemek için gerekli bilgileri giriniz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan İsmi</FormLabel>
                        <FormControl>
                          <Input placeholder="Plan Adı" {...field} />
                        </FormControl>
                        <FormDescription>Plan İsmini Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Kodu</FormLabel>
                        <FormControl>
                          <Input placeholder="Plan Kodu" {...field} />
                        </FormControl>
                        <FormDescription>Plan Kodunu Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Kategori</FormLabel>
                        <FormControl>
                          <Input placeholder="Plan Kategori" {...field} />
                        </FormControl>
                        <FormDescription>Plan Kategori Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Görseli</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,application/pdf"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                field.onChange(files);
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Plan Görsel veya Pdf Ekleyin
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Plan Ekle</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {searchResults.length === 0
        ? plans.map((item) => (
            <AccordionItem key={item._id} className="pb-3" value={item._id}>
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-2">
                  <GalleryVerticalEnd />
                  <p>{item.planCategory}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="cards-container">
                <Link
                  href={`/navigator/plan/${projectId}/details/?planId=${item._id}`}
                  className="plan-card"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <p>{item.planCode}</p>
                      </CardTitle>
                      <CardDescription>{item.planName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={item.planImages}
                        width="175"
                        height="100"
                        alt="Planwire"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                      <p className="text-sm font-normal">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                      {user.role === "admin" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Toggle
                              aria-label="Toggle italic"
                              onClick={(e) => {
                                setSelectedPlanId(item._id);
                              }}
                            >
                              <Trash2 size={18} />
                            </Toggle>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Planı Sil</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bu planı silmek istediğinizden emin misiniz? Bu
                                işlem geri alınamaz.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeletePlan}
                                className="bg-red-500 text-white"
                              >
                                Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))
        : searchResults.map((item) => (
            <AccordionItem key={item._id} className="pb-3" value={item._id}>
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-2">
                  <GalleryVerticalEnd />
                  <p>{item.planCategory}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="cards-container">
                <Link
                  href={`/navigator/plan/${projectId}/details/?planId=${item._id}`}
                  className="plan-card"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        <p>{item.planCode}</p>
                      </CardTitle>
                      <CardDescription>{item.planName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={item.planImages}
                        width="175"
                        height="100"
                        alt="Planwire"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                      <p className="text-sm font-normal">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                      {user.role === "admin" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Toggle
                              aria-label="Toggle italic"
                              onClick={(e) => {
                                setSelectedPlanId(item._id);
                              }}
                            >
                              <Trash2 size={18} />
                            </Toggle>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Planı Sil</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bu planı silmek istediğinizden emin misiniz? Bu
                                işlem geri alınamaz.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeletePlan}
                                className="bg-red-500 text-white"
                              >
                                Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
    </Accordion>
  );
}
