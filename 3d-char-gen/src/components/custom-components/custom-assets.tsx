import { useConfigStore } from "../../state-management/custom-store";
import { useCustomStore } from "../../state-management/userCustom-store";
import { Asset } from "../../state-management/custom-Interface";
import { UserCustomProfile } from "../../state-management/userCustom-Interface";

export default function CustomAssets() {
	// const { currentCategory, changeAsset, customization } = useConfigStore();
	const { currentCategory, changeAsset, customization } = useConfigStore();
	const { updateField } = useCustomStore();

	const handleAssetChange = async (categoryName: string, asset: Asset) => {
		console.log("change asset")
		changeAsset(categoryName, asset);
		const key = categoryName as keyof UserCustomProfile;
		//여기 바꿔야함
		updateField(key, { asset_id: asset.id });
		console.log("update asset")
	};

	return (
		<div className="flex gap-5 flex-wrap p-5 min-h-50 max-h-80 overflow-y-scroll border-b-1 border-white">
			{currentCategory?.assets.map((asset, index) => (
				<button
					key={index}
					onClick={() => handleAssetChange(currentCategory.name, asset)}
					className={`w-30 h-30 over rounded-xl overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-5 duration-500 cursor-pointer
					${customization[currentCategory.name]?.id === asset.id
							? "border-red opacity-100"
							: "opacity-70 border-transparent"
						}`}
				>
					<img className="object-cover w-full h-full rounded-lg" src={asset.thumbnail} />
				</button>
			))}
		</div>
	);
}
