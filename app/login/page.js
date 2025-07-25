import { Suspense } from "react";
import { Spinner } from "../_components/ui";
import { AuthProviders } from "../_features/auth/components/";

export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export const experimental_ppr = true;

async function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-2xl font-semibold">
        Sign in to access your guest area
      </h2>
      <div className="flex flex-col gap-2">
        <Suspense fallback={<Spinner />}>
          <AuthProviders />
        </Suspense>
      </div>
    </div>
  );
}

export default LoginPage;
