import { auth } from "@/app/_api/auth";
import Image from "next/image";
import { transliterate as tr } from "transliteration";

export async function AuthHeader({ withName = false }) {
  const session = await auth();
  if (!session) {
    return null;
  }

  const user = session?.user;
  const name = tr(user?.name);
  return (
    <div className="flex items-center gap-4 ">
      <Image
        src={user?.image}
        alt={user?.name}
        width={32}
        height={32}
        className="rounded-full"
      />
      {withName && <p>{name}</p>}
    </div>
  );
}
