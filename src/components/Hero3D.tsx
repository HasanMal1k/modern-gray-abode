
import { useEffect, useRef } from "react";

const Hero3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Full size canvas
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 3D cube parameters
    const cubeSize = Math.min(canvas.width, canvas.height) * 0.3;
    let rotationX = 0;
    let rotationY = 0;
    let rotationSpeed = 0.005;
    
    // Interactive variables
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    // Mouse control
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    
    // Touch controls for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isMouseDown = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isMouseDown || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - lastMouseX;
      const deltaY = e.touches[0].clientY - lastMouseY;
      
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
      isMouseDown = false;
    };
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    // 3D cube coordinates (8 vertices)
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ].map(v => v.map(coord => coord * cubeSize / 2));
    
    // 6 faces of the cube (each with 4 vertices)
    const faces = [
      [0, 1, 2, 3], // front
      [1, 5, 6, 2], // right
      [5, 4, 7, 6], // back
      [4, 0, 3, 7], // left
      [3, 2, 6, 7], // top
      [4, 5, 1, 0]  // bottom
    ];
    
    // Colors for each face (orange tints)
    const colors = [
      "#FF7D00", // bright orange
      "#E86A00", // darker orange
      "#FF9F40", // light orange
      "#D66000", // deep orange
      "#FFA726", // medium orange
      "#FF5722"  // reddish orange
    ];
    
    // Project 3D to 2D
    const project = (x: number, y: number, z: number) => {
      const perspective = 500;
      const scale = perspective / (perspective + z);
      return {
        x: x * scale + canvas.width / 2,
        y: y * scale + canvas.height / 2
      };
    };
    
    // Rotate a point around the Y and X axes
    const rotate = (x: number, y: number, z: number, rx: number, ry: number) => {
      // Rotate around Y axis
      let temp1 = x * Math.cos(ry) - z * Math.sin(ry);
      let temp2 = z * Math.cos(ry) + x * Math.sin(ry);
      x = temp1;
      z = temp2;
      
      // Rotate around X axis
      temp1 = y * Math.cos(rx) - z * Math.sin(rx);
      temp2 = z * Math.cos(rx) + y * Math.sin(rx);
      y = temp1;
      z = temp2;
      
      return { x, y, z };
    };
    
    // Draw the cube
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth rotation interpolation
      rotationX += (targetRotationX - rotationX) * 0.1;
      rotationY += (targetRotationY - rotationY) * 0.1;
      
      // Auto-rotation when not interacting
      if (!isMouseDown) {
        targetRotationY += rotationSpeed;
      }
      
      // Calculate rotated vertices
      const rotatedVertices = vertices.map(([x, y, z]) => {
        const rotated = rotate(x, y, z, rotationX, rotationY);
        return {
          ...rotated,
          ...project(rotated.x, rotated.y, rotated.z)
        };
      });
      
      // Sort faces by z-index (crude but effective)
      const sortedFaces = faces.map((face, i) => {
        const zIndex = face.reduce((sum, vertexIndex) => {
          const { z } = rotate(
            vertices[vertexIndex][0],
            vertices[vertexIndex][1],
            vertices[vertexIndex][2],
            rotationX,
            rotationY
          );
          return sum + z;
        }, 0) / face.length;
        
        return { face, color: colors[i], zIndex };
      }).sort((a, b) => a.zIndex - b.zIndex);
      
      // Draw each face
      sortedFaces.forEach(({ face, color }) => {
        ctx.beginPath();
        face.forEach((vertexIndex, i) => {
          const { x, y } = rotatedVertices[vertexIndex];
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        
        // Fill with subtle gradient
        const gradient = ctx.createLinearGradient(
          rotatedVertices[face[0]].x,
          rotatedVertices[face[0]].y,
          rotatedVertices[face[2]].x,
          rotatedVertices[face[2]].y
        );
        
        const lighterColor = color;
        const darkerColor = color.replace(/[0-9A-F]{2}$/i, '88'); // make semi-transparent
        
        gradient.addColorStop(0, darkerColor);
        gradient.addColorStop(1, lighterColor);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 opacity-70 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    />
  );
};

export default Hero3D;
