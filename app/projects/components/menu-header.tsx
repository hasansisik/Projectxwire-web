"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale/tr";
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
import { logout } from "@/redux/actions/userActions";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function MenuHeader() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weather, setWeather] = useState({ temp: null, description: "" });
  const [date, setDate] = useState("");
  const user = useSelector((state: RootState) => state.user.user);

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

  useEffect(() => {
    const now = new Date();
    const formattedDate = format(now, "d MMMM yyyy EEEE", { locale: tr });
    setDate(formattedDate);

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&units=metric&appid=dd7e2e4d31437e6dc0464c17d22f97a9&lang=tr`
        );
        const data = await response.json();
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
      } catch (error) {
        console.error("Hava durumu bilgisi alınamadı:", error);
      }
    };

    fetchWeather();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between bg-muted mb-10 p-4 border-b">
      <Image
        src={isDarkMode ? "/img/logo-white.png" : "/img/logo-black.png"}
        width="130"
        height="30"
        alt="Planwire"
        style={{ width: "130px", height: "30px" }}
      />
      <div className="flex text-center items-center">
        <p className="text-sm">
          {date}
          {" - "}
          {weather.temp !== null
            ? `${weather.temp}°C`
            : "Hava durumu bilgisi alınamadı"}
        </p>
        <div className="flex-center px-5">
          <Avatar>
            <AvatarFallback className="bg-orange-400 dark:bg-orange-400 text-white">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="hover:underline">Çıkış</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Çıkış Yap</AlertDialogTitle>
                <AlertDialogDescription>
                  Çıkış yapmak istediğinizden emin misiniz?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-500 text-white"
                >
                  Evet
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
