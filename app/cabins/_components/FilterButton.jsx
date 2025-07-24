"use client";

import { useRouter } from "next/navigation";

export function FilterButton({ children, capacity, active }) {
  const router = useRouter();
  const isActive = capacity === active;

  const handleClick = () => {
    router.push(`/cabins?capacity=${capacity}`, { scroll: false });
  };
  return (
    <button
      disabled={isActive}
      className={`px-5 py-2 hover:bg-primary-700 ${
        isActive && "bg-primary-700 text-primary-100"
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
