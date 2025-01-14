import React, { useRef } from "react";
import styled from "styled-components";
import ThreeScene from "./ThreeScene";
// import ThreeScene1 from "./ThreeScene1";
import BasicFunctions from "./BasicFunctions";


const MiddleColumn = styled.div`
	display: flex;
	flex-direction: column;
`;

export default function CharacterContainer() {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<MiddleColumn>
			<div ref={containerRef} style={{ width: "100%", height: "100%" }}>
				<ThreeScene containerRef={containerRef} />
			</div>
			<BasicFunctions />
		</MiddleColumn>
	);
}
