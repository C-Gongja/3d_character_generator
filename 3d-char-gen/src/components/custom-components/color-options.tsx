import styled from "styled-components";

const Options = styled.div`
	border: 1px solid white;
	padding: 10px;
	display: flex;
`;

const ColorItem = styled.div`
	padding: 5px 10px;
	border: 1px solid white;
	border-radius: 5px;
	background-color: #333;
	color: white;
	margin: 5px;
	cursor: pointer;

	&:hover {
		background-color: #555;
	}
`;

export default function ColorOptions() {
	// 탭 ID를 기반으로 키를 매핑
	const tabKeys = [
		"FaceColor",
		"EyesColor",
		"NoseColor",
		"MouthColor",
		"EarColor",
		"ClothesColor",
		"PantsColor",
		"ShoesColor",
	] as const;

	return (
		<Options>
			<h1>Color Options</h1>
		</Options>
	);
}