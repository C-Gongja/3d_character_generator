"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContainer, Input, Switcher, Title, Form, Error, Wrapper, Logo } from "../../components/auth/authStyle";
import ExternalAuthButtons from "../../components/auth/externalAuth";

export default function SignUp() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [birthDate, setBirthDate] = useState("");

	const checkDisplayNameUnique = async (displayName: string): Promise<boolean> => {
		if (displayName) {
			return true;
		} else {
			return false;
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "name") {
			setName(value);
		} else if (name === "email") {
			setEmail(value);
		} else if (name === "username") {
			setUsername(value);
		} else if (name === "password") {
			setPassword(value);
		} else if (name === "bio") {
			setBio(value);
		} else if (name === "birthDate") {
			setBirthDate(value);
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		if (isLoading || name === "" || username === "" || email === "" || password === "" || birthDate === "") return;

		try {
			setIsLoading(true);

			// Check if the displayName is unique
			const isUnique = await checkDisplayNameUnique(username);
			if (!isUnique) {
				// Notify user that the username is already taken
				alert('Username is already taken, please choose another one.');
				return;
			}

			router.push("/");

		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Wrapper>
			<AuthContainer>
				<Logo src={''} />
				<Title style={{ fontSize: '45px' }}>Create your account</Title>
				<Form onSubmit={onSubmit}>
					<Input
						onChange={onChange}
						name="name"
						value={name}
						placeholder="Name"
						type="text"
						required
					/>
					<Input
						onChange={onChange}
						name="username"
						value={username}
						placeholder="Username"
						type="text"
						required
					/>
					<Input
						onChange={onChange}
						name="email"
						value={email}
						placeholder="Email"
						type="email"
						required
					/>
					<Input
						onChange={onChange}
						name="password"
						value={password}
						placeholder="Password"
						type="password"
						required
					/>
					<Input
						onChange={onChange}
						name="bio"
						value={bio}
						placeholder="Bio (Optional)"
						type="text"
					/>
					<Input
						onChange={onChange}
						name="birthDate"
						value={birthDate}
						placeholder="Date of Birth"
						type="date"
						required
					/>
					<Input
						type="submit"
						value={isLoading ? "Loading..." : "Create Account"}
					/>
				</Form>
				{error !== "" ? <Error>{error}</Error> : null}
				<Switcher>
					Already have an account? &nbsp; <Link href="/signin"> Sign in</Link>
				</Switcher>
				<ExternalAuthButtons />
			</AuthContainer>
		</Wrapper >
	);
}
