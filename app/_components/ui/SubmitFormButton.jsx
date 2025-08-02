"use client";
import { Button } from "@/app/_components/ui";
import { useFormStatus } from "react-dom";

export function SubmitFormButton({ children, pendingLabel, ...props }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end">
      <Button disabled={pending} {...props}>
        {pending ? pendingLabel : children}
      </Button>
    </div>
  );
}
