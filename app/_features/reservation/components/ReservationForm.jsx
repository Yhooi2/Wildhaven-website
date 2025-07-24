import { Button } from "@/app/_components/ui";
import { GuestSelector } from "./";
import { AuthHeader } from "@/app/_features/auth";
async function ReservationForm({ maxCapacity }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 bg-primary-800 px-16 py-3 text-primary-300">
        <p>Logged in as</p>
        <AuthHeader withName={true} />
      </div>

      <form className="flex flex-col justify-between gap-5 bg-primary-900 px-16 py-10">
        <GuestSelector maxCapacity={maxCapacity} />
        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">Start by selecting dates</p>
          <Button>Reserve now</Button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
