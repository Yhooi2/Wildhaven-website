import { Suspense } from "react";
import Link from "next/link";
import { AuthHeader } from "@/app/_features/auth/components";

export const experimental_ppr = true;

const styleLi = "transition-colors hover:text-accent-400";

function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-3 md:gap-16">
        <li className={styleLi}>
          <Link href="/cabins ">Cabins</Link>
        </li>

        <li className={styleLi}>
          <Link href="/about ">About</Link>
        </li>
        <li className={styleLi}>
          <Suspense>
            <Link
              href="/account"
              className={styleLi + " flex items-center justify-center gap-4"}
            >
              <AuthHeader />
            </Link>
          </Suspense>
        </li>
      </ul>
    </nav>
  );
}

export { Navigation };
