import MenuItem from "./menu-item";
import { cn } from "@/lib/utils";

export default function MainMenu({ className }: { className?: string }) {
  let projectId: string | null | undefined = null;
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    projectId = url.pathname.split("/").pop();
  }

  return (
    <nav className={cn(`overflow-auto flex flex-col `, className)}>
      <h5>Profil Ayarları</h5>
      <ul className="flex flex-col py-4 px-2 gap-3 grow">
        <MenuItem href={`/navigator/profile/${projectId}`} icon="UserRoundPen">
          Profili Düzenle
        </MenuItem>
        <MenuItem
          href={`/navigator/profile/${projectId}/project-edit`}
          icon="SquarePen"
        >
          Projeyi Düzenle
        </MenuItem>
        <MenuItem
          href={`/navigator/profile/${projectId}/users-edit`}
          icon="UserRoundCog"
        >
          Kullanıcıları Düzenle
        </MenuItem>
        <MenuItem
          href={`/navigator/profile/${projectId}/helpers`}
          icon="LifeBuoy"
        >
          Yardım ve Destek
        </MenuItem>
        <MenuItem
          href={`/navigator/profile/${projectId}/politcy`}
          icon="Clipboard"
        >
          Politikalar ve Gizlilik
        </MenuItem>
      </ul>
    </nav>
  );
}