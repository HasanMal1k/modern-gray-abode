
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Panorama360ViewerProps {
  panoramaUrl: string;
}

const Panorama360Viewer = ({ panoramaUrl }: Panorama360ViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js components
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1); // Slightly offset to prevent rendering issues

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a spherical geometry and apply the panorama texture inside-out
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip the geometry inside-out

    // Load the panorama texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load(panoramaUrl);
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Mouse/touch interaction variables
    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let onPointerDownLon = 0;
    let onPointerDownLat = 0;
    let lon = 0;
    let lat = 0;
    let phi = 0;
    let theta = 0;

    // Event handlers for mouse/touch interaction
    const onPointerDown = (event: PointerEvent) => {
      isUserInteracting = true;
      const clientX = event.clientX || (event as any).touches?.[0]?.clientX || 0;
      const clientY = event.clientY || (event as any).touches?.[0]?.clientY || 0;
      
      onPointerDownMouseX = clientX;
      onPointerDownMouseY = clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isUserInteracting) return;
      
      const clientX = event.clientX || (event as any).touches?.[0]?.clientX || 0;
      const clientY = event.clientY || (event as any).touches?.[0]?.clientY || 0;
      
      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    // Add event listeners
    containerRef.current.addEventListener('pointerdown', onPointerDown as any);
    containerRef.current.addEventListener('pointermove', onPointerMove as any);
    containerRef.current.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // If user is not interacting, slowly rotate the panorama
      if (!isUserInteracting) {
        lon += 0.05;
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('pointerdown', onPointerDown as any);
        containerRef.current.removeEventListener('pointermove', onPointerMove as any);
        containerRef.current.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('resize', handleResize);
        
        // Remove the renderer's DOM element
        if (containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      
      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [panoramaUrl]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      style={{ touchAction: 'none' }}
    >
      <div className="absolute bottom-16 left-0 right-0 text-center text-white text-sm bg-black/30 py-2 pointer-events-none">
        Drag to look around | Pinch to zoom
      </div>
    </div>
  );
};

export default Panorama360Viewer;
