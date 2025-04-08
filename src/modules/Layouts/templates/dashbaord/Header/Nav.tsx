import { useParams } from "next/navigation";

import UserMenu from "~/modules/components/atoms/UserMenu";
import CreationMenu from "./CreationMenu/CreationMenu";
import NotificationMenu from "~/modules/components/molecules/NotificationMenu";

export default function HeaderMenu({
  hasNotifications = true,
}: {
  hasNotifications?: boolean;
}) {
  const params = useParams();

  return (
    <nav className="relative z-10 flex items-center justify-end gap-2">
      {params?.bookId && <CreationMenu />}
      {hasNotifications && <NotificationMenu />}
      <UserMenu />
    </nav>
  );
}
