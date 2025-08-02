import { BackButton } from "@/app/_components";
import { Layout, ErrorHeading, Text } from "@/app/_components/ui";

function NotFound() {
  return (
    <Layout as="main">
      <ErrorHeading>Reservation not found</ErrorHeading>
      <Text>The reservation you are looking for does not exist.</Text>
      <BackButton>Back to all your reservations</BackButton>
    </Layout>
  );
}

export default NotFound;
