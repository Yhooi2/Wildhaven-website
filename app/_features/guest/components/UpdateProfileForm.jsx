import { Input } from "@/app/_components/ui";
import { updateProfile } from "@/app/_features/guest/actions";
import { SubmitFormButton } from "@/app/_components/ui/SubmitFormButton";

export function UpdateProfileForm({ children, guest }) {
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
      <SubmitFormButton
        pendingLabel={
          <div className="flex items-center justify-center gap-4">
            <div className="size-4 animate-spin rounded-full border-y-2 border-primary-300"></div>
            <span>Updating...</span>
          </div>
        }
      >
        Update profile
      </SubmitFormButton>
    </form>
  );
}
