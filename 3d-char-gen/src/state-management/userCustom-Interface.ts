export interface UserProfile {
	username: string;
}

export interface UserCustomResponse {
	username: string;
	userCustom: UserCustomProfile;
}

export interface UserCustomProfile {
	username: string;
	gender: string | null;
	location: string | null;
	bio: string | null;
	serial_num: string | null;
	birthday: string | null;
	Head: number | null;
	Eyes: number | null;
	Eyebrows: number | null;
	Nose: number | null;
	Mouth: number | null;
	Ears: number | null;
	Hair: number | null;
	Top: number | null;
	Bottom: number | null;
	Shoes: number | null;
}

export default interface UserStore {
	userCustomProfile: UserCustomProfile;
	changedFields: Partial<UserCustomProfile>;
	fetchUserCustoms: () => Promise<void>;
	loadUserCustomProfile: () => Promise<void>;
	// setUserProfile: (profile: UserProfile) => void;
	setUserCustomProfile: (customProfile: UserCustomProfile) => void;
	updateField: (key: keyof UserCustomProfile, value: number | null) => void;
	updateUserCustomProfile: () => Promise<void>;
	resetUserCustomProfile: () => Promise<void>;
}