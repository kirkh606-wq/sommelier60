import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDayData, DAYS } from '@/lib/courseData';
import { loadCourseData } from '@/lib/loadCourseData';
import { useProgress } from '@/lib/useProgress.jsx';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Lesson() {
  const { dayNum } = useParams();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [dataLoaded, setDataLoaded] = useState(DAYS.length > 0);

  useEffect(() => {
    if (!dataLoaded) {
      loadCourseData().then(() => setDataLoaded(true));
    }
  }, [dataLoaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dayNum]);

  if (!dataLoaded) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const day = getDayData(Number(dayNum));
  if (!day) {
    navigate('/map');
    return null;
  }

  const weekLabel = `Week ${day.week} · Day ${day.day}`;

  return (
    <div className="pt-[84px] pb-20 px-5 max-w-[700px] mx-auto">
      <button
        onClick={() => navigate('/map')}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to map
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span 
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black mb-3"
          style={{ background: 'var(--gold-light)', color: 'var(--sun-dark)' }}
        >
          {day.icon} {weekLabel}
        </span>

        <h2 className="font-fraunces text-[clamp(26px,5vw,44px)] font-bold leading-tight mb-2">
          {day.title}
        </h2>

        <div
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black text-sm mb-7"
          style={{ background: 'var(--gold-light)', color: 'var(--sun-dark)' }}
        >
          ⭐ +{day.xp} XP for completing
        </div>

        {/* Lesson content rendered as HTML */}
        <div
          className="lesson-content text-base leading-[1.9] text-muted-foreground
            [&_h3]:font-fraunces [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-7 [&_h3]:mb-3
            [&_p]:mb-4 [&_strong]:text-foreground [&_strong]:font-extrabold
            [&_.story-box]:bg-gradient-to-br [&_.story-box]:from-[#1A0A2E] [&_.story-box]:to-[#3A1550] [&_.story-box]:rounded-2xl [&_.story-box]:p-6 [&_.story-box]:my-7
            [&_.story-label]:text-[10px] [&_.story-label]:font-black [&_.story-label]:tracking-[2px] [&_.story-label]:uppercase [&_.story-label]:block [&_.story-label]:mb-2.5
            [&_.story-text]:font-fraunces [&_.story-text]:italic [&_.story-text]:text-[15px] [&_.story-text]:text-white/90 [&_.story-text]:leading-[1.85]
            [&_.callout]:bg-gradient-to-br [&_.callout]:from-secondary [&_.callout]:to-secondary/20 [&_.callout]:border-2 [&_.callout]:border-primary/20 [&_.callout]:rounded-xl [&_.callout]:px-5 [&_.callout]:py-4 [&_.callout]:my-6 [&_.callout]:font-fraunces [&_.callout]:italic [&_.callout]:text-base [&_.callout]:text-primary [&_.callout]:leading-relaxed
            [&_.terms-grid]:grid [&_.terms-grid]:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] [&_.terms-grid]:gap-2.5 [&_.terms-grid]:my-5
            [&_.term-card]:bg-card [&_.term-card]:border-2 [&_.term-card]:border-border [&_.term-card]:rounded-xl [&_.term-card]:p-3
            [&_.term-card_strong]:block [&_.term-card_strong]:text-[11px] [&_.term-card_strong]:font-black [&_.term-card_strong]:tracking-wider [&_.term-card_strong]:uppercase [&_.term-card_strong]:text-primary [&_.term-card_strong]:mb-1
            [&_.term-card_span]:text-[13px] [&_.term-card_span]:text-muted-foreground [&_.term-card_span]:leading-snug"
          dangerouslySetInnerHTML={{ __html: day.content }}
        />

        {/* Quiz Gate */}
        <div
          className="rounded-2xl p-6 mt-10 text-center border-[3px]"
          style={{
            background: 'linear-gradient(135deg, #FFF8E8, var(--gold-light))',
            borderColor: 'var(--sun)',
          }}
        >
          <span className="text-5xl block mb-2.5">🎯</span>
          <h3 className="font-fraunces text-xl font-bold mb-2">
            Quiz Time — Prove You've Got It
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Pass the quiz to unlock the next day. Wrong answers retry — you advance when you've actually learned it.
          </p>
          <Button
            onClick={() => navigate(`/quiz/${day.day}`)}
            className="text-base px-8 py-5 rounded-2xl font-extrabold"
            style={{ background: 'var(--gold)', color: '#fff', boxShadow: '0 5px 0 #8A6010' }}
          >
            Take the Quiz ⚡
          </Button>
        </div>
      </motion.div>
    </div>
  );
}