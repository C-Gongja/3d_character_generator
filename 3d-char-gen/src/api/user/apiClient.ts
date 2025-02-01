const AUTH_BASE_URL = "http://localhost:5001/api/auth";

/**
 * Access Token을 포함한 요청을 보내는 공통 fetch 함수
 */
const apiClient = async (url: string, options: RequestInit = {}) => {
	let accessToken = localStorage.getItem("accessToken");

	// 기본 헤더 설정
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
		...options.headers,
	};

	try {
		const response = await fetch(url, { ...options, headers });

		if (response.ok) {
			return response.json();
		}

		// 401 Unauthorized 처리 (토큰 갱신)
		if (response.status === 401) {
			accessToken = await fetchRefreshToken();
			if (!accessToken) throw new Error("Failed to refresh token");

			// 갱신된 토큰으로 재요청
			headers.Authorization = `Bearer ${accessToken}`;
			const retryResponse = await fetch(url, { ...options, headers });

			if (!retryResponse.ok) throw new Error("Retry request failed");

			return retryResponse.json();
		}

		throw new Error(`Request failed with status: ${response.status}`);
	} catch (error) {
		console.error("API request error:", error);
		throw error;
	}
};

/**
 * Refresh Token을 사용하여 새로운 Access Token을 받아오는 함수
 */
const fetchRefreshToken = async (): Promise<string | null> => {
	const response = await fetch(`${AUTH_BASE_URL}/refresh`, {
		method: "POST",
		headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
		credentials: "include",
	});

	if (response.ok) {
		const data = await response.json();
		localStorage.setItem("accessToken", data.accessToken);
		return data.accessToken;
	}

	console.error("Failed to refresh token");
	return null;
};

export { apiClient };
