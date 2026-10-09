'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

export default function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // STARFIELD PARTICLES (1,800+ Stars)
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Color palette: Electric Violet (#8B5CF6), Cyan (#06B6D4), Cosmic Blue (#3B82F6), Celestial White
    const palette = [
      new THREE.Color('#8B5CF6'), // Violet
      new THREE.Color('#06B6D4'), // Cyan
      new THREE.Color('#3B82F6'), // Cosmic Blue
      new THREE.Color('#FFFFFF'), // Pure White Star
      new THREE.Color('#DDD6FE'), // Soft Starlight
    ];

    for (let i = 0; i < particleCount; i++) {
      // Spread stars in a deep 3D sphere volume
      const radius = 300 + Math.random() * 1200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 200;

      // Color selection
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size variance for depth
      sizes[i] = Math.random() * 2.8 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Circular particle texture with glowing halo
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(200, 230, 255, 0.8)');
      gradient.addColorStop(0.8, 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // SECONDARY FAINT NEBULA DUST LAYER (Distant Stardust)
    const dustCount = 600;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const dustColorA = new THREE.Color('#8B5CF6');
    const dustColorB = new THREE.Color('#06B6D4');

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 1600;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 800 - 400;

      const lerpedColor = dustColorA.clone().lerp(dustColorB, Math.random());
      dustColors[i * 3] = lerpedColor.r;
      dustColors[i * 3 + 1] = lerpedColor.g;
      dustColors[i * 3 + 2] = lerpedColor.b;
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 8,
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustField = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustField);

    // CURSOR GRAVITY / PARALLAX INTERACTION (Symphony of Vines style physics)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // RESIZE LISTENER
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // ANIMATION RENDER LOOP WITH PHYSICAL INERTIA LERP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerping (replicates physical cursor gravity)
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      // Subtle celestial rotation + mouse tilt
      starField.rotation.y = elapsedTime * 0.02 + currentMouseX * 0.22;
      starField.rotation.x = currentMouseY * 0.18;
      starField.rotation.z = currentMouseX * 0.08;

      // Dust layer shifts at slightly different parallax rate
      dustField.rotation.y = -elapsedTime * 0.012 + currentMouseX * 0.15;
      dustField.rotation.x = currentMouseY * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      texture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 3D WebGL Particle Starfield Canvas */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

      {/* AMBIENT NEBULAE DUST GLOWS (Pulsing Violet & Cyan volumetric rays) */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-violet-600/15 dark:bg-violet-600/20 blur-[130px] animate-pulse pointer-events-none" />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-[130px] pointer-events-none"
        style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
      />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-blue-600/10 dark:bg-indigo-600/15 blur-[150px] pointer-events-none" />

      {/* Subtle Volumetric Vignette for cinematic focus */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,7,18,0.75)_100%)] dark:block hidden" />
    </div>
  );
}
