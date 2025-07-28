import { auth } from "@/app/_api/auth";
import { LoginMessage } from "@/app/_features/auth/components/LoginMessage";

export async function Protected({ children }) {
  const session = await auth();

  if (!session?.user) {
    return <LoginMessage />;
  }
  return children;
}
