import { create } from 'zustand';
import { useConfigStore } from './custom-store';
import { fetchUserCustomUpdate, fetchUserCustom, fetchUserCustomCreate } from '../api/user/userCustomApi';
import UserStore, { UserCustomProfile } from './userCustom-Interface';

// 유저 프로필 상태를 관리하는 Zustand store
export const useCustomStore = create<UserStore>((set, get) => ({
	userCustomProfile: {
		username: '',
		gender: null,
		location: null,
		bio: null,
		serial_num: null,
		birthday: null,
		Head: null,
		Eyes: null,
		Eyebrows: null,
		Nose: null,
		Mouth: null,
		Ears: null,
		Hair: null,
		Top: null,
		Bottom: null,
		Shoes: null,
	},

	changedFields: {},

	// setUserProfile: (profile) => set({ userProfile: profile }),
	setUserCustomProfile: (customProfile) => set({ userCustomProfile: customProfile }),

	fetchUserCustoms: async () => {
		const userData = await fetchUserCustom();
		if (userData) {
			const userCustomData = {
				username: userData.username,
				...userData.userCustom, //need to figure out how to set this type.
			};

			//copy default settings to userCustomData
			// const { customization } = useConfigStore.getState();
			// Object.entries(customization).forEach(([key, category]) => {
			// 	if (category && category.id !== -1 && userCustomData[key as keyof UserCustomProfile] === null) {
			// 		userCustomData[key as keyof UserCustomProfile] = category.id;
			// 	}
			// });

			// Step 1: Update userCustomProfile in the userCustom-store
			set({ userCustomProfile: userCustomData });
			await get().loadUserCustomProfile();
		}
		else {
			// new userCustomProfile
			const { userCustomProfile } = useCustomStore.getState();
			const user = JSON.parse(localStorage.getItem("user-storage") || "{}");
			const userName = user?.state?.user?.name || "";

			const newUserCustomData = { ...userCustomProfile, username: userName };

			// setting default setting
			const { customization } = useConfigStore.getState();
			Object.entries(customization).forEach(([key, category]) => {
				if (category && category.id !== -1 && newUserCustomData[key as keyof UserCustomProfile] === null) {
					newUserCustomData[key as keyof UserCustomProfile] = category.id;
				}
			});

			const success = await fetchUserCustomCreate(newUserCustomData);
			if (success) {
				set({ userCustomProfile: newUserCustomData });
				await get().loadUserCustomProfile();
			}
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
