import { Outlet, useLocation } from 'react-router-dom';
import HUD from './HUD';

export default function AppLayout() {
  const location = useLocation();
  const showHUD = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative gradient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[60%] h-[50%] bg-primary/[0.04] rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[50%] h-[60%] rounded-full blur-3xl translate-x-1/4 translate-y-1/4" style={{ background: 'rgba(201,149,42,0.05)' }} />
      </div>
      
      {showHUD && <HUD />}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}