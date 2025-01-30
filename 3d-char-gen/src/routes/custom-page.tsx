import styled from "styled-components";
// import { useConfigStore } from "../custom-store";
import CustomMenu from "../components/custom-components/custom-menu";
import AvatarContainer from "../components/avatar-components/avatar-container";
import Preview from "../components/preview-components/preview";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 20px; /* Add space between columns */
  height: calc(100vh - 10vh);
  border: 1px solid white;
	font-family: 'PixelFont';
`;


function CustomPage() {
	// const { categories, currentCategories, fetchCustoms, setCurrentCategory } = useConfigStore();

	return (
		<Wrapper>
			<CustomMenu />
			<AvatarContainer />
			<Preview />
		</Wrapper>
	);
};

export default CustomPage;
