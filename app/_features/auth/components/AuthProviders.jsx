import { SigninButton } from "./SignInButton";

export function AuthProviders() {
  const providers = ["Google", "Yandex"];

  return (
    <ul className="flex flex-col items-center gap-6">
      {providers.map((provider) => (
        <li key={provider} className="transition-colors hover:bg-primary-600 ">
          <SigninButton provider={provider}> Continue with </SigninButton>
        </li>
      ))}
    </ul>
  );
}
