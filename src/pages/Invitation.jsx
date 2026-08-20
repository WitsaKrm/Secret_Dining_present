import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Shirt,
  ChefHat,
  Users,
  BadgeCheck,
} from "lucide-react";
import EmberField from "../components/EmberField.jsx";
import DecryptText from "../components/DecryptText.jsx";
import ThemeBackground from "../components/ThemeBackground.jsx";
import { drawInvitation, invitations } from "../data/invitations.js";

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

const themeConfig = {
  "warehouse-quiet": {
    bgClass: "bg-[radial-gradient(ellipse_at_50%_0%,rgba(100,100,100,0.15)_0%,rgba(10,10,10,1)_65%)]",
    cardClass: "border-gray-500/30 bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] shadow-[0_0_60px_rgba(255,255,255,0.05)]",
    textAccentClass: "text-gray-300",
    textSubClass: "text-gray-500",
    iconClass: "text-gray-400",
    badgeClass: "border-gray-500/50 bg-gray-900 shadow-[0_0_40px_rgba(255,255,255,0.05)]",
    dividerClass: "from-transparent via-gray-500/30 to-transparent",
    cornerClass: "border-gray-500/40",
  },
  "rooftop-static": {
    bgClass: "bg-[radial-gradient(ellipse_at_50%_0%,rgba(150,110,60,0.25)_0%,rgba(10,6,5,1)_65%)]",
    cardClass: "border-gold/25 bg-gradient-to-b from-[#1A130D] to-[#0D0A07] shadow-glow-gold",
    textAccentClass: "text-gold-pale",
    textSubClass: "text-gold/70",
    iconClass: "text-gold",
    badgeClass: "border-gold/50 bg-[#2A1F13] shadow-glow-gold",
    dividerClass: "from-transparent via-gold/30 to-transparent",
    cornerClass: "border-gold/40",
  },
  "greenhouse-midnight": {
    bgClass: "bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,60,30,0.35)_0%,rgba(5,10,5,1)_65%)]",
    cardClass: "border-emerald-900/40 bg-gradient-to-b from-[#0A1A0F] to-[#050A05] shadow-[0_0_60px_rgba(20,80,40,0.3)]",
    textAccentClass: "text-emerald-100",
    textSubClass: "text-emerald-600/70",
    iconClass: "text-emerald-500",
    badgeClass: "border-emerald-700/50 bg-emerald-950 shadow-[0_0_40px_rgba(20,80,40,0.2)]",
    dividerClass: "from-transparent via-emerald-800/40 to-transparent",
    cornerClass: "border-emerald-700/40",
  },
  "barge-drift": {
    bgClass: "bg-[radial-gradient(ellipse_at_50%_0%,rgba(15,30,70,0.35)_0%,rgba(5,5,15,1)_65%)]",
    cardClass: "border-blue-900/40 bg-gradient-to-b from-[#0A0F1F] to-[#05050A] shadow-[0_0_60px_rgba(15,30,70,0.3)]",
    textAccentClass: "text-blue-100",
    textSubClass: "text-blue-500/70",
    iconClass: "text-blue-400",
    badgeClass: "border-blue-700/50 bg-blue-950 shadow-[0_0_40px_rgba(15,30,70,0.2)]",
    dividerClass: "from-transparent via-blue-800/40 to-transparent",
    cornerClass: "border-blue-700/40",
  }
};

export default function Invitation() {
  const navigate = useNavigate();
  
  const [invite, setInvite] = useState(() => drawInvitation());

  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const drawnAt = useMemo(
    () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

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

  const theme = themeConfig[invite.id] || themeConfig["warehouse-quiet"];

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-ink pb-20">
      <div className="pointer-events-none fixed inset-0">
        <div className={`absolute inset-0 ${theme.bgClass}`} />
        <EmberField density={26} />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* top bar */}
      <div className="relative z-10 mx-auto flex max-w-2xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-1.5 rounded-full border border-gray-500/25 px-3 py-1.5 font-body text-xs text-smoke transition-colors hover:${theme.cornerClass} hover:${theme.textAccentClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/50`}
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
          className={`relative overflow-hidden rounded-[2px] border ${theme.cardClass} p-7 sm:p-10`}
        >
          {/* subtle abstract background */}
          <ThemeBackground themeId={invite.id} />

          {/* corner ornaments */}
          <span className={`absolute left-3 top-3 h-4 w-4 border-l border-t ${theme.cornerClass}`} />
          <span className={`absolute right-3 top-3 h-4 w-4 border-r border-t ${theme.cornerClass}`} />
          <span className={`absolute bottom-3 left-3 h-4 w-4 border-b border-l ${theme.cornerClass}`} />
          <span className={`absolute bottom-3 right-3 h-4 w-4 border-b border-r ${theme.cornerClass}`} />

          {/* seal badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "backOut" }}
            className={`mx-auto -mt-2 mb-5 flex h-12 w-12 items-center justify-center rounded-full border ${theme.badgeClass}`}
          >
            <BadgeCheck className={`h-5 w-5 ${theme.iconClass}`} strokeWidth={1.5} />
          </motion.div>

          <p className={`text-center font-mono text-[10px] uppercase tracking-widest-xl ${theme.textSubClass}`}>
            Your table has been set
          </p>

          <h1 className="mt-3 text-center font-display text-3xl italic leading-tight text-parchment sm:text-4xl">
            {invite.venue}
          </h1>

          <div className={`my-7 h-px w-full bg-gradient-to-r ${theme.dividerClass}`} />

          {/* meta */}
          <motion.dl
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${theme.iconClass}`} strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  Location
                </dt>
                <dd className={`font-mono text-sm ${theme.textAccentClass}`}>
                  <DecryptText text={invite.district} />
                </dd>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <Clock3 className={`mt-0.5 h-4 w-4 shrink-0 ${theme.iconClass}`} strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  Arrival
                </dt>
                <dd className="font-body text-sm text-parchment">{invite.hour}</dd>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <Shirt className={`mt-0.5 h-4 w-4 shrink-0 ${theme.iconClass}`} strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  Theme
                </dt>
                <dd className="font-body text-sm text-parchment">{invite.theme}</dd>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <Users className={`mt-0.5 h-4 w-4 shrink-0 ${theme.iconClass}`} strokeWidth={1.5} />
              <div>
                <dt className="font-body text-[11px] uppercase tracking-wider text-smoke">
                  At the table
                </dt>
                <dd className="font-body text-sm text-parchment">{invite.guests}</dd>
              </div>
            </motion.div>
          </motion.dl>

          <p className="mt-5 border-l border-gray-500/30 pl-4 font-body text-sm italic text-smoke">
            {invite.dressNote}
          </p>

          <div className={`my-7 h-px w-full bg-gradient-to-r ${theme.dividerClass}`} />

          {/* chef */}
          <div className="flex items-center gap-3">
            <ChefHat className={`h-4 w-4 ${theme.iconClass}`} strokeWidth={1.5} />
            <div>
              <p className="font-body text-[11px] uppercase tracking-wider text-smoke">
                Tonight's chef
              </p>
              <p className={`font-display text-lg ${theme.textAccentClass}`}>{invite.chef}</p>
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
                className="flex gap-4 border-b border-gray-500/10 pb-4 last:border-0 last:pb-0"
              >
                <span className={`w-16 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-widest-xl ${theme.textSubClass}`}>
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
          {/* Note: Redraw button removed. Once you draw, you are locked in. */}
          <button
            onClick={() => navigate("/")}
            className={`font-body text-sm text-smoke underline-offset-4 transition-colors hover:${theme.textAccentClass} hover:underline`}
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
