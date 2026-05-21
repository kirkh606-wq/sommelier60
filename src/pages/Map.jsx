import { useEffect, useState, useRef, useCallback } from 'react';
import { useProgress } from '@/lib/useProgress.jsx';
import { WEEKS, DAYS, getWeekDays } from '@/lib/courseData';
import { loadCourseData } from '@/lib/loadCourseData';
import DayNode from '@/components/sommelier/DayNode';
import { motion } from 'framer-motion';

export default function Map() {
  const { progress, getNextOpenDay } = useProgress();
  const [dataLoaded, setDataLoaded] = useState(DAYS.length > 0);
  const [refreshing, setRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  useEffect(() => {
    if (!dataLoaded) {
      loadCourseData().then(() => setDataLoaded(true));
    }
  }, [dataLoaded]);

  const handleRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    await loadCourseData();
    setRefreshing(false);
  }, [refreshing]);

  function onTouchStart(e) {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  }

  function onTouchMove(e) {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  }

  function onTouchEnd() {
    if (window.scrollY === 0 && touchDeltaY.current > 70) {
      handleRefresh();
    }
    touchDeltaY.current = 0;
  }

  const nextOpen = getNextOpenDay();

  function getDayStatus(day) {
    if (progress.completed_days.includes(day.day)) {
      return day.isQuiz ? 'quiz-done' : 'done';
    }
    if (day.day === nextOpen) {
      return day.isQuiz ? 'quiz-open' : 'open';
    }
    if (day.day < nextOpen) {
      return day.isQuiz ? 'quiz-done' : 'done';
    }
    return 'locked';
  }

  if (!dataLoaded) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-bold text-muted-foreground">Loading your journey...</p>
        </div>
      </div>
    );
  }

  const activeWeeks = WEEKS.filter(w => getWeekDays(w.num).length > 0);

  return (
    <div
      className="pt-[84px] pb-16 px-5 max-w-[860px] mx-auto"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull-to-refresh indicator */}
      {refreshing && (
        <div className="flex justify-center mb-3 -mt-4">
          <div className="w-7 h-7 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
      )}
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="font-fraunces text-2xl font-bold">
            <span className="text-primary">Your </span>
            <span style={{ color: 'var(--gold)' }}>Journey</span>
          </h2>
          <p className="text-sm text-muted-foreground font-semibold mt-1" id="mapGreet">
            {progress.student_name 
              ? `Welcome back, ${progress.student_name}. Keep going.`
              : 'Every lesson has a story. Every story changes how you think about wine.'
            }
          </p>
        </div>
        <div 
          className="rounded-xl px-4 py-3 flex items-center gap-2.5 shrink-0 shadow-[0_4px_0_var(--sun-dark)]"
          style={{ background: 'linear-gradient(135deg, #FF8C00, var(--sun))' }}
        >
          <span className="font-fraunces text-2xl font-bold text-white">{progress.streak}</span>
          <span className="text-xs font-extrabold text-white/90 leading-tight">Day<br/>Streak 🔥</span>
        </div>
      </div>

      {/* Weeks */}
      {activeWeeks.map((week, i) => {
        const days = getWeekDays(week.num);
        if (days.length === 0) return null;
        const completedInWeek = days.filter(d => progress.completed_days.includes(d.day)).length;

        return (
          <motion.div 
            key={week.num} 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className={`px-4 py-1 rounded-full text-xs font-black tracking-wide ${week.color}`}>
                WEEK {week.num}
              </span>
              <span className="text-lg font-black">{week.name}</span>
              <span className="text-xs font-bold text-muted-foreground ml-auto">
                {completedInWeek}/{days.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {days.map(day => (
                <DayNode key={day.day} day={day} status={getDayStatus(day)} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}