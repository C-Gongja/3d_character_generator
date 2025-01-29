import React from 'react';
import styled from 'styled-components';
import { useConfigStore } from '../../custom-store';

// styled-components로 스타일링
const TabContainer = styled.div`
  border: 1px solid white;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TabItem = styled.div<TabItemProps>`
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${(props) =>
		props.active
			? `
      background-color: #007bff;
      color: white;
      font-weight: bold;
    `
			: `
      &:hover {
        background-color: #f0f0f0;
				color:black;
      }
    `}
`;

interface TabItemProps {
	active: boolean;
}

export default function CustomTab() {
	const { categories, currentCategory, setCurrentCategory } = useConfigStore();

	// 탭 클릭 처리 함수
	const handleTabClick = (categoryId: number) => {
		// 선택된 카테고리 변경
		const selectedCategory = categories.find(category => category.id === categoryId);
		if (selectedCategory) {
			setCurrentCategory(selectedCategory);  // 상태 업데이트
		}
	};

	return (
		<TabContainer>
			{categories.map((category) => (
				<TabItem
					key={category.id}
					active={category.id === currentCategory?.id}
					onClick={() => handleTabClick(category.id)}
				>
					{category.name}
				</TabItem>
			))}
		</TabContainer>
	);
}