"use client";

import { useState } from "react";

export function TextExpander({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <span>
      {expanded ? children : children.split(" ").slice(0, 40).join(" ") + "..."}{" "}
      <button
        className="border-b border-primary-600 pb-1 leading-3 text-primary-600"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}
