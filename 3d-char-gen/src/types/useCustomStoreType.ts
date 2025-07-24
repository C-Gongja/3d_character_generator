export interface Store {
	isLoading: boolean;
	skin: any;
	categories: Category[];
	currentCategory: Category | null;
	assets: Asset[];
	customization: Customization;
	updateColor: (color: any) => void;
	updateSkin: (color: any) => void;
	fetchCustoms: () => Promise<void>;
	setCurrentCategory: (category: Category) => void;
	setCustomization: (customization: Customization) => void;
	changeAsset: (category: string, asset: Asset) => void;
}

export interface Category {
	id: number;
	name: string;
	position: number;
	startingAssetId: number;
	color_options: string[];
	assets: Asset[];
}

export interface Asset {
	id: number;
	name: string;
	thumbnail: string;
	url: string;
	groupid: number;
	color: string;
}

export interface Customization {
	[name: string]: Asset | null;
}
