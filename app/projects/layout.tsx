"use client";

import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { Toaster } from "@/components/ui/toaster";
import MenuHeader from "./components/menu-header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loadUser } from "@/redux/actions/userActions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

type Props = {
  children: React.ReactNode;
};

export default function ProjectLayout({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await dispatch(loadUser());
      if (loadUser.rejected.match(result)) {
        router.push("/login");
      }
    };
    fetchUser();
  }, [dispatch, router]);

  return (
    <>
      <div className="overflow-auto pb-5">
        <MenuHeader />
        {children}
        <Toaster />
      </div>
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
    </>
  );
}
