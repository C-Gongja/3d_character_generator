import { create } from "zustand";
import { fetchAssets, fetchCategories } from "./api/custom/customApi";
import { Asset, Category, Customization, Store } from "./components/custom-components/custom-Interface";

export const useConfigStore = create<Store>((set) => ({
	categories: [],
	currentCategory: null,
	assets: [],
	customization: {},
	fetchCustoms: async () => {
		try {
			const categories = await fetchCategories();
			const assets = await fetchAssets();

			const customization: Customization = {};

			if (Array.isArray(categories)) {
				categories.forEach((category: Category) => {
					category.assets = assets.filter((asset: Asset) => asset.groupid === category.id);
					//store an empty asset
					customization[category.name] = {};
					if (category.startingAssetId != null) {
						customization[category.name] = category.assets.find(
							(asset) => asset.id === category.startingAssetId
						);
					}
				});

				set({ categories, currentCategory: categories[0], assets, customization });

			} else {
				throw new Error('Fetched categories are not an array');
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	},
	setCurrentCategory: (category: Category) => set({ currentCategory: category }),
	changeAsset: (category: string, asset: Asset) => set((state) => {
		{
			// stored asset
			const currentAsset = state.customization[category];

			// if a category has starting asset then set to starting asset
			return {
				customization: {
					...state.customization,
					[category]: currentAsset?.id === asset.id ? null : asset,
				},
			};
		}
	}),
}));