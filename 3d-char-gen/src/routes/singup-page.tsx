import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExternalAuthButtons from "../components/auth-components/externalAuth";
import { fetchSignup } from "../api/auth/auth";

export default function SignUp() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		bio: "",
		birthDate: ""
	});

	const checkDisplayNameUnique = async (displayName: string): Promise<boolean> => {
		return !!displayName;
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		if (isLoading || !formData.name || !formData.username || !formData.email || !formData.password || !formData.birthDate) return;

		try {
			setIsLoading(true);

			const isUnique = await checkDisplayNameUnique(formData.username);
			if (!isUnique) {
				alert("Username is already taken, please choose another one.");
				return;
			}
			fetchSignup(formData);
			navigate("/");
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="flex flex-col items-center w-[420px]">
				<img src={""} alt="Logo" className="mb-6 h-[90px]" />
				<h1 className="text-white text-4xl mb-4">Create your account</h1>
				<form onSubmit={onSubmit} className="flex flex-col gap-2 w-full mt-8">
					<input
						onChange={onChange}
						name="name"
						value={formData.name}
						placeholder="Name"
						type="text"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="username"
						value={formData.username}
						placeholder="Username"
						type="text"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="email"
						value={formData.email}
						placeholder="Email"
						type="email"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="password"
						value={formData.password}
						placeholder="Password"
						type="password"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="bio"
						value={formData.bio}
						placeholder="Bio (Optional)"
						type="text"
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="birthDate"
						value={formData.birthDate}
						placeholder="Date of Birth"
						type="date"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="submit"
						value={isLoading ? "Loading..." : "Create Account"}
						className="cursor-pointer bg-blue-500 text-white py-2 px-5 rounded-full transition-opacity hover:opacity-80"
					/>
				</form>
				{error && <span className="font-semibold text-red-500 mt-2">{error}</span>}
				<p className="text-lg mt-5 text-center">
					Already have an account? &nbsp;
					<Link to="/signin" className="text-blue-500">Sign in</Link>
				</p>
				<ExternalAuthButtons />
			</div>
		</div>
	);
}
