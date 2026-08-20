import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Lock } from "lucide-react";
import EmberField from "../components/EmberField.jsx";
import WaxSealButton from "../components/WaxSealButton.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-ink">
      {/* ambient background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(90,15,23,0.45)_0%,rgba(10,6,5,1)_70%)]" />
        <EmberField />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* mark */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center gap-2 px-6 pt-6 sm:px-10 sm:pt-8"
      >
        <UtensilsCrossed className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="font-body text-[11px] font-medium uppercase tracking-widest-xl text-gold/80">
          Main Group
        </span>
      </motion.div>

      {/* hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest-xl text-smoke"
        >
          <Lock className="h-3 w-3" strokeWidth={1.5} />
          By invitation only
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
          className="font-display text-5xl leading-[1.05] text-parchment sm:text-7xl md:text-8xl"
        >
          The{" "}
          <span className="italic text-gold-bright drop-shadow-[0_0_30px_rgba(232,200,122,0.25)]">
            Secret
          </span>
          <br />
          Dining Club
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-smoke sm:text-base"
        >
          No storefront. No fixed menu. No idea who you'll sit with. Just a
          location and a dress code, sent a few hours before the table is
          set.
        </motion.p>

        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10"
        >
          <input
            type="text"
            placeholder="Identify yourself..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-64 border-b border-gold/30 bg-transparent px-4 py-2 text-center font-display text-xl text-parchment outline-none transition-colors placeholder:text-smoke/40 focus:border-gold-pale focus:bg-white/5"
          />
        </motion.div>

        {/* Conditional Button */}
        <div className="mt-8 flex h-40 flex-col items-center justify-start">
          <AnimatePresence>
            {name.trim() !== "" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <WaxSealButton onReveal={() => navigate("/invitation", { state: { guestName: name.trim() } })} />
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest-xl text-smoke/70">
                  Break the seal to draw your table
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 px-6 pb-6 text-center font-body text-[11px] text-smoke/60 sm:pb-8"
      >
        Members only · A new table is drawn every visit
      </motion.footer>
    </div>
  );
}
