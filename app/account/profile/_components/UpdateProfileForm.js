"use client";
import { Button } from "@/app/_components/ui";
import Input from "@/app/_components/ui/Input";
import { useState } from "react";

function UpdateProfileForm({ children }) {
  const [count, setCount] = useState("pt.jpg");
  // CHANGE
  const countryFlag = "pt.jpg";
  const nationality = "portugal";
  return (
    <form className=" flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
      <Input label="Full name" disabled={true} />
      <Input label="Email address" disabled={true} />
      <div className="space-y-2">
        <div className="flex justify-between gap-2">
          <label>Where do you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>
      <Input label="National ID number" />
      <div className="flex justify-end">
        <Button>Update profile</Button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
