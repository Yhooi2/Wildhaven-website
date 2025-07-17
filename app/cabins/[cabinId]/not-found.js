import BackButton from "../../_components/BackButton";
import { Layout, ErrorHeading, Text } from "../../_components/ui";

function NotFound() {
  return (
    <Layout as="main">
      <ErrorHeading>Cabin not found</ErrorHeading>
      <Text>The cabin you are looking for does not exist.</Text>
      <BackButton>Back to all cabins</BackButton>
    </Layout>
  );
}

export default NotFound;
