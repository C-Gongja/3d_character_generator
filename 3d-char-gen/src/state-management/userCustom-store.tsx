import { create } from 'zustand';
import { useConfigStore } from './custom-store';
import { fetchUserCustomUpdate, fetchUserCustom, fetchUserCustomCreate } from '../api/user/userCustomApi';
import UserStore, { CustomField, UserCustomProfile } from './userCustom-Interface';

// 유저 프로필 상태를 관리하는 Zustand store
export const useCustomStore = create<UserStore>((set, get) => ({
	isLoading: false,
	userCustomProfile: {
		username: '',
		gender: null,
		location: null,
		bio: null,
		serial_num: null,
		birthday: null,
		Head: { asset_id: null, color: null },
		Eyes: { asset_id: null, color: null },
		Eyebrows: { asset_id: null, color: null },
		Nose: { asset_id: null, color: null },
		Mouth: { asset_id: null, color: null },
		Ears: { asset_id: null, color: null },
		Hair: { asset_id: null, color: null },
		Top: { asset_id: null, color: null },
		Bottom: { asset_id: null, color: null },
		Shoes: { asset_id: null, color: null },
	},

	initialUserCustomProfile: {},
	changedFields: {},

	// setUserProfile: (profile) => set({ userProfile: profile }),
	setInituserCustomProfile: (initProfile) => set({ initialUserCustomProfile: initProfile }),
	setUserCustomProfile: (customProfile) => set({ userCustomProfile: customProfile }),

	fetchUserCustoms: async () => {
		set({ isLoading: true });
		const userData = await fetchUserCustom();
		if (userData) {
			const userCustomData = {
				username: userData.username,
				...userData.userCustom, //need to figure out how to set this type.
			};

			// Step 1: Update userCustomProfile in the userCustom-store
			set({ userCustomProfile: userCustomData, initialUserCustomProfile: userCustomData });
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
				if (category && category.id !== -1 && newUserCustomData[key as keyof UserCustomProfile].asset_id === null) {
					(newUserCustomData[key as keyof UserCustomProfile] as { asset_id: number }).asset_id = category.id;
				}
			});

			const success = await fetchUserCustomCreate(newUserCustomData);
			if (success) {
				set({ userCustomProfile: newUserCustomData, initialUserCustomProfile: newUserCustomData });
				await get().loadUserCustomProfile();
			}
		}
		set({ isLoading: false });
	},

	loadUserCustomProfile: async () => {
		// Step 2: Update customization in the custom-store using `useConfigStore`
		const { userCustomProfile } = useCustomStore.getState();
		const { customization, categories, assets } = useConfigStore.getState();  // Accessing setCustomization from custom-store
		const updatedCustomization = { ...customization }; // Copy existing customization state

		categories.forEach((category) => {
			const categoryName = category.name as keyof UserCustomProfile;
			if ((userCustomProfile[categoryName] as CustomField).asset_id !== null) {
				const foundAsset = assets.find((asset) => asset.id === (userCustomProfile[categoryName] as CustomField).asset_id);
				if (foundAsset) {
					foundAsset.color = (userCustomProfile[categoryName] as CustomField).color;
					updatedCustomization[category.name] = foundAsset;
					// Step 3: Update customization directly in custom-store using setCustomization
					useConfigStore.getState().setCustomization(updatedCustomization);
				}
			}
		});
		// console.log("user custom profile: ", userCustomProfile)
		// console.log("customization: ", customization)
	},

	updateField: (key: keyof UserCustomProfile, data: { asset_id?: number; color?: string; userInfo?: string; }) =>
		set((state) => {
			const updatedFields = { ...state.changedFields };

			if (['Head', 'Eyes', 'Eyebrows', 'Nose', 'Mouth', 'Ears', 'Hair', 'Top', 'Bottom', 'Shoes'].includes(key)) {
				// 기존 값이 null인 경우 초기화
				if (updatedFields[key] === null) {
					updatedFields[key] = { asset_id: null, color: null };
					console.log("updatedFields: null");
				}
				updatedFields[key] = { ...updatedFields[key], ...data, };
			} else {
				// Not updating userCustomProfile directly, so need to update userCustomProfile manually
				updatedFields[key] = data;
			}

			return { changedFields: updatedFields, userCustomProfile: { ...state.userCustomProfile, ...updatedFields }, };
		}),

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
		const { userCustomProfile, initialUserCustomProfile } = useCustomStore.getState();

		set({ userCustomProfile: initialUserCustomProfile });
		await get().loadUserCustomProfile();
	},
}));
