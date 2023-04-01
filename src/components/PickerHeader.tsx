import React from "react";
import Image from "next/image";

interface PickerHeaderProps {
  mainHeader: string;
  subHeader: string;
}

const PickerHeader: React.FC<PickerHeaderProps> = ({
  mainHeader,
  subHeader,
}) => {
  return (
    <div className="relative">
      <Image
        src="/images/black_box.png"
        alt="title box"
        width={400}
        height={300}
      />

      <h2 className="text-5xl uppercase mb-4 font-eras absolute top-12 text-black right-20 skew-y-6">
        {mainHeader}
      </h2>
      <h2 className="text-3xl font-eras absolute top-28 text-white right-6  ">
        {subHeader}
      </h2>
    </div>
  );
};

export default PickerHeader;
