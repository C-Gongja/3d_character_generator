import styled from "styled-components";
import { useConfigStore } from "../../custom-store";

const Options = styled.div`
	border: 1px solid white;
	padding: 10px;
	height: 50vh;
`;


export default function CustomAssets() {
	const { currentCategory } = useConfigStore();

	return (
		<Options>
			{currentCategory?.assets.map((asset, index) => (
				<button
					key={index}
					className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-2 duration-500`}
				>
					<img src={asset.thumbnail} />
				</button>
			))}
		</Options>
	);
}
