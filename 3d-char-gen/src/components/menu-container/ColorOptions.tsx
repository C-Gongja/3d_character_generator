import styled from "styled-components";
import { ColorLists } from "./custom-tab-lists/ListsColor"; // ColorLists import

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

interface ColorOptionsProps {
	selectedTab: number;
}

export default function ColorOptions({ selectedTab }: ColorOptionsProps) {
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

	// 선택된 탭의 색상 리스트 가져오기
	const selectedKey = tabKeys[selectedTab - 1];
	const colorList = ColorLists[selectedKey] || [];

	return (
		<Options>
			{colorList.map((color, index) => (
				<ColorItem key={index}>{color}</ColorItem>
			))}
		</Options>
	);
}
