import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", to: "/" },
    { label: "Health", to: `${process.env.REACT_APP_API_URL}/healthz`, external: true },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        
 
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3"
        >
          <img src="/tinylink.png" alt="TinyLink" className="h-10 sm:h-12 object-contain drop-shadow-md" />
          <div className="text-white">
            <h1 className="text-lg sm:text-xl font-bold tracking-wide">TinyLink</h1>
            <p className="text-[9px] sm:text-[10px] opacity-70 -mt-1 whitespace-nowrap">Shorten • Share • Track</p>
          </div>
        </motion.div>


        <nav className="hidden md:flex gap-3">
          {navItems.map((item) => (
            <motion.div key={item.label} whileHover={{ scale: 1.05 }}>
              {item.external ? (
                <a
                  href={item.to} target="_blank" rel="noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                  bg-white/10 text-white border-white/30 hover:bg-white hover:text-black`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                  ${
                    pathname === item.to
                      ? "bg-white text-black border-white"
                      : "bg-white/10 text-white border-white/30 hover:bg-white hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

   
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-white/15 backdrop-blur-xl border-t border-white/20 px-4 py-3 space-y-3"
          >
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-2 bg-white/10 hover:bg-white rounded-lg transition text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-center py-2 rounded-lg transition text-white
                  ${
                    pathname === item.to
                      ? "bg-white text-black"
                      : "bg-white/10 hover:bg-white hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
