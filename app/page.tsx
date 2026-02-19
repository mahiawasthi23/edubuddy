"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginButton from "@/components/LoginButton";
import Image from "next/image";
import AnimatedBackground from "@/components/AnimatedBackground";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/welcome");
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-500 px-4">
        <AnimatedBackground/>
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">📝 EduBuddy</h1>

          <p className="text-white/80 text-sm">
            Your personal AI learning companion
          </p>

          <div className="text-6xl animate-bounce">
            <Image
              src="/edubuddy_front.png"
              alt="EduBuddy"
              width={120}
              height={120}
              className="rounded-full object-cover mx-auto"
            />
          </div>

          <p className="text-white text-lg font-medium">
            Login to start learning smarter 🚀
          </p>

          <div className="pt-3 flex justify-center">
            <LoginButton />
          </div>
        </div>
      </div>
    );
}
