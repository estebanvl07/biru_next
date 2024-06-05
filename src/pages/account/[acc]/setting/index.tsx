import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import MobileSettingPage from "~/modules/Profile/MobileSettingPage";
import Section from "~/modules/Profile/Section";

import { signOut, useSession } from "next-auth/react";
import { CALLBACK_SIGN_OUT_URL } from "~/lib/constants/config";
import { useThemeContext } from "~/lib/context/themeContext";
import { useResize } from "~/lib/hooks/useResize";
import { Card } from "~/modules/components";

const ProfilePage = () => {
  const { data } = useSession();
  const { isMobile } = useResize();

  const { theme, setTheme } = useThemeContext();
  const isDark = theme === "dark";

  const avatarSrc = data?.user.image ?? "";

  return (
    <DashboardLayout
      title="Configuración"
      headDescription="Configuracion de tu cuenta"
    >
      {isMobile ? (
        <MobileSettingPage />
      ) : (
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-xl dark:border-white/10">
          <div className="w-full max-w-[45rem]">
            <section className="flex w-full items-center justify-between gap-6 ">
              <article className="flex flex-row items-center gap-4 rounded-xl px-6 py-8 lg:items-end">
                <Avatar
                  isBordered
                  src={avatarSrc ?? undefined}
                  name={data?.user.name ?? ""}
                  color="primary"
                  aria-label="Avatar of user"
                  classNames={{
                    base: "!w-28 !h-28",
                  }}
                />
                <aside className="md:mb-2">
                  <p className="mt-4 block w-48 overflow-hidden text-ellipsis whitespace-nowrap text-center text-2xl font-bold text-slate-900 dark:text-white">
                    {data?.user.name}
                  </p>
                  <span>{data?.user.email}</span>
                </aside>
              </article>
              {/* <aside>
                <Button color="primary">Editar Perfil</Button>
              </aside> */}
            </section>
            <Tabs
              color="primary"
              variant="underlined"
              className="w-full"
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-t border-divider",
                cursor: "w-full bg-primary dark:bg-slate-200",
                tab: "w-fit px-6 h-12",
                tabContent:
                  "group-data-[selected=true]:text-primary group-data-[selected=true]:dark:text-slate-300",
              }}
            >
              <Tab key="setting" name="Configuración" title="Configuración">
                <Card className="mt-4 flex w-full flex-col pt-6">
                  <Section
                    title="Aplicación"
                    options={[
                      // {
                      //   id: 1,
                      //   text: "Editar Perfil",
                      //   startContent: <Icon icon="mage:user" width={20} />,
                      //   href: "/setting/profile",
                      // },
                      // {
                      //   id: 2,
                      //   text: "Notificaciones",
                      //   startContent: <Icon icon="lucide:bell" width={20} />,
                      //   href: "/setting/notifications",
                      // },
                      {
                        id: 3,
                        text: isDark ? "Modo claro" : "Modo Oscuro",
                        startContent: (
                          <Icon icon="iconoir:sun-light" width={20} />
                        ),
                        onclick: () => setTheme(isDark ? "light" : "dark"),
                      },
                    ]}
                  />
                  <Section
                    title="General"
                    options={[
                      {
                        id: 1,
                        text: "Ayuda",
                        startContent: (
                          <Icon
                            icon="material-symbols:help-outline"
                            width={20}
                          />
                        ),
                        href: "/help",
                      },
                      {
                        id: 2,
                        text: "Cerrar sessión",
                        startContent: (
                          <Icon icon="material-symbols:logout" width={20} />
                        ),
                        onclick: () =>
                          signOut({
                            callbackUrl: CALLBACK_SIGN_OUT_URL,
                          }),
                      },
                    ]}
                  />
                </Card>
              </Tab>

              <Tab key="analitycs" title="Estadistica" isDisabled>
                {/* <Card className="mb-2 flex flex-col">
                  <ul className="[&>li>p]: grid w-full grid-cols-3 place-items-center gap-2 text-sm [&>li>p]:font-semibold [&>li]:flex [&>li]:flex-col [&>li]:items-center">
                    <li>
                      <span>Ingresos</span>
                      <p>{parseAmount(income)}</p>
                    </li>
                    <li>
                      <span>Egresos</span>
                      <p>{parseAmount(egress)}</p>
                    </li>
                    <li>
                      <span>Estadistica</span>
                      <p>{percent}</p>
                    </li>
                  </ul>
                </Card>
                <CardBalanceAccount defaultFilter={0} /> */}
              </Tab>
              <Tab key="info" title="Información de perfil" disabled isDisabled>
                <Card className="mt-4 flex w-full flex-col">
                  <h3>Información </h3>
                  <ul className="grid w-full grid-cols-4 gap-2 [&>li>span]:font-semibold [&>li]:text-xs">
                    <li>
                      <span>Nombre</span>
                      <p>{}</p>
                    </li>
                  </ul>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
