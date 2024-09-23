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
import { PersonStandingIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { login, LoginPayload } from "@/redux/actions/userActions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Image from "next/image";

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
});

export default function LoginPage() {
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
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const companyId = getCompanyId();
    const actionResult = await dispatch(
      login({ ...data, companyId } as LoginPayload)
    );
    if (login.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Giriş Başarılı",
          description: "Başarıyla giriş yaptınız.",
        });
        router.push("/sites");
      } else {
        toast({
          title: "Giriş Başarısız",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (login.rejected.match(actionResult)) {
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
        width="175"
        height="55"
        alt="Projectxwire"
        style={{ width: "175px", height: "55px" }}
        className="hidden sm:block"
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>
            Giriş yapmak için bilgileri doldurun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
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
                    <FormDescription>Email adresinizi girin</FormDescription>
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
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Şifrenizi girin</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Giriş Yap</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <Link href="/forgot-password" className="text-xs font-bold underline">
            Şifremi Unuttum
          </Link>
          <small>Hesabınız yok mu ?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/register">Kayıt Ol</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
