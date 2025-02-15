import styled from "styled-components";
import IDPreview from "./id-preview";
import IDCustom from "./id-custom";

const PreviewContainer = styled.div`
	padding: 20px;
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export default function Preview() {
	// const { loadUserProfile } = useCustomStore();

	// useEffect(() => {
	// 	loadUserProfile();
	// }, []);

	return (
		<PreviewContainer>
			<IDPreview />
			<IDCustom />
		</PreviewContainer>
	);
}
