import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

// The home page's central call to action, styled as a wax seal.
// Clicking "cracks" the seal open before the invitation is revealed.
export default function WaxSealButton({ onReveal, label = "View My Table" }) {
  const [cracking, setCracking] = useState(false);

  function handleClick() {
    if (cracking) return;
    setCracking(true);
    window.setTimeout(() => {
      onReveal();
    }, 850);
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* outer glow ring, ambient pulse */}
      <motion.div
        className="absolute h-56 w-56 rounded-full sm:h-64 sm:w-64"
        style={{
          background:
            "radial-gradient(circle, rgba(232,200,122,0.18) 0%, rgba(232,200,122,0) 70%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* rotating hairline ring for a "signet" feel */}
      <div
        className="absolute h-48 w-48 rounded-full border border-gold/30 sm:h-52 sm:w-52 animate-spin-slow"
        aria-hidden="true"
      />

      <motion.button
        type="button"
        onClick={handleClick}
        disabled={cracking}
        whileHover={cracking ? {} : { scale: 1.04 }}
        whileTap={cracking ? {} : { scale: 0.96 }}
        animate={cracking ? { scale: [1, 1.08, 0.9] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className="group relative flex h-44 w-44 flex-col items-center justify-center rounded-full border border-gold/60 bg-gradient-to-br from-wine-light via-wine to-wine-dark shadow-glow-wine outline-none ring-gold/40 transition-shadow focus-visible:ring-4 sm:h-48 sm:w-48"
        aria-label={label}
      >
        <span
          className="pointer-events-none absolute inset-2 rounded-full border border-gold/20"
          aria-hidden="true"
        />
        <UtensilsCrossed
          className="mb-2 h-7 w-7 text-gold-bright transition-transform duration-500 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
        <span className="font-display text-lg italic tracking-wide text-gold-pale sm:text-xl">
          {label}
        </span>
      </motion.button>

      {/* crack overlay: two halves splitting apart + flash */}
      <AnimatePresence>
        {cracking && (
          <>
            <motion.span
              key="flash"
              className="absolute h-44 w-44 rounded-full bg-gold-bright sm:h-48 sm:w-48"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.5, 2.2] }}
              transition={{ duration: 0.8, times: [0, 0.3, 1] }}
            />
            <motion.span
              key="left"
              className="absolute h-44 w-44 rounded-full border border-gold/60 bg-gradient-to-br from-wine-light via-wine to-wine-dark sm:h-48 sm:w-48"
              style={{ clipPath: "inset(0 50% 0 0)" }}
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={{ x: -60, rotate: -18, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
            />
            <motion.span
              key="right"
              className="absolute h-44 w-44 rounded-full border border-gold/60 bg-gradient-to-br from-wine-light via-wine to-wine-dark sm:h-48 sm:w-48"
              style={{ clipPath: "inset(0 0 0 50%)" }}
              initial={{ x: 0, rotate: 0, opacity: 1 }}
              animate={{ x: 60, rotate: 18, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
