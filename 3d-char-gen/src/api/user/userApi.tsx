import { useUserStore } from "../../user-store";

const BASE_URL = "http://localhost:5001/api/user";
const AUTH_BASE_URL = "http://localhost:5001/api/auth";

export const fetchUserProfile = () => {
	const accessToken = localStorage.getItem('accessToken');
	const user = localStorage.getItem('user-storage')

	// JSON 문자열을 자바스크립트 객체로 변환합니다.
	const parsedData = JSON.parse(user);
	// user 정보를 추출합니다.
	const userId = parsedData.state.user.id;

	return fetch(`${BASE_URL}/${userId}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	})
		.then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				return data.data;
			} else if (response.status === 401) {
				const newAccessToken = await fetchRefreshToken();

				// 새로운 액세스 토큰을 사용하여 원래 요청 다시 시도
				const retryResponse = await fetch(`${BASE_URL}/${userId}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${newAccessToken}`
					}
				});
				if (retryResponse.ok) {
					const protectedData = await retryResponse.json();
					console.log('Protected data:', protectedData);
					return protectedData.data;
				} else {
					console.error('Failed to access protected route');
				}
			} else {
				throw new Error("Profile failed");
			}
		})
		.catch(error => {
			console.error(error);
			throw error;
		});
}

const fetchRefreshToken = () => {
	const accessToken = localStorage.getItem('accessToken');

	return fetch(`${AUTH_BASE_URL}/refresh`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		},
		credentials: 'include',
	})
		.then(async (response) => {
			if (response.ok) {
				const data = await response.json();
				const setToken = useUserStore.getState().setToken;
				setToken(data.accessToken);
				return data.accessToken;
			} else {
				throw new Error("refresh token failed");
			}
		})
		.catch(error => {
			console.error(error);
			throw error;
		});
}