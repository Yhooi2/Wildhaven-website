import { auth } from "@/app/_api/auth";
import { getGuest } from "@/app/_api/data-service";

export async function validateGuest() {
  const session = await auth();
  if (!session || !session.user) throw new Error("You must be logged in");
  const guest = await getGuest(session.user.email);
  if (!guest) throw new Error("You must be a guest to create a booking");
  if (guest.id !== session.user.id)
    throw new Error("You must be the owner of the guest to create a booking");
  return guest.id;
}
