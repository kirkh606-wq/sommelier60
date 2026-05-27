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
  const studentName = progress.student_name || 'Student';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-[84px] pb-16 px-4">

      {/* Landscape Certificate */}
      <motion.div
        className="w-full"
        style={{ maxWidth: '860px' }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18, delay: 0.1 }}
      >
        {/* Outer dark frame */}
        <div
          className="p-2.5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #1a0808, #3d1018)',
            boxShadow: '0 32px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,149,42,0.2)',
          }}
        >
          {/* Gold gradient border */}
          <div
            className="p-[2px] rounded-xl"
            style={{ background: 'linear-gradient(135deg, #C9952A, #F5D98B, #C9952A, #8B6914, #F5D98B, #C9952A)' }}
          >
            {/* Cream parchment body */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #FFFEF8 0%, #FAF3DC 40%, #FDF8EC 70%, #FFFEF8 100%)' }}
            >
              {/* Subtle diagonal grid watermark */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #7C3FA0 0, #7C3FA0 1px, transparent 0, transparent 24px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Corner ornaments */}
              <svg className="absolute top-0 left-0 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none">
                <path d="M8,8 L8,40 M8,8 L40,8" stroke="#C9952A" strokeWidth="2"/>
                <path d="M8,8 L8,24 M8,8 L24,8" stroke="#C9952A" strokeWidth="1" opacity="0.5"/>
                <circle cx="8" cy="8" r="4" fill="#C9952A"/>
                <circle cx="8" cy="8" r="2" fill="#F5D98B"/>
              </svg>
              <svg className="absolute top-0 right-0 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none">
                <path d="M88,8 L88,40 M88,8 L56,8" stroke="#C9952A" strokeWidth="2"/>
                <path d="M88,8 L88,24 M88,8 L72,8" stroke="#C9952A" strokeWidth="1" opacity="0.5"/>
                <circle cx="88" cy="8" r="4" fill="#C9952A"/>
                <circle cx="88" cy="8" r="2" fill="#F5D98B"/>
              </svg>
              <svg className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none">
                <path d="M8,88 L8,56 M8,88 L40,88" stroke="#C9952A" strokeWidth="2"/>
                <path d="M8,88 L8,72 M8,88 L24,88" stroke="#C9952A" strokeWidth="1" opacity="0.5"/>
                <circle cx="8" cy="88" r="4" fill="#C9952A"/>
                <circle cx="8" cy="88" r="2" fill="#F5D98B"/>
              </svg>
              <svg className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none">
                <path d="M88,88 L88,56 M88,88 L56,88" stroke="#C9952A" strokeWidth="2"/>
                <path d="M88,88 L88,72 M88,88 L72,88" stroke="#C9952A" strokeWidth="1" opacity="0.5"/>
                <circle cx="88" cy="88" r="4" fill="#C9952A"/>
                <circle cx="88" cy="88" r="2" fill="#F5D98B"/>
              </svg>

              {/* Inner gold rule top */}
              <div className="mx-14 mt-10">
                <div className="h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent, #C9952A 20%, #C9952A 80%, transparent)' }} />
                <div className="h-px mt-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,149,42,0.4) 20%, rgba(201,149,42,0.4) 80%, transparent)' }} />
              </div>

              {/* MAIN LAYOUT: 3-column */}
              <div className="flex items-stretch px-10 py-6 gap-8">

                {/* LEFT COLUMN — seal + stats */}
                <div className="flex flex-col items-center justify-between shrink-0 w-32">
                  {/* Top grape cluster decoration */}
                  <div className="text-center">
                    <div className="text-4xl mb-1">🍇</div>
                    <div className="text-[8px] font-black tracking-[2px] uppercase" style={{ color: '#C9952A' }}>
                      Est. 2024
                    </div>
                  </div>

                  {/* Vertical divider line */}
                  <div className="flex-1 w-px my-4" style={{ background: 'linear-gradient(180deg, transparent, #C9952A88, transparent)' }} />

                  {/* Gold seal */}
                  <div
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 relative"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #F5D98B, #C9952A 50%, #8B6914)',
                      borderColor: '#8B6914',
                      boxShadow: '0 6px 20px rgba(201,149,42,0.5), inset 0 1px 3px rgba(255,255,255,0.4)'
                    }}
                  >
                    <div className="text-[11px] font-black text-white leading-none text-center drop-shadow">S60</div>
                    <div className="text-[8px] font-black text-white/90 leading-none mt-0.5">LEVEL 1</div>
                    <div className="text-[6px] font-black text-white/70 leading-none mt-0.5 tracking-wider">CERTIFIED</div>
                  </div>
                </div>

                {/* CENTER COLUMN — main certificate content */}
                <div className="flex-1 text-center flex flex-col justify-between">

                  {/* Institution banner */}
                  <div>
                    <div
                      className="relative mx-auto px-6 py-3 rounded-lg mb-4"
                      style={{
                        background: 'linear-gradient(135deg, #3d0a18, #5a1025)',
                        maxWidth: '420px'
                      }}
                    >
                      {/* Arrow tabs */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3">
                        <div className="w-0 h-0" style={{ borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderRight: '12px solid #3d0a18' }} />
                      </div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3">
                        <div className="w-0 h-0" style={{ borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: '12px solid #5a1025' }} />
                      </div>
                      <div className="absolute inset-[3px] rounded border pointer-events-none" style={{ borderColor: 'rgba(245,217,139,0.35)' }} />
                      <div className="text-[9px] font-black tracking-[3px] uppercase mb-0.5" style={{ color: '#F5D98B99' }}>
                        S60 · Level 1
                      </div>
                      <div className="font-fraunces text-lg font-bold text-white tracking-wide">
                        Sommelier Foundations
                      </div>
                      <div className="text-[8px] font-black tracking-[2.5px] uppercase mt-0.5" style={{ color: 'rgba(245,217,139,0.6)' }}>
                        Elite Floor Program
                      </div>
                    </div>

                    {/* Certificate of Completion */}
                    <div className="text-[10px] font-black tracking-[4px] uppercase mb-2" style={{ color: '#5a1025' }}>
                      Certificate of Completion
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, #C9952A)' }} />
                      <span className="text-xs" style={{ color: '#C9952A' }}>★</span>
                      <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, #C9952A, transparent)' }} />
                    </div>

                    {/* This certifies that */}
                    <p className="font-fraunces italic text-sm mb-1" style={{ color: '#8a6040' }}>
                      This certifies that
                    </p>

                    {/* Student name — the hero element */}
                    <div
                      className="font-fraunces text-[clamp(26px,4vw,40px)] font-bold leading-tight mb-1"
                      style={{ color: '#3d0a18' }}
                    >
                      {studentName}
                    </div>
                    <div className="h-px mx-10 mb-3" style={{ background: 'linear-gradient(90deg, transparent, #C9952A77, transparent)' }} />

                    <p className="text-xs font-semibold leading-relaxed" style={{ color: '#4a2828' }}>
                      has successfully completed the rigorous curriculum and assessments of the<br />
                      <span className="font-black text-sm" style={{ color: '#3d0a18' }}>S60 Level 1 Sommelier Program</span>
                    </p>
                  </div>

                  {/* Stats */}
                  <div
                    className="flex justify-around items-center mt-4 py-3 px-4 rounded-xl border"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      borderColor: '#C9952A44',
                      boxShadow: 'inset 0 1px 3px rgba(201,149,42,0.08)'
                    }}
                  >
                    {[
                      { value: '60', label: 'Days' },
                      { value: 'Level 1', label: 'Complete' },
                      { value: 'Floor', label: 'Ready' },
                    ].map((item, i) => (
                      <div key={i} className="text-center flex-1 relative">
                        {i > 0 && <div className="absolute left-0 inset-y-0 w-px" style={{ background: '#C9952A33' }} />}
                        <div className="font-fraunces text-base font-bold" style={{ color: '#3d0a18' }}>{item.value}</div>
                        <div className="text-[9px] font-black tracking-wider uppercase" style={{ color: '#9a6a3a' }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN — signatures + date */}
                <div className="flex flex-col justify-between shrink-0 w-32">
                  {/* Top decoration */}
                  <div className="text-center">
                    <div className="text-4xl mb-1">🍷</div>
                    <div className="text-[8px] font-black tracking-[2px] uppercase text-center" style={{ color: '#C9952A' }}>
                      Sommelier<br/>in 60 Days
                    </div>
                  </div>

                  {/* Vertical line */}
                  <div className="flex-1 w-px my-4 mx-auto" style={{ background: 'linear-gradient(180deg, transparent, #C9952A88, transparent)' }} />

                  {/* Date & credential */}
                  <div className="text-right">
                    <div className="h-px mb-1" style={{ background: 'linear-gradient(90deg, transparent, #C9952A)' }} />
                    <div className="text-[8px] font-black tracking-[1.5px] uppercase mb-0.5" style={{ color: '#9a6a3a' }}>Date Issued</div>
                    <div className="text-[10px] font-black" style={{ color: '#3d0a18' }}>{today}</div>

                    <div className="h-px mt-3 mb-1" style={{ background: 'linear-gradient(90deg, transparent, #C9952A)' }} />
                    <div className="text-[8px] font-black tracking-[1.5px] uppercase mb-0.5" style={{ color: '#9a6a3a' }}>Credential</div>
                    <div className="text-[9px] font-black" style={{ color: '#5a1025' }}>{credId}</div>
                  </div>
                </div>
              </div>

              {/* Inner gold rule bottom */}
              <div className="mx-14 mb-10">
                <div className="h-px mb-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,149,42,0.4) 20%, rgba(201,149,42,0.4) 80%, transparent)' }} />
                <div className="h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent, #C9952A 20%, #C9952A 80%, transparent)' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back button */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline" onClick={() => navigate('/map')} className="rounded-xl font-extrabold">
          ← Back to Map
        </Button>
      </motion.div>

      {/* Review CTA */}
      <motion.div
        className="max-w-[600px] w-full rounded-3xl p-8 text-center mt-6 border-[3px] shadow-lg"
        style={{
          background: 'linear-gradient(135deg, var(--gold-light), #FFF9F0)',
          borderColor: 'var(--gold)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-4xl mb-3 tracking-wider">⭐⭐⭐⭐⭐</div>
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