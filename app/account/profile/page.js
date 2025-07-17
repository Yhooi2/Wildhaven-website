import { SectionHeading, Text } from "../../_components/ui";

export const metadata = {
  title: "Update profile",
};

function page() {
  return (
    <div>
      <SectionHeading>Update your guest profile</SectionHeading>
      <Text className="mb-4">
        Provide the following details to update your profile
      </Text>
    </div>
  );
}

export default page;
