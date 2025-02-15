import { create } from 'zustand';
import { useConfigStore } from './custom-store';
import { fetchUserCustomUpdate, fetchUserCustom } from '../api/user/userCustomApi';
import UserStore, { UserCustomProfile } from './userCustom-Interface';

// 유저 프로필 상태를 관리하는 Zustand store
export const useCustomStore = create<UserStore>((set, get) => ({
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

	// setUserProfile: (profile) => set({ userProfile: profile }),
	setUserCustomProfile: (customProfile) => set({ userCustomProfile: customProfile }),

	fetchUserCustoms: async () => {
		// Step 1: Update userCustomProfile in the userCustom-store
		const userData = await fetchUserCustom();

		if (userData) {
			const userCustomData = {
				username: userData.username,
				...userData.userCustom, // userCustom 안의 내용 펼치기
			};

			//여기에 만약에 customization[key].id 가 -1이지 않고 userCustomData null이면 추가
			//1.if userCustomData[category key name] === null && category.id != -1, userCustomData[category key name] = category.id
			const { customization } = useConfigStore.getState();
			Object.entries(customization).forEach(([key, category]) => {
				if (category && category.id !== -1 && userCustomData[key as keyof UserCustomProfile] === null) {
					userCustomData[key as keyof UserCustomProfile] = category.id;
				}
			});

			console.log("fetchUserCustom userCustomData: ", userCustomData);

			// Step 1: Update userCustomProfile in the userCustom-store
			set({ userCustomProfile: userCustomData });
			await get().loadUserCustomProfile();
		}
	},

	loadUserCustomProfile: async () => {
		// Step 2: Update customization in the custom-store using `useConfigStore`
		const { userCustomProfile } = useCustomStore.getState();
		const { customization, categories, assets } = useConfigStore.getState();  // Accessing setCustomization from custom-store
		const updatedCustomization = { ...customization }; // Copy existing customization state

		categories.forEach((category) => {
			const categoryName = category.name as keyof UserCustomProfile;
			if (userCustomProfile[categoryName] !== null && userCustomProfile[categoryName] !== -1) {
				const foundAsset = assets.find((asset) => asset.id === userCustomProfile[categoryName]);
				if (foundAsset) {
					updatedCustomization[category.name] = foundAsset;
					// Step 3: Update customization directly in custom-store using setCustomization
					useConfigStore.getState().setCustomization(updatedCustomization);
				}
			}
		});
	},

	updateField: (key, value) =>
		set((state) => ({
			changedFields: { ...state.changedFields, [key]: value },
		})),

	updateUserCustomProfile: async () => {
		const updatedFields = get().changedFields;

		if (Object.keys(updatedFields).length === 0) {
			console.log("no changed fields");
			return;
		}

		console.log("updating data: ", JSON.stringify(updatedFields));
		const success = await fetchUserCustomUpdate(updatedFields);

		if (success) {
			console.log("User profile updated successfully");
			set({ changedFields: {} });
		} else {
			console.error("Failed to update user profile");
		}
	},

	resetUserCustomProfile: async () => {
		const { userCustomProfile } = useCustomStore.getState();
		const { customization, categories, assets } = useConfigStore.getState();  // Accessing setCustomization from custom-store
		const updatedCustomization = { ...customization }; // Copy existing customization state

		categories.forEach((category) => {
			const categoryName = category.name as keyof UserCustomProfile;
			if (userCustomProfile[categoryName] !== null && userCustomProfile[categoryName] !== -1) {
				const foundAsset = assets.find((asset) => asset.id === userCustomProfile[categoryName]);
				if (foundAsset) {
					updatedCustomization[category.name] = foundAsset;
				}
			}
			else {
				updatedCustomization[category.name] = null;
			}
		});

		// Update the customization state in the store
		useConfigStore.getState().setCustomization(updatedCustomization);
	},
}));
