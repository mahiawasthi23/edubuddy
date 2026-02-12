// app/layout.tsx
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";

export const metadata = {
  title: "EduBuddy AI",
  description: "AI learning buddy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
