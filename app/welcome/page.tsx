"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TalkingCharacter from "@/components/TalkingCharacter";
import { speak } from "@/components/Speaker";
import AnimatedBackground from "@/components/AnimatedBackground";


export default function WelcomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [speaking, setSpeaking] = useState(false);

  const userName = session?.user?.name?.split(" ")[0] || "Friend";

  useEffect(() => {
    const welcomeMsg = `Welcome ${userName}! I am EduBuddy, your learning buddy. What do you want to learn today? You can choose Math, Story, GK, English, Fun, or Everything.`;

    setSpeaking(true);

    speak(welcomeMsg, () => {
      setSpeaking(false);
    });
  }, [userName]);

  function goToLearning(mode: string) {
    router.push(`/learning?mode=${mode}`);
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-500 flex flex-col items-center justify-center text-white p-6 space-y-8 overflow-hidden">
      <AnimatedBackground/>
      <div className="relative z-10 flex flex-col items-center space-y-8">

      <TalkingCharacter speaking={speaking} />

      <h1 className="text-3xl font-bold text-center pt-10">
        Welcome {userName} 💙
      </h1>

      <div className="grid grid-cols-2 gap-4 max-w-md w-full">

        <button onClick={() => goToLearning("math")} className="bg-white/20 p-4 rounded-xl hover:bg-white/30">
          🔢 Math
        </button>

        <button onClick={() => goToLearning("story")} className="bg-white/20 p-4 rounded-xl hover:bg-white/30">
          📖 Story
        </button>

        <button onClick={() => goToLearning("gk")} className="bg-white/20 p-4 rounded-xl hover:bg-white/30">
          🌍 GK
        </button>

        <button onClick={() => goToLearning("english")} className="bg-white/20 p-4 rounded-xl hover:bg-white/30">
          🗣️ English
        </button>

        <button onClick={() => goToLearning("fun")} className="bg-white/20 p-4 rounded-xl hover:bg-white/30">
          🎮 Fun
        </button>

        <button onClick={() => goToLearning("general")} className="bg-white/20 p-4 rounded-xl hover:bg-white/30">
          🌈 Everything
        </button>

      </div>
      </div>
    </main>
  );
}
