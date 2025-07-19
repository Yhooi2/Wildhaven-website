export function ErrorHeading({ children, className = "", ...props }) {
  return (
    <h1 className={`text-4xl font-semibold ${className}`} {...props}>
      {children}
    </h1>
  );
}

export function SectionHeading({ children, className = "", ...props }) {
  return (
    <h2
      className={`mb-4 text-2xl font-semibold text-accent-400 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
