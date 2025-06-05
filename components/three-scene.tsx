"use client";

import { useEffect, useRef } from "react";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dynamic imports to ensure client-side only
    const initScene = async () => {
      const THREE = await import("three");
      const Tone = await import("tone");

      // Initialize Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x222222, 1); // Dark background to see the shape
      mountRef.current!.appendChild(renderer.domElement);

      // Create different geometries
      const geometries = [
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.SphereGeometry(1.2, 32, 32),
        new THREE.TorusGeometry(1, 0.4, 16, 100),
        new THREE.TetrahedronGeometry(1.5),
        new THREE.OctahedronGeometry(1.5),
      ];

      // Create material with bright color
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        shininess: 100,
      });

      let currentShape = new THREE.Mesh(geometries[0], material);
      scene.add(currentShape);
      let currentGeometryIndex = 0;

      // Add lights for visibility
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Position camera
      camera.position.z = 8;

      // Initialize sound
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const reverb = new Tone.Reverb(2).toDestination();
      synth.connect(reverb);

      // Sound configurations
      const soundConfigs = [
        { note: "C4", chord: ["C4", "E4", "G4"] },
        { note: "E4", chord: ["E4", "G4", "B4"] },
        { note: "G4", chord: ["G4", "B4", "D5"] },
        { note: "B4", chord: ["B4", "D5", "F5"] },
        { note: "D5", chord: ["D5", "F5", "A5"] },
      ];

      // Click handling
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const handleClick = async (event: MouseEvent) => {
        console.log("Click detected!");

        // Start audio context
        if (Tone.context.state !== "running") {
          await Tone.start();
          console.log("Audio started");
        }

        // Calculate mouse position
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(currentShape);

        console.log("Intersects:", intersects.length);

        if (intersects.length > 0) {
          console.log("Shape clicked!");

          // Change shape
          currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length;
          scene.remove(currentShape);
          currentShape = new THREE.Mesh(
            geometries[currentGeometryIndex],
            material.clone()
          );
          scene.add(currentShape);

          // Play sound
          try {
            const soundConfig = soundConfigs[currentGeometryIndex];
            await synth.triggerAttackRelease(soundConfig.chord, "4n");
            console.log("Sound played:", soundConfig.chord);
          } catch (error) {
            console.error("Sound error:", error);
          }

          // Change color
          const hue = Math.random();
          const color = new THREE.Color().setHSL(hue, 0.7, 0.5);
          currentShape.material.color = color;

          console.log("Shape changed to:", currentGeometryIndex);
        }
      };

      // Resize handling
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      // Animation loop
      const animate = () => {
        const animationId = requestAnimationFrame(animate);

        // Rotate the shape
        currentShape.rotation.x += 0.01;
        currentShape.rotation.y += 0.01;

        // Floating motion
        currentShape.position.y = Math.sin(Date.now() * 0.001) * 0.3;

        renderer.render(scene, camera);

        if (sceneRef.current) {
          sceneRef.current.animationId = animationId;
        }
      };

      // Add event listeners
      renderer.domElement.addEventListener("click", handleClick);
      window.addEventListener("resize", handleResize);

      // Store references
      sceneRef.current = {
        scene,
        camera,
        renderer,
        currentShape,
        currentGeometryIndex,
        geometries,
        material,
        synth,
        reverb,
        soundConfigs,
        raycaster,
        mouse,
        animationId: 0,
        handleClick,
        handleResize,
      };

      // Start animation
      animate();

      console.log("Three.js scene initialized");
    };

    initScene().catch(console.error);

    // Cleanup
    return () => {
      if (sceneRef.current) {
        const {
          renderer,
          animationId,
          handleClick,
          handleResize,
          synth,
          reverb,
        } = sceneRef.current;

        cancelAnimationFrame(animationId);

        if (renderer) {
          renderer.domElement.removeEventListener("click", handleClick);
          renderer.dispose();
        }

        window.removeEventListener("resize", handleResize);

        if (synth) synth.dispose();
        if (reverb) reverb.dispose();

        if (mountRef.current && renderer?.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    />
  );
}
