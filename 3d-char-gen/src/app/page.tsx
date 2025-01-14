"use client"

import CharacterContainer from "@/components/character-container/CharacterContainer";
import Header from "@/components/header/Header";
import CustomMenu from "@/components/menu-container/CustomMenu";
import Preview from "@/components/preview-container/Preview";
import styled from "styled-components";

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
  flex-direction: column; /* Stack header and main content vertically */
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px; /* Add space between columns */
  height: calc(100vh - 10vh);
  border: 1px solid white;
`;

function Main() {

	return (
		<Wrapper>
			<Header />
			<MainContainer>
				<CustomMenu />
				<CharacterContainer />
				<Preview />
			</MainContainer>
			{/* <Footer /> */}
		</Wrapper>
	);
};

export default Main;
