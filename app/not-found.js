import BackButton from "./_components/BackButton";
import { Layout, ErrorHeading, Text } from "./_components/ui";

function NotFound() {
  return (
    <Layout as="main">
      <ErrorHeading>Page not found</ErrorHeading>
      <Text>The page you are looking for does not exist.</Text>
      <BackButton>Back</BackButton>
    </Layout>
  );
}

export default NotFound;
