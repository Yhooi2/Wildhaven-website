import { Container } from "@/app/_components/ui";
import DataSelector from "./DataSelector";
import ReservationForm from "./ReservationForm";

function Reservation() {
  return (
    <Container className="grid min-h-96 grid-cols-2 gap-5 ">
      <DataSelector />
      <ReservationForm />
    </Container>
  );
}

export default Reservation;
