import { Link, useLocation } from 'react-router-dom';
import { Map, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/map', icon: Map, label: 'Journey' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t-2 border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center max-w-[480px] mx-auto">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors"
              style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-black tracking-wide transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}