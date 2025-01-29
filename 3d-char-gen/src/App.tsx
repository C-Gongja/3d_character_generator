import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
// import ProtectedRoute from "./components/protected-route";
import LogIn from "./routes/login-page";
import SignUp from "./routes/singup-page";
import CustomPage from "./routes/custom-page";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

const router = createBrowserRouter([
	{
		path: "/",
		// element: <ProtectedRoute><Layout /></ProtectedRoute>,
		element: <Layout />,
		children: [
			{
				path: "",
				element: <CustomPage />,
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
		await auth.authStateReady();
		//wait for firebase
		setIsLoading(false);
		// setTimeout(() => setIsLoading(false), 2000); // for testing 
	};
	useEffect(() => {
		// init();
		setIsLoading(false);
	}, []);

	return (
		<>
			<div className="pt-20 flex w-full h-screen">
				{/* <GlobalStyles /> */}
				{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
			</div >
		</>
	);
}

export default App