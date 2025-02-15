import { create } from "zustand";
import { fetchAssets, fetchCategories } from "../api/custom/customApi.ts";
import { Asset, Category, Customization, Store } from "../components/custom-components/custom-Interface";

const REQUIRED_CATEGORIES = ["Head", "Eyes", "Nose", "Top", "Bottom"];

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

					customization[category.name] = category.assets.find(
						(asset) => asset.id === category.startingAssetId
					) || { id: -1, name: '', thumbnail: '', url: '', groupid: category.id };
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

			// 필수 카테고리이고, 같은 걸 클릭해서 지우려고 하면 막기
			const isRequiredCategory = REQUIRED_CATEGORIES.includes(category);

			if (isRequiredCategory && currentAsset && currentAsset.id === asset.id) {
				return {};
			} else if (currentAsset && currentAsset.id === asset.id) {
				// if current asset is the same as the one being set, don't change it
				return {
					customization: {
						...state.customization,
						[category]: null,
					},
				};
			}

			return {
				customization: {
					...state.customization,
					[category]: asset, // set new asset
				},
			};
		}
	}),
	// Set customization directly from other stores
	setCustomization: (updatedCustomization: Customization) =>
		set({ customization: updatedCustomization }),
}));