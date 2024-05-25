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
