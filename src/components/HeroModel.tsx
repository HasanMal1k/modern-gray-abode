
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const HeroModel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const orangeLight = new THREE.PointLight(0xff7d00, 2, 10);
    orangeLight.position.set(2, 2, 2);
    scene.add(orangeLight);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    
    // Loader
    const loader = new GLTFLoader();
    let model: THREE.Group;
    
    // Loading animation while waiting for model
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff7d00,
      metalness: 0.3,
      roughness: 0.5,
    });
    const placeholderCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(placeholderCube);
    
    // Load the actual model - using a simple house model as an example
    // Update with your preferred model URL
    loader.load(
      'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
      (gltf) => {
        scene.remove(placeholderCube);
        model = gltf.scene;
        model.scale.set(0.8, 0.8, 0.8);
        
        // Add an orange glow effect to the model
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xff7d00,
          transparent: true,
          opacity: 0.2
        });
        
        // Fix model positioning if needed
        model.position.set(0, -0.5, 0);
        
        scene.add(model);
        
        // Auto-rotate to match the model's orientation
        controls.target.copy(new THREE.Vector3(0, 0, 0));
      },
      (xhr) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened while loading the model:', error);
      }
    );
    
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
      
      // Update placeholder animation while waiting for model
      if (placeholderCube && scene.children.includes(placeholderCube)) {
        placeholderCube.rotation.x += 0.01;
        placeholderCube.rotation.y += 0.01;
      }
      
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
      if (placeholderCube) {
        placeholderCube.geometry.dispose();
        (placeholderCube.material as THREE.Material).dispose();
      }
      
      // Clear scene
      while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 opacity-80"
      style={{ touchAction: "none" }}
    />
  );
};

export default HeroModel;
