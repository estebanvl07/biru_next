import { AnimatePresence, motion } from "framer-motion";
import Portal from "../atoms/Portal.component";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DialogProps } from "~/types/component/dialog";
import clsx from "clsx";

const Sheet = ({
  children,
  isOpen = false,
  onClose,
  title,
  subtitle,
  classNames,
}: DialogProps) => {
  return (
    <Portal selector="portal-root" show={isOpen}>
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className={clsx(
            "fixed z-50 h-screen w-screen bg-black/30 dark:bg-black/50",
            classNames?.overlayer,
          )}
        />
        <motion.div
          initial={{
            x: "30rem",
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "30rem",
          }}
          transition={{
            duration: 0.3,
          }}
          className={clsx(
            "fixed right-0 z-50 flex h-screen w-full max-w-[32rem] flex-col rounded-l-2xl bg-white px-6 py-4 shadow-2xl backdrop-blur-xl dark:bg-default-100/30",
            classNames?.main,
          )}
        >
          <header
            className={clsx(
              "mb-3 flex items-center justify-between",
              classNames?.header,
            )}
          >
            <aside>
              {title && (
                <h2 className={clsx("text-xl font-bold", classNames?.title)}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={clsx(
                    "text-sm dark:text-zinc-400",
                    classNames?.subtitle,
                  )}
                >
                  {subtitle}
                </p>
              )}
            </aside>
            <button type="button" onClick={onClose}>
              <Icon
                icon="ic:round-close"
                width={24}
                className="transition-all hover:scale-110"
              />
            </button>
          </header>
          <div
            className={clsx(
              "h-full overflow-auto scrollbar-hide",
              classNames?.content,
            )}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default Sheet;
