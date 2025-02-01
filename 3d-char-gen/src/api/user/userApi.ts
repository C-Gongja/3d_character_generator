import { apiClient } from "./apiClient";
import { UserProfile } from "../types/UserProfile";

const BASE_URL = "http://localhost:5001/api/user";
const CUSTOM_BASE_URL = "http://localhost:5001/api/usercustom";

/**
 * 유저 정보를 가져오는 API
 */
export const fetchUserProfile = async (): Promise<UserProfile | null> => {
	const user = JSON.parse(localStorage.getItem("user-storage") || "{}");
	const userId = user?.state?.user?.id;

	if (!userId) {
		console.error("User ID not found");
		return null;
	}

	try {
		const data = await apiClient(`${BASE_URL}/${userId}`, { method: "GET" });
		return data.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return null;
	}
};

/**
 * 유저 정보를 업데이트하는 API
 */
export const fetchUserCustomUpdate = async (updatedProfile: Partial<UserProfile>): Promise<boolean> => {
	const user = JSON.parse(localStorage.getItem("user-storage") || "{}");
	const userId = user?.state?.user?.id;

	if (!userId) {
		console.error("User ID not found");
		return false;
	}

	try {
		await apiClient(`${CUSTOM_BASE_URL}/${userId}`, {
			method: "PUT",
			body: JSON.stringify(updatedProfile),
		});

		return true;
	} catch (error) {
		console.error("Error updating user profile:", error);
		return false;
	}
};
