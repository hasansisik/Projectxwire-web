"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  loadUser,
  editProfile,
  verifyEmail,
  EditProfilePayload,
  VerifyEmailPayload,
} from "@/redux/actions/userActions";
import { useToast } from "@/components/ui/use-toast";
import { storage } from "@/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

const uploadProfilePictureToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `ProfilePictures/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const formSchema = z.object({
  verificationCode: z.string(),
});

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    address: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
    company: "",
    picture: "",
  });
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await dispatch(loadUser());
      if (loadUser.rejected.match(result)) {
        router.push("/login");
      }
    };
    fetchUser();
  }, [dispatch, router]);

  const handlePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const pictureURL = await uploadProfilePictureToFirebase(file);
      setFormData({ ...formData, picture: pictureURL });
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        jobTitle: user.jobTitle || "",
        address: user.address || "",
        password: "",
        confirmPassword: "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        company: user.company || "",
        picture: user.picture || "",
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor!",
        description: "Lütfen şifrelerinizi kontrol edin.",
        variant: "destructive",
      });
      return;
    }
    if (formData.email !== user.email) {
      setIsDialogOpen(true);
    }
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof typeof formData];
      if (
        key === "password" &&
        value &&
        value !== user[key as keyof typeof user]
      ) {
        acc[key as keyof EditProfilePayload] = value as string;
      } else if (
        key !== "password" &&
        key !== "confirmPassword" &&
        value &&
        value !== user[key as keyof typeof user]
      ) {
        acc[key as keyof EditProfilePayload] = value as string;
      }
      return acc;
    }, {} as EditProfilePayload);

    if (isEmailChanged) {
      setIsDialogOpen(true);
      return;
    }

    const actionResult = await dispatch(editProfile(updatedData));
    if (editProfile.fulfilled.match(actionResult)) {
      toast({
        title: "Başarılı",
        description: "Profiliniz başarıyla güncellendi.",
      });
      dispatch(loadUser());
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        jobTitle: "",
        company: "",
        phoneNumber: "",
        picture: "",
      });
    } else if (editProfile.rejected.match(actionResult)) {
      toast({
        title: "Hata",
        description: actionResult.payload as string,
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { verificationCode: "" },
  });

  const handleVerifyEmail = async (data: z.infer<typeof formSchema>) => {
    const actionResult = await dispatch(
      verifyEmail({
        verificationCode: Number(data.verificationCode),
        email: formData.email,
      } as VerifyEmailPayload)
    );
    if (verifyEmail.fulfilled.match(actionResult)) {
      toast({
        title: actionResult.payload
          ? "Email Doğrulama Başarılı"
          : "Email Doğrulama Başarısız",
        description: actionResult.payload
          ? "Başarıyla giriş yaptınız."
          : "Geçersiz yanıt formatı.",
        variant: actionResult.payload ? undefined : "destructive",
      });
      if (actionResult.payload) {
        setIsDialogOpen(false);
      }
    } else {
      toast({
        title: "Email Doğrulama Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* Profile */}
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Profili Düzenle</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Profilinizi düzenleyebilir ve inceleyebilirsiniz.
          </p>
        </div>
        <Button className="flex gap-2 text-xs" onClick={handleSubmit}>
          Kaydet
        </Button>
      </div>
      {/* Name */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adı Soyadı</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          type="text"
          name="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={formData.name}
          className="w-[300px]"
        />
      </div>
      {/* Job title */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">İş Pozisyonu</p>
          <p className="text-muted-foreground font-normal text-xs">
            İş Pozisyonunu düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          type="text"
          name="jobTitle"
          onChange={(e) =>
            setFormData({ ...formData, jobTitle: e.target.value })
          }
          placeholder={formData.jobTitle || "Belirtilmemiş"}
          className="w-[300px]"
        />
      </div>
      {/* Address */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adres</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Textarea
          name="address"
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder={formData.address || "Belirtilmemiş"}
        />
      </div>
      {/* Password */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Şifre</p>
          <p className="text-muted-foreground font-normal text-xs">
            Şifrenizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Şifre"
          className="w-[300px]"
        />
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="Şifre Tekrar"
          className="w-[300px]"
        />
      </div>
      {/* Phone Number */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Telefon Numarası</p>
          <p className="text-muted-foreground font-normal text-xs">
            Telefon Numarasını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="phoneNumber"
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
          placeholder={formData.phoneNumber || "Belirtilmemiş"}
          className="w-[300px]"
        />
      </div>
      {/* Mail */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Mail Adresi</p>
          <p className="text-muted-foreground font-normal text-xs">
            Mail Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder={formData.email}
          className="w-[300px]"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Email Doğrula</DialogTitle>
              <DialogDescription>
                Lütfen email adresinize gönderilen doğrulama kodunu girin.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(handleVerifyEmail)}
              >
                <FormField
                  control={form.control}
                  name="verificationCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doğrulama Kodu</FormLabel>
                      <FormControl>
                        <Input
                          maxLength={4}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>Doğrulama Kodu girin</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Email Doğrula</Button>
                  <DialogClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Picture */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Profil Resmi</p>
          <p className="text-muted-foreground font-normal text-xs">
            Profil resmini düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <div className="flex-center gap-10">
          <Image
            src={user?.picture}
            alt="Profil Resmi"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Input
            id="picture"
            type="file"
            onChange={handlePicture}
            placeholder={formData.picture}
            className="w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}
