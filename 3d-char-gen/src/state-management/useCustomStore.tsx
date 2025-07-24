import { create } from "zustand";
import { fetchAssets, fetchCategories } from "../api/custom/customApi.ts";
import { Asset, Category, Customization, Store } from "../types/useCustomStoreType.ts";
import { MeshStandardMaterial } from "three";

const REQUIRED_CATEGORIES = ["Head", "Eyes", "Nose", "Top", "Bottom"];

export const useConfigStore = create<Store>((set, get) => ({
	isLoading: false,
	categories: [],
	currentCategory: null,
	assets: [],
	skin: new MeshStandardMaterial({ color: 0xf5c6a5, roughness: 1 }),
	customization: {},
	updateColor: (color: string) => {
		set((state) => {
			const currentCategoryName = state.currentCategory?.name;
			if (!currentCategoryName) return state; // currentCategory가 null이면 아무것도 안 함

			const currentAsset = state.customization[currentCategoryName];
			if (!currentAsset) return state; // 해당 부위에 선택된 Asset이 없으면 아무것도 안 함

			// 해당 부위의 Asset만 color 변경
			const updatedAsset: Asset = { ...currentAsset, color };

			return {
				customization: {
					...state.customization,
					[currentCategoryName]: updatedAsset,
				},
			};
		});
		// Head일 때 피부색 변경 같은 추가 로직이 필요하다면 여기에 넣으면 됨
		if (get().currentCategory?.name === 'Head') {
			get().updateSkin(color);
		}
	},
	updateSkin: (color: any) => {
		get().skin.color.set(color);
	},
	fetchCustoms: async () => {
		set({ isLoading: true });
		try {
			const categories = await fetchCategories();
			const assets = await fetchAssets();

			const validCategories = categories.filter((category: Category) =>
				assets.some((asset: Asset) => asset.groupid === category.id)
			).sort((a: Category, b: Category) => a.id - b.id);

			const customization: Customization = {};

			if (Array.isArray(categories)) {
				validCategories.forEach((category: Category) => {
					category.assets = assets.filter((asset: Asset) => asset.groupid === category.id);

					customization[category.name] = category.assets.find(
						(asset) => asset.id === category.startingAssetId
					) || { id: -1, name: '', thumbnail: '', url: '', groupid: category.id, color: '' };
				});

				set({ categories: validCategories, currentCategory: validCategories[0], assets, customization, isLoading: false });

			} else {
				set({ isLoading: false });
				throw new Error('Fetched categories are not an array');
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			set({ isLoading: false });
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