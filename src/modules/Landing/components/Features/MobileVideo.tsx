import Image from "next/image";
import React from "react";
import { useResize } from "~/lib/hooks/useResize";

const MobileVideo = () => {
  const { isMobile } = useResize();

  return (
    <div className="absolute top-4 flex h-full w-[130px] flex-1 justify-end transition-all duration-300 group-hover:top-2 md:top-8 md:w-[220px] md:group-hover:top-0">
      <Image
        src={"/device.png"}
        alt="mobile device"
        className="absolute w-full"
        width={isMobile ? 140 : 220}
        height={400}
      />
      <div className="shadow-3xl absolute top-0 w-[130px] px-2 py-1.5 md:w-[220px] md:px-2.5 md:py-2 dark:shadow-black">
        <video
          className="w-full rounded-[0.8rem] md:rounded-[1.7rem]"
          autoPlay
          muted
          playsInline
          loop
          preload="none"
        >
          <source src="/biru-mobile.mp4" />
        </video>
      </div>
    </div>
  );
};

export default MobileVideo;
