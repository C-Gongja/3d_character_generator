import React, { useEffect } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
	containerRef: React.RefObject<HTMLDivElement>;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ containerRef }) => {
	useEffect(() => {
		if (containerRef.current && typeof window !== "undefined") {
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
			containerRef.current.appendChild(renderer.domElement);
			camera.position.z = 5;

			// Add your object (e.g., sphere, box, etc.)
			const geometry = new THREE.SphereGeometry(2, 32, 32);
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
			const sphere = new THREE.Mesh(geometry, material);
			scene.add(sphere);

			// Animation loop
			const renderScene = () => {
				sphere.rotation.y += 0.01;
				renderer.render(scene, camera);
				requestAnimationFrame(renderScene);
			};
			renderScene();

			// Handle window resize
			const handleResize = () => {
				const width = containerRef.current?.clientWidth ?? window.innerWidth;
				const height = containerRef.current?.clientHeight ?? window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize(width, height);
			};

			window.addEventListener("resize", handleResize);
			handleResize(); // Ensure initial size is correct

			return () => {
				window.removeEventListener("resize", handleResize);
				containerRef.current?.removeChild(renderer.domElement);
				renderer.dispose();
			};
		}
	}, [containerRef]);

	return null; // The Three.js canvas will be added dynamically to the container
};

export default ThreeScene;
