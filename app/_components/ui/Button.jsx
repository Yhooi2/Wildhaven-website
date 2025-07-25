export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-accent-500 px-5 py-3 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
