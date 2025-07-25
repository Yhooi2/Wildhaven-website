"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "../_features/auth/components";
import { Icon } from "../_components/ui";

const styles = {
  nav: "border-r border-primary-900",
  ul: "flex flex-col gap-4 text-lg h-full font-semibold text-primary-200",
  link: "hover:bg-primary-900 hover:text-primary-100 py-3 px-5 transition-colors flex items-center gap-4",
};

const navItems = [
  {
    name: "Profile",
    href: "/account",
    icon: HomeIcon,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: CalendarDaysIcon,
  },
  {
    name: "Update Profile",
    href: "/account/profile",
    icon: UserIcon,
  },
];
function SideMenu() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={
                styles.link + (isActive(item.href) ? " bg-primary-900" : "")
              }
            >
              <span>{<Icon as={item.icon} />}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
        {
          <li className="mt-auto ">
            <SignOutButton />
          </li>
        }
      </ul>
    </nav>
  );
}

export default SideMenu;
