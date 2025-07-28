import { signInWithProvider } from "@/app/_features/auth/actions/auth-actions";
import Image from "next/image";

export function SigninButton({ provider, children }) {
  const providerName = provider.toLowerCase();
  return (
    <form action={signInWithProvider}>
      <button className="flex items-center gap-4 border border-primary-400 bg-inherit px-10 py-4 font-medium !text-primary-50">
        <Image
          src={`https://authjs.dev/img/providers/${providerName}.svg`}
          alt={provider}
          width={24}
          height={24}
        />
        {children} {provider}
      </button>
      <input type="hidden" name="providerName" value={providerName} />
    </form>
  );
}
