"use client";
import { Menu, X } from 'lucide-react';
import { useAtom } from 'jotai';
import { sideBarAtom } from '@/atoms/sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; // Import Link from next/link

const menuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: '0%' },
  exit: { opacity: 0, x: '100%' },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useAtom(sideBarAtom);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden relative px-4">
      {/* Hamburger Button */}
      <button className={`${isOpen ? "z-9" : ""}`} onClick={toggleMenu}>
        {!isOpen && <Menu />}
      </button>

      {/* Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ type: 'spring', stiffness: 75, damping: 15 }}
            className="fixed bg-black/95 inset-0 flex justify-center items-center z-40"
            onClick={closeMenu} // Close menu when clicking outside
          >
            {/* Menu Container */}
            <motion.div onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                className="absolute top-8 right-4 text-white"
                onClick={closeMenu}
              >
                <X size={30} />
              </button>

              {/* Navigation Links */}
              <motion.ul
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white text-3xl space-y-8 text-center"
              >
                <li>
                  <Link href="/blog">
                    <button onClick={closeMenu} className="hover:underline hover:font-bold">
                      blog
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/experiences">
                    <button onClick={closeMenu} className="hover:underline hover:font-bold">
                      experiences
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/me">
                    <button onClick={closeMenu} className="hover:underline hover:font-bold">
                      about me
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <button onClick={closeMenu} className="hover:underline hover:font-bold">
                      contact
                    </button>
                  </Link>
                </li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
