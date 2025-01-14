import { useState } from "react";
import styled from "styled-components";
import CustomTab from "./CustomTab";
import OptionLists from "./OptionLists";
import ColorOptions from "./ColorOptions";

const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	/* padding: 20px; */
`;


export default function MenuOptions() {
	const [selectedTab, setSelectedTab] = useState(1);

	return (
		<MenuContainer>
			<CustomTab onTabSelect={setSelectedTab} />
			<OptionLists selectedTab={selectedTab} />
			<ColorOptions selectedTab={selectedTab} />
		</MenuContainer>
	);
}
