import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans">
      <h1>Hello World</h1>
      <ul>
        <li>
          <Link
            href="/signup"
            className="text-blue-500 hover:underline ml-
2"
          >
            Go to Signup Page
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="text-blue-500 hover:underline ml-
2"
          >
            Go to Login Page
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className="text-blue-500 hover:underline ml-
2"
          >
            Go to Dashboard Page
          </Link>
        </li>
        <li>
          <Link
            href="/test"
            className="text-blue-500 hover:underline ml-
2"
          >
            Go to Test Page
          </Link>
        </li>
      </ul>
    </div>
  );
}
