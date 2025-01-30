export interface Store {
	categories: Category[];
	currentCategory: Category | null;
	assets: Asset[];
	customization: Customization;
	fetchCustoms: () => Promise<void>;
	setCurrentCategory: (category: Category) => void;
	changeAsset: (category: string, asset: Asset) => void;
}

export interface Category {
	id: number;
	name: string;
	position: number;
	assets: Asset[];
}

export interface Asset {
	id: number;
	name: string;
	thumbnail: string;
	url: string;
	groupid: number;
}

export interface Customization {
	[name: string]: Asset;
}
