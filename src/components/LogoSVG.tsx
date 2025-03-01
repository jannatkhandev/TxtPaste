"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const { resolvedTheme } = useTheme();

  const src = resolvedTheme === "dark" 
    ? "/images/logo/svg/white.svg" 
    : "/images/logo/svg/black.svg";

  return (
    <div className={className}>
      <Image 
        alt="TxtPaste Logo" 
        src={src} 
        width={40} 
        height={40} 
        className="w-auto h-8 transition-opacity duration-300"
      />
    </div>
  );
};

export default Logo;