import { } from 'react';
import { useConfigStore } from '../../state-management/useCustomStore';

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
		<div className="rounded-lg flex justify-start items-start flex-wrap">
			{categories.map((category) => (
				<div
					key={category.id}
					className={`px-5 py-2 text-lg cursor-pointer transition-colors duration-300 ease-in-out 
						${category.id === currentCategory?.id
							? 'bg-indigo-600 text-white font-bold rounded-lg'
							: 'hover:bg-gray-200 hover:text-black rounded-lg'
						}`}
					onClick={() => handleTabClick(category.id)}
				>
					{category.name}
				</div>
			))}
		</div>
	);
}