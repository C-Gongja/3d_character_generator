import { useConfigStore } from "../../state-management/custom-store";
import { useCustomStore, UserCustomProfile } from "../../state-management/userCustom-store";
import { Asset } from "./custom-Interface";

const categorykeys = ['head', 'eyes', 'eyebrows', 'nose', 'mouth', 'ears', 'hair', 'top', 'bottom', 'shoes'];
export default function CustomAssets() {
	// const { currentCategory, changeAsset, customization } = useConfigStore();
	const { currentCategory, changeAsset, customization } = useConfigStore();
	const { updateField } = useCustomStore();

	const handleAssetChange = (categoryName: string, asset: Asset) => {
		changeAsset(categoryName, asset);
		const key = categoryName.toLowerCase() as keyof UserCustomProfile;
		if (categorykeys.includes(key)) {
			updateField(key, asset.id);
		}
	};

	return (
		<div className="flex gap-5 flex-wrap p-5 min-h-100">
			{currentCategory?.assets.map((asset, index) => (
				<button
					key={index}
					onClick={() => handleAssetChange(currentCategory.name, asset)}
					className={`w-30 h-30 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-5 duration-500 cursor-pointer
					${customization[currentCategory.name]?.id === asset.id
							? "border-red opacity-100"
							: "opacity-70 border-transparent"
						}`}
				>
					<img src={asset.thumbnail} />
				</button>
			))}
		</div>
	);
}
