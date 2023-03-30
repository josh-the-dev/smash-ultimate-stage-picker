import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div className="absolute bottom-0 right-0">
          <h3 className="font-eras text-sm text-white italic">
            Developed by Amrux
          </h3>
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
