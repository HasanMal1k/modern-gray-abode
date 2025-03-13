
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

  // Morphed styles when hovering interactive elements
  const morphedStyle = targetElement ? {
    transform: `translate(${targetElement.x + targetElement.width / 2}px, ${targetElement.y + targetElement.height / 2}px)`,
    width: `${targetElement.width + 10}px`,
    height: `${targetElement.height + 10}px`,
    borderRadius: `${targetElement.height > 40 ? '12px' : '20px'}`,
  } : {};

  return (
    <>
      {/* Main cursor */}
      <div 
        className="fixed w-5 h-5 bg-accent/20 rounded-full pointer-events-none z-[9999] backdrop-blur-sm border border-accent/40"
        style={baseCircleStyle}
      />
      
      {/* Background follower (slower) */}
      <div 
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-[9998] transition-all duration-300 ${isHovering ? 'bg-accent/10' : 'bg-white/5'}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(1.5)`,
          marginTop: '-4px',
          marginLeft: '-4px',
          opacity: isVisible ? 0.5 : 0,
          transitionProperty: 'opacity, background-color',
        }}
      />
      
      {/* Morphing element for hover state */}
      <div 
        className={`fixed pointer-events-none z-[9997] transition-all duration-300 ${isHovering ? 'bg-accent/10 border border-accent/20' : 'bg-transparent'}`}
        style={{ 
          ...baseCircleStyle,
          ...morphedStyle,
          transitionProperty: 'width, height, transform, border-radius',
        }}
      />
    </>
  );
};

export default MouseFollower;
