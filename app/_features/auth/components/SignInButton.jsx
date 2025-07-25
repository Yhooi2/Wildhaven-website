import { signInWithProvider } from "../actions/auth-actions";
import Image from "next/image";

export function SigninButton({ children, providerName }) {
  return (
    <form action={signInWithProvider}>
      <button className="flex items-center gap-4 border border-primary-400 bg-inherit px-10 py-4 font-medium !text-primary-50">
        <Image
          src={`https://authjs.dev/img/providers/${providerName.toLowerCase()}.svg`}
          alt={providerName}
          width={24}
          height={24}
        />
        {children}
      </button>
      <input type="hidden" name="providerName" value={providerName} />
    </form>
  );
}
