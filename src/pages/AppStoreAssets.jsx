import { motion } from 'framer-motion';
import { Download, Image } from 'lucide-react';

const SCREENSHOTS = [
  {
    title: 'Home Screen',
    desc: 'Landing / Onboarding',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/21c94b630_generated_image.png',
  },
  {
    title: 'Journey Map',
    desc: 'Course overview screen',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/5f3a11ada_generated_image.png',
  },
  {
    title: 'Quiz Screen',
    desc: 'Learn by doing',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/87a8e3ac2_generated_image.png',
  },
  {
    title: 'Certificate',
    desc: 'Completion screen',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/80f280ef1_generated_image.png',
  },
];

export default function AppStoreAssets() {
  function handleDownload(url, title) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.png`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-16 px-5 max-w-[600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Image className="w-5 h-5 text-primary" />
          <h1 className="font-fraunces text-2xl font-bold text-primary">App Store Assets</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Tap an image to open it, then press and hold to save to your camera roll.
        </p>

        <div className="grid grid-cols-1 gap-5">
          {SCREENSHOTS.map((s, i) => (
            <motion.div
              key={i}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={s.url}
                  alt={s.title}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </a>
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <button
                  onClick={() => handleDownload(s.url, s.title)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black"
                  style={{ background: 'var(--gold)', color: '#fff' }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Save
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          📱 On iPhone: tap image → tap & hold → "Save to Photos"
        </p>
      </motion.div>
    </div>
  );
}