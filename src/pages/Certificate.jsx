import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/lib/useProgress.jsx';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Certificate() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [credId] = useState(() => 'S60-' + Math.floor(100000 + Math.random() * 900000));
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-[100px] pb-16 px-5">
      {/* Certificate */}
      <motion.div
        className="max-w-[700px] w-full rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden border-4"
        style={{
          background: 'linear-gradient(135deg, #1A0A2E, #3A1550)',
          borderColor: 'var(--gold)',
          boxShadow: '0 28px 80px rgba(201,149,42,0.3)',
        }}
        initial={{ scale: 0.78, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.2 }}
      >
        {/* Dashed inner border */}
        <div className="absolute inset-3.5 border-2 border-dashed rounded-[28px] pointer-events-none" style={{ borderColor: 'rgba(201,149,42,0.3)' }} />

        <span className="text-7xl block mb-4 relative z-10">🏆</span>

        <div className="text-[11px] font-black tracking-[3px] uppercase mb-4" style={{ color: 'var(--gold)' }}>
          This Advanced Certificate is Awarded to
        </div>

        <div
          className="font-fraunces italic text-[clamp(32px,5vw,50px)] font-bold mb-1.5 relative z-10"
          style={{ color: 'var(--gold)' }}
        >
          {progress.student_name || 'Student Name'}
        </div>

        <div className="font-fraunces text-[clamp(17px,3vw,26px)] font-bold text-white mb-1">
          Sommelier in 60 Days Certificate
        </div>
        <div className="text-sm font-semibold text-white/60 mb-5">
          Sommelier in 60 Days
        </div>

        <div className="w-20 h-1.5 rounded-full mx-auto mb-5" style={{ background: 'linear-gradient(90deg, var(--gold), var(--rose))' }} />

        <p className="text-sm leading-[1.85] text-white/75 max-w-md mx-auto mb-6">
          Having successfully completed all 60 days of the Sommelier in 60 Days curriculum and passed the
          comprehensive 20-question final assessment with a score of 85% or above, demonstrating advanced
          proficiency in wine history, blind tasting methodology, regional depth, wine program management,
          and elite floor service.
        </p>

        <div className="text-[11px] font-extrabold tracking-[2px] mb-6" style={{ color: 'var(--gold)' }}>
          Credential No. {credId}
        </div>

        <div className="flex justify-center gap-12">
          <div>
            <div className="w-24 h-0.5 mx-auto mb-2" style={{ background: 'rgba(201,149,42,0.4)' }} />
            <div className="text-[10px] font-black tracking-[1.5px] uppercase text-white/50">
              Program Director
            </div>
          </div>
          <div>
            <div className="w-24 h-0.5 mx-auto mb-2" style={{ background: 'rgba(201,149,42,0.4)' }} />
            <div className="text-[10px] font-black tracking-[1.5px] uppercase text-white/50">
              {today}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => navigate('/map')}
            className="rounded-xl font-extrabold"
            style={{ background: 'var(--gold)', color: '#fff' }}
          >
            ← Back to Course
          </Button>
        </div>
      </motion.div>

      {/* Review CTA */}
      <motion.div
        className="max-w-[540px] w-full rounded-3xl p-8 text-center mt-6 border-[3px] shadow-lg"
        style={{
          background: 'linear-gradient(135deg, var(--gold-light), #FFF9F0)',
          borderColor: 'var(--gold)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-4xl mb-3.5 tracking-wider">⭐⭐⭐⭐⭐</div>
        <h3 className="font-fraunces text-xl font-bold mb-2" style={{ color: 'var(--grape-dark)' }}>
          You just earned your Level 2 Certificate.
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          If this course changed how you think about wine — we'd love a 5-star review. It takes 30 seconds
          and helps other hospitality professionals find us.
        </p>
        <a
          href="https://sommelierin30days.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-base px-8 py-4 rounded-2xl font-extrabold mb-3"
          style={{ background: 'var(--gold)', color: '#fff' }}
        >
          Leave a 5-Star Review ⭐
        </a>
        <p className="text-xs text-muted-foreground font-bold">Thank you for being part of this.</p>
      </motion.div>
    </div>
  );
}