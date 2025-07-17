export default function Container({ children, className = "", ...props }) {
  return (
    <div className={`border border-primary-800 ${className}`} {...props}>
      {children}
    </div>
  );
}
