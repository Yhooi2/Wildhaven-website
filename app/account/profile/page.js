import { auth } from "@/app/_api/auth";
import { SectionHeading, Text } from "@/app/_components/ui";
import {
  SelectCountry,
  UpdateProfileForm,
} from "@/app/account/profile/_components";
import { getGuest } from "@/app/_api/data-service";

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
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          key={guest.nationality}
          defaultCountry={guest.nationality}
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:bg-gray-600 disabled:text-gray-400"
        />
      </UpdateProfileForm>
    </div>
  );
}

export default page;
