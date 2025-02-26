import { LoginFormData, SignupFormData } from "./user-types";

const BASE_URL = "http://localhost:5001/api/auth";

export const fetchSignup = async (credentials: SignupFormData): Promise<any> => {
	try {
		const response = await fetch(`${BASE_URL}/signup`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
			credentials: "include",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(JSON.stringify(errorData));
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
}

export const fetchLogin = async (credentials: LoginFormData): Promise<any> => {
	try {
		const response = await fetch(`${BASE_URL}/login`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
			credentials: "include",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(JSON.stringify(errorData));
		}

		return await response.json();
	} catch (error) {
		throw error;
	}
}