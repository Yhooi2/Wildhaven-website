import Link from "next/link";

function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li className="transition-colors hover:text-accent-400">
          <Link href="/cabins ">Cabins</Link>
        </li>

        <li className="transition-colors hover:text-accent-400">
          <Link href="/about ">About</Link>
        </li>
        <li className="transition-colors hover:text-accent-400">
          <Link href="/account ">Guest area</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
