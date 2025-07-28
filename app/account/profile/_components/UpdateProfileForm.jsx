"use client";
import { Button, Input } from "@/app/_components/ui";
import { updateProfile } from "../actions";
import { useFormStatus } from "react-dom";

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationalID } = guest;

  return (
    <form
      action={updateProfile}
      className=" flex max-w-2xl flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <Input
        label="Full name"
        disabled={true}
        defaultValue={fullName}
        name="fullName"
      />
      <Input
        label="Email address"
        disabled={true}
        defaultValue={email}
        name="email"
      />
      {children}
      <Input
        label="National ID number"
        defaultValue={nationalID}
        name="nationalID"
      />
      <FormButton />
    </form>
  );
}

export { UpdateProfileForm };

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-end">
      <Button disabled={pending}>
        {pending ? "Updating..." : "Update profile"}
      </Button>
    </div>
  );
}
