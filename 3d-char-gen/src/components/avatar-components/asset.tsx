import { useGLTF } from "@react-three/drei"
import { useEffect, useMemo } from "react";
import { useConfigStore } from "../../state-management/custom-store";
import { Object3D } from "three";

interface AssetProps {
	categoryName: string;
	url: string;
	skeleton: Object3D;
}

export const Asset = ({ categoryName, url, skeleton }: AssetProps) => {
	const { scene } = useGLTF(url);
	const { customization, skin } = useConfigStore();
	const assetColor = customization[categoryName]?.color;

	useEffect(() => {
		scene.traverse((child: any) => {
			if (child.isMesh) {
				if (child.material?.name.includes("Color_")) {
					child.material.color.set(assetColor);
				}
			}
		});
	}, [assetColor, scene]);

	const attachedItems = useMemo(() => {
		const items: any[] = [];
		scene.traverse((child: any) => {
			if (child.isMesh) {
				items.push({
					geometry: child.geometry,
					material: child.material.name.includes("Skin_")
						? skin
						: child.material,
				});
			}
		});
		return items;
	}, [scene]);

	return attachedItems.map((item, index) => (
		<skinnedMesh
			key={index}
			geometry={item.geometry}
			material={item.material}
			skeleton={skeleton}
			castShadow
			receiveShadow />
	));
}