"use client";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <nav>
      Client-side Dashboard Page
      {session?.user ? (
        <span>Hello {session.user.email}</span>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
