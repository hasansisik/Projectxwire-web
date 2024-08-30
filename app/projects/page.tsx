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
import { LayoutGrid, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Toggle } from "@/components/ui/toggle";
import {
  createProject,
  CreateProjectPayload,
  getProjects,
  deleteProject,
} from "@/redux/actions/projectActions";
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
import { Project } from "@/redux/reducers/projectReducer";
import { storage } from "@/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadLogoToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `PlanwireProject/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const formSchema = z.object({
  projectName: z.string().nonempty("Proje ismi zorunludur"),
  projectCode: z.string().nonempty("Proje kodu zorunludur"),
  logo: z.any().optional(),
});

export default function Projects() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectCode: "",
      logo: null,
    },
  });

  useEffect(() => {
    const companyId = getCompanyId();
    if (companyId) {
      dispatch(getProjects(companyId));
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

    const payload: CreateProjectPayload = {
      ...data,
      companyId,
      logo: logoURL || undefined,
    };

    const actionResult = await dispatch(createProject(payload));
    if (createProject.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Proje Oluşturuldu",
          description: "Başarıyla proje oluşturuldu.",
        });
        if (companyId) {
          dispatch(getProjects(companyId));
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
        title: "Giriş Başarısız",
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
      if (companyId) {
        dispatch(getProjects(companyId));
      }
    } else if (deleteProject.rejected.match(actionResult)) {
      toast({
        title: "Silme Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

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
                    {/* Logo Input */}
                    <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proje Logosu</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              onChange={(e) => field.onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormDescription>
                            Proje Logosunu Girin
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
      <div className="cards-container">
        {projects.map((project: Project) => (
          <Link
            key={project._id}
            href={`/navigator/plan/${project._id}`}
            className="sm:form-card"
          >
            <Card>
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
                            e.preventDefault();
                            setSelectedProjectId(project._id);
                          }}
                        >
                          <Trash2 size={20} />
                        </Toggle>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
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
                            onClick={handleDeleteProject}
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
              <CardContent className="items-center w-[150px] h-[150px]">
                <Image
                  src={project.logo}
                  alt="Planwire"
                  width={150}
                  height={150}
                  style={{ objectFit: "cover" }}
                  priority
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
