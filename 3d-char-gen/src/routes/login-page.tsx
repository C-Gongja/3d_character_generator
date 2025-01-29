import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExternalAuthButtons from "../components/auth-components/externalAuth";

export default function LogIn() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "email") setEmail(value);
		else if (name === "password") setPassword(value);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		try {
			setIsLoading(true);
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
				<img src={""} alt="Logo" className="mb-8 h-[90px]" />
				<h1 className="text-white text-4xl">Sign in</h1>
				<form
					onSubmit={onSubmit}
					className="flex flex-col gap-2 w-full mt-14 mb-2"
				>
					<input
						onChange={onChange}
						name="email"
						value={email}
						placeholder="Email"
						className="px-5 py-2 rounded-full border-none text-lg text-black"
					/>
					<input
						onChange={onChange}
						name="password"
						value={password}
						placeholder="Password"
						className="px-5 py-2 rounded-full border-none text-lg text-black"
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
