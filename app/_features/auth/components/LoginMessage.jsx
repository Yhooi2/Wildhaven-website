import Link from "next/link";
import { Text } from "@/app/_components/ui/";

function LoginMessage() {
  return (
    <div className="grid place-items-center bg-primary-800">
      <Text className="text-2xl font-semibold">
        Please{" "}
        <Link href="/api/auth/signin" className="text-accent-400 underline">
          Login
        </Link>{" "}
        to reserve this cabin right now
      </Text>
    </div>
  );
}

export { LoginMessage };
