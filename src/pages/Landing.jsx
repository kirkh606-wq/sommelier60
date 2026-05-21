import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/lib/useProgress.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const STATS = [
  { num: '60', label: 'Days' },
  { num: '900', label: 'Minutes' },
  { num: '463', label: 'Questions' },
  { num: '1', label: 'Certificate' },
];

const FEATURES = [
  '🎮 Game-style learning',
  '🔒 Must pass to progress',
  '🍽️ Built for the floor',
  '🏆 Real certification',
  '🌍 60 days of wine mastery',
];

export default function Landing() {
  const navigate = useNavigate();
  const { progress, setName } = useProgress();
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput] = useState('');

  function handleStart() {
    if (progress.student_name) {
      navigate('/map');
    } else {
      setShowNameModal(true);
    }
  }

  async function handleSaveName() {
    if (!nameInput.trim()) return;
    await setName(nameInput.trim());
    navigate('/map');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-12 text-center">
      <motion.span 
        className="text-[90px] block mb-5 animate-wobble"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        🍷
      </motion.span>

      <motion.h1 
        className="font-fraunces text-[clamp(40px,9vw,80px)] font-bold leading-none mb-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-primary">Sommelier</span>
        <br />
        <span>in </span>
        <span style={{ color: 'var(--gold)' }}>60 Days</span>
      </motion.h1>

      <motion.p 
        className="text-lg text-muted-foreground font-semibold mb-8 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Earn your professional certificate in 15 minutes a day.
      </motion.p>

      <motion.div 
        className="flex gap-3 flex-wrap justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {STATS.map(s => (
          <div key={s.label} className="bg-card border-2 border-border rounded-xl px-5 py-4 text-center shadow-sm min-w-[85px]">
            <span className="font-fraunces text-3xl font-bold text-primary block">{s.num}</span>
            <span className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div 
        className="flex gap-2 flex-wrap justify-center mb-9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {FEATURES.map(f => (
          <span key={f} className="bg-card border-2 border-border rounded-full px-4 py-2 text-sm font-bold text-muted-foreground">
            {f}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          onClick={handleStart}
          className="text-lg px-9 py-6 rounded-2xl font-extrabold shadow-[0_5px_0_var(--grape-dark)] active:shadow-[0_1px_0_var(--grape-dark)] active:translate-y-[3px] transition-all hover:-translate-y-0.5"
          style={{ background: 'var(--grape)', color: '#fff' }}
        >
          Start Your Journey 🍷
        </Button>
      </motion.div>

      {/* Name Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            className="fixed inset-0 z-[400] bg-foreground/70 backdrop-blur-md flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl"
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.65, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <span className="text-6xl block mb-4">🏆</span>
              <h2 className="font-fraunces text-2xl font-bold mb-2">Your Journey Begins.</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your name for your Advanced Sommelier Certificate.
              </p>
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                placeholder="Your full name"
                maxLength={40}
                className="text-lg font-extrabold text-center mb-4 h-14 border-2 rounded-xl"
              />
              <Button
                onClick={handleSaveName}
                className="w-full text-base py-6 rounded-2xl font-extrabold"
                style={{ background: 'var(--gold)', color: '#fff', boxShadow: '0 5px 0 #8A6010' }}
                disabled={!nameInput.trim()}
              >
                Begin Your Journey →
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}