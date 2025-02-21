import { Canvas } from "@react-three/fiber";
import { Ref } from "react";
import { Experience } from "./experience";

interface AvatarCanvasProps {
	canvasRef: Ref<HTMLCanvasElement>;
}

export function AvatarCanvas({ canvasRef }: AvatarCanvasProps) {
	return (
		<Canvas
			ref={canvasRef}
			camera={{ position: [-1, 1, 5], fov: 45 }}
			shadows
			gl={{ preserveDrawingBuffer: true }}
		>
			<color attach="background" args={["#333333"]} />
			<fog attach="fog" args={["#555", 15, 25]} />
			<group position-y={-1}>
				<Experience />
			</group>
		</Canvas>
	);
}