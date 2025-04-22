import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A custom hook to manage cursor styles across the application.
 * It automatically enables normal cursor for admin pages and custom cursor for public pages.
 */
export function useCursorManager() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  useEffect(() => {
    // Handle cursor style based on the current route
    if (isAdminPage) {
      // Enable normal cursor for admin pages
      document.body.style.cursor = '';
      
      // Create a style element to override any global cursor settings
      const styleElement = document.createElement('style');
      styleElement.id = 'cursor-manager-style';
      styleElement.textContent = `
        * {
          cursor: initial !important;
        }
        a, button, [role="button"], .clickable {
          cursor: pointer !important;
        }
        input, textarea, select {
          cursor: text !important;
        }
        [data-resizable] {
          cursor: col-resize !important;
        }
        [data-draggable] {
          cursor: move !important;
        }
      `;
      
      // Add the style element to the document head
      if (!document.getElementById('cursor-manager-style')) {
        document.head.appendChild(styleElement);
      }
    } else {
      // Enable custom cursor for public pages
      document.body.style.cursor = 'none';
      
      // Remove the admin cursor style if it exists
      const styleElement = document.getElementById('cursor-manager-style');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    }
    
    // Cleanup function
    return () => {
      if (!isAdminPage) {
        // If navigating away from an admin page to a public page
        document.body.style.cursor = 'none';
        
        // Remove the admin cursor style if it exists
        const styleElement = document.getElementById('cursor-manager-style');
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      }
    };
  }, [isAdminPage, location.pathname]);
  
  return { isAdminPage };
}

export default useCursorManager;