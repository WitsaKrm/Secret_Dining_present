import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home.jsx";
import Invitation from "./pages/Invitation.jsx";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageFade>
              <Home />
            </PageFade>
          }
        />
        <Route
          path="/invitation"
          element={
            <PageFade>
              <Invitation />
            </PageFade>
          }
        />
        <Route
          path="*"
          element={
            <PageFade>
              <Home />
            </PageFade>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageFade({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="grain">
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </div>
  );
}
