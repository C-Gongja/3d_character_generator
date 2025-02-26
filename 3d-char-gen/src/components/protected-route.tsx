import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useUserStore } from '../state-management/user-store';

function ProtectedRoute({ children }: { children: ReactNode }) {
	const { user, accessToken, verifyUser } = useUserStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkUser = async () => {
			if (accessToken && !user) {
				await verifyUser();
			}
			setIsLoading(false);
		};

		checkUser();
	}, [accessToken, user, verifyUser]);

	if (isLoading) {
		return <div>Loading...</div>; // 로딩 중 UI
	}
	if (!user) {
		return <Navigate to="/login" />;
	}
	return (
		<div className='pt-20'>
			{children}
		</div>
	);
}

export default ProtectedRoute;