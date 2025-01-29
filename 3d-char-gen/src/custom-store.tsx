import { create } from "zustand";
import { fetchAssets, fetchCategories } from "./api/custom/customApi";
import { Asset, Category, Store } from "./api/custom/custom-Interface";

export const useConfigStore = create<Store>((set) => ({
	categories: [],
	currentCategory: null,
	assets: [],
	fetchCustoms: async () => {
		try {
			const categories = await fetchCategories();
			const assets = await fetchAssets();

			console.log("categories: ", categories);
			console.log("assets: ", assets);

			// categories가 배열인지 확인
			if (Array.isArray(categories)) {
				categories.forEach((category: Category) => {
					category.assets = assets.filter((asset: Asset) => asset.groupid === category.id);
				});

				set({ categories, currentCategory: categories[0], assets });

			} else {
				throw new Error('Fetched categories are not an array');
			}
			console.log("categories: ", categories);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	},
	setCurrentCategory: (category: Category) => set({ currentCategory: category }),
}));