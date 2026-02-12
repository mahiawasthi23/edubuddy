"use client";

type Props = {
  running: boolean;
  onStart: () => void;
  onStop: () => void;
};

export default function StartButton({
  running,
  onStart,
  onStop,
}: Props) {
  return (
    <button
      onClick={running ? onStop : onStart}
      className="
        w-12 h-12 sm:w-14 sm:h-14
        rounded-full
        flex items-center justify-center
        bg-gradient-to-br from-indigo-500 to-purple-600
        text-white text-xl sm:text-2xl
        shadow-lg
        transition-all duration-300
        hover:scale-110
        active:scale-95
        hover:shadow-purple-400/50
        m-1
      "
      title={running ? "Stop Listening" : "Start Speaking"}
    >
      {running ? "⏹️" : "🎙️"}
    </button>
  );
}
