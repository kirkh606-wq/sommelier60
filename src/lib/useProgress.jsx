import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { XP_PER_LEVEL } from './courseData';

const ProgressContext = createContext(null);

const DEFAULT_STATE = {
  completed_days: [],
  quiz_done: [],
  xp: 0,
  level: 1,
  streak: 0,
  last_completed_date: null,
  student_name: '',
};

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(DEFAULT_STATE);
  const [progressId, setProgressId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const records = await base44.entities.UserProgress.list('-created_date', 1);
    if (records.length > 0) {
      const rec = records[0];
      setProgress({
        completed_days: rec.completed_days || [],
        quiz_done: rec.quiz_done || [],
        xp: rec.xp || 0,
        level: rec.level || 1,
        streak: rec.streak || 0,
        last_completed_date: rec.last_completed_date || null,
        student_name: rec.student_name || '',
      });
      setProgressId(rec.id);
    }
    setLoading(false);
  }

  const saveProgress = useCallback(async (newProgress) => {
    setProgress(newProgress);
    if (progressId) {
      await base44.entities.UserProgress.update(progressId, newProgress);
    } else {
      const created = await base44.entities.UserProgress.create(newProgress);
      setProgressId(created.id);
    }
  }, [progressId]);

  const completeDay = useCallback(async (dayNum, xpGain) => {
    const now = new Date().toISOString().split('T')[0];
    const newCompleted = progress.completed_days.includes(dayNum) 
      ? progress.completed_days 
      : [...progress.completed_days, dayNum];
    const newQuizDone = progress.quiz_done.includes(dayNum)
      ? progress.quiz_done
      : [...progress.quiz_done, dayNum];
    
    let newXp = progress.xp + xpGain;
    let newLevel = progress.level;
    while (newXp >= newLevel * XP_PER_LEVEL) newLevel++;

    let newStreak = progress.streak;
    if (progress.last_completed_date) {
      const lastDate = new Date(progress.last_completed_date);
      const today = new Date(now);
      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) newStreak++;
      else if (diffDays > 1) newStreak = 1;
    } else {
      newStreak = 1;
    }

    const newProgress = {
      ...progress,
      completed_days: newCompleted,
      quiz_done: newQuizDone,
      xp: newXp,
      level: newLevel,
      streak: newStreak,
      last_completed_date: now,
    };

    await saveProgress(newProgress);
    return newProgress;
  }, [progress, saveProgress]);

  const setName = useCallback(async (name) => {
    const newProgress = { ...progress, student_name: name };
    await saveProgress(newProgress);
  }, [progress, saveProgress]);

  const getNextOpenDay = useCallback(() => {
    if (progress.completed_days.length === 0) return 1;
    const maxCompleted = Math.max(...progress.completed_days);
    return maxCompleted + 1;
  }, [progress]);

  const xpProgress = progress.level > 0 
    ? ((progress.xp % (progress.level * XP_PER_LEVEL)) / (progress.level * XP_PER_LEVEL)) * 100
    : 0;

  return (
    <ProgressContext.Provider value={{
      progress,
      loading,
      completeDay,
      setName,
      getNextOpenDay,
      xpProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}