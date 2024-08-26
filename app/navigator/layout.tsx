"use client";

import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MainMenu from "./components/main-menu";
import MenuTitle from "./components/menu-title";
import { MenuIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Toaster } from "@/components/ui/toaster";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loadUser } from "@/redux/actions/userActions";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("min-width: 768px");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      <MainMenu className="hidden md:flex" />
      {!isDesktop && (
        <div className="p-4 flex gap-5  md:hidden sticky top-0 left-0 bg-background border-b border-border">
          <Drawer
            direction="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            onOpenChange={(open) => setMobileMenuOpen(open)}
          >
            <DrawerTrigger>
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent>
              <MainMenu />
            </DrawerContent>
          </Drawer>
          <MenuTitle />
        </div>
      )}
      <div className="overflow-auto px-10 py-5">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
