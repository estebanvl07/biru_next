"use client";
import { useSession } from "next-auth/react";
import { HandlerTheme } from "~/modules/components";

import AvatarMenu from "./Menu/AvatarMenu";
import CreationMenu from "./CreationMenu/CreationMenu";
import { useParams } from "next/navigation";

type Props = {
  type?: "empty" | "dashboard";
};

export default function HeaderMenu({ type = "dashboard" }: Props) {
  const { data: session, status } = useSession();
  const params = useParams();
  // const showMenu = useAppSelector((state) => state.home.showProfileSideBar);
  // const userInfo = useAppSelector((state) => state.user?.userInfo);
  // const dispatch = useAppDispatch();
  // const navRef = useOutsideClick<HTMLDivElement>(() =>
  //   dispatch(handleShowProfileSideBar(false))
  // );

  // const handleShowMenu = () => {
  //   dispatch(handleShowProfileSideBar(!showMenu));
  // };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <nav
      className="relative flex items-center justify-end gap-3 pr-6"
      // ref={navRef}
    >
      {params?.acc && <CreationMenu />}
      <HandlerTheme />
      <div className="ml-4 flex flex-col items-end">
        <p
          className="m-0 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap p-0 text-sm font-semibold dark:text-white"
          title={session?.user.name ?? ""}
        >
          {session?.user.name}
        </p>
        <span
          className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap text-xs dark:text-slate-300"
          title={session?.user.email ?? ""}
        >
          {session?.user.email}
        </span>
      </div>
      <AvatarMenu />
      {/* <Avatar image={session?.user?.image ?? ""} shape="circle" size="large" /> */}
    </nav>
  );
}
