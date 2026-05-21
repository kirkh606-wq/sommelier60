import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDayData, DAYS, PASS_THRESHOLD, FINAL_PASS_THRESHOLD } from '@/lib/courseData';
import { loadCourseData } from '@/lib/loadCourseData';
import { useProgress } from '@/lib/useProgress.jsx';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz() {
  const { dayNum } = useParams();
  const navigate = useNavigate();
  const { completeDay } = useProgress();
  const [dataLoaded, setDataLoaded] = useState(DAYS.length > 0);
  const [qIndex, setQIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [retryUsed, setRetryUsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!dataLoaded) {
      loadCourseData().then(() => setDataLoaded(true));
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (dataLoaded) {
      const day = getDayData(Number(dayNum));
      if (day) setQuestions([...day.questions]);
    }
  }, [dataLoaded, dayNum]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dayNum]);

  const day = dataLoaded ? getDayData(Number(dayNum)) : null;
  if (!dataLoaded || !day) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const total = questions.length;
  const threshold = day.isFinal ? FINAL_PASS_THRESHOLD : PASS_THRESHOLD;
  const currentQ = questions[qIndex];
  const progressPct = total > 0 ? ((qIndex + (answered ? 1 : 0)) / total) * 100 : 0;

  function handleAnswer(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);

    if (idx === currentQ.correct) {
      setCorrect(c => c + 1);
    }
  }

  function handleNext() {
    if (qIndex + 1 >= total) {
      setFinished(true);
    } else {
      setQIndex(q => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowRetry(false);
    }
  }

  function handleRetry() {
    // Use a retry question if available
    if (day.retries && retryUsed < day.retries.length) {
      const retryQ = day.retries[retryUsed];
      const newQuestions = [...questions];
      newQuestions[qIndex] = retryQ;
      setQuestions(newQuestions);
      setRetryUsed(r => r + 1);
    }
    setSelected(null);
    setAnswered(false);
    setShowRetry(false);
  }

  const isCorrect = selected === currentQ?.correct;
  const passed = correct / total >= threshold;

  async function handleComplete() {
    if (passed) {
      await completeDay(day.day, day.xp);
    }
    const nextDay = day.day + 1;
    const nextExists = getDayData(nextDay);
    if (passed && day.isFinal) {
      navigate('/certificate');
    } else if (passed && nextExists) {
      navigate(`/lesson/${nextDay}`);
    } else {
      navigate('/map');
    }
  }

  if (finished) {
    return (
      <div className="pt-[84px] pb-20 px-5 max-w-[540px] mx-auto">
        <motion.div
          className="bg-card border-[3px] border-border rounded-3xl p-10 text-center shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <span className="text-7xl block mb-4">{passed ? '🎉' : '💪'}</span>
          <h2 className="font-fraunces text-3xl font-bold mb-2">
            {passed ? 'Day Complete!' : 'Not quite — try again'}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {passed
              ? `${correct}/${total} correct. Well done.`
              : `${correct}/${total} correct (${Math.round((correct / total) * 100)}%). You need ${Math.round(threshold * 100)}% to pass.`
            }
          </p>

          <div className="grid grid-cols-3 gap-2.5 mb-6">
            <div className="bg-background rounded-xl p-4 border-2 border-border">
              <span className="font-fraunces text-2xl font-bold text-primary block">{correct}/{total}</span>
              <span className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">Score</span>
            </div>
            <div className="bg-background rounded-xl p-4 border-2 border-border">
              <span className="font-fraunces text-2xl font-bold text-primary block">+{passed ? day.xp : 0}</span>
              <span className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">XP</span>
            </div>
            <div className="bg-background rounded-xl p-4 border-2 border-border">
              <span className="font-fraunces text-2xl font-bold text-primary block">🔥</span>
              <span className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wider">Streak</span>
            </div>
          </div>

          <div className="flex gap-2.5 justify-center flex-wrap">
            <Button variant="outline" onClick={() => navigate('/map')} className="rounded-xl font-extrabold">
              Map
            </Button>
            <Button
              onClick={passed ? handleComplete : () => { setFinished(false); setQIndex(0); setCorrect(0); setSelected(null); setAnswered(false); setRetryUsed(0); setQuestions([...day.questions]); }}
              className="rounded-xl font-extrabold"
              style={{ background: 'var(--gold)', color: '#fff' }}
            >
              {passed ? (day.isFinal ? 'See Certificate 🏆' : 'Next Day →') : 'Try Again 🔁'}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="pt-[84px] pb-20 px-5 max-w-[700px] mx-auto">
      {/* Quiz header with exit button */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-muted-foreground">Q {qIndex + 1} of {total}</span>
        <button
          onClick={() => navigate('/map')}
          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-border transition-colors"
          style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
          aria-label="Exit quiz"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-border rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--rose))',
          }}
        />
      </div>

      {/* Retry box */}
      <AnimatePresence>
        {showRetry && (
          <motion.div
            className="rounded-2xl p-5 mb-4 border-[3px]"
            style={{ background: 'linear-gradient(135deg, var(--terra-light), #FFF2EE)', borderColor: 'var(--terra)' }}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-black text-sm mb-1.5" style={{ color: 'var(--terra)' }}>❌ Not quite — here's why:</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{currentQ.exp}</p>
            <p className="text-sm font-extrabold" style={{ color: 'var(--terra)' }}>🔁 Try again with a different question.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question card */}
      <div className="bg-card border-[3px] border-border rounded-2xl p-6 mb-4 shadow-sm">
        <span className="text-[11px] font-black tracking-[1.5px] uppercase block mb-2.5" style={{ color: 'var(--gold)' }}>
          QUESTION {qIndex + 1}
        </span>
        <p className="font-fraunces text-[clamp(16px,3vw,23px)] font-bold leading-snug">
          {currentQ.q}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        {currentQ.opts.map((opt, i) => {
          let optClass = 'bg-card border-2 border-border hover:border-[var(--gold)] hover:bg-[var(--gold-light)] hover:-translate-y-0.5';
          let letterClass = 'bg-background border-2 border-border text-muted-foreground';

          if (answered) {
            if (i === currentQ.correct) {
              optClass = 'border-2';
              optClass += ' bg-[var(--vine-light)] border-[var(--vine)] text-[var(--vine-dark)]';
              letterClass = 'bg-[var(--vine)] border-[var(--vine)] text-white';
            } else if (i === selected && !isCorrect) {
              optClass = 'border-2 animate-shake';
              optClass += ' bg-[var(--terra-light)] border-[var(--terra)] text-[var(--terra)]';
              letterClass = 'bg-[var(--terra)] border-[var(--terra)] text-white';
            } else {
              optClass = 'bg-card border-2 border-border opacity-50';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`${optClass} rounded-xl p-3 text-left flex items-start gap-2.5 transition-all duration-200 text-sm font-bold leading-snug disabled:cursor-not-allowed`}
            >
              <span className={`${letterClass} min-w-[28px] h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all`}>
                {LETTERS[i]}
              </span>
              <span className="pt-0.5">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && !showRetry && (
          <motion.div
            className={`rounded-xl p-3.5 mb-4 flex items-start gap-2.5 border-2 ${
              isCorrect
                ? 'bg-[var(--vine-light)] border-[var(--vine)]'
                : 'bg-[var(--terra-light)] border-[var(--terra)]'
            }`}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="text-xl shrink-0">{isCorrect ? '🎉' : '❌'}</span>
            <div className="text-sm font-semibold text-muted-foreground leading-relaxed">
              <b className="block mb-0.5">{isCorrect ? 'Correct!' : 'Not quite.'}</b>
              {currentQ.exp}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {answered && (
        <div className="flex justify-end gap-2.5">
          {!isCorrect && day.retries && retryUsed < day.retries.length && !showRetry && (
            <Button
              variant="outline"
              onClick={() => setShowRetry(true)}
              className="rounded-xl font-extrabold"
            >
              Try Again 🔁
            </Button>
          )}
          {showRetry && (
            <Button
              onClick={handleRetry}
              className="rounded-xl font-extrabold"
              style={{ background: 'var(--gold)', color: '#fff' }}
            >
              New Question 🔁
            </Button>
          )}
          {!showRetry && (
            <Button
              onClick={handleNext}
              className="rounded-xl font-extrabold"
              style={{ background: 'var(--gold)', color: '#fff' }}
            >
              {qIndex + 1 >= total ? 'See Results' : 'Next →'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}