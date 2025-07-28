import { Logo } from "@/app/_components/Header/Logo";
import { Navigation } from "@/app/_components/Header/Navigation";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="mx-auto  flex max-w-7xl items-center justify-between gap-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export { Header };
