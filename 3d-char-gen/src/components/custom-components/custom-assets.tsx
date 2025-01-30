// import styled from "styled-components";
import { useConfigStore } from "../../custom-store";

// const Options = styled.div`
// 	border: 1px solid white;
// 	padding: 10px;
// 	min-height: 450px;
// 	gap:20px;
// `;


export default function CustomAssets() {
	const { currentCategory, changeAsset, customization } = useConfigStore();

	return (
		<div className="flex gap-2 flex-wrap">
			{currentCategory?.assets.map((asset, index) => (
				<button
					key={index}
					onClick={() => changeAsset(currentCategory.name, asset)}
					className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-2 duration-500
						${customization[currentCategory.name]?.id === asset.id
							? "border-indigo-600 opacity-100"
							: "opacity-80 border-transparent"
						}`}
				>
					<img src={asset.thumbnail} />
				</button>
			))}
		</div>
	);
}
