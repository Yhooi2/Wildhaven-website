import { SectionHeading, Text } from "../../_components/ui";
import { SelectCountry, UpdateProfileForm } from "./_components";

export const metadata = {
  title: "Update profile",
};

async function page() {
  const nationality = "portugal";
  return (
    <div>
      <SectionHeading>Update your guest profile</SectionHeading>
      <Text className="mb-4">
        Provide the following details to update your profile
      </Text>
      <UpdateProfileForm>
        <SelectCountry
          defaultCountry={nationality}
          name="country"
          id="country"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:bg-gray-600 disabled:text-gray-400"
        />
      </UpdateProfileForm>
    </div>
  );
}

export default page;
