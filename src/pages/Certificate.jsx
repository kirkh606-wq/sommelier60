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
  const studentName = progress.student_name || 'Your Name';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center pt-[84px] pb-16 px-4"
      style={{ background: 'linear-gradient(160deg, #1a0a0a 0%, #2e1010 50%, #1a0a0a 100%)' }}
    >
      {/* Certificate */}
      <motion.div
        className="w-full"
        style={{ maxWidth: '900px' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Outermost shadow frame */}
        <div style={{
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,149,42,0.3)',
          borderRadius: '4px',
        }}>
          {/* Gold outer border */}
          <div style={{
            background: 'linear-gradient(135deg, #C9952A 0%, #F5D98B 25%, #8B6914 50%, #F5D98B 75%, #C9952A 100%)',
            padding: '6px',
            borderRadius: '4px',
          }}>
            {/* Dark inner mat */}
            <div style={{
              background: '#1a0808',
              padding: '10px',
              borderRadius: '2px',
            }}>
              {/* Gold inner border */}
              <div style={{
                background: 'linear-gradient(135deg, #C9952A 0%, #F5D98B 25%, #8B6914 50%, #F5D98B 75%, #C9952A 100%)',
                padding: '2px',
                borderRadius: '1px',
              }}>
                {/* Parchment body */}
                <div
                  style={{
                    background: 'linear-gradient(160deg, #FEFCF0 0%, #F8F0D8 30%, #FDF5E4 60%, #FEFCF2 100%)',
                    padding: '48px 56px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Parchment texture overlay */}
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
                    backgroundImage: 'repeating-linear-gradient(0deg, #6B3F2A 0, #6B3F2A 1px, transparent 0, transparent 12px), repeating-linear-gradient(90deg, #6B3F2A 0, #6B3F2A 1px, transparent 0, transparent 12px)',
                  }} />

                  {/* Corner ornaments — SVG */}
                  {[
                    { top: 0, left: 0, rotate: 0 },
                    { top: 0, right: 0, rotate: 90 },
                    { bottom: 0, right: 0, rotate: 180 },
                    { bottom: 0, left: 0, rotate: 270 },
                  ].map((pos, i) => (
                    <svg key={i} width="70" height="70" viewBox="0 0 70 70" style={{ position: 'absolute', ...Object.fromEntries(Object.entries(pos).filter(([k]) => k !== 'rotate')), transform: `rotate(${pos.rotate}deg)`, pointerEvents: 'none' }}>
                      <path d="M4,4 L4,35 M4,4 L35,4" stroke="#C9952A" strokeWidth="2.5" fill="none"/>
                      <path d="M4,4 L4,18 M4,4 L18,4" stroke="#C9952A" strokeWidth="1" fill="none" opacity="0.5"/>
                      <path d="M10,4 L10,14 M4,10 L14,10" stroke="#C9952A" strokeWidth="0.75" fill="none" opacity="0.4"/>
                      <circle cx="4" cy="4" r="4" fill="#C9952A"/>
                      <circle cx="4" cy="4" r="2" fill="#F5D98B"/>
                    </svg>
                  ))}

                  {/* TOP: Institution header */}
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '6px', textTransform: 'uppercase', color: '#C9952A', marginBottom: '4px', fontFamily: 'var(--font-nunito)' }}>
                      Sommelier in 60 Days
                    </div>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9952A 20%, #C9952A 80%, transparent)', marginBottom: '2px' }} />
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #8B6914 20%, #8B6914 80%, transparent)', marginBottom: '2px' }} />
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9952A 20%, #C9952A 80%, transparent)' }} />
                  </div>

                  {/* MAIN BODY: 3-column */}
                  <div style={{ display: 'flex', gap: '40px', alignItems: 'stretch' }}>

                    {/* LEFT: Seal column */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100px', flexShrink: 0 }}>
                      {/* Grape icon */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '36px', lineHeight: 1, marginBottom: '4px' }}>🍇</div>
                        <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9952A', fontFamily: 'var(--font-nunito)' }}>Est. 2024</div>
                      </div>

                      {/* Vertical rule */}
                      <div style={{ flex: 1, width: '1px', margin: '16px 0', background: 'linear-gradient(180deg, transparent, #C9952A 30%, #C9952A 70%, transparent)' }} />

                      {/* Gold Seal */}
                      <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 30%, #F5D98B, #C9952A 55%, #7A5010)',
                        border: '4px solid #8B6914',
                        boxShadow: '0 6px 24px rgba(201,149,42,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: '0 1px 2px rgba(0,0,0,0.4)', fontFamily: 'var(--font-nunito)' }}>S·60</div>
                        <div style={{ fontSize: '8px', fontWeight: 900, color: 'rgba(255,255,255,0.85)', lineHeight: 1, marginTop: '3px', fontFamily: 'var(--font-nunito)' }}>LEVEL I</div>
                        <div style={{ fontSize: '7px', fontWeight: 900, color: 'rgba(255,255,255,0.7)', lineHeight: 1, marginTop: '2px', letterSpacing: '1px', fontFamily: 'var(--font-nunito)' }}>CERTIFIED</div>
                      </div>
                    </div>

                    {/* Vertical divider */}
                    <div style={{ width: '1px', background: 'linear-gradient(180deg, transparent, #C9952A88 20%, #C9952A88 80%, transparent)', flexShrink: 0 }} />

                    {/* CENTER: Main content */}
                    <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                      <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '5px', textTransform: 'uppercase', color: '#7a3020', marginBottom: '10px', fontFamily: 'var(--font-nunito)' }}>
                        Certificate of Completion
                      </div>

                      {/* Decorative rule */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', justifyContent: 'center' }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #C9952A)' }} />
                        <span style={{ color: '#C9952A', fontSize: '14px' }}>❧</span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #C9952A, transparent)' }} />
                      </div>

                      <p style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic', fontSize: '14px', color: '#8a6040', marginBottom: '6px' }}>
                        This is to certify that
                      </p>

                      {/* Student name */}
                      <div style={{
                        fontFamily: 'var(--font-fraunces)',
                        fontSize: 'clamp(28px, 4vw, 46px)',
                        fontWeight: 700,
                        color: '#3d0a18',
                        lineHeight: 1.1,
                        marginBottom: '6px',
                      }}>
                        {studentName}
                      </div>

                      {/* Name underline */}
                      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C9952A 15%, #C9952A 85%, transparent)', margin: '0 40px 16px' }} />

                      <p style={{ fontSize: '11px', fontWeight: 600, color: '#4a2828', lineHeight: 1.7, marginBottom: '18px', fontFamily: 'var(--font-nunito)' }}>
                        has successfully completed all sixty days of rigorous coursework,<br />
                        tastings, and examinations required by the
                      </p>

                      {/* Program name banner */}
                      <div style={{
                        background: 'linear-gradient(135deg, #3d0a18, #5a1025)',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        position: 'relative',
                        border: '1px solid rgba(201,149,42,0.4)',
                      }}>
                        <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,217,139,0.7)', marginBottom: '3px', fontFamily: 'var(--font-nunito)' }}>
                          S60 · Level I · Elite Floor Program
                        </div>
                        <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '18px', fontWeight: 700, color: '#F5D98B', letterSpacing: '0.5px' }}>
                          Sommelier Foundations
                        </div>
                      </div>

                      {/* Stats row */}
                      <div style={{
                        display: 'flex', justifyContent: 'center', gap: '0',
                        border: '1px solid rgba(201,149,42,0.35)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.5)',
                      }}>
                        {[
                          { value: '60', label: 'Days Completed' },
                          { value: 'Level I', label: 'Certification' },
                          { value: 'Floor', label: 'Ready Status' },
                        ].map((item, i) => (
                          <div key={i} style={{
                            flex: 1, textAlign: 'center', padding: '10px 0',
                            borderLeft: i > 0 ? '1px solid rgba(201,149,42,0.25)' : 'none',
                          }}>
                            <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: '15px', fontWeight: 700, color: '#3d0a18' }}>{item.value}</div>
                            <div style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#9a6a3a', fontFamily: 'var(--font-nunito)' }}>{item.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vertical divider */}
                    <div style={{ width: '1px', background: 'linear-gradient(180deg, transparent, #C9952A88 20%, #C9952A88 80%, transparent)', flexShrink: 0 }} />

                    {/* RIGHT: Date & credential */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100px', flexShrink: 0 }}>
                      {/* Wine glass */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '36px', lineHeight: 1, marginBottom: '4px' }}>🍷</div>
                        <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9952A', textAlign: 'center', fontFamily: 'var(--font-nunito)', lineHeight: 1.4 }}>
                          Sommelier<br/>in 60 Days
                        </div>
                      </div>

                      {/* Vertical rule */}
                      <div style={{ flex: 1, width: '1px', margin: '16px 0', background: 'linear-gradient(180deg, transparent, #C9952A 30%, #C9952A 70%, transparent)' }} />

                      {/* Date block */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '1px', background: '#C9952A', marginBottom: '8px' }} />
                        <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a6a3a', marginBottom: '4px', fontFamily: 'var(--font-nunito)' }}>Issued</div>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: '#3d0a18', lineHeight: 1.4, fontFamily: 'var(--font-nunito)' }}>{today}</div>
                        <div style={{ width: '80px', height: '1px', background: '#C9952A', margin: '8px 0' }} />
                        <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: '#9a6a3a', marginBottom: '4px', fontFamily: 'var(--font-nunito)' }}>Credential</div>
                        <div style={{ fontSize: '8px', fontWeight: 900, color: '#5a1025', fontFamily: 'var(--font-nunito)' }}>{credId}</div>
                        <div style={{ width: '80px', height: '1px', background: '#C9952A', marginTop: '8px' }} />
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM: triple rule */}
                  <div style={{ marginTop: '28px' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9952A 20%, #C9952A 80%, transparent)', marginBottom: '2px' }} />
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #8B6914 20%, #8B6914 80%, transparent)', marginBottom: '2px' }} />
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9952A 20%, #C9952A 80%, transparent)', marginBottom: '6px' }} />
                    <div style={{ textAlign: 'center', fontSize: '8px', fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase', color: '#C9952A', fontFamily: 'var(--font-nunito)' }}>
                      Sommelier in 60 Days · S60 Level I · Authorised Certificate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex gap-4 mt-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button variant="outline" onClick={() => navigate('/map')}
          className="rounded-xl font-extrabold"
          style={{ borderColor: 'rgba(201,149,42,0.5)', color: '#C9952A', background: 'rgba(201,149,42,0.08)' }}>
          ← Back to Map
        </Button>
      </motion.div>

      {/* Review CTA */}
      <motion.div
        className="max-w-[600px] w-full rounded-3xl p-8 text-center mt-6 border-[3px] shadow-lg"
        style={{ background: 'linear-gradient(135deg, var(--gold-light), #FFF9F0)', borderColor: 'var(--gold)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-4xl mb-3 tracking-wider">⭐⭐⭐⭐⭐</div>
        <h3 className="font-fraunces text-xl font-bold mb-2" style={{ color: 'var(--grape-dark)' }}>
          You just earned your Level I Certificate.
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