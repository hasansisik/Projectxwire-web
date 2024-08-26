"use client";

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
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/actions/userActions";
import { RootState, AppDispatch } from "@/redux/store";

export default function MainMenu({ className }: { className?: string }) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

 useEffect(() => {
   const fetchProjectId = async () => {
     const url = new URL(window.location.href);
     const segments = url.pathname.split("/");
     const projectId =
       segments[segments.indexOf("plan") + 1] ||
       segments[segments.indexOf("task") + 1] ||
       segments[segments.indexOf("form") + 1] ||
       segments[segments.indexOf("file") + 1] ||
       segments[segments.indexOf("profile") + 1] ;
     setSelectedMenu(projectId ?? null);
     setProjectId(projectId ?? null);
   };

   fetchProjectId();
 }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav
      className={cn(
        `md:bg-muted overflow-auto md:border-r md:border-gray-300 flex flex-col`,
        className
      )}
    >
      <header className="border-b dark:border-b-black border-b-zinc-300">
        <Link href="/projects">
          <MenuTitle />
        </Link>
      </header>
      <ul className="flex flex-col py-4 px-2 gap-3 grow">
        <MenuItem
          href={`/navigator/plan/${projectId}`}
          icon="LayoutPanelLeft"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Planlar
        </MenuItem>
        <MenuItem
          href={`/navigator/task/${projectId}`}
          icon="LayoutList"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Görevler
        </MenuItem>
        <MenuItem
          href={`/navigator/form/${projectId}`}
          icon="File"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Formlar
        </MenuItem>
        <MenuItem
          href={`/navigator/file/${projectId}`}
          icon="FolderOpen"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Dosyalar
        </MenuItem>
      </ul>
      <footer className="flex gap-2 px-3 py-4 items-center">
        <Link href={`/navigator/profile/${projectId}`}>
          <Avatar>
            <AvatarFallback className="bg-orange-400 dark:bg-orange-400 text-white">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
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
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
