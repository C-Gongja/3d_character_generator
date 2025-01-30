const BASE_URL = "http://localhost:5001/";

export const fetchSignup = (credentials) => {
	fetch(`${BASE_URL}api/auth/login`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			credentials
		}),
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Sign up failed");
			}
		})
		.catch(error => {
			console.error("Error:", error);
		});
}

export const fetchLogin = (credentials) => {
	fetch(`${BASE_URL}api/auth/login`, {
		headers: {
			"Content-Type": "application/json",
			// Add authorization header if required, e.g., for JWT token:
			// "Authorization": `Bearer ${token}`
		},
		method: "POST",
		body: JSON.stringify({
			username: credentials.username, // Send username
			password: credentials.password  // Send password
		}),
	})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Login failed");
			}
		})
		.catch(error => {
			console.error("Error:", error);
		});
}