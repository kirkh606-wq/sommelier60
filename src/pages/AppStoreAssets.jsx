import { motion } from 'framer-motion';

const SCREENSHOTS = [
  {
    title: '1 — Home Screen',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/62bd14b35_generated_image.png',
  },
  {
    title: '2 — Journey Map',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/f676ab78c_generated_image.png',
  },
  {
    title: '3 — Quiz Screen',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/3028ba742_generated_image.png',
  },
  {
    title: '4 — Certificate',
    url: 'https://media.base44.com/images/public/6a0f1419615b4c17815775c8/d77d2e790_generated_image.png',
  },
];

export default function AppStoreAssets() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-16 px-4 max-w-[600px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-fraunces text-2xl font-bold text-primary mb-1">App Store Screenshots</h1>
        <p className="text-sm text-muted-foreground mb-2 font-semibold">
          Tap <strong>"Open Full Screen"</strong> under each image, then press & hold the full image → <strong>Save to Photos</strong>.
        </p>
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 mb-6 text-sm font-bold text-amber-800">
          📱 iPhone tip: Open full screen → tap & hold the image → "Add to Photos"
        </div>

        <div className="flex flex-col gap-8">
          {SCREENSHOTS.map((s, i) => (
            <motion.div
              key={i}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={s.url}
                alt={s.title}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <p className="font-extrabold text-sm">{s.title}</p>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 rounded-xl text-sm font-black text-white"
                  style={{ background: 'var(--grape)' }}
                >
                  Open Full Screen
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}