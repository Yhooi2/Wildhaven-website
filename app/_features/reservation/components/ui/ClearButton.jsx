export function ClearButton({ range, onClear }) {
  if (!range.from && !range.to) return null;

  return (
    <button
      className="border border-primary-800 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary-800 hover:text-accent-500"
      onClick={onClear}
    >
      Clear
    </button>
  );
}
