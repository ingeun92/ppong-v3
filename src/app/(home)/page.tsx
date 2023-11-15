import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <Image
        src="/images/ppong.png"
        alt="ppong"
        width={512}
        height={512}
        className=""
      />
      <div className="my-16 text-7xl font-extrabold text-white">PPONG</div>
      <div className="flex w-full items-center justify-around text-lg font-extrabold">
        <p className="pt-5">Version: v3.0.0</p>
        <p className="pt-5">Copyright 2023. Ingeun Kim. All Rights Reserved.</p>
        <Image
          src="/images/sig-white.png"
          alt="sig"
          width={150}
          height={150}
          className=""
        />
      </div>
    </div>
  );
}
