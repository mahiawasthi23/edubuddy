"use client";

import Image from "next/image";

type Props = {
  speaking: boolean;
};

export default function TalkingCharacter({ speaking }: Props) {
  return (
    <div className="relative w-40 h-40 mx-auto select-none">

      <div
        className={`
          absolute inset-0 rounded-full blur-xl opacity-60
          transition-all duration-300
          ${
            speaking
              ? "bg-green-400 scale-110"
              : "bg-pink-300 scale-100"
          }
        `}
      />

      {/* VIDEO (always loaded, just hidden/shown) */}
      <video
        src="/video/bholenathf.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`
          absolute inset-0 z-10 w-60 h-60
          transition-opacity duration-150
          ${speaking ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* IMAGE */}
      <Image
        src="/edubuddy_Close.png"
        alt="EduBuddy"
        width={200}
        height={200}
        priority
        className={`
          relative z-10
          transition-opacity duration-150
          ${speaking ? "opacity-0" : "opacity-100"}
        `}
      />
      
    </div>
  );
}

