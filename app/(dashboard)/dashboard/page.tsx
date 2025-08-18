// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login"); // ✅ not logged in, bounce them
  }

  return (
    <div>
      Server-side Dashboard Page
      <h1>Welcome {session.user.email}</h1>
    </div>
  );
}
