import React from "react";
import LockIcon from "~/assets/Icones/Lock";
import { useThemeContext } from "~/lib/context/Theme.context";
import { motion } from "framer-motion";
import Ripple from "~/modules/components/ui/Ripple";

const Security = () => {
  const { theme } = useThemeContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="group relative order-3 col-span-2 row-span-2 h-56 flex-col overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm transition-colors  hover:bg-fuchsia-100  md:order-4 md:col-span-1 dark:bg-default-200/30 dark:hover:bg-fuchsia-600/10"
    >
      <div className="fade-bottom relative flex h-full w-full flex-col px-6 py-4">
        <div className="fade-x fade-y absolute left-0 -z-10 h-full w-full opacity-50">
          <Ripple mainCircleSize={120} />
        </div>
        <h2>Seguridad</h2>
        <p>Máxima seguridad de tu información.</p>
        <div className="absolute right-8 top-32 h-36 w-36 rounded-lg border bg-white/50 dark:border-white/20 dark:bg-default-200/50" />
        <div className="absolute left-8 top-24 h-36 w-36 rounded-lg border bg-white/30 dark:border-white/10 dark:bg-default-200/30" />
        <div className="absolute left-16 top-[110px] z-10 flex h-48 w-36 flex-col items-center justify-center  overflow-hidden rounded-lg border bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-default-200 dark:shadow-black">
          <LockIcon
            className="absolute -right-8 bottom-8 !text-white opacity-50 transition-all group-hover:opacity-100 dark:opacity-70"
            width="150"
            height="150"
            stroke={theme === "dark" ? "white" : "black"}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Security;
