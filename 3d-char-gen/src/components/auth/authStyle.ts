import { styled } from "styled-components";

export const Wrapper = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: 'Helvetica', sans-serif;
`;

export const AuthContainer = styled.div`
	height: 100%;
	width: 420px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* padding: 50px 0px; */
`;

export const Title = styled.h1`
	color: white;
	font-size: 48px;
`;

export const Logo = styled.img`
	margin-bottom: 30px;
	height: 90px;
`;

export const Form = styled.form`
	margin-top: 60px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

export const Input = styled.input`
	padding: 10px 20px;
	border-radius: 50px;
	border: none;
	width: 100%;
	font-size: 20px;
	color: black;

	&[type="submit"]{
		cursor: pointer;
		background-color:#1d9bf0;
		color: white;
		// width: 60%;
		// margin: 0 auto; /* Center horizontally */
		&:hover{
			// opacity: 0.8;
		}
	}
`;

export const Error = styled.span`
	font-weight: 600;
	color: tomato;
`;

export const Switcher = styled.span`
	font-size: 20px;
	margin-top: 20px;
	a{
		color: #1d9bf0;
	}
`;
