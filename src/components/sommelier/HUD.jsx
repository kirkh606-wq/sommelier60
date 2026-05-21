import { useProgress } from '@/lib/useProgress.jsx';
import { TOTAL_DAYS } from '@/lib/courseData';
import { Link } from 'react-router-dom';

export default function HUD() {
  const { progress, xpProgress } = useProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center gap-3 px-4 bg-background/95 backdrop-blur-xl border-b-2 border-border">
      <Link to="/map" className="font-fraunces text-base font-bold text-primary flex items-center gap-1.5 shrink-0">
        🍷 <span className="hidden sm:inline">S·60</span>
      </Link>

      <div className="flex-1 max-w-[180px] mx-auto">
        <div className="flex justify-between mb-1">
          <span className="text-[11px] font-extrabold text-muted-foreground">
            LVL <strong className="text-primary">{progress.level}</strong>
          </span>
          <strong className="text-[11px] font-extrabold text-primary">{progress.xp} XP</strong>
        </div>
        <div className="h-[10px] bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${xpProgress}%`,
              background: 'linear-gradient(90deg, var(--gold), var(--rose))',
            }}
          />
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black bg-secondary text-secondary-foreground">
          🔥<span>{progress.streak}</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black bg-secondary text-secondary-foreground">
          ⭐<span>{progress.completed_days.length}/{TOTAL_DAYS}</span>
        </div>
      </div>
    </div>
  );
}