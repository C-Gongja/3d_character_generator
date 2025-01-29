export interface Store {
	categories: Category[];
	currentCategory: Category | null;
	assets: Asset[];
	fetchCustoms: () => Promise<void>;
	setCurrentCategory: (category: Category) => void;
}

export interface Category {
	id: number;
	name: string;
	position: number;
	assets: Asset[];
}

export interface Asset {
	id: string;
	name: string;
	thumbnail: string;
	url: string;
	groupid: number;
}