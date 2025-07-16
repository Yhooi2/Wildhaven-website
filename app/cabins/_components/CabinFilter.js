import FilterButton from "./FilterButton";

function CabinFilter({ filter }) {
  return (
    <div className="mb-8 flex justify-end border border-primary-800">
      <FilterButton capacity="all" active={filter}>
        All cabins
      </FilterButton>
      <FilterButton capacity="3" active={filter}>
        1&ndash;3 guests
      </FilterButton>
      <FilterButton capacity="6" active={filter}>
        4&ndash;6 guests
      </FilterButton>
      <FilterButton capacity="12" active={filter}>
        7&ndash;12 guests
      </FilterButton>
    </div>
  );
}

export default CabinFilter;
