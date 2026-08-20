import { useEffect, useState, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#·—";

// Renders text that "decrypts" character-by-character from random glyphs
// into the real string, echoing the club's secrecy.
export default function DecryptText({ text, className = "", speed = 18 }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    frame.current = 0;
    const totalFrames = text.length + 14;

    function tick() {
      frame.current += 1;
      const revealCount = Math.max(0, frame.current - 10);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "—" || ch === ",") return ch;
          if (i < revealCount) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(next);

      if (frame.current < totalFrames) {
        raf.current = window.setTimeout(tick, speed);
      } else {
        setDisplay(text);
      }
    }

    tick();
    return () => window.clearTimeout(raf.current);
  }, [text, speed]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
