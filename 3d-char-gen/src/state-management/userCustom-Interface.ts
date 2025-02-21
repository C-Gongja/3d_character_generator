export interface UserProfile {
	username: string;
}

export interface UserCustomResponse {
	username: string;
	userCustom: UserCustomProfile;
}

export interface CustomField {
	asset_id: number | null;
	color: string | null;
}

export interface UserCustomProfile {
	username: string;
	gender: string | null;
	location: string | null;
	bio: string | null;
	serial_num: string | null;
	birthday: string | null;
	Head: CustomField | null;
	Eyes: CustomField | null;
	Eyebrows: CustomField | null;
	Nose: CustomField | null;
	Mouth: CustomField | null;
	Ears: CustomField | null;
	Hair: CustomField | null;
	Top: CustomField | null;
	Bottom: CustomField | null;
	Shoes: CustomField | null;
}

export default interface UserStore {
	isLoading: boolean;
	initialUserCustomProfile: UserCustomProfile;
	userCustomProfile: UserCustomProfile;
	changedFields: Partial<UserCustomProfile>;
	fetchUserCustoms: () => Promise<void>;
	loadUserCustomProfile: () => Promise<void>;
	// setUserProfile: (profile: UserProfile) => void;
	setInituserCustomProfile: (initProfile: UserCustomProfile) => void;
	setUserCustomProfile: (customProfile: UserCustomProfile) => void;
	updateField: (key: keyof UserCustomProfile, data: { asset_id?: number; color?: string }) => void;
	updateUserCustomProfile: () => Promise<void>;
	resetUserCustomProfile: () => Promise<void>;
}