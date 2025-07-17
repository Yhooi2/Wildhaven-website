export default function Icon({ children, className = "", as, ...props }) {
  if (as) {
    const Component = as;
    return (
      <Component className={`size-5 text-primary-600 ${className}`} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <div className={`size-5 text-primary-600 ${className}`} {...props}>
      {children}
    </div>
  );
}
