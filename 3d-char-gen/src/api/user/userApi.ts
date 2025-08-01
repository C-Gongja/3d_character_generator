import { apiClient } from "./apiClient";
import { UserProfile } from "../../state-management/useUserCustomStore";

const BASE_URL = "http://localhost:5001/api/user";
const CUSTOM_BASE_URL = "http://localhost:5001/api/usercustom";

export const fetchVerifyUser = async (): Promise<UserProfile | null> => {
	try {
		const data = await apiClient(`${BASE_URL}`, { method: "GET" });
		return data.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return null;
	}
};

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
		alert('Session expired. Please log in again.');
		return null;
	}
};

export const fetchUserUpdate = async (updatedProfile: Partial<UserProfile>): Promise<boolean> => {
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
