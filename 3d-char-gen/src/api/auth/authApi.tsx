import { LoginFormData, SignupFormData } from "./user-types";

const BASE_URL = "http://localhost:5001/api/auth";

export const fetchSignup = (credentials: SignupFormData): Promise<any> => {
	return fetch(`${BASE_URL}/signup`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(credentials),
		credentials: "include",
	})
		.then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error("Sign up failed");
			}
		})
		.catch(error => {
			console.error(error);
			throw error;
		});
}

export const fetchLogin = (credentials: LoginFormData): Promise<any> => {
	return fetch(`${BASE_URL}/login`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			email: credentials.email,
			password: credentials.password
		}),
		credentials: "include",
	})
		.then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				return data;
			} else {
				throw new Error("Login failed");
			}
		})
		.catch(error => {
			console.error("Error:", error);
		});
}