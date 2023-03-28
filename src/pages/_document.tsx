import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gradient-to-br from-birthday-brawl-orange-100 to-birthday-brawl-orange-200 text-white h-screen">
        <Main />
        <div className="absolute bottom-0 right-0">
          <Image
            src={"/images/logos/birthday-brawl-text.png"}
            height={150}
            width={150}
            alt="logo"
          />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
