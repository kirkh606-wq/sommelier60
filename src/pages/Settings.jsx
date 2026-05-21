import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeProvider';
import { useProgress } from '@/lib/useProgress.jsx';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sun, Moon, Trash2, LogOut, ChevronRight, User, Image } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { progress } = useProgress();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      await base44.auth.deleteAccount();
    } catch {
      // fallback: just logout
    }
    logout();
  }

  return (
    <div className="pt-[84px] pb-24 px-5 max-w-[480px] mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-fraunces text-2xl font-bold mb-1">
          <span className="text-primary">Settings</span>
        </h1>
        <p className="text-sm text-muted-foreground font-semibold mb-8">Manage your account & preferences</p>

        {/* Profile */}
        <div className="bg-card border-2 border-border rounded-2xl p-5 mb-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-extrabold text-base">{progress.student_name || user?.full_name || 'Sommelier Student'}</p>
            <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">Appearance</span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/50 transition-colors"
          >
            {theme === 'dark' ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
            <span className="font-bold flex-1 text-left">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            <div className={`w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-border'} relative`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
            </div>
          </button>
        </div>

        {/* Account */}
        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">Account</span>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/50 transition-colors border-b border-border"
          >
            <LogOut className="w-5 h-5 text-muted-foreground" />
            <span className="font-bold flex-1 text-left">Sign Out</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-destructive" />
            <span className="font-bold flex-1 text-left text-destructive">Delete Account</span>
            <ChevronRight className="w-4 h-4 text-destructive/60" />
          </button>
        </div>

        {/* App Store Assets */}
        <div className="bg-card border-2 border-border rounded-2xl overflow-hidden mb-4">
          <div className="px-5 py-3 border-b border-border">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">Developer</span>
          </div>
          <button
            onClick={() => navigate('/app-store-assets')}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/50 transition-colors"
          >
            <Image className="w-5 h-5 text-primary" />
            <span className="font-bold flex-1 text-left">App Store Assets</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* App info */}
        <p className="text-center text-xs text-muted-foreground mt-6">Sommelier in 60 Days · v1.0</p>
      </motion.div>

      {/* Delete Confirm Bottom Sheet */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[500] bg-foreground/60 backdrop-blur-sm flex items-end" onClick={() => setShowDeleteConfirm(false)}>
          <motion.div
            className="w-full bg-card rounded-t-3xl p-6 pb-10"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-border mx-auto mb-6" />
            <span className="text-4xl block text-center mb-3">⚠️</span>
            <h2 className="font-fraunces text-xl font-bold text-center mb-2">Delete Account?</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              This will permanently delete your account and all progress. This cannot be undone.
            </p>
            <Button
              variant="destructive"
              className="w-full mb-3 py-6 font-extrabold rounded-2xl"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Yes, Delete My Account'}
            </Button>
            <Button
              variant="outline"
              className="w-full py-6 font-extrabold rounded-2xl"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}