
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const HeroBuilding3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(4, 3, 8);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 8, 5);
    scene.add(directionalLight);
    
    const orangeLight = new THREE.PointLight(0xff7d00, 2, 15);
    orangeLight.position.set(2, 4, 2);
    scene.add(orangeLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Create a modern building
    const createBuilding = () => {
      const buildingGroup = new THREE.Group();
      
      // Base building - main tower
      const mainTowerGeometry = new THREE.BoxGeometry(2, 6, 2);
      const mainTowerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xeeeeee,
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
        reflectivity: 0.5
      });
      const mainTower = new THREE.Mesh(mainTowerGeometry, mainTowerMaterial);
      mainTower.position.y = 3;
      buildingGroup.add(mainTower);
      
      // Secondary tower
      const secondaryTowerGeometry = new THREE.BoxGeometry(1.5, 4, 1.5);
      const secondaryTower = new THREE.Mesh(secondaryTowerGeometry, mainTowerMaterial);
      secondaryTower.position.set(-1.5, 2, -0.5);
      buildingGroup.add(secondaryTower);
      
      // Third tower
      const thirdTowerGeometry = new THREE.BoxGeometry(1, 3, 1);
      const thirdTower = new THREE.Mesh(thirdTowerGeometry, mainTowerMaterial);
      thirdTower.position.set(1, 1.5, 1);
      buildingGroup.add(thirdTower);
      
      // Create windows
      const createWindows = (buildingMesh: THREE.Mesh, rows: number, columns: number, spacing: number) => {
        const windowSize = 0.1;
        const geometry = buildingMesh.geometry as THREE.BoxGeometry;
        const dimensions = new THREE.Vector3();
        new THREE.Box3().setFromObject(buildingMesh).getSize(dimensions);
        
        // Front and back windows
        for (let face = 0; face < 2; face++) {
          const faceFactor = face === 0 ? 1 : -1;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
              const windowGeometry = new THREE.BoxGeometry(windowSize, windowSize, 0.05);
              const windowMaterial = new THREE.MeshPhongMaterial({
                color: 0xffca7a,
                emissive: 0xff7f00,
                emissiveIntensity: Math.random() * 0.2 + 0.1
              });
              const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
              
              const xOffset = (col - (columns - 1) / 2) * spacing;
              const yOffset = (row - (rows - 1) / 2) * spacing + dimensions.y / 4;
              const zPos = faceFactor * (dimensions.z / 2 + 0.01);
              
              windowMesh.position.set(xOffset, yOffset, zPos);
              buildingMesh.add(windowMesh);
            }
          }
        }
        
        // Side windows
        for (let face = 0; face < 2; face++) {
          const faceFactor = face === 0 ? 1 : -1;
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
              const windowGeometry = new THREE.BoxGeometry(0.05, windowSize, windowSize);
              const windowMaterial = new THREE.MeshPhongMaterial({
                color: 0xffca7a,
                emissive: 0xff7f00,
                emissiveIntensity: Math.random() * 0.2 + 0.1
              });
              const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
              
              const zOffset = (col - (columns - 1) / 2) * spacing;
              const yOffset = (row - (rows - 1) / 2) * spacing + dimensions.y / 4;
              const xPos = faceFactor * (dimensions.x / 2 + 0.01);
              
              windowMesh.position.set(xPos, yOffset, zOffset);
              buildingMesh.add(windowMesh);
            }
          }
        }
      };
      
      // Add windows to each tower
      createWindows(mainTower, 8, 3, 0.5);
      createWindows(secondaryTower, 6, 2, 0.5);
      createWindows(thirdTower, 4, 2, 0.4);
      
      // Add ground/base
      const baseGeometry = new THREE.BoxGeometry(8, 0.3, 6);
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.7
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -0.15;
      buildingGroup.add(base);
      
      // Add decorative elements
      const addAntennas = () => {
        const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
        const antennaMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        
        const antenna1 = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna1.position.set(0.5, 6.5, 0.5);
        buildingGroup.add(antenna1);
        
        const antenna2 = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna2.position.set(-0.5, 6.3, -0.5);
        buildingGroup.add(antenna2);
      };
      
      addAntennas();
      
      return buildingGroup;
    };
    
    const building = createBuilding();
    scene.add(building);
    
    // Position for better view
    building.position.y = -3;
    building.rotation.y = Math.PI / 6;
    
    // Add a subtle floor reflection plane
    const reflectionGeometry = new THREE.PlaneGeometry(15, 15);
    const reflectionMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.5,
      roughness: 0.3,
      transparent: true,
      opacity: 0.3
    });
    const reflectionPlane = new THREE.Mesh(reflectionGeometry, reflectionMaterial);
    reflectionPlane.rotation.x = -Math.PI / 2;
    reflectionPlane.position.y = -3;
    scene.add(reflectionPlane);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Make the orange light pulse slightly
      const time = Date.now() * 0.001;
      orangeLight.intensity = 1.8 + Math.sin(time) * 0.3;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      
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
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 opacity-90"
      style={{ touchAction: "none", zIndex: 5 }}
    />
  );
};

export default HeroBuilding3D;
