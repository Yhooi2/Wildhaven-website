"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui";

export default function BackButton({ children }) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="transition-colors hover:bg-accent-700"
    >
      {children}
    </Button>
  );
}
