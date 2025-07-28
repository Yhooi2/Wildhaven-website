import { getCountries } from "@/app/_api/data-service";
import Image from "next/image";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-2">
        <label>Where do you from?</label>
        {flag && (
          <Image
            src={flag}
            alt="Country flag"
            className="h-5 rounded-sm"
            width={40}
            height={20}
          />
        )}
      </div>
      <select
        name={name}
        id={id}
        defaultValue={`${defaultCountry}%${flag}`}
        className={className}
      >
        <option value="">Select country...</option>
        {countries.map((c) => (
          <option key={c.name} value={`${c.name}%${c.flag}`}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SelectCountry };
