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
    <div className="flex flex-col items-center justify-center min-h-screen pt-[100px] pb-16 px-4">

      {/* Certificate */}
      <motion.div
        className="max-w-[720px] w-full"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18, delay: 0.1 }}
      >
        {/* Outer dark frame */}
        <div
          className="p-3 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #1a0a0a, #3a1020)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
        >
          {/* Gold border layer */}
          <div
            className="p-0.5 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #C9952A, #F5D98B, #C9952A, #8B6914)' }}
          >
            {/* Inner cream body */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #FFFDF5 0%, #FAF3DC 50%, #FFFDF5 100%)' }}
            >
              {/* Subtle watermark pattern */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #7C3FA0 0, #7C3FA0 1px, transparent 0, transparent 50%)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Corner ornaments */}
              {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-10 h-10 pointer-events-none`}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="8" stroke="#C9952A" strokeWidth="1.5" />
                    <path d={i < 2
                      ? (i === 0 ? 'M0,20 H12 M20,0 V12' : 'M40,20 H28 M20,0 V12')
                      : (i === 2 ? 'M0,20 H12 M20,40 V28' : 'M40,20 H28 M20,40 V28')
                    } stroke="#C9952A" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="3" fill="#C9952A" />
                  </svg>
                </div>
              ))}

              {/* Inner gold rule lines */}
              <div className="mx-10 mt-10">
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9952A, transparent)' }} />
              </div>

              <div className="px-10 pt-6 pb-8 text-center relative z-10">

                {/* Header banner */}
                <div
                  className="relative mx-auto mb-6 px-8 py-4 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #3a0a1a, #5a1030)', maxWidth: '480px' }}
                >
                  {/* Banner side arrows */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-0 h-0"
                    style={{ borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderRight: '14px solid #3a0a1a' }} />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-0 h-0"
                    style={{ borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderLeft: '14px solid #3a0a1a' }} />
                  {/* Gold border on banner */}
                  <div className="absolute inset-1 rounded border pointer-events-none" style={{ borderColor: 'rgba(201,149,42,0.5)' }} />

                  <div className="text-[10px] font-black tracking-[3px] uppercase mb-1" style={{ color: '#F5D98B' }}>
                    S60 · Level 1
                  </div>
                  <div className="font-fraunces text-xl font-bold text-white tracking-wide">
                    Sommelier Foundations
                  </div>
                  <div className="text-[9px] font-black tracking-[2.5px] uppercase mt-1" style={{ color: 'rgba(245,217,139,0.7)' }}>
                    Elite Floor Program
                  </div>
                </div>

                {/* Wine glass icon */}
                <div className="text-2xl mb-3">🍷</div>

                {/* Certificate of Completion */}
                <div className="text-[11px] font-black tracking-[4px] uppercase mb-1" style={{ color: '#5a1030' }}>
                  Certificate of Completion
                </div>
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #C9952A)' }} />
                  <span style={{ color: '#C9952A' }}>★</span>
                  <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #C9952A, transparent)' }} />
                </div>

                {/* This certifies that */}
                <p className="font-fraunces italic text-base mb-2" style={{ color: '#7a5a2a' }}>
                  This certifies that
                </p>

                {/* Student name */}
                <div
                  className="font-fraunces text-[clamp(28px,5vw,44px)] font-bold mb-1"
                  style={{ color: '#3a0a1a' }}
                >
                  {progress.student_name || 'Student'}
                </div>
                <div className="h-px mx-8 mb-4" style={{ background: 'linear-gradient(90deg, transparent, #C9952A88, transparent)' }} />

                {/* Body text */}
                <p className="text-sm font-semibold mb-6 leading-relaxed" style={{ color: '#4a2a2a' }}>
                  has completed the rigorous testing of the<br />
                  <span className="font-black">S60 Level 1 Sommelier Program</span>
                </p>

                {/* Stats bar */}
                <div
                  className="flex justify-around items-center mx-auto mb-7 py-4 px-6 rounded-xl border"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderColor: '#C9952A55',
                    maxWidth: '380px',
                    boxShadow: 'inset 0 1px 4px rgba(201,149,42,0.1)'
                  }}
                >
                  {[
                    { value: '60', label: 'Days' },
                    { value: 'Level 1', label: 'Complete' },
                    { value: 'Floor', label: 'Ready' },
                  ].map((item, i) => (
                    <div key={i} className="text-center flex-1">
                      {i > 0 && <div className="absolute left-0 top-2 bottom-2 w-px bg-amber-200" />}
                      <div className="font-fraunces text-lg font-bold relative" style={{ color: '#3a0a1a' }}>
                        {item.value}
                      </div>
                      <div className="text-[10px] font-black tracking-wider uppercase" style={{ color: '#9a6a3a' }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer row */}
                <div className="flex items-end justify-between">
                  {/* Left: date + program */}
                  <div className="text-left">
                    <div className="h-px w-28 mb-1" style={{ background: '#C9952A66' }} />
                    <div className="text-[9px] font-black tracking-[1.5px] uppercase" style={{ color: '#9a6a3a' }}>
                      Date of Completion
                    </div>
                    <div className="text-xs font-black" style={{ color: '#3a0a1a' }}>{today}</div>
                    <div className="mt-2">
                      <div className="h-px w-28 mb-1" style={{ background: '#C9952A66' }} />
                      <div className="text-[9px] font-black tracking-[1.5px] uppercase" style={{ color: '#9a6a3a' }}>
                        Program
                      </div>
                      <div className="text-xs font-black" style={{ color: '#3a0a1a' }}>S60 Level 1</div>
                    </div>
                  </div>

                  {/* Center: credential */}
                  <div className="text-center flex-1 mx-4">
                    <div className="text-[9px] font-black tracking-[1.5px] uppercase mb-1" style={{ color: '#9a6a3a' }}>
                      Credential No.
                    </div>
                    <div className="text-[10px] font-black" style={{ color: '#5a1030' }}>{credId}</div>
                    <div className="text-[8px] font-bold italic mt-0.5" style={{ color: '#9a6a3a' }}>
                      Sommelier in 60 Days
                    </div>
                  </div>

                  {/* Right: medal badge */}
                  <div
                    className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-center border-4 shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #C9952A, #F5D98B, #8B6914)',
                      borderColor: '#8B6914',
                      boxShadow: '0 4px 12px rgba(201,149,42,0.5)'
                    }}
                  >
                    <div className="text-[9px] font-black text-white leading-none">S60</div>
                    <div className="text-[7px] font-black text-white/80 leading-none mt-0.5">LEVEL 1</div>
                  </div>
                </div>
              </div>

              {/* Bottom rule */}
              <div className="mx-10 mb-10">
                <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9952A, transparent)' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="mt-5 flex gap-3 flex-wrap justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          onClick={() => navigate('/map')}
          className="rounded-xl font-extrabold"
        >
          ← Back to Map
        </Button>
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
        transition={{ delay: 0.7 }}
      >
        <div className="text-4xl mb-3.5 tracking-wider">⭐⭐⭐⭐⭐</div>
        <h3 className="font-fraunces text-xl font-bold mb-2" style={{ color: 'var(--grape-dark)' }}>
          You just earned your Level 1 Certificate.
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