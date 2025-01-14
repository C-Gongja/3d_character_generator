import styled from "styled-components";
import { ItemLists } from "./custom-tab-lists/ListItems"; // 모든 리스트를 가져옵니다.

const Options = styled.div`
	border: 1px solid white;
	padding: 10px;
	height: 50vh;
`;

// 탭 데이터의 타입 정의
interface TabData {
	id: number;
	name: keyof typeof ItemLists; // lists의 키 중 하나
}

// 탭 데이터 배열
const tabData: TabData[] = [
	{ id: 1, name: "Face" },
	{ id: 2, name: "Eyes" },
	{ id: 3, name: "Nose" },
	{ id: 4, name: "Mouth" },
	{ id: 5, name: "Ear" },
	{ id: 6, name: "Clothes" },
	{ id: 7, name: "Pants" },
	{ id: 8, name: "Shoes" },
];

// 컴포넌트의 props 타입 정의
interface OptionListsProps {
	selectedTab: number; // 선택된 탭 ID
}

export default function OptionLists({ selectedTab }: OptionListsProps) {
	// 선택된 탭의 데이터 가져오기
	const currentTab = tabData.find((tab) => tab.id === selectedTab);
	const currentList = currentTab ? ItemLists[currentTab.name] || [] : [];

	return (
		<Options>
			{currentList.map((item, index) => (
				<div key={index}>{item}</div>
			))}
		</Options>
	);
}
