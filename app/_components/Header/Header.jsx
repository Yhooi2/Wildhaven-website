import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

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
