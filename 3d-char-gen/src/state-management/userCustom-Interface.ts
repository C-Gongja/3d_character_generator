export interface UserProfile {
	username: string;
}

export interface UserCustomProfile {
	username: string;
	gender: string | null;
	location: string | null;
	bio: string | null;
	serial_num: string | null;
	birthday: string | null;
	head: number | null;
	eyes: number | null;
	eyebrows: number | null;
	nose: number | null;
	mouth: number | null;
	ears: number | null;
	hair: number | null;
	top: number | null;
	bottom: number | null;
	shoes: number | null;
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