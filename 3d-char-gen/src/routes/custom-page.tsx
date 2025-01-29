// import CharacterContainer from "@/components/character-container/CharacterContainer";
// import CustomMenu from "@/components/menu-container/CustomMenu";
// import Preview from "@/components/preview-container/Preview";
import styled from "styled-components";
import { useConfigStore } from "../custom-store";
import CustomMenu from "../components/custom-components/custom-menu";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px; /* Add space between columns */
  height: calc(100vh - 10vh);
  border: 1px solid white;
`;

const Col = styled.div`
	border: 1px solid white;
`;

function CustomPage() {
	// const { categories, currentCategories, fetchCustoms, setCurrentCategory } = useConfigStore();

	return (
		<Wrapper>
			<CustomMenu />
			<CharacterContainer />
			{/* <Preview /> */}
			<Col>Col</Col>
			<Col>Col</Col>
		</Wrapper>
	);
};

export default CustomPage;
