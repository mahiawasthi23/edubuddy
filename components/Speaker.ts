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
    .replace(/[\r\n]+/g, " ")        // remove line breaks
    .replace(/[.!?]/g, "")          // remove full stop pauses
    .replace(/[,;:]/g, " ")         // soft replace commas
    .replace(/\s+/g, " ")           // remove extra spaces
    .trim();

  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(cleanText);

  // ✅ Language detect
  if (/[ऀ-ॿ]/.test(cleanText)) u.lang = "hi-IN";
  else u.lang = "en-IN";

  // ✅ Slightly faster = less pause
  u.rate = 1.15;   // pehle 0.9 tha (slow tha)
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