import React from "react";
import clsx from "clsx";
import { useResize } from "~/lib/hooks/useResize";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Tab, Tabs } from "@nextui-org/tabs";

interface TabContentProps {
  children?: React.ReactNode;
  icon?: string;
  title: string;
}

type classNamesProps = {
  header: string;
};

interface DetailViewProps {
  topContent?: React.ReactNode;
  classNames?: classNamesProps;
  defaultKey?: string;
  tabs?: TabContentProps[];
}

const DetailView = ({
  topContent,
  defaultKey,
  classNames,
  tabs,
}: DetailViewProps) => {
  const { isMobile } = useResize();
  const classProps = classNames;

  return (
    <>
      {topContent && (
        <div className={clsx("mx-2 mb-0 pb-4", classProps?.header)}>
          {topContent}
        </div>
      )}
      <Tabs
        color="primary"
        defaultSelectedKey={defaultKey}
        aria-label="Forms transaction tabs"
        radius="full"
        variant={isMobile ? "underlined" : undefined}
        className={isMobile ? "w-full" : "w-fit"}
        classNames={
          isMobile
            ? {
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-primary dark:bg-slate-200",
                tab: "w-full px-0 h-12",
                tabContent:
                  "group-data-[selected=true]:text-primary group-data-[selected=true]:dark:text-slate-300",
              }
            : undefined
        }
      >
        {tabs?.map(({ children, title, icon }) => {
          return (
            <Tab
              key={title}
              className="w-full px-2 py-4"
              title={
                <div className="flex items-center space-x-2 px-2">
                  {icon && <Icon icon={icon} width={20} />}
                  <span>{title}</span>
                </div>
              }
            >
              {children}
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};

export default DetailView;
