
import { useState } from "react";

export function Header({ title }: { title: string }) {
  return (
    <div className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
}
