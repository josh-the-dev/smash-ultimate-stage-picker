import React from "react";
import Image from "next/image";

export interface StageProps {
  stageName: string;
  img: string;
  onClick?: (stageName: string) => void;
  isBanned?: boolean;
  width: number;
  height: number;
  showLabel?: boolean;
  readonly?: boolean;
}

const Stage: React.FC<StageProps> = ({
  stageName,
  img,
  onClick,
  showLabel = true,
  isBanned = false,
  readonly = false,
  width,
  height,
}) => {
  const handleClick = (stageName: string) => {
    if (onClick) {
      onClick(stageName);
    }
  };
  return (
    <div
      className={`${
        readonly ? null : "hover:cursor-pointer hover:opacity-10 w-full h-full"
      }  w-fit ${isBanned ? "opacity-10" : null}`}
      onClick={() => handleClick(stageName)}
    >
      <div className="w-full h-full relative">
        <div className="bg-black h-full w-full -rotate-2 absolute z-0 -translate-y-4 -translate-x-0.5" />
        {showLabel && (
          <p className="text-white  font-eras  text-xs absolute -translate-y-4 z-20">
            {stageName}
          </p>
        )}
        <Image
          alt={stageName}
          src={img}
          width={width}
          height={height}
          className="z-10 relative"
        />
        <div className="bg-white h-full w-full -rotate-2 absolute z-0 -translate-y-16 translate-x-2 " />
      </div>
    </div>
  );
};

export default Stage;
