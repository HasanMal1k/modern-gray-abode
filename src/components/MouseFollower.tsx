
import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface TargetElement {
  element: HTMLElement | null;
  width: number;
  height: number;
  x: number;
  y: number;
}

const MouseFollower = () => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [targetElement, setTargetElement] = useState<TargetElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add a style to hide the default cursor on the whole page
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      // Set the position directly to the mouse coordinates
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible && e.clientY > 0) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check for interactive elements under the cursor
    const checkForInteractiveElements = (e: MouseEvent) => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      const elementUnderCursor = Array.from(interactiveElements).find(el => {
        const rect = el.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      }) as HTMLElement | null;

      if (elementUnderCursor) {
        const rect = elementUnderCursor.getBoundingClientRect();
        setTargetElement({
          element: elementUnderCursor,
          width: rect.width,
          height: rect.height,
          x: rect.left,
          y: rect.top
        });
        setIsHovering(true);
      } else {
        setIsHovering(false);
        setTargetElement(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkForInteractiveElements);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Clean up the cursor style when component unmounts
    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkForInteractiveElements);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Single neon orange cursor that expands on hover */}
      <div 
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 rounded-full ${isHovering ? 'w-6 h-6 bg-[#F97316]/80' : 'w-4 h-4 bg-[#F97316]/90'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px 2px rgba(249, 115, 22, 0.5), 0 0 20px 6px rgba(249, 115, 22, 0.3)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out'
        }}
      />
    </>
  );
};

export default MouseFollower;
