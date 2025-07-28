"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui";

export function BackButton({ children }) {
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
