import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Dashboard Layout</h1>

      <ul>
        <li>
          <Link
            href="/test"
            className="text-blue-500 hover:underline ml-
2"
          >
            Go to Test Page
          </Link>
        </li>
        <li>
          {" "}
          <Link href="/dashboard" className="text-blue-500 hover:underline">
            Go to Dashboard
          </Link>
        </li>
      </ul>

      {children}
    </div>
  );
}
