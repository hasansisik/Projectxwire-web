"use client";

import { useEffect, useState, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { verifyEmail, VerifyEmailPayload } from "@/redux/actions/userActions";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  verificationCode: z.string(),
});

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateDarkMode = () =>
      setIsDarkMode(document.body.className.includes("dark"));
    updateDarkMode();

    const observer = new MutationObserver(() => updateDarkMode());
    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { verificationCode: "" },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const actionResult = await dispatch(
      verifyEmail({
        verificationCode: Number(data.verificationCode),
        email: searchParams.get("email"),
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
      if (actionResult.payload) router.push("/login");
    } else {
      toast({
        title: "Email Doğrulama Başarısız",
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
          <CardTitle>Email Doğrula</CardTitle>
          <CardDescription>
            Maili doğrulamak için bilgileri girin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doğrulama Kodu</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        onChange={(value) => field.onChange(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>Doğrulama Kodu girin</FormDescription>
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

export default function VerifyPage() {
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
      <VerifyContent />
    </Suspense>
  );
}