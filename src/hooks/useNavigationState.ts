import { useNavigate } from 'react-router-dom';

interface NavigationState {
  fromPage: string;
  currentPath: string;
  scrollPosition: {
    mobile: number;
    desktop: number;
  };
}

export function useNavigationState() {
  const navigate = useNavigate();

  const getCurrentScrollPosition = () => {
    const mobileScroll = window.scrollY;
    const desktopScrollContainer = document.querySelector('.desktop-main-content') as HTMLElement;
    const desktopScroll = desktopScrollContainer ? desktopScrollContainer.scrollTop : 0;
    
    return {
      mobile: mobileScroll,
      desktop: desktopScroll
    };
  };

  const setScrollPosition = (position: { mobile: number; desktop: number }) => {
    // Set mobile scroll
    window.scrollTo(0, position.mobile);
    
    // Set desktop scroll
    const desktopScrollContainer = document.querySelector('.desktop-main-content') as HTMLElement;
    if (desktopScrollContainer) {
      desktopScrollContainer.scrollTop = position.desktop;
    }
  };

  const navigateWithState = (path: string, fromPageKey: string) => {
    // Store current scroll position
    const currentScroll = getCurrentScrollPosition();
    
    // Store the CURRENT path (where we're coming from), not the destination
    const currentPath = window.location.pathname + window.location.search;
    
    const navigationState: NavigationState = {
      fromPage: fromPageKey,
      currentPath: currentPath, // This should be the current location, not the destination
      scrollPosition: currentScroll
    };
    
    // Store navigation state in sessionStorage with the destination path as key
    sessionStorage.setItem(`nav-state-${path.split('?')[0]}`, JSON.stringify(navigationState));
    console.log('Storing navigation state:', navigationState, 'with key:', `nav-state-${path.split('?')[0]}`); // Debug log
    
    // Navigate to new path
    navigate(path);
  };

  const restoreNavigationState = (currentPageKey: string) => {
    const currentPath = window.location.pathname;
    const stateKey = `nav-state-${currentPath}`;
    console.log('Attempting to restore navigation state with key:', stateKey); // Debug log
    const savedState = sessionStorage.getItem(stateKey);
    console.log('Saved state found:', savedState ? 'Yes' : 'No'); // Debug log
    
    if (savedState) {
      try {
        const state: NavigationState = JSON.parse(savedState);
        console.log('Parsed state:', state); // Debug log
        
        // Clean up the state
        sessionStorage.removeItem(stateKey);
        
        // Navigate back to the previous page
        console.log('Navigating to:', state.currentPath); // Debug log
        navigate(state.currentPath);
        
        // Restore scroll position after a short delay
        setTimeout(() => {
          console.log('Restoring scroll position:', state.scrollPosition); // Debug log
          setScrollPosition(state.scrollPosition);
        }, 100);
        
        return true;
      } catch (e) {
        console.error('Failed to restore navigation state:', e);
      }
    }
    
    return false;
  };

  return {
    navigateWithState,
    restoreNavigationState
  };
}