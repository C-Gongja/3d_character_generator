import { useEffect, useState } from "react";
import styled from "styled-components";
import IDPreview from "./id-preview";
import IDCustom from "./id-custom";
// import { fetchUserProfile } from "../../api/user/userApi";
import { useCustomStore } from "../../state-management/userCustom-store";

const PreviewContainer = styled.div`
	padding: 20px;
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export default function Preview() {
	// const [userProfile, setUserProfile] = useState(initialFormValues);
	const { loadUserProfile } = useCustomStore();

	// 여기서 유저 정보 가져오기
	useEffect(() => {
		loadUserProfile();
	}, []);

	return (
		<PreviewContainer>
			<IDPreview />
			<IDCustom />
		</PreviewContainer>
	);
}
