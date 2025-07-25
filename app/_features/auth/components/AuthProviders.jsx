import { authConfig } from "@/app/_api/auth";
import { SigninButton } from "./";

export async function AuthProviders() {
  const providers = authConfig.providers;
  return (
    <ul className="flex flex-col items-center gap-6">
      {providers.map((provider) => (
        <li
          key={provider.id}
          className="transition-colors hover:bg-primary-600 "
        >
          <SigninButton providerId={provider.id} providerName={provider.name}>
            Continue with {provider.name}
          </SigninButton>
        </li>
      ))}
    </ul>
  );
}
