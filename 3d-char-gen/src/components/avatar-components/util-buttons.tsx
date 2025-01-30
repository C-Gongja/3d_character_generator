import React, { } from "react";
import styled from "styled-components";

const FunctionsContainer = styled.div`
	border: 1px solid white;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
`;

const FunctionBtn = styled.button`
	border: 1px solid white;
	height: 50px;
	width: 50%;
	border-radius: 20px;
	font-size: 25px;
	cursor: pointer;

	&:hover{
		background-color: gray;
	}
`;

export default function UtilButtons() {

	return (
		<FunctionsContainer>
			<FunctionBtn>Random</FunctionBtn>
			<FunctionBtn>Save</FunctionBtn>
			<FunctionBtn>Reset</FunctionBtn>
		</FunctionsContainer>
	);
}
