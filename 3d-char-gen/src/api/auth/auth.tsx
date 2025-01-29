const BASE_URL = "http://localhost:5001/";

export const fetchLogin = (credentials) => {
	fetch(`${BASE_URL}api/auth/login`, {
		headers: {
			"Content-Type": "application/json",
			// Add authorization header if required, e.g., for JWT token:
			// "Authorization": `Bearer ${token}`
		},
		method: "POST",
		body: JSON.stringify({
			username: username, // Send username
			password: password  // Send password
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