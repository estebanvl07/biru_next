import { useRef, useState, useEffect } from "react";

export const useModalBottom = () => {
  const [showModal, setShowModal] = useState(false);
  const [contentRef, setContentRef] = useState<
    React.RefObject<HTMLDivElement> | undefined
  >();

  const onShowMenu = (ref: React.RefObject<HTMLDivElement>) => {
    setShowModal(true);
    setContentRef(ref);
  };

  const onHideModal = () => {
    setShowModal(false);
    if (!contentRef) return;
    const content = contentRef.current;
    content!.classList.add("destroyBar");
  };

  useEffect(() => {
    if (!contentRef) return;
    const content = contentRef.current;
    if (showModal) {
      content!.classList.remove("destroyBar");
      content!.classList.add("deployBar");
      return;
    }
  }, [showModal]);

  return {
    showModal,
    onShowMenu,
    onHideModal,
    contentRef,
  };
};
