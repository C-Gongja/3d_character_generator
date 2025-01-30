import React from "react";
import styled from "styled-components";
import UtilButtons from "./util-buttons";
import AvatarScene from "./avatar-scene";


const MiddleColumn = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function AvatarContainer() {

	return (
		<MiddleColumn>
			<AvatarScene />
			<UtilButtons />
		</MiddleColumn>
	);
}
