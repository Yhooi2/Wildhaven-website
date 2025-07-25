export function Layout({ children, className = "", as = "div", ...props }) {
  const Component = as;
  return (
    <Component
      className={`flex flex-col items-center justify-center gap-5 text-lg ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
