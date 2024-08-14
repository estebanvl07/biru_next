import { useRouter } from "next/router";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

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
  const params = router.query;
  const pathSegments = router.asPath
    .split("/")
    .filter((seg) => seg !== "")
    .slice(2);

  if (router.pathname.includes("/main")) {
    return null;
  }

  return (
    <></>
    // <Breadcrumbs className="mb-2">
    //   {!router.pathname.includes("/main") && (
    //     <BreadcrumbItem>
    //       <Link href={`/account/${params?.acc}/main`}>
    //         <Icon icon="akar-icons:dashboard" width={14} />
    //       </Link>
    //     </BreadcrumbItem>
    //   )}
    //   {pathSegments.map((segment, index) => (
    //     <BreadcrumbItem
    //       startContent={
    //         segment
    //           ? segmentTranslations[segment]?.icon && (
    //               <Icon icon={segmentTranslations[segment]?.icon} width={14} />
    //             )
    //           : null
    //       }
    //       key={index}
    //     >
    //       <Link
    //         href={`/account/${params?.acc}/${pathSegments.slice(0, index + 1).join("/")}`}
    //       >
    //         {segmentTranslations[segment]?.title
    //           ? segmentTranslations[segment].title
    //           : segment}
    //       </Link>
    //     </BreadcrumbItem>
    //   ))}
    // </Breadcrumbs>
  );
};

export default Breadcrum;
