import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HUD from './HUD';
import BottomNav from './BottomNav';

const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function AppLayout() {
  const location = useLocation();
  const showChrome = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative gradient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[60%] h-[50%] bg-primary/[0.04] rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[60%] rounded-full blur-3xl translate-x-1/4 translate-y-1/4" style={{ background: 'rgba(201,149,42,0.05)' }} />
      </div>

      {showChrome && <HUD />}
      {showChrome && <BottomNav />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="relative z-10"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}