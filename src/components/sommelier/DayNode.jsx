import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DayNode({ day, status }) {
  const navigate = useNavigate();

  const statusStyles = {
    locked: 'bg-secondary border-border/60 cursor-not-allowed opacity-50',
    open: 'bg-card border-[var(--gold)] shadow-[0_6px_0_var(--sun-dark),0_4px_20px_rgba(124,63,160,0.1)] animate-pulse-glow cursor-pointer hover:-translate-y-1 hover:scale-105',
    done: 'border-[var(--grape-dark)] shadow-[0_4px_0_#2A0D50] cursor-pointer',
    'quiz-open': 'bg-card border-[var(--rose)] shadow-[0_6px_0_#A01858,0_4px_20px_rgba(124,63,160,0.1)] cursor-pointer hover:-translate-y-1 hover:scale-105',
    'quiz-done': 'border-[#A01858] shadow-[0_4px_0_#6A0035] cursor-pointer',
  };

  const doneGradient = day.isQuiz
    ? 'linear-gradient(135deg, var(--rose), #A01858)'
    : 'linear-gradient(135deg, var(--grape), var(--grape-dark))';

  function handleClick() {
    if (status === 'locked') return;
    navigate(`/lesson/${day.day}`);
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`w-[82px] h-[82px] rounded-xl flex flex-col items-center justify-center border-[3px] gap-1 transition-all duration-200 ${statusStyles[status]}`}
      style={status === 'done' || status === 'quiz-done' ? { background: doneGradient } : undefined}
      whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-[26px] leading-none">
        {status === 'done' || status === 'quiz-done' ? '✅' : day.icon}
      </span>
      <span className={`text-[11px] font-black ${
        status === 'done' || status === 'quiz-done'
          ? 'text-white/75'
          : status === 'open'
          ? 'text-[var(--sun-dark)]'
          : status === 'quiz-open'
          ? 'text-[#A01858]'
          : 'text-muted-foreground'
      }`}>
        Day {day.day}
      </span>
    </motion.button>
  );
}