import React from "react";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#2b7a83] text-white flex flex-col">
 
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

   
      <footer className="text-center text-white/80 text-sm py-4">
        © {new Date().getFullYear()} TinyLink — Built with ❤️
      </footer>
    </div>
  );
}
