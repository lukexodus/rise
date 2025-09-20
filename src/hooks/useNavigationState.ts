import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useNavigationState() {
  const navigate = useNavigate();
  const location = useLocation();

  // Store scroll position and navigation context
  const storeNavigationState = useCallback((context: string) => {
    const currentPosition = window.innerWidth < 1024 
      ? window.scrollY 
      : document.querySelector('.overflow-y-auto')?.scrollTop || 0;
    
    const navigationState = {
      scrollPosition: currentPosition,
      fromPath: location.pathname,
      searchParams: location.search,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`nav_${context}`, JSON.stringify(navigationState));
  }, [location]);

  // Restore scroll position and handle navigation
  const restoreNavigationState = useCallback((context: string, fallbackPath: string = '/') => {
    const stored = localStorage.getItem(`nav_${context}`);
    if (stored) {
      try {
        const state = JSON.parse(stored);
        // Navigate back to the stored path with search params
        const targetPath = state.fromPath + state.searchParams;
        navigate(targetPath);
        
        // Restore scroll position after navigation
        setTimeout(() => {
          const position = state.scrollPosition || 0;
          if (window.innerWidth < 1024) {
            window.scrollTo({ top: position, behavior: "smooth" });
          } else {
            const mainContent = document.querySelector('.overflow-y-auto');
            if (mainContent) {
              mainContent.scrollTo({ top: position, behavior: "smooth" });
            }
          }
          // Clean up after restoring
          localStorage.removeItem(`nav_${context}`);
        }, 100);
        
        return true;
      } catch (error) {
        console.error('Error restoring navigation state:', error);
      }
    }
    
    // Fallback navigation
    navigate(fallbackPath);
    return false;
  }, [navigate]);

  // Enhanced navigate function that stores state
  const navigateWithState = useCallback((path: string, context: string) => {
    storeNavigationState(context);
    navigate(path);
  }, [navigate, storeNavigationState]);

  return {
    storeNavigationState,
    restoreNavigationState,
    navigateWithState
  };
}