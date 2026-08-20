import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  RotateCw,
  Shirt,
  ChefHat,
  Users,
  BadgeCheck,
} from "lucide-react";
import EmberField from "../components/EmberField.jsx";
import DecryptText from "../components/DecryptText.jsx";
import { drawInvitation } from "../data/invitations.js";

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Invitation() {
  const navigate = useNavigate();
  const [invite, setInvite] = useState(() => drawInvitation());
  const [drawKey, setDrawKey] = useState(0);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const drawnAt = useMemo(
    () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    [drawKey]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [drawKey]);

  function handleShuffle() {
    setInvite((prev) => drawInvitation(prev.id));
    setDrawKey((k) => k + 1);
  }

  function handlePointerMove(e) {
    const el = cardRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -3.5, y: px * 3.5 });
  }

  function handlePointerLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-ink pb-20">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(90,15,23,0.35)_0%,rgba(10,6,5,1)_65%)]" />
        <EmberField density={26} />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* top bar */}
      <div className="relative z-10 mx-auto flex max-w-2xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 rounded-full border border-gold/25 px-3 py-1.5 font-body text-xs text-smoke transition-colors hover:border-gold/60 hover:text-gold-pale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Home
        </button>
        <span className="font-mono text-[10px] uppercase tracking-widest-xl text-smoke/60">
          Drawn at {drawnAt}
        </span>
      </div>

      {/* card */}
      <motion.div
        key={drawKey}
        initial={{ opacity: 0, scaleY: 0.06, y: -10 }}
        animate={{ opacity: 1, scaleY: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 1] }}
        style={{ transformOrigin: "top center" }}
        className="relative z-10 mx-auto mt-8 max-w-2xl px-5 sm:px-8"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative rounded-[2px] border border-gold/25 bg-gradient-to-b from-[#150C0A] to-[#0D0807] p-7 shadow-glow-wine sm:p-10"
        >
          {/* corner ornaments */}
          <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-gold/40" />
          <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-gold/40" />
          <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-gold/40" />
          <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-gold/40" />

          {/* seal badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "backOut" }}
            className="mx-auto -mt-2 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-wine-dark shadow-glow-gold"
          >
            <BadgeCheck className="h-5 w-5 text-gold-bright" strokeWidth={1.5} />
          </motion.div>

          <p className="text-center font-mono text-[10px] uppercase tracking-widest-xl text-gold/70">
            Your table has been set
          </p>

          <h1 className="mt-3 text-center font-display text-3xl italic leading-tight text-parchment sm:text-4xl">
            {invite.venue}
          </h1>

          <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {/* meta */}
          <motion.dl
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  Location
                </dt>
                <dd className="font-mono text-sm text-gold-pale">
                  <DecryptText text={invite.district} />
                </dd>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  Arrival
                </dt>
                <dd className="font-body text-sm text-parchment">{invite.hour}</dd>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  Theme
                </dt>
                <dd className="font-body text-sm text-parchment">{invite.theme}</dd>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  At the table
                </dt>
                <dd className="font-body text-sm text-parchment">{invite.guests}</dd>
              </div>
            </motion.div>
          </motion.dl>

          <p className="mt-5 border-l border-gold/30 pl-4 font-body text-sm italic text-smoke">
            {invite.dressNote}
          </p>

          <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {/* chef */}
          <div className="flex items-center gap-3">
            <ChefHat className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <div>
              <p className="font-body text-[11px] uppercase tracking-wider text-smoke">
                Tonight's chef
              </p>
              <p className="font-display text-lg text-gold-pale">{invite.chef}</p>
            </div>
          </div>
          <p className="mt-2 font-body text-sm italic text-smoke">{invite.chefLine}</p>

          {/* menu */}
          <motion.ol
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-4"
          >
            {invite.menu.map((course) => (
              <motion.li
                key={course.course}
                variants={itemVariants}
                className="flex gap-4 border-b border-gold/10 pb-4 last:border-0 last:pb-0"
              >
                <span className="w-16 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-widest-xl text-gold/60">
                  {course.course}
                </span>
                <div>
                  <p className="font-display text-lg text-parchment">{course.dish}</p>
                  <p className="mt-0.5 font-body text-xs italic text-smoke">
                    {course.note}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        {/* actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={handleShuffle}
            className="group flex items-center gap-2 rounded-full border border-gold/50 bg-wine px-6 py-3 font-body text-sm text-gold-pale shadow-glow-wine transition-transform hover:scale-[1.03] hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 active:scale-95"
          >
            <RotateCw
              className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180"
              strokeWidth={1.75}
            />
            Draw Another Table
          </button>
          <button
            onClick={() => navigate("/")}
            className="font-body text-sm text-smoke underline-offset-4 transition-colors hover:text-gold-pale hover:underline"
          >
            Return home
          </button>
        </motion.div>

        <p className="mt-10 text-center font-body text-[11px] leading-relaxed text-smoke/50">
          This invitation is not a reservation. The exact address and any
          last-minute changes to tonight's location arrive by SMS.
        </p>
      </motion.div>
    </div>
  );
}
