"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  loadUser,
  editProfile,
  EditProfilePayload,
} from "@/redux/actions/userActions";
import { useToast } from "@/components/ui/use-toast";

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
  });

  useEffect(() => {
    const fetchUser = async () => {
      const result = await dispatch(loadUser());
      if (loadUser.rejected.match(result)) {
        router.push("/login");
      }
    };
    fetchUser();
  }, [dispatch, router]);

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
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor!",
        description: "Lütfen şifrelerinizi kontrol edin.",
        variant: "destructive",
      });
      return;
    }

    const updatedData = Object.keys(formData).reduce((acc, key) => {
      const value = formData[key as keyof typeof formData];
      if (value && value !== user[key as keyof typeof user]) {
        acc[key as keyof EditProfilePayload] = value as string;
      }
      return acc;
    }, {} as EditProfilePayload);

    const actionResult = await dispatch(editProfile(updatedData));
    if (editProfile.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Başarılı",
          description: "Profiliniz başarıyla güncellendi.",
        });
      } else {
        toast({
          title: "Hata",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (editProfile.rejected.match(actionResult)) {
      toast({
        title: "Hata",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
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
      {/* Profile */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Kullanıcı Adı</p>
          <p className="text-muted-foreground font-normal text-xs">
            Kullanıcı adını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="name"
          onChange={handleChange}
          placeholder={formData.name}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">İş Pozisyonu</p>
          <p className="text-muted-foreground font-normal text-xs">
            İş Pozisyonunu düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="jobTitle"
          onChange={handleChange}
          placeholder={formData.jobTitle || "Belirtilmemiş"}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adres</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Textarea
          name="address"
          onChange={handleChange}
          placeholder={formData.address || "Belirtilmemiş"}
        />
      </div>
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
          onChange={handleChange}
          placeholder="Şifre"
          className="w-[300px]"
        />
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Şifre Tekrar"
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Telefon Numarası</p>
          <p className="text-muted-foreground font-normal text-xs">
            Telefon Numarasını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="phoneNumber"
          onChange={handleChange}
          placeholder={formData.phoneNumber || "Belirtilmemiş"}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Mail Adresi</p>
          <p className="text-muted-foreground font-normal text-xs">
            Mail Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="email"
          onChange={handleChange}
          placeholder={formData.email}
          className="w-[300px]"
        />
      </div>
    </div>
  );
}
