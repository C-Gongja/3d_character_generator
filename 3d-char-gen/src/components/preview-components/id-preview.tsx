import { } from "react";
import styled from "styled-components";


const PreviewContainer = styled.div`
	padding: 20px;
	border: 1px solid white;
	height: 250px;
`;

const StyledH1 = styled.h1`
  font-size: 30px;
`;

type FormValues = {
	name: string;
	gender: string;
	location: string;
	bio: string;
	serialNum: string;
};

export default function IDPreview({ userProfile }: { userProfile: FormValues }) {
	// const [menu, setMenu] = useState(1);

	return (
		< PreviewContainer >
			<StyledH1>ID Preview</StyledH1>
			<p><strong>Name:</strong> {userProfile.name || "N/A"}</p>
			<p><strong>Gender:</strong> {userProfile.gender || "N/A"}</p>
			<p><strong>Location:</strong> {userProfile.location || "N/A"}</p>
			<p><strong>Bio:</strong> {userProfile.bio || "N/A"}</p>
			<p><strong>User ID:</strong> {userProfile.serialNum || "N/A"}</p>
		</PreviewContainer >
	);
}
