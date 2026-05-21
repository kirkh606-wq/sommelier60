import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { ProgressProvider } from '@/lib/useProgress.jsx';
import { ThemeProvider } from '@/lib/ThemeProvider';
import AppLayout from '@/components/sommelier/AppLayout';
import Landing from '@/pages/Landing';
import Map from '@/pages/Map';
import Lesson from '@/pages/Lesson';
import Quiz from '@/pages/Quiz';
import Certificate from '@/pages/Certificate';
import Settings from '@/pages/Settings';
import AppStoreAssets from '@/pages/AppStoreAssets';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<Map />} />
          <Route path="/lesson/:dayNum" element={<Lesson />} />
          <Route path="/quiz/:dayNum" element={<Quiz />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/app-store-assets" element={<AppStoreAssets />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ProgressProvider>
  );
};


function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App