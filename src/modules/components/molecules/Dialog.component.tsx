import React from "react";

import CustomDrawer from "./CustomDrawer";
import Sheet from "./Sheet";

import { useResize } from "~/lib/hooks/useResize";
import type { DialogProps } from "~/types/component/dialog";

const Dialog = (props: DialogProps) => {
  const { isMobile } = useResize();
  return isMobile ? <CustomDrawer {...props} /> : <Sheet {...props} />;
};

export default Dialog;
