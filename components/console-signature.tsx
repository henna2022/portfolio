"use client";

// Prints a small branded signature in the DevTools console — production only.
// Module-level guard so React strict mode / remounts never print it twice.
let printed = false;

export function ConsoleSignature() {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    !printed
  ) {
    printed = true;
    const name =
      "font: bold 24px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; color: #3B82F6;";
    const role = "font: 600 13px ui-monospace, monospace; color: #3B82F6;";
    const body = "font: 12px ui-monospace, monospace; color: #9CA3AF;";
    const link = "font: 12px ui-monospace, monospace; color: #6B7280;";
    console.log(
      "%cJUWON LEE\n" +
        "%cAI & Robotics Educator · Full-Stack Developer\n\n" +
        "%c여기까지 열어보셨다면 — 코드가 궁금하셨군요 👋\n" +
        "Curious how this site is built?\n\n" +
        "%cGitHub   → https://github.com/henna2022\n" +
        "LinkedIn → https://www.linkedin.com/in/juwon-lee-677b702b3/\n" +
        "Email    → juwonlee211@gmail.com",
      name,
      role,
      body,
      link
    );
  }
  return null;
}
