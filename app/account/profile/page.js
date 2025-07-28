import { auth } from "@/app/_api/auth";
import { SectionHeading, Spinner, Text } from "@/app/_components/ui";
import { getGuest } from "@/app/_api/data-service";
import { GuestProfileForm } from "@/app/_features/guest/components/GuestProfileForm";
import { Suspense } from "react";

export const metadata = {
  title: "Update profile",
};

async function page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);
  return (
    <div>
      <SectionHeading>Update your guest profile</SectionHeading>
      <Text className="mb-4">
        Provide the following details to update your profile
      </Text>
      <Suspense fallback={<Spinner />}>
        <GuestProfileForm guest={guest} />
      </Suspense>
    </div>
  );
}

export default page;
