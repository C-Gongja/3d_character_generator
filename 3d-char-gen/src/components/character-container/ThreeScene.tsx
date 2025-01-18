import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
	containerRef: React.RefObject<HTMLDivElement | null>;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ containerRef }) => {
	const isMouseDown = useRef(false); // 마우스 클릭 여부 확인
	const lastMousePosition = useRef({ x: 0, y: 0 }); // 마지막 마우스 위치 추적
	const earthGroup = useRef<THREE.Group | null>(null); // Earth 그룹 참조

	useEffect(() => {
		if (containerRef.current && typeof window !== "undefined") {
			// Initialize scene
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
			containerRef.current?.appendChild(renderer.domElement);
			camera.position.z = 5;

			// Create a sphere geometry
			const radius = 1.2;
			const sphereGeometry = new THREE.SphereGeometry(radius, 25, 25); // Radius 2, 32 segments
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
			const sphere = new THREE.Mesh(sphereGeometry, material);

			// Create a group to represent the Earth's rotation around a tilted axis
			const group = new THREE.Group();
			group.add(sphere);
			group.rotation.x = Math.PI / 4; // Tilt the axis

			// Create points on the surface of the sphere (optional)
			const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
			const pointsGeometry = new THREE.BufferGeometry();
			const positions = [];
			for (let i = 0; i < 100; i++) {
				const theta = Math.random() * Math.PI;
				const phi = Math.random() * Math.PI * 2;
				const x = radius * Math.sin(theta) * Math.cos(phi);
				const y = radius * Math.sin(theta) * Math.sin(phi);
				const z = radius * Math.cos(theta);
				positions.push(x, y, z);
			}
			pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
			const points = new THREE.Points(pointsGeometry, pointsMaterial);

			// Add points to the group, so they rotate with the sphere
			group.add(points);

			scene.add(group);
			earthGroup.current = group;

			// Add the AxesHelper to show the coordinate axes
			const axesHelper = new THREE.AxesHelper(2); // Axis size of 2
			// Type assertion to LineBasicMaterial
			const materialSetting = axesHelper.material as THREE.LineBasicMaterial;
			materialSetting.linewidth = 2; // Optional: Set linewidth for better visibility
			materialSetting.color.set(0xffffff); // Set color to white
			scene.add(axesHelper);

			// Lighting
			const light = new THREE.PointLight(0xffffff, 1, 100);
			light.position.set(0, 0, 0);
			scene.add(light);

			// Animation loop
			const renderScene = () => {
				// if (earthGroup.current) {
				// 	earthGroup.current.rotation.y += 0.01; // Rotate continuously (optional)
				// }
				renderer.render(scene, camera);
				requestAnimationFrame(renderScene);
			};
			renderScene();

			// Handle mouse events
			const onMouseDown = (event: MouseEvent) => {
				isMouseDown.current = true;
				lastMousePosition.current = { x: event.clientX, y: event.clientY };
			};

			const onMouseUp = () => {
				isMouseDown.current = false;
			};

			const onMouseMove = (event: MouseEvent) => {
				if (!isMouseDown.current || !earthGroup.current) return;

				const deltaX = event.clientX - lastMousePosition.current.x;
				const deltaY = event.clientY - lastMousePosition.current.y;

				// Update the rotation based on mouse movement
				earthGroup.current.rotation.y += deltaX * 0.005; // Adjust the sensitivity
				earthGroup.current.rotation.x -= deltaY * 0.005; // Adjust the sensitivity

				// Update last mouse position
				lastMousePosition.current = { x: event.clientX, y: event.clientY };
			};

			// Attach mouse events
			containerRef.current.addEventListener("mousedown", onMouseDown);
			containerRef.current.addEventListener("mouseup", onMouseUp);
			containerRef.current.addEventListener("mousemove", onMouseMove);

			// Handle window resize
			const handleResize = () => {
				const width = containerRef.current?.clientWidth ?? window.innerWidth;
				const height = containerRef.current?.clientHeight ?? window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize(width, height);
			};

			window.addEventListener('resize', handleResize);

			// Ensure the aspect ratio and renderer size are correct initially
			handleResize();

			// Clean up
			return () => {
				window.removeEventListener("resize", handleResize);
				containerRef.current?.removeChild(renderer.domElement);
				renderer.dispose();
				containerRef.current?.removeEventListener("mousedown", onMouseDown);
				containerRef.current?.removeEventListener("mouseup", onMouseUp);
				containerRef.current?.removeEventListener("mousemove", onMouseMove);
			};
		}
	}, [containerRef]);

	return null;
};

export default ThreeScene;
