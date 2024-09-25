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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  createProject,
  CreateProjectPayload,
  GetProjectsPayload,
  getProjects,
  deleteProject,
} from "@/redux/actions/projectActions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, LayoutGrid, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/redux/reducers/projectReducer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const formSchema = z.object({
  projectName: z.string().nonempty("Proje ismi zorunludur"),
  projectCode: z.string().nonempty("Proje kodu zorunludur"),
  projectCategory: z.string().nonempty("Proje kategorisi zorunludur"),
  finishDate: z.date().optional(),
});

export default function Projects() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const siteId = useRef<string | null | undefined>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    siteId.current = url.pathname.split("/").pop() || undefined;
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectCode: "",
      projectCategory: "",
      finishDate: undefined,
    },
  });

  useEffect(() => {
    const companyId = getCompanyId();
    if (companyId && siteId.current) {
      const payload: GetProjectsPayload = {
        companyId,
        siteId: siteId.current as string,
      };
      dispatch(getProjects(payload));
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

    if (!siteId.current) {
      toast({
        title: "Hata",
        description: "Site ID'si bulunamadı.",
      });
      return;
    }

    const payload: CreateProjectPayload = {
      ...data,
      companyId,
      siteId: siteId.current as string,
      finishDate: data.finishDate || new Date(), 
    };

    const actionResult = await dispatch(createProject(payload));
    if (createProject.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Proje Oluşturuldu",
          description: "Başarıyla proje oluşturuldu.",
        });
        if (companyId && siteId.current) {
          const payload: GetProjectsPayload = {
            companyId,
            siteId: siteId.current as string,
          };
          dispatch(getProjects(payload));
        }
      } else {
        toast({
          title: "Proje Oluşturulamadı",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (createProject.rejected.match(actionResult)) {
      toast({
        title: "Proje Başarısız",
        description: actionResult.payload as React.ReactNode,
      });
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProjectId) return;

    const actionResult = await dispatch(deleteProject(selectedProjectId));
    if (deleteProject.fulfilled.match(actionResult)) {
      toast({
        title: "Proje Silindi",
        description: "Proje başarıyla silindi.",
      });
      const companyId = getCompanyId();
      if (companyId && siteId.current) {
        const payload: GetProjectsPayload = {
          companyId,
          siteId: siteId.current as string,
        };
        dispatch(getProjects(payload));
      }
    } else if (deleteProject.rejected.match(actionResult)) {
      toast({
        title: "Silme Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  const translateCategory = (category: string) => {
    switch (category) {
      case "architecture":
        return "Mimari";
      case "electrical":
        return "Elektrik";
      case "statics":
        return "Statik";
      case "landscape":
        return "Peyzaj";
      default:
        return category;
    }
  };

  const filteredProjects = selectedTab === "all"
    ? projects
    : projects.filter((project) => project.projectCategory === selectedTab);

  return (
    <div className="px-10">
      <div className="pb-5  flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-5">
          <LayoutGrid />
          <h5>Projeler</h5>
        </div>
        <div className="flex-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 text-xs">
                <Plus />
                Proje Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Proje Ekle</DialogTitle>
                <DialogDescription>
                  Proje eklemek için gerekli bilgileri giriniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={form.handleSubmit(handleSubmit)}
                  >
                    {/* projectName Input */}
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proje İsmi</FormLabel>
                          <FormControl>
                            <Input placeholder="İstanbul Şantiye" {...field} />
                          </FormControl>
                          <FormDescription>Proje İsmini Girin</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* projectCode Input */}
                    <FormField
                      control={form.control}
                      name="projectCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proje Kodu</FormLabel>
                          <FormControl>
                            <Input placeholder="IST001" {...field} />
                          </FormControl>
                          <FormDescription>Proje Kodunu Girin</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* projectCategory Input */}
                    <FormField
                      control={form.control}
                      name="projectCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proje Kategorisi</FormLabel>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name="projectCategory"
                              render={({ field }) => (
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Proje Kategorisi" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="architecture">
                                        Mimari
                                      </SelectItem>
                                      <SelectItem value="electrical">
                                        Elektrik
                                      </SelectItem>
                                      <SelectItem value="statics">
                                        Statik
                                      </SelectItem>
                                      <SelectItem value="landscape">
                                        Peyzaj
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                          <FormDescription>
                            Proje Kategorisi Girin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* finishDate  */}
                    <FormField
                      control={form.control}
                      name="finishDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2">
                          <FormLabel>Bitiş Tarihi</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(new Date(field.value), "PPP", {
                                      locale: tr,
                                    })
                                  ) : (
                                    <span>Tarih Seçin</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) => field.onChange(date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormDescription>
                            Şantiye Bitiş Tarihi Girin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="submit">Proje Ekle</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="">
        <Tabs defaultValue="all" className="w-[600px]" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">Hepsi</TabsTrigger>
            <TabsTrigger value="architecture">Mimari</TabsTrigger>
            <TabsTrigger value="electrical">Elektrik</TabsTrigger>
            <TabsTrigger value="statics">Statik</TabsTrigger>
            <TabsTrigger value="landscape">Peyzaj</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredProjects.map((project: Project) => (
          <div
            key={project._id}
            className="cursor-pointer gap-2 border-b border-gray-200"
            onClick={() => {
              window.location.href = `/navigator/plan/${project._id}`;
            }}
          >
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="text-base flex justify-between">
                  {project.projectName}
                  {user?.role === "admin" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Toggle
                          aria-label="Toggle italic"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectId(project._id);
                          }}
                        >
                          <Trash2 size={20} />
                        </Toggle>
                      </AlertDialogTrigger>
                      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Projeyi Sil</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu projeyi silmek istediğinizden emin misiniz? Bu
                            işlem geri alınamaz.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject();
                            }}
                            className="bg-red-500 text-white"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </CardTitle>
                <CardDescription>{project.projectCode}</CardDescription>
              </CardHeader>
              <CardContent className="items-center flex gap-5">
                <div className="px-5 py-1 rounded-full border inline-block">
                  <p className="text-zinc-700 text-sm">{project.projectCode}</p>
                </div>
                <div className="px-5 py-1 rounded-full border inline-block">
                  <p className="text-zinc-700 text-sm">
                    {translateCategory(project.projectCategory)}
                  </p>
                </div>
                <div className="px-5 py-1 rounded-full border inline-block">
                  <p className="text-zinc-700 text-sm">
                    {project.site.siteName}
                  </p>
                </div>
                <div className="px-5 py-1 rounded-full border inline-block">
                  <p className="text-zinc-700 text-sm">
                    {format(new Date(project.finishDate), "PPP", {
                      locale: tr,
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}