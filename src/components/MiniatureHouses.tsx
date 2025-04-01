
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const MiniatureHouses = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 2, 5);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    // Create houses function
    const createHouse = (color: string, posX: number, scale: number = 1) => {
      const houseGroup = new THREE.Group();
      
      // House base
      const baseGeometry = new THREE.BoxGeometry(1, 0.8, 1);
      const baseMaterial = new THREE.MeshStandardMaterial({ color });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      houseGroup.add(base);
      
      // Roof
      const roofGeometry = new THREE.ConeGeometry(0.8, 0.6, 4);
      const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: color === "#FDE1D3" ? "#FFDEE2" : 
               color === "#FFDEE2" ? "#FDE1D3" : 
               color === "#FEF7CD" ? "#D3E4FD" : 
               color === "#D3E4FD" ? "#FEF7CD" : 
               color === "#F2FCE2" ? "#F1F1F1" : "#F2FCE2" 
      });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 0.7;
      roof.rotation.y = Math.PI / 4; // Rotate for better alignment
      houseGroup.add(roof);
      
      // Door
      const doorGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.01);
      const doorMaterial = new THREE.MeshStandardMaterial({ color: "#8B4513" });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(0, -0.2, 0.51);
      houseGroup.add(door);
      
      // Windows
      const windowGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.01);
      const windowMaterial = new THREE.MeshStandardMaterial({ color: "#D3E4FD" });
      
      // Front windows
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(-0.3, 0.0, 0.51);
      houseGroup.add(window1);
      
      const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
      window2.position.set(0.3, 0.0, 0.51);
      houseGroup.add(window2);
      
      // Position and scale
      houseGroup.position.x = posX;
      houseGroup.scale.set(scale, scale, scale);
      
      // Add subtle floating animation
      const initialY = houseGroup.position.y;
      const speedMultiplier = 0.5 + Math.random() * 0.5;
      
      // Store animation properties on the group
      houseGroup.userData = {
        initialY,
        speedMultiplier,
        phase: Math.random() * Math.PI * 2 // Random starting phase
      };
      
      scene.add(houseGroup);
      return houseGroup;
    };
    
    // Create houses row
    const houses: THREE.Group[] = [];
    const houseColors = ["#FDE1D3", "#FFDEE2", "#FEF7CD", "#D3E4FD", "#F2FCE2", "#F1F1F1"];
    
    for (let i = 0; i < 7; i++) {
      const posX = (i - 3) * 1.5;
      const color = houseColors[i % houseColors.length];
      const scale = 0.4 + Math.random() * 0.3; // Random sizes
      houses.push(createHouse(color, posX, scale));
    }
    
    // Animation setup
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate each house
      houses.forEach((house) => {
        const { initialY, speedMultiplier, phase } = house.userData;
        
        // Floating animation
        house.position.y = initialY + Math.sin(time * speedMultiplier + phase) * 0.1;
        
        // Subtle rotation
        house.rotation.y += 0.002;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full absolute bottom-14 left-0 h-32 z-20 overflow-hidden"
    />
  );
};

export default MiniatureHouses;
