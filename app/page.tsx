"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import EduBuddy from "@/components/EduBuddy";
import VoiceEngine from "@/components/VoiceEngine";
import TalkingCharacter from "@/components/TalkingCharacter";
import LoginButton from "@/components/LoginButton";

import { getAIReply } from "@/lib/ai";
import { addMessage, getHistory, clearHistory } from "@/lib/memory";

import { speak, disableSpeak, enableSpeak } from "@/components/Speaker";

// ================= TYPES =================
type ChatMsg = {
  role: "user" | "assistant";
  text: string;
};

export default function Home() {
  const { data: session, status } = useSession();

  // ================= STATES =================
  const [running, setRunning] = useState(false);

  const [reply, setReply] = useState(
    "Hi! I’m EduBuddy, your learning buddy. How can I help you today? 😊"
  );

  const [sessionId, setSessionId] = useState(0);

  const [showChat, setShowChat] = useState(false);

  const [chatList, setChatList] = useState<ChatMsg[]>([]);

  const [speaking, setSpeaking] = useState(false);

  // Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Image fallback
  const [imgError, setImgError] = useState(false);

  // ================= REFS =================
  const busyRef = useRef(false);
  const warmRef = useRef(false);

  // ================= RESET IMAGE ERROR =================
  useEffect(() => {
    setImgError(false);
  }, [session?.user?.image]);

  // ================= CLOSE DROPDOWN =================
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  // ================= HANDLE USER =================
  async function handleUser(text: string) {
    if (!text || !running || busyRef.current) return;

    busyRef.current = true;

    addMessage("user", text);

    setChatList((p) => [...p, { role: "user", text }]);

    try {
      setRunning(false);

      const res = await getAIReply(text, getHistory());

      if (!res) throw new Error("Empty AI");

      addMessage("assistant", res);

      setChatList((p) => [...p, { role: "assistant", text: res }]);

      setSpeaking(true);

      const sentences = res.split(/(?<=[.!?])\s+/);

      for (const s of sentences) {
        await new Promise<void>((r) => speak(s, r));
      }

      setSpeaking(false);
      setReply(res);
    } catch (err) {
      console.error(err);
      setReply("⚠️ Network problem");
      setSpeaking(false);
    } finally {
      busyRef.current = false;
      setRunning(true);
    }
  }

  // ================= START =================
  function handleStart() {
    setRunning(false);

    setSessionId((v) => v + 1);

    busyRef.current = false;

    clearHistory();
    setChatList([]);

    disableSpeak();
    enableSpeak();

    const intro =
      "Hi! I’m EduBuddy, your learning buddy. How can I help you today? 😊";

    setReply(intro);

    if (!warmRef.current) {
      warmRef.current = true;
      getAIReply("hello", []).catch(() => {});
    }

    setTimeout(() => {
      setSpeaking(true);

      speak(intro, () => {
        setSpeaking(false);
        setRunning(true);
      });
    }, 300);
  }

  // ================= STOP =================
  function handleStop() {
    setRunning(false);

    disableSpeak();

    busyRef.current = false;
    warmRef.current = false;

    setSpeaking(false);

    setSessionId((v) => v + 1);
  }

  // ================= LOAD HISTORY =================
  useEffect(() => {
    const history = getHistory();

    if (history?.length) {
      setChatList(
        history.map((m: any) => ({
          role: m.role,
          text: m.content,
        }))
      );
    }
  }, []);

  // ================= AUTH =================
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center space-y-6">

          <h1 className="text-4xl font-bold text-white">
            📝 EduBuddy
          </h1>

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      {/* HEADER */}
      <header className="sticky top-0 z-50 flex justify-between items-center py-4 px-6 text-white bg-white/10 backdrop-blur-md shadow">



<h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-wide 
drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)]
animate-bounce">
  📝EᵈUᵇᵘᴰᵈʸ
</h1>






        {/* PROFILE */}
        <div ref={dropdownRef} className="relative">

          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow"
          >
            {session.user?.image && !imgError ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-500 text-white font-bold">
                {session.user?.name?.charAt(0) || "U"}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl p-4">

              <p className="font-semibold text-gray-500 truncate">
                {session.user?.name}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {session.user?.email}
              </p>

              <hr className="my-3" />

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </header>

      {/* BODY */}
      <div className="flex max-w-6xl mx-auto mt-6 px-4 gap-5">



        <aside
          className={`transition-all duration-300 ${
             showChat ? "w-72" : "w-12"
           } bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden`}
         >


          <button
            onClick={() => setShowChat(!showChat)}
            className="w-full py-2 bg-black/30 text-white"
          >
            💬 Chat
          </button>

          {showChat && (
            <div className="p-3 h-[480px] overflow-y-auto space-y-2">

              {chatList.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm ${
                    m.role === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-white/80 text-gray-800"
                  } max-w-[85%]`}
                >
                  {m.text}
                </div>
              ))}

              {!chatList.length && (
                <p className="text-center text-white/70 text-sm">
                  No chats yet
                </p>
              )}

            </div>
          )}

        </aside>

         <section className="flex-1">

        <div className="bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl p-6 space-y-6">

          <TalkingCharacter speaking={speaking} />

          {/* ✅ START BUTTON SHIFTED HERE */}
          <EduBuddy
            text={reply}
            running={running}
            onStart={handleStart}
            onStop={handleStop}
          />

          <VoiceEngine
            key={sessionId}
            active={running}
            onText={handleUser}
          />

        </div>
      </section>
      </div>

    </main>
  );
}
