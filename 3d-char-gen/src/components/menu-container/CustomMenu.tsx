import { } from "react";
import styled from "styled-components";
import MenuOptions from "./MenuOptions";

const MenuContainer = styled.div`
	padding: 20px;
`;

export default function CustomMenu() {

	return (
		<MenuContainer>
			<MenuOptions />
			{/* <ColorOptions menu={menu} /> */}
		</MenuContainer>
	);
}
