import { Icon } from "@/app/_components/ui";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOutUser } from "../actions/auth-actions";

export function SignOutButton() {
  const styleBytton =
    "hover:bg-primary-900 hover:text-primary-100 py-3 px-5 transition-colors flex items-center gap-4  w-full";

  return (
    <form action={signOutUser}>
      <button className={styleBytton}>
        <Icon as={ArrowRightStartOnRectangleIcon} />
        Sign out
      </button>
    </form>
  );
}
