import { useConfigStore } from "../../state-management/custom-store";
import { useCustomStore } from "../../state-management/userCustom-store";
import { Asset } from "../../state-management/custom-Interface";
import { UserCustomProfile } from "../../state-management/userCustom-Interface";

export default function CustomAssets() {
	// const { currentCategory, changeAsset, customization } = useConfigStore();
	const { currentCategory, changeAsset, customization } = useConfigStore();
	const { updateField } = useCustomStore();

	const handleAssetChange = async (categoryName: string, asset: Asset) => {
		await changeAsset(categoryName, asset);
		const key = categoryName as keyof UserCustomProfile;
		const updatedCustomization = useConfigStore.getState().customization;
		let assetId = null;
		if (updatedCustomization[categoryName]?.id) {
			assetId = asset.id;
		}
		await updateField(key, assetId);
	};

	return (
		<div className="flex gap-5 flex-wrap p-5 min-h-100 max-h-100 overflow-y-scroll">
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
