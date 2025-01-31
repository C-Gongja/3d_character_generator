// src/store/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
	id: string;
	name: string;
	role: string;
}

interface UserState {
	user: User | null;
	accessToken: string | null;
	setToken: (token: string) => void;
	setUser: (user: User | null) => void;
	clearUser: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			setToken: (accessToken) => {
				localStorage.setItem("accessToken", accessToken); // ✅ localStorage에 저장
			},
			setUser: (user) => {
				set({ user });
			},
			clearUser: () => {
				set({ user: null });
				set({ accessToken: null });
				localStorage.removeItem("accessToken"); // ✅ 로그아웃 시 삭제
			},
		}),
		{
			name: 'user-storage', // localStorage 키
			storage: createJSONStorage(() => localStorage),
		}
	)
);
