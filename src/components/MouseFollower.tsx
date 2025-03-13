
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
    const handleMouseMove = (e: MouseEvent) => {
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkForInteractiveElements);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Follower styles
  const baseCircleStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    opacity: isVisible ? 1 : 0,
  };

  return (
    <>
      {/* Main neon orange cursor */}
      <div 
        className={`fixed w-4 h-4 pointer-events-none z-[9999] transition-transform duration-300 rounded-full ${isHovering ? 'scale-150 bg-[#F97316]/80' : 'bg-[#F97316]/90'}`}
        style={{
          ...baseCircleStyle,
          boxShadow: '0 0 10px 2px rgba(249, 115, 22, 0.5), 0 0 20px 6px rgba(249, 115, 22, 0.3)',
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out'
        }}
      />
      
      {/* Subtle glow effect */}
      <div 
        className={`fixed w-6 h-6 pointer-events-none z-[9998] bg-[#F97316]/20 rounded-full`}
        style={{
          ...baseCircleStyle,
          transform: `translate(${position.x}px, ${position.y}px) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
      />
    </>
  );
};

export default MouseFollower;
