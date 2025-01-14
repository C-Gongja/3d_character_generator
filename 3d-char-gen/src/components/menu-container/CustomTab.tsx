import styled from "styled-components";
import tabData from "./TabData"; // 데이터를 불러옴
import { useState } from "react";

const Tab = styled.div`
  border: 1px solid white;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TabItem = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== "active",
}) <{ active: boolean }>` // active prop 추가
  padding: 10px;
  cursor: pointer;
  border: 1px solid white;
  background-color: ${({ active }) => (active ? "#555" : "#333")};
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #555;
  }
`;

// Props 타입 정의
interface CustomTabProps {
	onTabSelect: (id: number) => void; // 선택된 탭 ID를 부모로 전달하는 함수
}

export default function CustomTab({ onTabSelect }: CustomTabProps) {
	const [activeTab, setActiveTab] = useState<number>(1);

	const handleTabClick = (id: number) => {
		setActiveTab(id);
		onTabSelect(id); // 선택된 탭 ID를 부모로 전달
	};

	return (
		<Tab>
			{tabData.map((tab) => (
				<TabItem
					key={tab.id}
					active={tab.id === activeTab}
					onClick={() => handleTabClick(tab.id)}
				>
					{tab.name}
				</TabItem>
			))}
		</Tab>
	);
}