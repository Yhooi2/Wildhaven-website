import { SelectCountry } from "@/app/_features/guest/components/SelectCountry";
import { UpdateProfileForm } from "@/app/_features/guest/components/UpdateProfileForm";

export function GuestProfileForm({ guest }) {
  return (
    <UpdateProfileForm guest={guest}>
      <SelectCountry
        key={guest.nationality}
        defaultCountry={guest.nationality}
        name="nationality"
        id="nationality"
        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:bg-gray-600 disabled:text-gray-400"
      />
    </UpdateProfileForm>
  );
}
