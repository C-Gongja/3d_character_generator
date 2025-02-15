import { apiClient } from "./apiClient";
import { UserCustomProfile } from "../../state-management/userCustom-store";

const CUSTOM_BASE_URL = "http://localhost:5001/api/usercustom";

export const fetchUserCustom = async (): Promise<UserCustomProfile | null> => {
	const user = JSON.parse(localStorage.getItem("user-storage") || "{}");
	const userId = user?.state?.user?.id;

	if (!userId) {
		console.error("User ID not found");
		return null;
	}

	try {
		const data = await apiClient(`${CUSTOM_BASE_URL}/${userId}`, { method: "GET" });
		return data.data;
	} catch (error) {
		console.error("Error fetching user custom profile:", error);
		return null;
	}
};

export const fetchUserCustomUpdate = async (updatedProfile: Partial<UserCustomProfile>): Promise<boolean> => {
	const user = JSON.parse(localStorage.getItem("user-storage") || "{}");
	const userId = user?.state?.user?.id;

	if (!userId) {
		console.error("User ID not found");
		return false;
	}

	try {
		await apiClient(`${CUSTOM_BASE_URL}/${userId}`, {
			method: "PATCH",
			body: JSON.stringify(updatedProfile),
		});

		return true;
	} catch (error) {
		console.error("Error updating user profile:", error);
		return false;
	}
};
