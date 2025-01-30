import { useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useConfigStore } from "../../custom-store";
import { Asset } from "./asset";
import { Group } from "three";

export const Avatar = ({ ...props }: JSX.IntrinsicElements["group"]) => {
	const group = useRef<Group>(null);
	const { nodes } = useGLTF('/model/Armature.glb');
	const customization = useConfigStore((state) => state.customization);
	console.log("customization at Avatar: ", customization);

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Scene">
				<group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
					<primitive object={nodes.mixamorigHips} />
					{Object.keys(customization).map(
						(key) =>
							customization[key]?.url && (
								<Suspense key={customization[key].id}>
									<Asset
										url={customization[key].url}
										skeleton={nodes.Plane.skeleton}
									/>
								</Suspense>
							)
					)}
				</group>
			</group>
		</group>
	)
}