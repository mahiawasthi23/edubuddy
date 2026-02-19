import { Suspense } from "react";
import LearningClient from "./LearningClient";

export default function LearningPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LearningClient />
    </Suspense>
  );
}


