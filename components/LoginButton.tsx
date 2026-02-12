"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-700">Signed in as {session.user?.email}</p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="
        flex items-center justify-center gap-3
        px-6 py-3
        bg-white text-gray-800
        rounded-xl
        font-semibold
        shadow-lg
        hover:shadow-2xl
        hover:scale-105
        transition-all duration-300
        active:scale-95
      "
    >
      {/* Google Icon */}
      <svg
        className="w-5 h-5"
        viewBox="0 0 48 48"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.23 9.21 3.64l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 3.02-2.26 5.58-4.78 7.3l7.73 6c4.51-4.18 7.09-10.34 7.09-17.77z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
      </svg>

      Sign in with Google
    </button>
  );
}
