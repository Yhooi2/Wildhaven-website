import FilterButton from "./FilterButton";

function CabinFilter({ filter }) {
  return (
    <div className="mb-8 flex justify-end border border-primary-800">
      <FilterButton capacity="all" active={filter}>
        All cabins
      </FilterButton>
      <FilterButton capacity="small" active={filter}>
        Small (1&ndash;3 guests)
      </FilterButton>
      <FilterButton capacity="medium" active={filter}>
        Medium (4&ndash;6 guests)
      </FilterButton>
      <FilterButton capacity="large" active={filter}>
        Large (7&ndash;12 guests)
      </FilterButton>
    </div>
  );
}

export default CabinFilter;
