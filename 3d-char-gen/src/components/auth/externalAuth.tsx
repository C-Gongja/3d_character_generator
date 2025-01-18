import { styled } from "styled-components";
import Image from "next/image";

export const SocialButtonsWrapper = styled.div`
	display: flex;
	justify-content: center; /* Centers buttons horizontally */
	align-items: center; /* Aligns buttons vertically */
	gap: 15px; /* Adds space between the buttons */
	margin-top: 30px; /* Optional spacing from other content */
`;

export const Button = styled.span`
	width: 60px;  /* Set the width */
  height: 60px; /* Set the height (same as width to make it round) */
  border-radius: 50%; /* This makes the button round */
	background-color: white;
	padding: 10px 20px;
	border-radius: 50%;
	border: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	
	& {
  	transition: transform 0.3s ease;
	}
	&:hover{
		transform: scale(1.1);  
	}
`;

export const Logo = styled(Image)`
	height: 30px;
	width: auto;
`;

export default function ExternalAuthButtons() {
	return (
		<SocialButtonsWrapper>
			<Button>
				<Logo src="/icons/logo/google-icon.svg" alt="Google" width={30} height={30} />
			</Button>
			<Button>
				<Logo src="/icons/logo/facebook-icon.svg" alt="FB" width={30} height={30} />
			</Button>
			<Button>
				<Logo src="/icons/logo/microsoft-icon.svg" alt="MS" width={30} height={30} />
			</Button>
			<Button>
				<Logo src="/icons/logo/Apple_logo_black.svg" alt="Apple" width={30} height={30} />
			</Button>
		</SocialButtonsWrapper>
	);
}