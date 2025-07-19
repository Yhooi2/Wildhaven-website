export default function Text({ children, className = "", ...props }) {
  return (
    <p className={`text-lg text-primary-200 ${className}`} {...props}>
      {children}
    </p>
  );
}
