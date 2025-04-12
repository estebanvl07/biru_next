import { useRouter } from "next/router";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";
import { usePathname } from "next/navigation";

const segmentTranslations = {
  main: {
    title: "Dashboard",
    icon: "akar-icons:dashboard",
  },
  transactions: {
    title: "Transacciones",
    icon: "mingcute:transfer-fill",
  },
  entities: {
    title: "Entidades",
    icon: "ph:users-bold",
  },
  goals: {
    title: "Metas",
    icon: "ph:target",
  },
  calendar: {
    title: "Calendario",
    icon: "ph:target",
  },
  budget: {
    title: "Presupuesto",
    icon: "ph:target",
  },
  analytics: {
    title: "Análisis",
    icon: "material-symbols:analytics-outline",
  },
  category: {
    title: "Categorías",
    icon: "iconamoon:category",
  },
  setting: {
    title: "Configuración",
    icon: "ep:setting",
  },
  new: {
    title: "Nuevo",
    icon: "ph:plus",
  },
  edit: {
    title: "Editar",
    icon: "ph:edit",
  },
  // Agrega más traducciones según sea necesario para tus rutas
};

const Breadcrum = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = router.query;
  const pathSegments = router.asPath
    .split("/")
    .filter((seg) => seg !== "")
    .slice(2);

  if (router.pathname.includes("/main")) {
    return null;
  }

  return (
    <Breadcrumbs className="mb-2">
      {pathname !== `${DASHBOARD_MAIN_PATH}/${params?.bookId}` && (
        <BreadcrumbItem>
          <Link href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}`}>
            Dashboard
          </Link>
        </BreadcrumbItem>
      )}
      {pathSegments.map((segment, index) => (
        <BreadcrumbItem key={`${segment}-${index}`}>
          <Link
            href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/${pathSegments.slice(0, index + 1).join("/")}`}
          >
            {segmentTranslations[segment as keyof typeof segmentTranslations]
              ?.title
              ? segmentTranslations[segment as keyof typeof segmentTranslations]
                  .title
              : segment}
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrum;
