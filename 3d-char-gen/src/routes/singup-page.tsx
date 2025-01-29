import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExternalAuthButtons from "../components/auth-components/externalAuth";

export default function SignUp() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [birthDate, setBirthDate] = useState("");

	const checkDisplayNameUnique = async (displayName: string): Promise<boolean> => {
		return !!displayName;
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "name") setName(value);
		else if (name === "username") setUsername(value);
		else if (name === "email") setEmail(value);
		else if (name === "password") setPassword(value);
		else if (name === "bio") setBio(value);
		else if (name === "birthDate") setBirthDate(value);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		if (isLoading || !name || !username || !email || !password || !birthDate) return;

		try {
			setIsLoading(true);

			const isUnique = await checkDisplayNameUnique(username);
			if (!isUnique) {
				alert("Username is already taken, please choose another one.");
				return;
			}

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
						value={name}
						placeholder="Name"
						type="text"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="username"
						value={username}
						placeholder="Username"
						type="text"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="email"
						value={email}
						placeholder="Email"
						type="email"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="password"
						value={password}
						placeholder="Password"
						type="password"
						required
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="bio"
						value={bio}
						placeholder="Bio (Optional)"
						type="text"
						className="px-5 py-2 rounded-full border border-gray-300 text-lg text-black focus:ring-2 focus:ring-blue-500"
					/>
					<input
						onChange={onChange}
						name="birthDate"
						value={birthDate}
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
