import { auth } from "@/app/_api/auth";
import { LoginMessage } from "./LoginMessage";

export async function Protected({ children }) {
  const session = await auth();

  if (!session?.user) {
    return <LoginMessage />;
  }
  return children;
}
