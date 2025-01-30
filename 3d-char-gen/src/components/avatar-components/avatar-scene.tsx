import { Canvas } from "@react-three/fiber";
import { Experience } from "./experience";

export default function AvatarScene() {
	return (
		<>
			<Canvas
				camera={{
					position: [-1, 1, 5],
					fov: 45,
				}}
				shadows
			>
				<color attach="background" args={["#333333"]} />
				<fog attach="fog" args={["#555", 15, 25]} />
				<group position-y={-1}>
					<Experience />
				</group>
			</Canvas>
		</>
	);
}