import { useEffect, useState } from "react";
import styled from "styled-components";
import IDPreview from "./id-preview";
import IDCustom from "./id-custom";
import { fetchUserProfile } from "../../api/user/userApi";

const PreviewContainer = styled.div`
	padding: 20px;
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const initialFormValues = {
	name: "",
	gender: "",
	location: "",
	bio: "",
	serialNum: "",
};

export default function Preview() {
	const [userProfile, setUserProfile] = useState(initialFormValues);

	// 여기서 유저 정보 가져오기
	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const profile = await fetchUserProfile();
				console.log("profile: ", profile);
				setUserProfile(profile);
				console.log("userprofile: ", userProfile);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		getUserProfile();
	}, []);

	return (
		<PreviewContainer>
			<IDPreview userProfile={userProfile} />
			<IDCustom userProfile={userProfile} setUserProfile={setUserProfile} />
		</PreviewContainer>
	);
}
