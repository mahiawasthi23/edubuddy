"use client";

type Props = {
  onSelect: (type: string) => void;
};

export default function StorySelector({ onSelect }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-4 px-2">

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-3 flex flex-wrap justify-center gap-3">

        {/* Math */}
        <button
          onClick={() => onSelect("math")}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 active:scale-95 transition"
        >
          🔢 Math
        </button>

        {/* Stories */}
        <button
          onClick={() => onSelect("story")}
          className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 active:scale-95 transition"
        >
          📖 Stories
        </button>

        {/* GK */}
        <button
          onClick={() => onSelect("gk")}
          className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 active:scale-95 transition"
        >
          🌍 GK
        </button>

        {/* Fun */}
        <button
          onClick={() => onSelect("fun")}
          className="px-4 py-2 rounded-xl bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 active:scale-95 transition"
        >
          🎮 Fun
        </button>

      </div>

    </div>
  );
}
