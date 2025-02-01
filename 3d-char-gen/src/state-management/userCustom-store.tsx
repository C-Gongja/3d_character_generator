import { create } from 'zustand';
import { fetchUserCustomUpdate, fetchUserProfile } from '../api/user/userApi';

interface UserProfile {
	name: string;
	gender: string;
	location: string;
	bio: string;
	serialNum: string;
}

interface UserStore {
	userProfile: UserProfile;
	setUserProfile: (profile: UserProfile) => void;
	loadUserProfile: () => Promise<void>;
	updateUserCustomProfile: () => Promise<void>;
}

// 유저 프로필 상태를 관리하는 Zustand store
export const useCustomStore = create<UserStore>((set, get) => ({
	userProfile: {
		name: '',
		gender: '',
		location: '',
		bio: '',
		serialNum: ''
	},

	setUserProfile: (profile) => set({ userProfile: profile }),

	loadUserProfile: async () => {
		const data = await fetchUserProfile();  // API 호출
		if (data) set({ userProfile: data });  // 상태 업데이트
	},

	updateUserCustomProfile: async () => {
		const currentProfile = get().userProfile; // 현재 userProfile 가져오기
		console.log("updating data: ", currentProfile);
		const success = await fetchUserCustomUpdate(currentProfile); // API 호출

		if (success) {
			console.log("User profile updated successfully");
		} else {
			console.error("Failed to update user profile");
		}
	}

}));
