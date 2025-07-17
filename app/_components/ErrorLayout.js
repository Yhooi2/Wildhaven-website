export default function ErrorLayout({ children }) {
  return (
    <main className="flex flex-col items-center justify-center gap-5 text-lg">
      {children}
    </main>
  );
}
