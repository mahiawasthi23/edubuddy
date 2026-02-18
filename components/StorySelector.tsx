// "use client";

// type Props = {
//   onSelect: (type: string) => void;
// };

// export default function StorySelector({ onSelect }: Props) {
//   return (
//     <div className="w-full max-w-3xl mx-auto mb-4 px-2">

//       <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-3 flex flex-wrap justify-center gap-3">

//         {/* Math */}
//         <button
//           onClick={() => onSelect("math")}
//           className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 active:scale-95 transition"
//         >
//           🔢 Math
//         </button>

//         {/* Stories */}
//         <button
//           onClick={() => onSelect("story")}
//           className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 active:scale-95 transition"
//         >
//           📖 Stories
//         </button>

//         {/* GK */}
//         <button
//           onClick={() => onSelect("gk")}
//           className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 active:scale-95 transition"
//         >
//           🌍 GK
//         </button>

//         {/* Fun */}
//         <button
//           onClick={() => onSelect("fun")}
//           className="px-4 py-2 rounded-xl bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 active:scale-95 transition"
//         >
//           🎮 Fun
//         </button>

//       </div>

//     </div>
//   );
// }


"use client";

import { useState } from "react";

type Props = {
  onSelect: (type: string) => void;
};

export default function StorySelector({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(type: string) {
    setSelected(type);
    onSelect(type);
  }

  const btnBase =
    "relative px-4 sm:px-5 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 active:scale-95";

  return (
    <div className="w-full max-w-4xl mx-auto mb-5 px-2">

      {/* Title */}
      <p className="text-center text-white font-semibold mb-2 text-sm sm:text-base animate-pulse">
        ✨ Choose Your Learning Mode ✨
      </p>

      <div className="bg-white/25 backdrop-blur-xl rounded-2xl shadow-xl p-4 flex flex-wrap justify-center gap-4">

        {/* ================= MATH ================= */}
        <button
          onClick={() => handleSelect("math")}
          className={`${btnBase}
            bg-blue-500 text-white
            hover:bg-blue-600
            ${
              selected === "math"
                ? "ring-4 ring-blue-300 scale-110 shadow-2xl"
                : "shadow-md"
            }
          `}
        >
          🔢 Math

          {selected === "math" && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full shadow animate-bounce">
              ✓
            </span>
          )}
        </button>

        {/* ================= STORIES ================= */}
        <button
          onClick={() => handleSelect("story")}
          className={`${btnBase}
            bg-purple-500 text-white
            hover:bg-purple-600
            ${
              selected === "story"
                ? "ring-4 ring-purple-300 scale-110 shadow-2xl"
                : "shadow-md"
            }
          `}
        >
          📖 Stories

          {selected === "story" && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-purple-600 px-2 py-0.5 rounded-full shadow animate-bounce">
              ✓
            </span>
          )}
        </button>

        {/* ================= GK ================= */}
        <button
          onClick={() => handleSelect("gk")}
          className={`${btnBase}
            bg-green-500 text-white
            hover:bg-green-600
            ${
              selected === "gk"
                ? "ring-4 ring-green-300 scale-110 shadow-2xl"
                : "shadow-md"
            }
          `}
        >
          🌍 GK

          {selected === "gk" && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-green-600 px-2 py-0.5 rounded-full shadow animate-bounce">
              ✓
            </span>
          )}
        </button>

        {/* ================= FUN ================= */}
        <button
          onClick={() => handleSelect("fun")}
          className={`${btnBase}
            bg-pink-500 text-white
            hover:bg-pink-600
            ${
              selected === "fun"
                ? "ring-4 ring-pink-300 scale-110 shadow-2xl"
                : "shadow-md"
            }
          `}
        >
          🎮 Fun

          {selected === "fun" && (
            <span className="absolute -top-2 -right-2 text-xs bg-white text-pink-600 px-2 py-0.5 rounded-full shadow animate-bounce">
              ✓
            </span>
          )}
        </button>

      </div>

      {/* Selected Info */}
      {selected && (
        <p className="text-center mt-3 text-white text-sm sm:text-base font-medium animate-fade-in">
          🎉 You selected:{" "}
          <span className="capitalize font-bold text-yellow-300">
            {selected}
          </span>{" "}
          mode!
        </p>
      )}
    </div>
  );
}
