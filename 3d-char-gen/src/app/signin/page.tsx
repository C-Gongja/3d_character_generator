"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContainer, Input, Switcher, Title, Form, Error, Wrapper, Logo } from "../../components/auth/authStyle";
import ExternalAuthButtons from "../../components/auth/externalAuth";

export default function LogIn() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target: { name, value } } = e;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		// if (isLoading || email === "" || password === "") return;
		try {
			setIsLoading(true);
			router.push("/"); // Navigate using Next.js router
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Wrapper>
			<AuthContainer>
				<Logo src={""} />
				<Title>Sign in</Title>
				<Form onSubmit={onSubmit}>
					<Input
						onChange={onChange}
						name="email"
						value={email}
						placeholder="Email"
					// type="email"
					// required
					/>
					<Input
						onChange={onChange}
						name="password"
						value={password}
						placeholder="Password"
					// type="password"
					// required 
					/>
					<Input
						type="submit"
						value={isLoading ? "Loading..." : "Sign In"} />
				</Form>
				{error !== "" && <Error>{error}</Error>}

				<Switcher>
					Don't have an account? &nbsp;
					<Link href="/signup"> Create one</Link>
				</Switcher>
				<ExternalAuthButtons />
			</AuthContainer>
		</Wrapper>
	);
}