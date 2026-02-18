let enabled = true;

export function enableSpeak() {
  enabled = true;
}

export function disableSpeak() {
  enabled = false;
  speechSynthesis.cancel();
}

export function speak(text: string, onEnd?: () => void) {

  if (!enabled) {
    console.warn("🔇 Speak disabled");
    return;
  }

  // ✅ Remove extra spaces & long pauses
  const cleanText = text
    .replace(/[\r\n]+/g, " ")
    .replace(/[.!?]/g, "")
    .replace(/[,;:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(cleanText);

  // ✅ Language detect
  if (/[ऀ-ॿ]/.test(cleanText)) u.lang = "hi-IN";
  else u.lang = "en-IN";

  // ✅ Slightly faster = less pause
  u.rate = 1.15;
  u.pitch = 1.1;

  // ✅ Prevent silent delay
  u.volume = 1;

  u.onend = () => {
    if (enabled && onEnd) {
      onEnd();
    }
  };

  // ✅ Start immediately
  speechSynthesis.speak(u);
}


// let enabled = true;

// export function enableSpeak() {
//   enabled = true;
// }

// export function disableSpeak() {
//   enabled = false;
//   speechSynthesis.cancel();
// }

// /* 🔹 Indian English voice detect */
// function getIndianEnglishVoice() {
//   const voices = speechSynthesis.getVoices();

//   return voices.find(
//     v =>
//       v.lang === "en-IN" ||
//       v.lang.startsWith("en-IN") ||
//       v.name.toLowerCase().includes("india")
//   );
// }

// export function speak(text: string, onEnd?: () => void) {
//   if (!enabled) {
//     console.warn("🔇 Speak disabled");
//     return;
//   }

//   const cleanText = text
//     .replace(/[\r\n]+/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();

//   speechSynthesis.cancel();

//   const utterance = new SpeechSynthesisUtterance(cleanText);

//   // 🔹 Hindi auto-detect (as it was)
//   if (/[ऀ-ॿ]/.test(cleanText)) {
//     utterance.lang = "hi-IN";
//   } else {
//     utterance.lang = "en-IN";

//     const indianVoice = getIndianEnglishVoice();

//     if (indianVoice) {
//       // ✅ BEST CASE: Indian English (FREE)
//       utterance.voice = indianVoice;
//       console.log("🇮🇳 Using Browser Indian English voice");
//     } else {
//       // ⚠️ Fallback – browser default (Piper en-GB can come later)
//       console.log("🇬🇧 Indian voice not found, using fallback voice");
//     }
//   }

//   utterance.rate = 1.1;
//   utterance.pitch = 1.05;
//   utterance.volume = 1;

//   utterance.onend = () => {
//     if (enabled && onEnd) onEnd();
//   };

//   speechSynthesis.speak(utterance);
// }
