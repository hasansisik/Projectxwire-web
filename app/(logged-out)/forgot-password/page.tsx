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
import { forgotPassword } from "@/redux/actions/userActions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
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
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  const actionResult = await dispatch(forgotPassword(data.email));
    if (forgotPassword.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Şifre Sıfırlama Başarılı",
          description: "Başarıyla giriş yaptınız.",
        });
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      } else {
        toast({
          title: "Şifre Sıfırlama Başarısız1",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (forgotPassword.rejected.match(actionResult)) {
      toast({
        title: "Şifre Sıfırlama Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Image
        src={isDarkMode ? "/img/planwireWhite.png" : "/img/planwireBlack.png"}
        width="140"
        height="35"
        alt="Planwire"
        style={{ width: "140px", height: "35px" }}
      />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Şifremi Unuttum</CardTitle>
          <CardDescription>
            Şifrenizi sıfırlamak için mail adresinizi girin.
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
