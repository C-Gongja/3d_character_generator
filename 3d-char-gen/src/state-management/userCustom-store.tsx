import { create } from 'zustand';
import { useConfigStore } from './custom-store';
import { fetchUserCustomUpdate, fetchUserCustom } from '../api/user/userCustomApi';
import { Customization } from '../components/custom-components/custom-Interface';

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

interface UserStore {
	userProfile: UserProfile;
	userCustomProfile: UserCustomProfile;
	changedFields: Partial<UserCustomProfile>;
	setUserProfile: (profile: UserProfile) => void;
	setUserCustomProfile: (customProfile: UserCustomProfile) => void;
	loadUserCustomProfile: () => Promise<void>;
	updateField: (key: keyof UserCustomProfile, value: string | number) => void;
	updateUserCustomProfile: () => Promise<void>;
}

// 유저 프로필 상태를 관리하는 Zustand store
export const useCustomStore = create<UserStore>((set, get) => ({
	userProfile: {
		username: '',
	},

	userCustomProfile: {
		username: '',
		gender: '',
		location: '',
		bio: '',
		serial_num: '',
		birthday: '',
		head: -1,
		eyes: -1,
		eyebrows: -1,
		nose: -1,
		mouth: -1,
		ears: -1,
		hair: -1,
		top: -1,
		bottom: -1,
		shoes: -1,
	},

	changedFields: {},

	setUserProfile: (profile) => set({ userProfile: profile }),
	setUserCustomProfile: (customProfile) => set({ userCustomProfile: customProfile }),

	loadUserCustomProfile: async () => {
		const userData = await fetchUserCustom();

		if (userData) {
			const userCustomData = {
				username: userData.username,
				...userData.userCustom, // userCustom 안의 내용 펼치기
			};

			// Step 1: Update userCustomProfile in the userCustom-store
			set({ userCustomProfile: userCustomData });

			// Step 2: Update customization in the custom-store using `useConfigStore`
			const { customization, assets } = useConfigStore.getState();  // Accessing setCustomization from custom-store
			const updatedCustomization = { ...customization }; // Copy existing customization state

			// Setting the assets from userCustomData to customization
			const categoryKeys = [
				'head', 'eyes', 'eyebrows', 'nose', 'mouth',
				'ears', 'hair', 'top', 'bottom', 'shoes',
			] as const;

			console.log("assets: ", assets);
			console.log("customization: ", customization);
			console.log(userCustomData);

			categoryKeys.forEach((key) => {
				if (userCustomData[key] !== null && userCustomData[key] !== -1) {
					console.log("key: ", key);
					console.log("userCustomData[key]: ", userCustomData[key]);
					const foundAsset = assets.find((asset) => asset.id === userCustomData[key]);
					if (foundAsset) {
						console.log("foundAsset: ", foundAsset);
						updatedCustomization[key] = foundAsset;
						// Step 3: Update customization directly in custom-store using setCustomization
						useConfigStore.getState().setCustomization(updatedCustomization);
					}
				}
			});
		}
	},

	updateField: (key, value) =>
		set((state) => ({
			userCustomProfile: { ...state.userCustomProfile, [key]: value },
			changedFields: { ...state.changedFields, [key]: value },
		})),

	updateUserCustomProfile: async () => {
		const updatedFields = get().changedFields;

		if (Object.keys(updatedFields).length === 0) {
			console.log("no changed fields");
			return;
		}

		console.log("updating data: ", updatedFields);
		const success = await fetchUserCustomUpdate(updatedFields);

		if (success) {
			console.log("User profile updated successfully");
			set({ changedFields: {} });
		} else {
			console.error("Failed to update user profile");
		}
	},
}));
