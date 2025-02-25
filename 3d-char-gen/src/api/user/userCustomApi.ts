import { apiClient } from "./apiClient";
import { UserCustomProfile } from "../../state-management/userCustom-Interface";

const CUSTOM_BASE_URL = "http://localhost:5001/api/usercustom";

export const fetchUserCustomCreate = async ({ userId, newProfile }: { userId: number, newProfile: Partial<UserCustomProfile> }): Promise<boolean> => {

	if (!userId) {
		console.error("User ID not found");
		return false;
	}

	try {
		await apiClient(`${CUSTOM_BASE_URL}/${userId}`, {
			method: "POST",
			body: JSON.stringify(newProfile),
		});

		return true;
	} catch (error) {
		console.error("Error updating user profile:", error);
		return false;
	}
};

export const fetchUserCustom = async (id: number): Promise<UserCustomProfile | null> => {

	if (!id) {
		console.error("User ID not found");
		return null;
	}

	try {
		const data = await apiClient(`${CUSTOM_BASE_URL}/${id}`, { method: "GET" });
		return data.data;
	} catch (error) {
		console.error("Error fetching user custom profile:", error);
		return null;
	}
};

export const fetchUserCustomUpdate = async ({ userId, updatedProfile }: { userId: number, updatedProfile: Partial<UserCustomProfile> }): Promise<boolean> => {
	console.log("user Id", userId);
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
