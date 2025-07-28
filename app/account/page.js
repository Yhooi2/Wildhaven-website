import { auth } from "@/app/_api/auth";
import { SectionHeading } from "@/app/_components/ui";
import { transliterate as tr } from "transliteration";

export const metadata = {
  title: "Welcome",
};

async function Page() {
  const session = await auth();
  const guest = session?.user?.name || "guest";
  const arr = guest.split(" ");
  const name = tr(arr[0]);

  return <SectionHeading className="mb-7">Welcome, {name}</SectionHeading>;
}

export default Page;
