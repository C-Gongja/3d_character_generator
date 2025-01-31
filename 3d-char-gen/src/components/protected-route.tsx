import { Navigate } from "react-router-dom";
import { fetchUserProfile } from "../api/user/userApi";


export default async function ProtectedRoute({ children }: { children: React.ReactNode; }) {
	const user = await fetchUserProfile();
	if (user === null) {
		return <Navigate to="/login" />;
	}
	console.log("user from protected route: ", user);

	return children;
}