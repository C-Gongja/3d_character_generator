import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExternalAuthButtons from "../components/auth-components/externalAuth";
import { fetchLogin } from "../api/auth/authApi";
import { LoginFormData } from "../api/auth/user-types";
import { useUserStore } from "../state-management/user-store";

export default function LogIn() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const { setUser, setToken } = useUserStore();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		try {
			setIsLoading(true);
			const userInfo = await fetchLogin(formData);
			setUser(userInfo.user);
			setToken(userInfo.accessToken)

			navigate("/");
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-auto w-full items-center justify-center">
			<div className="flex flex-col items-center w-[420px]">
				<img src={"/icons/page-logo/logo/logo-color.PNG"} alt="Logo" className="mb-8 h-[150px] cursor-pointer" onClick={() => navigate("/")} />
				<h1 className="text-white text-4xl">Sign in</h1>
				<form
					onSubmit={onSubmit}
					className="flex flex-col gap-5 w-full mt-14 mb-2"
				>
					<input
						onChange={onChange}
						name="email"
						value={formData.email}
						placeholder="Email"
						className="px-5 py-2 rounded-full border border-white text-lg text-white"
					/>
					<input
						onChange={onChange}
						type="password"
						name="password"
						value={formData.password}
						placeholder="Password"
						className="px-5 py-2 rounded-full border border-white text-lg text-white"
					/>
					<input
						type="submit"
						value={isLoading ? "Loading..." : "Sign In"}
						className="cursor-pointer bg-blue-500 text-white py-2 px-5 rounded-full transition-opacity hover:opacity-80"
					/>
				</form>
				{error && <span className="font-semibold text-red-500">{error}</span>}
				<p className="text-lg mt-5 text-center">
					Don't have an account? &nbsp;
					<Link to="/signup" className="text-blue-500">Create one</Link>
				</p>
				<ExternalAuthButtons />
			</div>
		</div>
	);
}
