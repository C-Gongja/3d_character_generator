import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import LogIn from "./routes/login-page";
import SignUp from "./routes/signup-page";
import CustomPage from "./routes/custom-page";
import Profile from "./routes/profile";
import LoadingScreen from "./components/loading-screen";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProtectedRoute><Layout /></ProtectedRoute>,
		children: [
			{
				path: "",
				element: <CustomPage />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
		]
	},
	{
		path: "/login",
		element: <LogIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
]);

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		setIsLoading(false);
		// setTimeout(() => setIsLoading(false), 2000); // for testing 
	};

	useEffect(() => {
		// init();
		setIsLoading(false);
	}, []);

	return (
		<>
			<div className="flex w-full h-screen">
				{/* <GlobalStyles /> */}
				{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
			</div >
		</>
	);
}

export default App