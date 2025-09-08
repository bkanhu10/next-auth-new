"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("Session data:", session);
  console.log("Session status:", status);

  if(!session) router.push('/login?callbackUrl=/test');
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
