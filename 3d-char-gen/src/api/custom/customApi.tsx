import { Asset, Category } from "./custom-Interface";

const BASE_URL = "http://localhost:5001/api/custom";

// api/customApi.tsx
export const fetchCategories = async (): Promise<Category[]> => {
	try {
		const response = await fetch(`${BASE_URL}/customGroups`); // Node.js 백엔드 API 호출
		if (!response.ok) throw new Error('Failed to fetch categories');
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const fetchAssets = async (): Promise<Asset[]> => {
	try {
		const response = await fetch(`${BASE_URL}/customAssets`); // Node.js 백엔드 API 호출
		if (!response.ok) throw new Error('Failed to fetch assets');
		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};
