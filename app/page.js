import bg from "@/public/bg.png";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Image
        src={bg}
        fill
        placeholder="blur"
        className="object-cover object-top"
        alt="Montains and forests whith two cabins"
      />
      <div className="relative z-10 mt-24 text-center">
        <h1 className="mb-10 text-7xl font-normal tracking-tight text-primary-50">
          Welcome to paradise
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-lg text-primary-800"
        >
          Explore luxery cabins
        </Link>
      </div>
    </>
  );
}
