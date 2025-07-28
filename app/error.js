"use client";

import { Layout, ErrorHeading, Text, Button } from "@/app/_components/ui";

export default function Error({ error, reset }) {
  return (
    <Layout as="main">
      <ErrorHeading>Something went wrong</ErrorHeading>
      <Text>{error.message}</Text>
      <Button onClick={() => reset()}>Try again</Button>
    </Layout>
  );
}
