export const groupedAnimation = {
  container: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.18,
        staggerChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};

export const onlyFade = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 1,
  },
};

export const onlyScale = {
  initial: {
    scale: 0.7,
  },
  animate: {
    scale: 1,
  },
  transition: {
    duration: 0.4,
  },
};

export const accordionItemAnimate = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 1,
        },
        opacity: {
          easings: "ease",
          duration: 1,
        },
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      height: 0,
      transition: {
        height: {
          easings: "ease",
          duration: 0.25,
        },
        opacity: {
          easings: "ease",
          duration: 0.3,
        },
      },
    },
  },
};
