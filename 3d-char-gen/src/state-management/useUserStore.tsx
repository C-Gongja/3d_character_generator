import { create } from 'zustand';
import { fetchVerifyUser } from '../api/user/userApi';

interface User {
	id: number;
	name: string;
	role: string;
}

interface UserState {
	user: User | null;
	accessToken: string | null;
	setToken: (token: string) => void;
	setUser: (user: User | null) => void;
	clearUser: () => void;
	verifyUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	accessToken: localStorage.getItem('accessToken'), // Load initially

	setToken: (accessToken) => {
		localStorage.setItem('accessToken', accessToken);
		set({ accessToken });
	},
	setUser: (user) => {
		set({ user });
	},
	clearUser: () => {
		set({ user: null, accessToken: null });
		localStorage.removeItem('accessToken');
	},
	verifyUser: async () => {
		const user = await fetchVerifyUser();
		if (user) {
			set({ user: user });
		} else {
			set({ user: null });
		}
	},
}));