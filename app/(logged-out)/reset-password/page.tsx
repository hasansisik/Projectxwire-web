"use client";

import { Suspense, useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import {
  resetPassword,
  ResetPasswordPayload,
} from "@/redux/actions/userActions";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const formSchema = z
  .object({
    passwordToken: z.string(),
    newPassword: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Parolalar uyuşmuyor",
      });
    }
  });

function ResetContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
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
      passwordToken: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const { passwordToken, newPassword } = data;
    const actionResult = await dispatch(
      resetPassword({
        passwordToken: Number(passwordToken),
        newPassword,
        email: searchParams.get("email"),
      } as ResetPasswordPayload)
    );
    if (resetPassword.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Şifre Değiştirme Başarılı",
          description: "Başarıyla giriş yaptınız.",
        });
        router.push("/login");
      } else {
        toast({
          title: "Şifre Değiştirme Başarısız",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (resetPassword.rejected.match(actionResult)) {
      toast({
        title: "Şifre Değiştirme Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Image
        src={isDarkMode ? "/planwireWhite.png" : "/planwireBlack.png"}
        width="140"
        height="35"
        alt="Planwire"
        style={{ width: "140px", height: "35px" }}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Şifremi Sıfırla</CardTitle>
          <CardDescription>
            Şifremi sıfırlamak için bilgileri girin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* passwordToken Input */}
              <FormField
                control={form.control}
                name="passwordToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doğrulama Kodu</FormLabel>
                    <FormControl>
                      <Input placeholder="1234" {...field} />
                    </FormControl>
                    <FormDescription>Doğrulama Kodu girin</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Input */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yeni Şifre</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Şifrenizi girin</FormDescription>
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
                    <FormDescription>Şifrenizi tekrar girin</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Şifremi Sıfırla</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Hesabınız yok mu ?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/register">Kayıt Ol</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default function ResetPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Yükleniyor...
        </div>
      }
    >
      <ResetContent />
    </Suspense>
  );
}