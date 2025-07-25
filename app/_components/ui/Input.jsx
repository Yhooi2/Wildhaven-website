export function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label>{label}</label>
      <input
        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        {...props}
      />
    </div>
  );
}
