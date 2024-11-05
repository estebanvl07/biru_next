import Image from "next/image";
import React from "react";
import { useResize } from "~/lib/hooks/useResize";

const MobileVideo = () => {
  const { isMobile } = useResize();

  return (
    <div className="absolute top-4 flex h-full w-[140px] flex-1 justify-end md:top-0 md:w-[220px]">
      <Image
        src={"/device.png"}
        alt="mobile device"
        className="absolute w-full"
        width={isMobile ? 140 : 220}
        height={400}
      />
      <div className="absolute top-0 w-[140px] px-2 py-1.5 shadow-2xl md:w-[220px] md:px-3 md:py-2.5 dark:shadow-black">
        <video
          className="w-full rounded-2xl md:rounded-[1.5rem]"
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
