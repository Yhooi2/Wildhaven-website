export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-accent-600 px-6 py-3 text-primary-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
