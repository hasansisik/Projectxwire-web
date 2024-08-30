"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { register, RegisterPayload } from "@/redux/actions/userActions";

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalıdır"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Parolalar uyuşmuyor",
      });
    }
  });

const baseSchema = z.object({
  email: z.string().email("Geçerli bir isim girin"),
  name: z.string(),
});

const formSchema = baseSchema.and(passwordSchema);

export default function SignupPage() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const className = document.body.className;
    setIsDarkMode(className.includes("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const className = document.body.className;
          setIsDarkMode(className.includes("dark"));
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const companyId = getCompanyId();
    const actionResult = await dispatch(
      register({ ...data, companyId } as RegisterPayload)
    );
    if (register.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Giriş Başarılı",
          description: "Başarıyla giriş yaptınız.",
        });
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
      } else {
        toast({
          title: "Giriş Başarısız",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (register.rejected.match(actionResult)) {
      toast({
        title: "Giriş Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Image
        src={isDarkMode ? "/img/logo-white.png" : "/img/logo-black.png"}
        width="140"
        height="35"
        alt="Planwire"
        style={{ width: "140px", height: "35px" }}
        className="hidden sm:block"
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Kayıt Ol</CardTitle>
          <CardDescription>
            Kayıt olmak için bilgileri doldurun lütfen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Name Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İsim</FormLabel>
                    <FormControl>
                      <Input placeholder="İsim Soyisim" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ornek@hotmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Confirm Input */}
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Kayıt Ol</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Zaten hesabınız var mı</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Giriş Yap</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
