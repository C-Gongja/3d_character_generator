import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExternalAuthButtons from "../components/auth-components/externalAuth";
import { fetchSignup } from "../api/auth/authApi";
import { SignupFormData } from "../api/auth/user-types";
import { useUserStore } from "../state-management/useUserStore";

export default function SignUp() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState<SignupFormData>({
		name: "",
		username: "",
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

		if (isLoading || !formData.name || !formData.email || !formData.password) return;

		try {
			setIsLoading(true);

			const userInfo = await fetchSignup(formData);
			setUser(userInfo.user);
			setToken(userInfo.accessToken)
			navigate("/");

		} catch (e: any) {
			const error = JSON.parse(e.message);
			if (error.errorCode === "EMAIL_ALREADY_EXIST") {
				setError(error.message);
			} else {
				setError("Sign up failed. Please try again."); // 기본 에러 메시지
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="flex flex-col items-center w-[420px]">
				<img src={"/icons/page-logo/logo/logo-color.PNG"} alt="Logo" className="mb-8 h-[150px] cursor-pointer" />
				<h2 className="text-white text-4xl mb-4">Create your account</h2>
				<form onSubmit={onSubmit} className="flex flex-col gap-2 w-full mt-8">
					{error && (
						<span className="text-red-500 text-sm ml-7">{error}</span>
					)}
					<input
						onChange={onChange}
						name="name"
						value={formData.name}
						placeholder="Name"
						type="text"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500 text-white"
					/>
					<input
						onChange={onChange}
						name="username"
						value={formData.username}
						placeholder="Username"
						type="text"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500 text-white"
					/>
					<input
						onChange={onChange}
						name="email"
						value={formData.email}
						placeholder="Email"
						type="email"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500 text-white"
					/>
					<input
						onChange={onChange}
						name="password"
						value={formData.password}
						placeholder="Password"
						type="password"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500 text-white"
					/>
					<input
						type="submit"
						value={isLoading ? "Loading..." : "Create Account"}
						className="cursor-pointer bg-blue-500 text-white py-2 px-5 rounded-full transition-opacity hover:opacity-80"
					/>
				</form>
				<p className="text-lg mt-5 text-center">
					Already have an account? &nbsp;
					<Link to="/login" className="text-blue-500">Sign in</Link>
				</p>
				<ExternalAuthButtons />
			</div>
		</div>
	);
}
